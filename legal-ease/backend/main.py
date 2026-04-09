import os
import json
import logging
from typing import List, Optional
import httpx
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="LegalEase AI Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPERVITY_API_URL = "https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream"
SUPERVITY_TOKEN = os.getenv("SUPERVITY_TOKEN", "YOUR_TOKEN_HERE")
WORKFLOW_ID = os.getenv("SUPERVITY_WORKFLOW_ID", "019d70d2-c69d-7000-b873-b052910b56d5")

class FollowUpRequest(BaseModel):
    question: str
    document_context: str
    language: str

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/analyze")
async def analyze_document(
    document_file: UploadFile = File(...),
    target_language: str = Form("English")
):
    logger.info(f"Analyzing document: {document_file.filename} in {target_language}")
    
    try:
        # Prepare data for Supervity
        files = {
            "inputs[document_file]": (document_file.filename, await document_file.read(), document_file.content_type)
        }
        data = {
            "workflowId": WORKFLOW_ID,
            "inputs[target_language]": target_language
        }
        headers = {
            "Authorization": f"Bearer {SUPERVITY_TOKEN}",
            "x-source": "v1"
        }

        # Call Supervity API with streaming
        async with httpx.AsyncClient(timeout=300.0) as client:
            full_response_text = ""
            async with client.stream("POST", SUPERVITY_API_URL, data=data, files=files, headers=headers) as response:
                if response.status_code != 200:
                    error_content = await response.aread()
                    logger.error(f"Supervity API Error: {response.status_code} - {error_content.decode()}")
                    raise HTTPException(status_code=500, detail="Failed to connect to AI agent")

                async for chunk in response.aiter_text():
                    full_response_text += chunk
            
            # Extract JSON from the potentially messy stream
            # Usually Supervity streams contain data: {json} strings if it's SSE, 
            # or just raw chunks. The prompt says "merge them, parse final JSON".
            
            logger.info("Successfully merged all chunks from Supervity")
            
            try:
                # Attempt to find the JSON structure in the text if it's not clean
                # If the stream is SSE, it might start with "data: "
                cleaned_text = full_response_text.strip()
                if cleaned_text.startswith("data: "):
                    # Might be multiple SSE chunks, let's try to extract the last one or merge
                    lines = cleaned_text.split("\n")
                    combined_json = ""
                    for line in lines:
                        if line.startswith("data: "):
                            combined_json += line[6:].strip()
                    cleaned_text = combined_json

                result_json = json.loads(cleaned_text)
                return result_json
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON: {e}. Raw text: {full_response_text[:500]}...")
                # Return a fallback/mock if parsing fails for demo purposes, 
                # but in production we'd want to handle this better.
                raise HTTPException(status_code=500, detail="Error parsing AI response")

    except Exception as e:
        logger.exception("Unexpected error during analysis")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/followup")
async def follow_up(request: FollowUpRequest):
    logger.info(f"Follow-up question: {request.question}")
    
    # In a real scenario, this would likely call another workflow or a LLM directly.
    # For the demo, we'll simulate a response based on the question.
    
    # Simulated response logic
    response_text = f"Based on the {request.language} context of the document, {request.question} is an important point. "
    
    if "risk" in request.question.lower():
        response_text += "The primary risks identified involve the termination notice period and the liability limitations in Clause 8."
    elif "safe" in request.question.lower():
        response_text += "The document is generally standard, but ensures you verify the insurance requirements before signing."
    else:
        response_text += "This clause specifies the standard operating procedures and legal jurisdiction governing this agreement."

    return {
        "status": "success",
        "answer": response_text
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
