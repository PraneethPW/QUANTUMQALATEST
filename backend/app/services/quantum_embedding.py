import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

class QuantumEmbedding:

    def encode(self, text):

        vec = model.encode(text)

        norm = np.linalg.norm(vec)

        quantum_state = vec / norm

        return quantum_state


    def entangle(self, v1, v2):

        return np.kron(v1, v2)


    def fidelity(self, v1, v2):

        return abs(np.dot(v1, v2))**2