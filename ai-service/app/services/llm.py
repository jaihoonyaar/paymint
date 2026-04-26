from groq import Groq
import os

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_answer(query, context):
    client = get_client()

    prompt = f"""
    You are an AI assistant for a fintech platform (PayMint).

    STRICT RULES:
    - You MUST answer ONLY using the provided context.
    - DO NOT say you don’t have access to data.
    - DO NOT make assumptions.
    - If context contains numeric/business data, use it directly.
    Context:
    {context}

    Question:
    {query}

    Answer clearly and professionally.
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content