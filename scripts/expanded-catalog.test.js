import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createServer } from 'vite';
import { formatPrice } from '../src/utils/catalog.js';
import { generateConclusion } from '../src/utils/compareLogic.js';

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
const { products, categories } = await server.ssrLoadModule('/src/data/mockData.js');
await server.close();

test('all assignment categories have multiple priced products and local images', () => {
  assert.equal(products.length, 130);
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  assert.equal(categories.length, 26);
  for (const category of categories) assert.ok(products.filter(p => p.category === category).length >= 2, category);
  for (const product of products) {
    assert.ok(product.price > 0, product.name);
    assert.doesNotMatch(product.name, /seminuev|reacondicionad|usado/i);
    assert.equal(product.currency, 'GTQ', product.name);
    assert.ok(existsSync(new URL('../public/' + product.image.replace(/^\/+/, ''), import.meta.url)), product.name);
    assert.equal(new URL(product.sourceUrl).protocol, 'https:');
  }
});
test('phones and computers have at least two choices in every required tier', () => {
  for (const category of ['Celulares', 'Computadoras']) {
    for (const gama of ['Baja', 'Media', 'Alta']) {
      assert.ok(products.filter(p => p.category === category && p.gama === gama).length >= 2, `${category}: ${gama}`);
    }
  }
});
test('AI subscription conversion keeps monthly billing and does not invent scores', () => {
  const ai = products.filter(p => p.category === 'Inteligencia artificial');
  assert.equal(ai.length, 2);
  for (const p of ai) {
    assert.equal(p.originalCurrency, 'USD');
    assert.equal(p.originalPrice, 20);
    assert.equal(p.price, 152.75);
    assert.match(formatPrice(p), /\/mes$/);
  }
  const result = generateConclusion(...ai);
  assert.equal(result.winner, null);
  assert.equal(result.scoreA, null);
  assert.match(result.reason, /ChatGPT Plus/);
  const newPCs = products.filter(p => p.category === 'Computadoras' && p.gama === 'Alta');
  assert.equal(generateConclusion(...newPCs).scoreA, null);
  assert.equal(generateConclusion(...newPCs).winner, null);
});
