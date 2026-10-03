"""Download reviewed, exact-model photos for products without a Pacifiko listing."""
from pathlib import Path
import json
import urllib.request
import concurrent.futures
ROOT=Path(__file__).resolve().parents[1]
sources=json.loads((ROOT/'src/data/imageSources.json').read_text())
def download(item):
    pid, source=item
    target=ROOT/f'public/images/product-{pid}.jpg'
    if target.exists(): return pid, True
    try:
        req=urllib.request.Request(source['imageSourceUrl'],headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=20) as r: data=r.read()
        if not (data.startswith(b'\xff\xd8') or data.startswith(b'\x89PNG') or data.startswith(b'RIFF')): raise ValueError('Not a raster image')
        target.write_bytes(data)
        return pid, True
    except Exception as e:
        print(f'Photo {pid}: {e}',flush=True)
        return pid, False
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    status=dict(pool.map(download,sources.items()))
print(f'Photos saved: {sum(status.values())}/{len(sources)}')
