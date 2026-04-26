from fastapi import FastAPI
from app.routes import chat
from app.services.rag import create_vector_store
from dotenv import load_dotenv
load_dotenv()
app = FastAPI()

app.include_router(chat.router)

@app.get("/")
def home():
    return {"message": "PayMint AI running 🚀"}




@app.on_event("startup")
def startup_event():
    create_vector_store()