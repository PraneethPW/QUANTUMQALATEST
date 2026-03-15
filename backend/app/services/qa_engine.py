from app.services.quantum_embedding import QuantumEmbedding
from app.services.vector_store import VectorStore
from app.services.llm_service import generate_answer


qe = QuantumEmbedding()
store = VectorStore()


class QAEngine:

    def answer(self, question):

        qvec = qe.encode(question)

        docs = store.search(qvec)

        # If no docs found → fallback to LLM
        if len(docs) == 0:

            ans = generate_answer(question, [])

            return ans, []

        ans = generate_answer(question, docs)

        return ans, docs