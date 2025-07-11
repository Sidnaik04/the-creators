from fastapi import FastAPI
from models.schemas import SummaryRequest, AnswerRequest, QuizQuestion
from prompts.feedback import get_feedback_prompt
from prompts.summarizer import get_summary_prompt
from utils.gemini_client import generate_reply
from utils.quiz_bank import get_random_question, is_answer_correct

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI backend is up!"}

# ✅ New: Get random quiz question
@app.get("/api/quiz", response_model=QuizQuestion)
def get_quiz_question():
    return get_random_question()

# ✅ User submits answer, we check correctness and roast/motivate
@app.post("/api/feedback")
def generate_feedback(req: AnswerRequest):
    correct = is_answer_correct(req.question, req.answer)
    prompt = get_feedback_prompt(req.answer, correct)
    reply = generate_reply(prompt, correct)
    return {
        "correct": correct,
        "reply": reply
    }

@app.post("/api/summarize")
def summarize(req: SummaryRequest):
    prompt = get_summary_prompt(req.content, req.version)
    reply = generate_reply(prompt)
    return {"summary": reply}

