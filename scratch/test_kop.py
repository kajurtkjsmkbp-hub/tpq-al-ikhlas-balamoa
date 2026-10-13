import urllib.request
import json

# Test fetching index.html and scripts
scripts = ['js/store.js', 'js/full_documents.js', 'js/app.js', 'index.html']
for s in scripts:
    url = f"http://localhost:8080/{s}"
    try:
        resp = urllib.request.urlopen(url)
        content = resp.read().decode('utf-8')
        print(f"HTTP 200: {s} ({len(content)} bytes)")
    except Exception as e:
        print(f"ERR: {s} - {e}")
