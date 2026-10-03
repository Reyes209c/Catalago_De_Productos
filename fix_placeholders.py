import re
import urllib.parse

with open('src/data/mockData.js', 'r') as f:
    content = f.read()

def replacer(match):
    name = match.group(1)
    encoded = urllib.parse.quote(name)
    url = f"https://placehold.co/600x400/1e293b/3b82f6?text={encoded}"
    return f'name: "{name}"'

# Wait, I need to replace the image url, not the name!
# Let's iterate lines.
lines = content.split('\n')
current_name = None

for i, line in enumerate(lines):
    if 'name:' in line:
        m = re.search(r'name:\s*"([^"]+)"', line)
        if m:
            current_name = m.group(1)
    if 'image:' in line and current_name:
        encoded = urllib.parse.quote(current_name)
        url = f"https://placehold.co/600x400/1e293b/3b82f6?text={encoded}"
        lines[i] = re.sub(r'image:\s*"[^"]+"', f'image: "{url}"', line)
        current_name = None

with open('src/data/mockData.js', 'w') as f:
    f.write('\n'.join(lines))
    
print("Updated all images to professional placeholders!")
