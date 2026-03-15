from pydantic import BaseModel

class QuestionRequest(BaseModel):

    question: str


class AnswerResponse(BaseModel):

    answer: str
    context: list

class IngestRequest(BaseModel):
    text: str