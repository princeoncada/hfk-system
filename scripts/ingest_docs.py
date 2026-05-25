import re
from pathlib import Path

import chromadb


DOC_PATHS = [
    "docs/AI_HANDOFF.md",
    "docs/PHASE_LOG.md",
    "docs/FUTURE_PLANS.md",
    "docs/DECISIONS.md",
    "docs/BRAND_GUIDE.md",
    "docs/CONTENT_PHILOSOPHY.md",
]


def split_on_h2(text):
    parts = re.split(r"(?m)^(## .*)$", text)
    chunks = []

    intro = parts[0].strip()
    if intro:
        chunks.append(("Overview", intro))

    for index in range(1, len(parts), 2):
        heading = parts[index].strip().lstrip("#").strip()
        body = parts[index + 1].strip() if index + 1 < len(parts) else ""
        chunk_text = f"{parts[index].strip()}\n\n{body}".strip()
        if chunk_text:
            chunks.append((heading, chunk_text))

    return chunks


def chunk_id(doc_path, heading):
    return f"{doc_path}::{heading.replace(' ', '_')}"


def main():
    client = chromadb.HttpClient(host="localhost", port=8000)
    collection = client.get_or_create_collection(
        name="hfk_docs",
        metadata={"hnsw:space": "cosine"},
    )

    total = 0
    for doc_path in DOC_PATHS:
        path = Path(doc_path)
        if not path.exists():
            continue

        text = path.read_text(encoding="utf-8-sig")
        chunks = split_on_h2(text)
        if chunks:
            collection.upsert(
                ids=[chunk_id(doc_path, heading) for heading, _ in chunks],
                documents=[chunk for _, chunk in chunks],
                metadatas=[
                    {"source": doc_path, "section": heading}
                    for heading, _ in chunks
                ],
            )

        total += len(chunks)
        print(f"OK: {doc_path} -> {len(chunks)} chunks")

    print(f"Done: {total} chunks in hfk_docs")


if __name__ == "__main__":
    main()
