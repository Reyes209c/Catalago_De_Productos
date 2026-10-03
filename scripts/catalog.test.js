import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { formatPrice, matchesPriceFilter, convertToQuetzales } from '../src/utils/catalog.js';
import { generateConclusion } from '../src/utils/compareLogic.js';

const base = { price: 100, currency: 'GTQ', priceStatus: 'verified', specs: { Rendimiento: 80, Calidad: 80, 'Relación calidad/precio': 80 }, name: 'A' };
test('foreign amounts retain their currency and do not enter GTQ ranges', () => {
  const usd = { ...base, currency: 'USD' };
  assert.match(formatPrice(usd), /USD/);
  assert.match(formatPrice(base), /Q/);
  assert.equal(matchesPriceFilter(usd, '', '50', '200'), false);
  assert.equal(matchesPriceFilter(usd, 'USD', '50', '200'), true);
  assert.equal(matchesPriceFilter(usd, '', '', ''), true);
  assert.equal(matchesPriceFilter({ ...base, price: null }, '', '0', ''), false);
});
test('incomparable purchases and missing prices do not produce a winner', () => {
  for (const change of [{currency:'USD'}, {price:null}]) {
    assert.equal(generateConclusion(base, {...base, ...change}).winner, null);
  }
  assert.equal(generateConclusion(base, {...base}).winner, null);
});
test('33 additions have traceable prices without overwriting the 47 original records', () => {
  const additions = JSON.parse(readFileSync(new URL('../src/data/additionalOffers.json', import.meta.url)));
  const originals = JSON.parse(readFileSync(new URL('../src/data/verifiedCatalog.json', import.meta.url)));
  assert.equal(Object.keys(additions).length, 33);
  assert.equal(Object.keys(originals).length, 47);
  for (const [id, offer] of Object.entries(additions)) {
    assert.equal(originals[id], undefined);
    assert.ok(offer.price > 0);
    assert.match(offer.currency, /^[A-Z]{3}$/);
    assert.equal(new URL(offer.sourceUrl).protocol, 'https:');
    assert.ok(offer.availability);
    if (offer.availability === 'Agotado') assert.equal(offer.priceStatus, 'reference');
  }
});

test('conversion preserves source amounts and filters the converted GTQ price', () => {
  const result = convertToQuetzales({ ...base, price: 20, currency: 'USD' }, { rates: { USD: 0.125 }, time_last_update_utc: 'test' });
  assert.equal(result.price, 160);
  assert.equal(result.currency, 'GTQ');
  assert.equal(result.originalPrice, 20);
  assert.equal(result.originalCurrency, 'USD');
  assert.equal(matchesPriceFilter(result, 'GTQ', '150', '170'), true);
  assert.throws(() => convertToQuetzales({...base, currency:'USD'}, {rates:{}}));
  assert.equal(convertToQuetzales(base, {rates:{}}).price, 100);
});

test('source status does not block an otherwise comparable catalog verdict', () => {
  const other = {...base, price: 150, name: 'B', condition: 'Usado', priceStatus: 'reference'};
  const conclusion = generateConclusion(base, other, 'budget');
  assert.equal(conclusion.winner.name, 'A');
  assert.doesNotMatch(conclusion.reason, /disponibilidad|estado|equivalente/i);
});
