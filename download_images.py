import re
import os
import json
import urllib.request
from duckduckgo_search import DDGS

os.makedirs('public/images', exist_ok=True)

with open('src/data/mockData.js', 'r') as f:
    content = f.read()

products_section = content.split('export const products = [')[1]
matches = re.finditer(r'id:\s*(\d+),\s*name:\s*"([^"]+)"', content)

ddgs = DDGS()

for match in matches:
    pid = match.group(1)
    name = match.group(2)
    filepath = f"public/images/{pid}.jpg"
    
    if os.path.exists(filepath):
        continue
        
    print(f"Searching image for {name}...")
    try:
        results = list(ddgs.images(name + " product photo", max_results=2))
        img_url = None
        for r in results:
            if r['image'].endswith('.jpg') or r['image'].endswith('.png'):
                img_url = r['image']
                break
        if not img_url and results:
            img_url = results[0]['image']
            
        if img_url:
            req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as response:
                with open(filepath, 'wb') as out:
                    out.write(response.read())
            print(f"Downloaded {filepath}")
    except Exception as e:
        print(f"Failed {name}: {e}")
        # fallback to a placeholder if download fails
        pass

# Replace all image URLs in mockData.js with local ones
new_content = re.sub(r'image:\s*"https://images-na.ssl-images-amazon.com[^"]+"', lambda m: 'image: "/images/' + re.search(r'id:\s*(\d+)', content[:m.start()][::-1]).group(1)[::-1] + '.jpg"', content)

# A more robust replacement:
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'id:' in line and 'name:' in line:
        pid = re.search(r'id:\s*(\d+)', line).group(1)
    if 'image:' in line and 'amazon' in line:
        lines[i] = re.sub(r'image:\s*"[^"]+"', f'image: "/images/{pid}.jpg"', line)

with open('src/data/mockData.js', 'w') as f:
    f.write('\n'.join(lines))

print("Done downloading and updating!")
