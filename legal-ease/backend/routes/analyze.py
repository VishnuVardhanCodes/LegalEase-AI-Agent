from fastapi import APIRouter, UploadFile, File
import pdfplumber
import requests
import os
import json

router = APIRouter()

def extract_text(file):
    text = ""
    # Reset file pointer to beginning
    file.file.seek(0)
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

@router.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    try:
        print(f"--- Starting Analysis for: {file.filename} ---")
        document_text = extract_text(file)
        
        if not document_text:
            return {"error": "No text could be extracted from this document.", "status": "failed"}

        prompt = f"""
You are LegalEase AI — an intelligent legal document analyzer.

Analyze the following legal document.

Steps:
1 Detect document type  
2 Extract clauses  
3 Assign risk  
4 Simplify clauses  
5 Calculate Trust Score  
6 Generate summary  

DOCUMENT TEXT:
{document_text}

Return ONLY JSON.

Format:

{{
 "document_type": "Rental Agreement",
 "trust_score": 95,
 "overall_risk": "SAFE",
 "risk_summary": {{
   "safe": 5,
   "caution": 0,
   "risky": 0
 }},
 "clauses": [
   {{
     "clause_number": 1,
     "title": "Security Deposit",
     "risk_level": "SAFE",
     "risk_score": 10,
     "explanation": "You must pay one month's rent as deposit."
   }}
 ],
 "executive_summary": "This contract is safe to sign."
}}
"""

        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.2,
                "response_format": { "type": "json_object" }
            }
        )

        groq_data = response.json()
        
        # DEBUGGING LOGS (TEMPORARY)
        print("Groq Response Status:", response.status_code)
        
        if "choices" not in groq_data:
            print("ERROR: Groq Response missing 'choices':", groq_data)
            return {"error": "Model response was invalid.", "details": groq_data.get("error", "Unknown error"), "status": "failed"}

        # Extract message content properly
        content = groq_data["choices"][0]["message"]["content"]
        
        # Convert string JSON into actual JSON
        parsed_json = json.loads(content)
        
        print("Analysis successful!")
        return parsed_json

    except Exception as e:
        print(f"EXCEPTION during analysis: {str(e)}")
        return {
            "error": str(e),
            "status": "failed"
        }
