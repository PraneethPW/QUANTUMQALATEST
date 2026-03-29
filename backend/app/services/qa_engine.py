from app.services.quantum_embedding import QuantumEmbedding
from app.services.vector_store import VectorStore
from app.services.llm_service import generate_answer


qe = QuantumEmbedding()
store = VectorStore()


class QAEngine:

    def entangled_answer(self, input1, input2):

        # Encode both inputs
        v1 = qe.encode(input1)
        v2 = qe.encode(input2)

        # Quantum entanglement
        entangled_vec = qe.entangle(v1, v2)

        # Search using entangled vector
        docs = store.search(entangled_vec)

        # Combine both inputs for LLM
        combined_question = f"""
Input 1: {input1}
Input 2: {input2}

These two inputs are conceptually entangled.
Generate a unified meaningful response.
"""

        # Fallback if no docs
        if len(docs) == 0:
            ans = generate_answer(combined_question, [])
            return ans, [], entangled_vec.tolist()

        ans = generate_answer(combined_question, docs)

        return ans, docs, entangled_vec.tolist()