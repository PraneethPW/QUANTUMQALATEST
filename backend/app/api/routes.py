from fastapi import APIRouter
from app.models.schemas import DualQuestionRequest, IngestRequest
from app.services.qa_engine import QAEngine
from app.services.quantum_embedding import QuantumEmbedding
from app.services.vector_store import VectorStore

router = APIRouter()

engine = QAEngine()
qe = QuantumEmbedding()
store = VectorStore()


@router.get("/")
def health():
    return {"message": "Quantum Entanglement API running"}


# 🔥 NEW MAIN ENDPOINT
@router.post("/entangle-ask")
def entangle_ask(req: DualQuestionRequest):

    answer, context, entangled_state = engine.entangled_answer(
        req.input1,
        req.input2
    )

    return {
        "answer": answer,
        "context": context,
        "entangled_state": entangled_state
    }


# # existing ingest stays same
# @router.post("/ingest")
# def ingest_document(req: IngestRequest):

#     embedding = qe.encode(req.text)

#     store.insert(req.text, embedding)

#     return {
#         "status": "document stored"
#     }