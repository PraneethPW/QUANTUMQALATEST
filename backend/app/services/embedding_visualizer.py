from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Literal, Sequence, Tuple

import numpy as np
from sklearn.manifold import TSNE

from app.services.quantum_embedding import QuantumEmbedding
from app.services.text_processing import (
    extract_phrases,
    extract_related_terms_from_docs,
    extract_words,
)
from app.services.vector_store import VectorStore


NodeType = Literal["input_word", "input_phrase", "related_word"]


@dataclass(frozen=True)
class Node:
    key: str
    text: str
    node_type: NodeType


def _tsne_2d(vectors: np.ndarray, *, seed: int = 7) -> np.ndarray:
    n = int(vectors.shape[0])
    if n <= 1:
        return np.zeros((n, 2), dtype=float)

    perplexity = max(2, min(30, (n - 1) // 2))
    tsne = TSNE(
        n_components=2,
        init="pca",
        learning_rate="auto",
        perplexity=perplexity,
        random_state=seed,
    )
    return tsne.fit_transform(vectors)


def build_embedding_visualization(
    text: str,
    *,
    include_phrases: bool = True,
    max_related: int = 16,
    seed: int = 7,
) -> Dict:
    qe = QuantumEmbedding()
    store = VectorStore()

    words = extract_words(text)
    phrases = extract_phrases(words) if include_phrases else []

    input_nodes: List[Node] = []
    for w in words:
        input_nodes.append(Node(key=f"w:{w}", text=w, node_type="input_word"))
    for p in phrases:
        input_nodes.append(Node(key=f"p:{p}", text=p, node_type="input_phrase"))

    # Fetch docs using a centroid embedding (robust even if DB is empty).
    input_vecs = [qe.encode(n.text) for n in input_nodes] or [qe.encode(text)]
    centroid = np.mean(np.stack(input_vecs, axis=0), axis=0)
    centroid = centroid / (np.linalg.norm(centroid) + 1e-12)

    docs = store.search(centroid)
    related_terms = extract_related_terms_from_docs(
        docs,
        exclude=[n.text for n in input_nodes],
        max_terms=max_related,
    )

    related_nodes = [Node(key=f"r:{t}", text=t, node_type="related_word") for t in related_terms]

    nodes: List[Node] = input_nodes + related_nodes

    raw_vectors: List[np.ndarray] = [qe.encode(n.text) for n in nodes]
    raw_mat = np.stack(raw_vectors, axis=0)

    # Contextual entanglement: each node interacts with the input centroid.
    ent_vectors: List[np.ndarray] = []
    for n, v in zip(nodes, raw_vectors):
        if n.node_type in ("input_word", "input_phrase"):
            ent_vectors.append(qe.contextual_entangle(v, centroid, mix=0.35, interaction=0.18))
        else:
            ent_vectors.append(qe.contextual_entangle(v, centroid, mix=0.65, interaction=0.28))
    ent_mat = np.stack(ent_vectors, axis=0)

    raw_xy = _tsne_2d(raw_mat, seed=seed)
    ent_xy = _tsne_2d(ent_mat, seed=seed)

    # Edges: connect related nodes to the most similar input node.
    input_indices = [i for i, n in enumerate(nodes) if n.node_type != "related_word"]
    edges: List[Dict] = []
    if input_indices:
        for i, n in enumerate(nodes):
            if n.node_type != "related_word":
                continue
            sims: List[Tuple[float, int]] = []
            for j in input_indices:
                sim = float(qe.similarity(ent_vectors[i], ent_vectors[j]))
                sims.append((sim, j))
            sims.sort(reverse=True, key=lambda x: x[0])
            best_sim, best_j = sims[0]
            edges.append(
                {
                    "source": nodes[best_j].key,
                    "target": n.key,
                    "weight": best_sim,
                    "kind": "entanglement",
                }
            )

    out_nodes: List[Dict] = []
    for i, n in enumerate(nodes):
        out_nodes.append(
            {
                "id": n.key,
                "text": n.text,
                "type": n.node_type,
                "raw": {"x": float(raw_xy[i, 0]), "y": float(raw_xy[i, 1])},
                "entangled": {"x": float(ent_xy[i, 0]), "y": float(ent_xy[i, 1])},
            }
        )

    return {
        "nodes": out_nodes,
        "edges": edges,
        "meta": {
            "input_words": words,
            "input_phrases": phrases,
            "related_terms": related_terms,
            "counts": {
                "words": len(words),
                "phrases": len(phrases),
                "related": len(related_terms),
                "total_nodes": len(nodes),
            },
        },
    }

