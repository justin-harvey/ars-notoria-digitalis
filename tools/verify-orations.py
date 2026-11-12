#!/usr/bin/env python3
"""Check every oration and quotation in sigils.js word-for-word against Turner's text.

Usage:  python3 tools/verify-orations.py
Needs:  pdftotext (poppler-utils)

The PDF in this repository is Benjamin Rowe's transcription of Turner's 1657 translation.
Its text layer stores the "ct" ligature and a few glyphs as control characters; they are
restored before comparing. Line-break hyphenation is joined. Comparison ignores whitespace
and straight/curly quote differences.

Checks:
  * every `content` and `sacred` field must appear verbatim in the source;
  * every passage in double quotes (“…” or "…") inside `instruction`, `description`,
    `lunation`, `caution` and noteInfo text must appear verbatim (an ellipsis "…" splits a
    quote into parts, each of which must appear);
  * every `source` page number must match the page where the content ends.
Exits non-zero on any failure.
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'Ars Notoria - The Notory Art of Solomon - PDF.pdf')
JS = os.path.join(ROOT, 'sigils.js')
GLYPHS = {'\x01': 'ct', '\x02': '☉', '\x03': '♎', '\x04': '☾', '\x05': '♊', '\x06': '♍', '\x07': '♉', '\x08': '♋'}

def load_source():
    raw = subprocess.run(['pdftotext', '-layout', PDF, '-'], capture_output=True, text=True, check=True).stdout
    for a, b in GLYPHS.items():
        raw = raw.replace(a, b)
    buf, marks = '', []           # marks: (offset, page) for each page footer
    for line in raw.split('\n'):
        if re.fullmatch(r'\s*\d{1,2}\s*', line):
            marks.append((len(buf), int(line.strip()))); continue
        s = line.strip()
        if not s: continue
        if buf.endswith('-') and len(buf) > 1 and buf[-2].isalpha() and s[:1].isalpha():
            buf = buf[:-1] + s
        else:
            buf = (buf + ' ' + s) if buf else s
    return re.sub(r'\s+', ' ', buf), marks

def norm(s):
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    return re.sub(r'\s+', ' ', s).strip()

def load_js_objects():
    src = open(JS, encoding='utf-8').read()
    out = {}
    for name in ('artOrations', 'generalOrations', 'artDescriptions', 'noteInfo'):
        m = re.search(r'const ' + name + r' = (\{.*?\n\});', src, re.S)
        if not m: sys.exit('could not find ' + name + ' in sigils.js')
        out[name] = json.loads(m.group(1))
    return out

def quoted_parts(text):
    for m in re.finditer(r'[“"]([^”"]+)[”"]', text):
        for part in m.group(1).split('…'):
            part = part.strip(' ,;:.')
            if len(part.split()) >= 2:
                yield part

def main():
    doc, marks = load_source()
    ndoc = norm(doc)
    data = load_js_objects()
    failures, checked = [], 0

    def page_at(pos):
        for off, p in marks:
            if off >= pos: return p
        return None

    def check(label, text):
        nonlocal checked
        checked += 1
        if norm(text) not in ndoc:
            failures.append(f'{label}: not found in Turner: {text[:90]!r}')

    entries = [(f'{a}.{k}', v) for a, d in data['artOrations'].items() for k, v in d.items()]
    entries += [(f'general.{k}', v) for k, v in data['generalOrations'].items()]
    for label, e in entries:
        last_page = None
        for para in e['content'].split('\n\n'):
            check(label + '.content', para)
            i = ndoc.find(norm(para))
            if i >= 0: last_page = page_at(i + len(norm(para)))
        if e.get('sacred'):
            check(label + '.sacred', e['sacred'])
        for part in quoted_parts(e['instruction']):
            check(label + '.instruction', part)
        pages = [int(p) for p in re.findall(r'\d+', e['source'].split('p.')[-1])]
        if last_page and last_page not in pages:
            failures.append(f'{label}.source: content ends on p. {last_page}, source says {e["source"]}')
    for art, d in data['artDescriptions'].items():
        for field in ('description', 'lunation', 'caution', 'subtitle'):
            for part in quoted_parts(d.get(field, '')):
                check(f'artDescriptions.{art}.{field}', part)
    for art, d in data['noteInfo'].items():
        for n, text in d.items():
            for part in quoted_parts(text):
                check(f'noteInfo.{art}.{n}', part)

    print(f'{checked} passages checked against Turner, {len(failures)} failures')
    for f in failures:
        print('  FAIL', f)
    sys.exit(1 if failures else 0)

if __name__ == '__main__':
    main()
