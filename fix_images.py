import re
import json
import time
from duckduckgo_search import DDGS

def get_image(query):
    try:
        with DDGS() as ddgs:
            results = list(ddgs.images(query, max_results=1))
            if results:
                return results[0]['image']
    except Exception as e:
        pass
    return None

with open('src/data/mockData.js', 'r') as f:
    content = f.read()

# Extract all product names
matches = re.finditer(r'name:\s*"([^"]+)"', content)
for match in matches:
    name = match.group(1)
    print(f"Searching image for {name}...")
    img_url = get_image(name + " product photo")
    if img_url:
        print(f"Found: {img_url}")
        # Replace the first image url we find after this name
        # A bit hacky but works for this structure
        # Find the next 'image: "..."'
        idx = match.end()
        img_match = re.search(r'image:\s*"([^"]+)"', content[idx:])
        if img_match:
            old_url = img_match.group(1)
            content = content[:idx+img_match.start(1)] + img_url + content[idx+img_match.end(1):]
    time.sleep(1)

with open('src/data/mockData.js', 'w') as f:
    f.write(content)
print("Done!")
