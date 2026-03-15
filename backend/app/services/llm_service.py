import requests
from app.core.config import OPENROUTER_API_KEY, MODEL_NAME

URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_answer(question, context):

    prompt = f"""

Context:
{context}

Question:
{question}

Answer clearly.
"""

    headers = {

        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }


    data = {

        "model": MODEL_NAME,

        "messages":[
            {"role":"user","content":prompt}
        ]

    }

    response = requests.post(URL,headers=headers,json=data)

    result = response.json()

    return result["choices"][0]["message"]["content"]