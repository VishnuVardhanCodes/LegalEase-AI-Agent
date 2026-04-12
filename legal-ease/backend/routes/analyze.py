from fastapi import APIRouter, UploadFile, File, Form
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
async def analyze_document(file: UploadFile = File(...), language: str = Form("EN")):
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    
    # Map language code to full name for the prompt
    lang_map = {
        "EN": "English",
        "HI": "Hindi",
        "TE": "Telugu"
    }
    target_language = lang_map.get(language, "English")

    try:
        print(f"--- Starting Analysis for: {file.filename} (Language: {target_language}) ---")
        document_text = extract_text(file)
        
        if not document_text:
            return {"error": "No text could be extracted from this document.", "status": "failed"}

        prompt = f"""
You are LegalEase AI — an intelligent legal document analyzer.

Analyze the following legal document.

IMPORTANT: Your response (document_type, titles, explanations, and executive_summary) MUST be in {target_language}. Even though the input might be in English, the output analysis MUST be translated and explained in {target_language}.

Steps:
1 Detect document type  
2 Extract clauses  
3 Assign risk  
4 Simplify clauses (Explain in {target_language})
5 Calculate Trust Score  
6 Generate summary (In {target_language})

DOCUMENT TEXT:
{document_text}

Return ONLY JSON.

Format (But translate content to {target_language}):

{{
 "document_type": "Rental Agreement (Translated)",
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
     "title": "Security Deposit (Translated)",
     "risk_level": "SAFE",
     "risk_score": 10,
     "explanation": "Explanation in {target_language}..."
   }}
 ],
 "executive_summary": "Summary in {target_language}..."
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
                        "role": "system",
                        "content": f"You are a legal expert that responds exclusively in {target_language}."
                    },
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
        
        print("Groq Response Status:", response.status_code)
        
        if "choices" not in groq_data:
            print("ERROR: Groq Response missing 'choices':", groq_data)
            return {"error": "Model response was invalid.", "details": groq_data.get("error", "Unknown error"), "status": "failed"}

        content = groq_data["choices"][0]["message"]["content"]
        parsed_json = json.loads(content)
        
        print(f"Analysis successful in {target_language}!")
        return parsed_json

    except Exception as e:
        print(f"EXCEPTION during analysis: {str(e)}")
        return {
            "error": str(e),
            "status": "failed"
        }
