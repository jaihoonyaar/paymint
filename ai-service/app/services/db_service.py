import requests

BASE_URL = "http://localhost:8080/api/cashback"

def get_cashback_summary(merchant_id):
    try:
        response = requests.get(f"{BASE_URL}/summary/{merchant_id}")

        if response.status_code == 200:
            data = response.json()
            return data["data"]   # 👈 IMPORTANT
        else:
            return "Unable to fetch cashback data"

    except Exception as e:
        return f"Error connecting to backend: {str(e)}"