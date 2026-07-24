from fastapi import APIRouter
from models.schemas import QueryRequest, ContactRequest
from services.ai_agent import process_ai_chat, process_ai_contact

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(req: QueryRequest):
    response = process_ai_chat(req.query)
    return {"response": response}

@router.post("/contact-ai")
async def contact_endpoint(req: ContactRequest):
    analysis = process_ai_contact(req.sender, req.message)
    return {"status": "success", "analysis": analysis}