import re
from collections import Counter
from typing import Iterable, List, Sequence, Tuple


_STOPWORDS = {
    "a", "an", "and", "are", "as", "at", "be", "but", "by",
    "for", "from", "has", "have", "how", "i", "in", "is", "it",
    "its", "me", "my", "of", "on", "or", "our", "so", "such",
    "than", "that", "the", "their", "them", "then", "there",
    "these", "they", "this", "to", "was", "we", "were", "what",
    "when", "where", "which", "who", "why", "will", "with", "you",
    "your",
}


def extract_words(text: str, *, max_words: int = 40) -> List[str]:
    tokens = re.findall(r"[a-zA-Z][a-zA-Z0-9_'-]*", text.lower())
    out: List[str] = []
    seen = set()
    for t in tokens:
        if t in seen:
            continue
        seen.add(t)
        out.append(t)
        if len(out) >= max_words:
            break
    return out


def extract_phrases(words: Sequence[str], *, max_phrases: int = 25) -> List[str]:
    """
    Simple n-gram phrases over the token stream, skipping stopwords at edges.
    This is intentionally lightweight and deterministic.
    """
    phrases: List[str] = []

    def ok_edge(w: str) -> bool:
        return w not in _STOPWORDS and len(w) > 1

    for n in (2, 3):
        for i in range(0, max(0, len(words) - n + 1)):
            chunk = list(words[i:i + n])
            if not ok_edge(chunk[0]) or not ok_edge(chunk[-1]):
                continue
            if any(len(w) <= 1 for w in chunk):
                continue
            p = " ".join(chunk)
            phrases.append(p)

    # dedupe while preserving order
    deduped: List[str] = []
    seen = set()
    for p in phrases:
        if p in seen:
            continue
        seen.add(p)
        deduped.append(p)
        if len(deduped) >= max_phrases:
            break
    return deduped


def extract_related_terms_from_docs(
    docs: Iterable[str],
    *,
    exclude: Sequence[str],
    max_terms: int = 20,
) -> List[str]:
    """
    Pull "related" candidate terms from retrieved docs by frequency.
    Keeps some stopwords in the pool, but they naturally tend to have
    lower distinctiveness once mixed with semantic embeddings.
    """
    exclude_set = set(exclude)

    tokens: List[str] = []
    for d in docs:
        tokens.extend(re.findall(r"[a-zA-Z][a-zA-Z0-9_'-]*", (d or "").lower()))

    counts = Counter(tokens)
    # Prefer slightly longer content words; keep a few common words too.
    scored: List[Tuple[float, str]] = []
    for w, c in counts.items():
        if w in exclude_set:
            continue
        if len(w) <= 1:
            continue
        length_bonus = min(1.5, len(w) / 6.0)
        stop_penalty = 0.6 if w in _STOPWORDS else 1.0
        scored.append((c * length_bonus * stop_penalty, w))

    scored.sort(reverse=True, key=lambda x: x[0])
    return [w for _, w in scored[:max_terms]]

