from pydantic import BaseModel

class DualQuestionRequest(BaseModel):
    input1: str
    input2: str


class AnswerResponse(BaseModel):
    answer: str
    context: list
    entangled_state: list


class IngestRequest(BaseModel):
    text: str


class EmbeddingVizRequest(BaseModel):
    text: str
    include_phrases: bool = True
    max_related: int = 16