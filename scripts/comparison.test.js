import test from 'node:test';
import assert from 'node:assert/strict';
import { generateConclusion, getComparisonRows, parseMetric } from '../src/utils/compareLogic.js';
const p = (name, category, price, specs) => ({name, category, price, currency:'GTQ', specs});
test('capacity conversion, mixed units and missing data are handled without invented values', () => {
  assert.equal(parseMetric('2TB', 'storage').number, 2000);
  assert.equal(parseMetric('5,200 MHz', 'frequency').number, 5200);
  assert.equal(parseMetric('3.6GHz', 'frequency').number, 3600);
  assert.equal(parseMetric('Modelo 512', 'storage'), null);
  const a=p('A','Computadoras',100,{RAM:'16 GB',Almacenamiento:'1 TB'});
  const b=p('B','Computadoras',200,{RAM:'32GB',Almacenamiento:'512GB'});
  const rows=getComparisonRows(a,b);
  assert.equal(rows.find(r=>r.key==='RAM').advantage,'b');
  assert.equal(rows.find(r=>r.key==='Almacenamiento').advantage,'a');
  assert.equal(generateConclusion(a,b).winner,null);
  assert.equal(generateConclusion(a,b,'budget').winner.name,'A');
  assert.equal(generateConclusion(a,b,'capacity').winner.name,'B');
});
test('SSD recommendations explain capacity, sequential speed and cost per GB', () => {
  const a=p('A','SSD',1000,{Capacidad:'1TB','Vel. Lectura':'7000 MB/s','Vel. Escritura':'6000 MB/s',Interfaz:'PCIe Gen 4.0'});
  const b=p('B','SSD',1500,{Capacidad:'2TB','Vel. Lectura':'3500 MB/s','Vel. Escritura':'3000 MB/s',Interfaz:'PCIe Gen 3.0'});
  const result=generateConclusion(a,b);
  assert.equal(generateConclusion(a,b,'metric:Vel. Lectura').winner.name,'A');
  assert.equal(result.unitPrices.a,1);
  assert.equal(result.unitPrices.b,.75);
  assert.match(result.reason,/lectura.*7000/i);
  assert.match(result.reason,/capacidad.*2TB/i);
  assert.match(result.priceText,/50.0%/);
  assert.ok(result.notes.some(n=>n.includes('secuenciales')));
});
test('RAM platform differences are explained without a made-up benchmark winner', () => {
  const a=p('A','Memoria RAM',100,{Capacidad:'16GB',Tipo:'DDR4',Velocidad:'3200 MHz',Rendimiento:100});
  const b=p('B','Memoria RAM',200,{Capacidad:'32GB',Tipo:'DDR5',Velocidad:'5200 MHz',Rendimiento:1});
  const result=generateConclusion(a,b);
  assert.equal(result.scoreA,null);
  assert.equal(result.winner,null);
  assert.ok(result.notes.some(n=>n.includes('no son intercambiables')));
  assert.equal(result.rows.some(r=>r.key==='Rendimiento'),false);
});
test('non-equivalent speed units and missing fields do not become numeric advantages', () => {
  const a=p('A','Impresoras',100,{Velocidad:'20 ppm',Funciones:'Imprimir'});
  const b=p('B','Impresoras',150,{Velocidad:'30 ipm'});
  const rows=getComparisonRows(a,b);
  assert.equal(rows.find(r=>r.key==='Velocidad').advantage,null);
  assert.equal(rows.find(r=>r.key==='Funciones').valueB,'No especificado');
});
test('swapping products preserves budget choice and reverses numeric comparisons', () => {
  const a=p('A','Tarjetas gráficas (GPU)',100,{VRAM:'8GB',Consumo:'115W'});
  const b=p('B','Tarjetas gráficas (GPU)',200,{VRAM:'16GB',Consumo:'200W'});
  assert.equal(generateConclusion(b,a,'budget').winner.name,'A');
  assert.equal(getComparisonRows(b,a).find(r=>r.key==='Consumo').advantage,'b');
  assert.ok(generateConclusion(a,b).notes.some(n=>n.includes('FPS')));
});
