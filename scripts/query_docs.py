import sys

import chromadb


def main():
    if len(sys.argv) < 2:
        print('Usage: python scripts/query_docs.py "current phase status"')
        return 1

    client = chromadb.HttpClient(host="localhost", port=8000)
    try:
        collection = client.get_collection("hfk_docs")
    except Exception:
        print("hfk_docs collection not found. Run: python scripts/ingest_docs.py")
        return 1

    results = collection.query(query_texts=[sys.argv[1]], n_results=5)
    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    for document, metadata in zip(documents, metadatas):
        source = metadata.get("source", "unknown")
        section = metadata.get("section", "unknown")
        preview = document[:300]
        if len(document) > 300:
            preview += "..."
        print(f"[{source} > {section}]")
        print(preview)
        print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
