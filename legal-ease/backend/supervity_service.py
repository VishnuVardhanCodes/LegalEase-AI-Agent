import os
import httpx
import logging
import json
from typing import AsyncGenerator, Any

logger = logging.getLogger(__name__)

class SupervityService:
    """
    Service to handle communication with the Supervity Agent API.
    """
    
    # URL and Workflow ID stored in the Python file as requested by the user
    API_URL = "https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream"
    WORKFLOW_ID = "019d70d2-c69d-7000-b873-b052910b56d5"
    
    def __init__(self):
        # Bearer token is kept in the .env file
        self.token = os.getenv("SUPERVITY_TOKEN")
        if not self.token:
            logger.error("SUPERVITY_TOKEN not found in environment variables")
            
    async def analyze_document(self, file_content: bytes, filename: str, content_type: str, target_language: str = "English") -> dict:
        """
        Sends a document to Supervity for analysis and returns the parsed JSON result.
        """
        if not self.token:
            raise ValueError("Supervity configuration error: Missing API Token")

        headers = {
            "Authorization": f"Bearer {self.token}",
            "x-source": "v1"
        }
        
        # Multipart form-data fields updated to match Supervity expected schema
        files = {
            "inputs[file]": (filename, file_content, content_type)
        }
        data = {
            "workflowId": self.WORKFLOW_ID,
            "inputs[language]": target_language
        }

        logger.info(f"Calling Supervity API for file: {filename}")
        
        async with httpx.AsyncClient(timeout=300.0) as client:
            full_response_text = ""
            try:
                async with client.stream("POST", self.API_URL, data=data, files=files, headers=headers) as response:
                    if response.status_code != 200:
                        error_content = await response.aread()
                        logger.error(f"Supervity API Error: {response.status_code} - {error_content.decode()}")
                        return {"status": "error", "message": f"Supervity API returned {response.status_code}"}

                    async for chunk in response.aiter_text():
                        full_response_text += chunk
                
                # Extract and parse JSON from the stream
                return self._parse_stream_response(full_response_text)
                
            except Exception as e:
                logger.error(f"Async request failed: {str(e)}")
                raise

    def _parse_stream_response(self, raw_text: str) -> dict:
        """
        Parses the raw text response from Supervity's streaming endpoint.
        Handles SSE (Server-Sent Events) style formatting if present.
        """
        cleaned_text = raw_text.strip()
        
        # Check if it's SSE format (starts with data:)
        if "data: " in cleaned_text:
            lines = cleaned_text.split("\n")
            combined_json = ""
            for line in lines:
                if line.startswith("data: "):
                    combined_json += line[6:].strip()
            cleaned_text = combined_json

        try:
            return json.loads(cleaned_text)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Supervity response: {e}. Raw text: {raw_text[:200]}...")
            # If parsing fails, we might be getting raw text or a malformed JSON
            # In a real app, you'd handle specific workflow output formats here
            return {"status": "error", "message": "Failed to parse AI response", "raw": raw_text[:500]}

    def analyze_document_background(self, file_content: bytes, filename: str, content_type: str, target_language: str = "English"):
        import threading
        import asyncio
        
        def background_task():
            logger.info("Starting background Supervity execution thread.")
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                result = loop.run_until_complete(
                    self.analyze_document(file_content, filename, content_type, target_language)
                )
                logger.info(f"Background Supervity execution finished. Result snippet: {str(result)[:200]}")
            except Exception as e:
                logger.error(f"Background Supervity execution failed: {str(e)}")
            finally:
                loop.close()

        thread = threading.Thread(target=background_task)
        thread.daemon = True
        thread.start()
