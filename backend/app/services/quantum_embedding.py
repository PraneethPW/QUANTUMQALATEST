import numpy as np
from sentence_transformers import SentenceTransformer
from app.utils.quantum_math import QuantumMath

model = SentenceTransformer("all-MiniLM-L6-v2")


class QuantumEmbedding:

    def encode(self, text):
        vec = model.encode(text)
        return QuantumMath.normalize_state(vec)

    def entangle(self, v1, v2):
        return QuantumMath.entangle(v1, v2)

    def similarity(self, v1, v2):
        return QuantumMath.fidelity(v1, v2)