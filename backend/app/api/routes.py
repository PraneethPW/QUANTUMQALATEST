from fastapi import APIRouter
from app.models.schemas import QuestionRequest, IngestRequest
from app.services.qa_engine import QAEngine
from app.services.quantum_embedding import QuantumEmbedding
from app.services.vector_store import VectorStore

router = APIRouter()

engine = QAEngine()
qe = QuantumEmbedding()
store = VectorStore()


@router.get("/")
def health():
    return {"message": "Quantum QA API running"}


@router.post("/ask")
def ask_question(req: QuestionRequest):

    answer, context = engine.answer(req.question)

    return {
        "answer": answer,
        "context": context
    }


@router.post("/ingest")
def ingest_document(req: IngestRequest):

    embedding = qe.encode(req.text)

    store.insert(req.text, embedding)

    return {
        "status": "document stored"
    }