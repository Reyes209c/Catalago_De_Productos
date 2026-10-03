"""Import manually reviewed Pacifiko listings; never guess prices or image URLs."""
from pathlib import Path
import concurrent.futures
import json
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
rows = [line.split('|') for line in (ROOT / 'src/data/pacifiko-verified.txt').read_text().splitlines() if line.strip()]

def download(row):
    pid, price, image, slug = row
    url = 'https://img.pacifiko.com/PROD/resize/1/250x250/' + image
    target = ROOT / f'public/images/pacifiko-{pid}.jpg'
    if not target.exists():
        request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = response.read()
        if not (data.startswith(b'\xff\xd8') or data.startswith(b'\x89PNG') or data.startswith(b'RIFF')):
            raise ValueError(f'Not an image: {pid}')
        target.write_bytes(data)
    return pid, {'price': float(price), 'currency': 'GTQ', 'source': 'Pacifiko',
                 'sourceUrl': slug if slug.startswith('https://') else 'https://www.pacifiko.com/compras-en-linea/' + slug,
                 'image': f'/images/pacifiko-{pid}.jpg', 'imageSourceUrl': url,
                 'updatedAt': '02/10/2026', 'checkedAt': '2026-10-02', 'priceStatus': 'verified'}

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    catalog = dict(pool.map(download, rows))
(ROOT / 'src/data/verifiedCatalog.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
print(f'Imported {len(catalog)} verified listings and photos.')
