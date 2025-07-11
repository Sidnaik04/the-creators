import json
import random

with open("data/questions.json") as f:
    question_bank = json.load(f)

def get_random_question():
    q = random.choice(question_bank)
    return {
        "question": q["question"],
        "options": q["options"]
    }

def is_answer_correct(question_text, user_answer):
    for q in question_bank:
        if q["question"].strip().lower() == question_text.strip().lower():
            return q["answer"].strip().lower() == user_answer.strip().lower()
    return False
