from pydantic import BaseModel
    
class SummaryRequest(BaseModel):
    content: str
    version: str # normal, gen-z, meme, poetic
    
class QuizQuestion(BaseModel):
    question: str
    options: list[str]

class AnswerRequest(BaseModel):
    question: str
    answer: str
