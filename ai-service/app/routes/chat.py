from fastapi import APIRouter
from pydantic import BaseModel

from app.services.intent import detect_intent
from app.services.db_service import (
    get_cashback_summary
)
from app.services.rag import query_rag
from app.services.llm import generate_answer

router = APIRouter()

class ChatRequest(BaseModel):
    merchantId: int
    question: str

@router.post("/chat")
def chat(req: ChatRequest):
    intent = detect_intent(req.question)

    context = ""

    if intent == "CASHBACK":
        context = get_cashback_summary(req.merchantId)

    elif intent == "RAG":
        context = query_rag(req.question)

    else:
        context = "General assistant for PayMint"

    # 🔥 LLM call
    answer = generate_answer(req.question, context)

    return {
        "intent": intent,
        "answer": answer
    }