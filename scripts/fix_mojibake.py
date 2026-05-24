import pathlib
import re

FILES = [
    *pathlib.Path("docs").rglob("*.md"),
    *pathlib.Path("vault").rglob("*.md"),
    pathlib.Path("README.md"),
    pathlib.Path("CLAUDE.md"),
    pathlib.Path("master_prompt.md"),
]

REPLACEMENTS = {
    "\u00c3\u0192\u00c2\u00a2\u00c3\u00a2\u00e2\u20ac\u0161\u00c2\u00ac\u00c3\u00a2\u00e2\u201a\u00ac\u009d": "\u2014",
    "\u00c3\u0192\u00c2\u00a2\u00c3\u00a2\u00e2\u20ac\u0161\u00c2\u00ac\u00c3\u00a2\u00e2\u201a\u00ac\u0153": "\u2013",
    "\u00c3\u0192\u00c2\u00a2\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00a0\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u201e\u00a2": "\u2192",
    "\u00c3\u00a2\u00e2\u201a\u00ac\u201d": "\u2014",
    "\u00e2\u20ac\u201d": "\u2014",
    "\u00e2\u20ac\u201c": "\u2013",
    "\u00e2\u2020\u2019": "\u2192",
    "\u00c3\u0192\u00c6\u2019\u00c3\u2020\u00e2\u20ac\u2122\u00c3\u0192\u00e2\u20ac\u00a0\u00c3\u00a2\u00e2\u201a\u00ac\u00e2\u201e\u00a2\u00c3\u0192\u00c2\u00af\u00c3\u201a\u00c2\u00bf\u00c3\u201a\u00c2\u00bd": "-",
}


def cp1252_bytes(text: str) -> bytes:
    out = bytearray()
    for char in text:
        codepoint = ord(char)
        if 0x80 <= codepoint <= 0x9F:
            out.append(codepoint)
        else:
            out.extend(char.encode("cp1252"))
    return bytes(out)


def repair_mojibake(text: str) -> str:
    prefix = ""
    if text.startswith("\ufeff"):
        prefix = "\ufeff"
        text = text[1:]

    for bad, good in REPLACEMENTS.items():
        text = text.replace(bad, good)

    suspicious = re.compile(
        r"[\u0080-\u009f\u00c0-\u00ff\u0192\u0152-\u0153\u0160-\u0161"
        r"\u0178\u017d-\u017e\u201a-\u201e\u2020-\u2022\u20ac\uff00-\uffef]+"
    )

    def repair_match(match: re.Match[str]) -> str:
        value = match.group(0)
        for _ in range(6):
            try:
                decoded = cp1252_bytes(value).decode("utf-8")
            except UnicodeError:
                break
            if decoded == value:
                break
            value = decoded
        return value

    text = suspicious.sub(repair_match, text)

    for _ in range(6):
        try:
            decoded = cp1252_bytes(text).decode("utf-8")
            if decoded == text:
                break
            text = decoded
        except UnicodeError:
            break
    return prefix + text


def main() -> None:
    for path in FILES:
        p = pathlib.Path(path)
        original = p.read_text(encoding="utf-8")
        fixed = repair_mojibake(original)
        if fixed != original:
            p.write_text(fixed, encoding="utf-8")
            print(f"Fixed: {path}")
        else:
            print(f"No changes: {path}")

    print("Done.")


if __name__ == "__main__":
    main()
