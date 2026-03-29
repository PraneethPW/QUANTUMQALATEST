import requests
from app.core.config import OPENROUTER_API_KEY, MODEL_NAME

URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_answer(question, context):
    """
    Generates answer using LLM based on entangled inputs + retrieved context.
    """

    # Format context properly
    if isinstance(context, list) and len(context) > 0:
        context_text = "\n\n".join(context)
    else:
        context_text = "No relevant context found."

    # 🔥 Improved prompt for dual-input reasoning
    prompt = f"""
You are an advanced AI system capable of understanding relationships between multiple inputs.

Context:
{context_text}

Instructions:
- Understand the relationship between Input 1 and Input 2
- Merge their meaning intelligently
- If they conflict, resolve logically
- If they complement, enhance the idea
- Provide a clear, insightful response

{question}

Final Answer:
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": "You are a highly intelligent reasoning engine."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }

    try:
        response = requests.post(URL, headers=headers, json=data)

        # Handle bad response
        if response.status_code != 200:
            return f"LLM Error: {response.text}"

        result = response.json()

        return result["choices"][0]["message"]["content"]

    except Exception as e:
        return f"Error generating answer: {str(e)}"