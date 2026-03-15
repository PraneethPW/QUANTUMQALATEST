import numpy as np


class QuantumMath:

    @staticmethod
    def normalize_state(vector):
        """
        Normalize a vector to represent a quantum state.
        """

        norm = np.linalg.norm(vector)

        if norm == 0:
            return vector

        return vector / norm


    @staticmethod
    def superposition(state1, state2, alpha=0.5, beta=0.5):
        """
        Create a superposition of two quantum states.
        """

        combined = alpha * state1 + beta * state2

        return QuantumMath.normalize_state(combined)


    @staticmethod
    def entangle(state1, state2):
        """
        Tensor product to simulate quantum entanglement.
        """

        return np.kron(state1, state2)


    @staticmethod
    def fidelity(state1, state2):
        """
        Measure similarity between quantum states.
        """

        return np.abs(np.dot(state1, state2)) ** 2


    @staticmethod
    def wave_collapse(probabilities):
        """
        Simulate wavefunction collapse.
        """

        probabilities = probabilities / np.sum(probabilities)

        return np.random.choice(len(probabilities), p=probabilities)