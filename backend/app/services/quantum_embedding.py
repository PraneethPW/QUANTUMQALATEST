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

    def contextual_entangle(self, v1, v2, mix=0.55, interaction=0.25):
        return QuantumMath.contextual_entangle(v1, v2, mix=mix, interaction=interaction)

    def similarity(self, v1, v2):
        return QuantumMath.fidelity(v1, v2)