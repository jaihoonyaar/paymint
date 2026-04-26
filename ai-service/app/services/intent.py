def detect_intent(query: str):
    query = query.lower()

    # 🔥 PRIORITY: RAG FIRST
    if any(word in query for word in ["policy", "rule", "how", "what", "offer"]):
        return "RAG"

    # THEN DB
    elif "cashback" in query:
        return "CASHBACK"

    elif "transaction" in query:
        return "TRANSACTION"

    elif "revenue" in query or "earn" in query:
        return "REVENUE"
    elif "cashback" and not "policy":
        return "DB"

    else:
        return "GENERAL"