import re

with open('js/full_documents.js', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'id:\s*"([^"]+)",\s*catId:\s*"([^"]+)",\s*code:\s*"([^"]+)",\s*title:\s*"([^"]+)"', text)
for m in matches:
    print(f"[{m[1]}] {m[2]} - {m[3]}")
