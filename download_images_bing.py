import re
import os
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import json
import time

os.makedirs('public/images', exist_ok=True)

with open('src/data/mockData.js', 'r') as f:
    content = f.read()

matches = re.finditer(r'id:\s*(\d+),\s*name:\s*"([^"]+)"', content)
opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]

for match in matches:
    pid = match.group(1)
    name = match.group(2)
    filepath = f"public/images/{pid}.jpg"
    
    if os.path.exists(filepath):
        continue
        
    print(f"Searching image for {name}...")
    try:
        query = urllib.parse.quote(name + " png")
        url = f"https://www.bing.com/images/search?q={query}"
        html = opener.open(url, timeout=5).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        img_url = None
        for a in soup.find_all('a', class_='iusc'):
            m = json.loads(a.get('m'))
            img_url = m.get('murl')
            if img_url:
                break
                
        if img_url:
            print(f"Found: {img_url}")
            try:
                img_data = opener.open(img_url, timeout=5).read()
                with open(filepath, 'wb') as out:
                    out.write(img_data)
                print(f"Downloaded {filepath}")
            except Exception as e:
                print(f"Failed to download from {img_url}: {e}")
    except Exception as e:
        print(f"Failed search {name}: {e}")
    time.sleep(1)

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
