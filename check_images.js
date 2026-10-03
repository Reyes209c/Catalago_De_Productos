import fs from 'fs';
import http from 'http';
import https from 'https';

const content = fs.readFileSync('src/data/mockData.js', 'utf8');
const urls = [...content.matchAll(/image:\s*"([^"]+)"/g)].map(m => m[1]);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({url, status: res.statusCode});
    }).on('error', () => resolve({url, status: 500}));
  });
}

async function run() {
  console.log(`Checking ${urls.length} images...`);
  const results = await Promise.all(urls.map(checkUrl));
  const broken = results.filter(r => r.status !== 200);
  console.log('Broken images:');
  console.log(broken.map(b => b.url).join('\n'));
}
run();
