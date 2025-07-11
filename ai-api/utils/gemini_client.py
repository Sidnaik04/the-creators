import google.generativeai as genai
import os
import random
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")  # ✅ FIXED

with open("data/fallback_roasts.json") as f:
    fallback_roasts = json.load(f)

with open("data/fallback_motivations.json") as f:
    fallback_motivations = json.load(f)

def truncate_text(text, max_words=15):
    return ' '.join(text.split()[:max_words])

def get_fallback(correct: bool):
    return random.choice(fallback_motivations if correct else fallback_roasts)

def generate_reply(prompt: str, correct: bool = True) -> str:
    try:
        response = model.generate_content(prompt)
        if not response or not response.text:
            raise ValueError("Empty AI response")
        return truncate_text(response.text)
    except Exception as e:
        print("⚠️ Gemini failed, using fallback:", str(e))
        return get_fallback(correct)
