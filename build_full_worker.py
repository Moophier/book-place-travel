import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

with open("src/worker/index.js", "r", encoding="utf-8") as f:
    worker = f.read()

# Escape backticks, dollar signs and backslashes for JS template literal
escaped = html.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

# Replace ROOT_HTML template literal
pattern = r"const ROOT_HTML = `.*?`;"
replacement = f"const ROOT_HTML = `{escaped}`;"
worker = re.sub(pattern, replacement, worker, count=1, flags=re.DOTALL)

output_path = "src/worker/index.full.js"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(worker)

print(f"Created {output_path}")
print(f"Size: {len(worker)} chars / {len(worker.encode('utf-8'))} bytes")
