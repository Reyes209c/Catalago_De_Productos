import { hasPrice, formatPrice } from './catalog.js';

const hidden = new Set(['Estado', 'Condición', 'Rendimiento', 'Calidad', 'Relación calidad/precio', 'Ventajas', 'Desventajas']);
const metric = (key, kind, meaning, direction = 'higher', aliases = []) => ({ key, kind, meaning, direction, aliases });
const capacity = metric('Capacidad', 'storage', 'Más espacio para guardar datos.');
const ram = metric('RAM', 'storage', 'Más memoria para mantener aplicaciones y archivos abiertos.');
const storage = metric('Almacenamiento', 'storage', 'Más espacio para aplicaciones, juegos y archivos.');
const battery = metric('Batería', 'mah', 'Mayor capacidad nominal; la autonomía también depende del consumo.');
const screen = metric('Pantalla', 'inches', 'Una pantalla más grande ofrece más superficie; una más pequeña favorece la portabilidad.');
const profiles = {
  'Procesadores (CPU)': [metric('Núcleos', 'count', 'Más núcleos pueden ayudar en cargas paralelas; la arquitectura también importa.'), metric('Hilos', 'count', 'Más hilos permiten atender más tareas simultáneas.'), metric('Frec. máxima', 'frequency', 'Frecuencia máxima publicada; por sí sola no determina qué procesador es más rápido.'), metric('TDP', 'watts', 'Potencia térmica declarada para dimensionar la refrigeración; no es una medición de consumo.', 'lower')],
  'Tarjetas gráficas (GPU)': [metric('VRAM', 'storage', 'Más memoria gráfica permite alojar texturas y modelos más grandes; no equivale a más FPS.'), metric('Consumo', 'watts', 'Menor potencia declarada reduce la exigencia de alimentación.', 'lower')],
  'Memoria RAM': [capacity, metric('Velocidad', 'frequency', 'Mayor velocidad nominal; depende de la plataforma, latencia y configuración.')],
  SSD: [capacity, metric('Vel. Lectura', 'speed', 'Mayor lectura secuencial declarada para transferir archivos grandes.'), metric('Vel. Escritura', 'speed', 'Mayor escritura secuencial declarada para copiar o exportar archivos grandes.')],
  'Discos duros HDD': [capacity, metric('Velocidad', 'rpm', 'Velocidad de giro declarada; no representa por sí sola la velocidad de transferencia.')],
  'Tarjetas SD': [capacity, metric('Lectura', 'speed', 'Velocidad de lectura declarada.', 'higher', ['Vel. Lectura', 'Lectura anunciada'])],
  'Computadoras': [ram, storage, screen],
  Celulares: [ram, storage, battery, screen],
  Tablets: [storage, battery, screen],
  'Monitores/Pantallas': [metric('Hz', 'hz', 'Mayor frecuencia de actualización permite mostrar más cuadros por segundo.', 'higher', ['Frecuencia']), metric('Tamaño', 'inches', 'Más superficie de trabajo; considera el espacio de tu escritorio.')],
  Mouse: [metric('Peso', 'grams', 'Menor peso puede facilitar movimientos rápidos; la comodidad depende de tu agarre.', 'lower')],
  Sillas: [metric('Carga máxima', 'kg', 'Límite de peso declarado por el fabricante.', 'higher', ['Peso máximo', 'Capacidad'])],
  Cañoneras: [metric('Brillo', 'lumens', 'Mayor brillo declarado; compara también la resolución y las condiciones del salón.')],
  Impresoras: [metric('Velocidad', 'ppm', 'Más páginas por minuto en la modalidad indicada.')],
  Fotocopiadoras: [metric('Velocidad', 'ppm', 'Más páginas por minuto en la modalidad indicada.', 'higher', ['Velocidad anunciada', 'Velocidad de copia'])],
  Scanners: [metric('Alimentador', 'sheets', 'Mayor capacidad para escanear lotes de documentos.'), metric('Resolución óptica', 'dpi', 'Mayor detalle de captura; no implica mayor velocidad.')],
  Plotters: [metric('Ancho máximo', 'inches', 'Permite imprimir planos y diseños de mayor ancho.')],
  SmartWatch: [screen],
  Consolas: [storage],
};

export const normalizeText = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
export const parseMetric = (value, kind) => {
  const text = String(value ?? '').replace(/(\d),(?=\d{3}(?:\D|$))/g, '$1').replace(/,/g, '.');
  const patterns = {
    storage: /(\d+(?:\.\d+)?)\s*(TB|GB|MB)\b/i,
    frequency: /(\d+(?:\.\d+)?)\s*(GHz|MHz|MT\/s)\b/i,
    speed: /(\d+(?:\.\d+)?)\s*(GB\/s|MB\/s)\b/i,
    mah: /(\d+(?:\.\d+)?)\s*mAh\b/i,
    watts: /(\d+(?:\.\d+)?)\s*W\b/i,
    hz: /(\d+(?:\.\d+)?)\s*Hz\b/i,
    inches: /(\d+(?:\.\d+)?)\s*(?:["″]|pulgadas?)/i,
    ppm: /(\d+(?:\.\d+)?)\s*(ppm|ipm)\b/i,
    lumens: /(\d+(?:\.\d+)?)\s*(?:lm|lumenes|lúmenes)\b/i,
    grams: /(\d+(?:\.\d+)?)\s*g\b/i,
    kg: /(\d+(?:\.\d+)?)\s*kg\b/i,
    rpm: /(\d+(?:\.\d+)?)\s*rpm\b/i,
    sheets: /(\d+(?:\.\d+)?)\s*hojas\b/i,
    dpi: /(\d+(?:\.\d+)?)\s*(?:ppp|dpi)\b/i,
    count: /^\s*(\d+)\s*$/,
  };
  const match = text.match(patterns[kind]);
  if (!match) return null;
  let number = Number(match[1]);
  const unit = match[2]?.toLowerCase();
  if (kind === 'storage') number *= unit === 'tb' ? 1000 : unit === 'mb' ? 0.001 : 1;
  if (kind === 'frequency' && unit === 'ghz') number *= 1000;
  if (kind === 'speed' && unit === 'gb/s') number *= 1000;
  return { number, unit: kind === 'ppm' ? unit : kind === 'frequency' && unit === 'mt/s' ? 'mt/s' : kind };
};

const explanations = {
  Socket: 'Debe coincidir con la plataforma del procesador y la placa.',
  Interfaz: 'Determina la conexión y el protocolo que debe admitir el equipo.',
  Tipo: 'Identifica la tecnología o el formato de este producto.',
  Formato: 'Comprueba las dimensiones y el tipo de equipo donde lo utilizarás.',
  Memoria: 'El tipo de RAM debe ser compatible con la placa y el procesador.',
  Chipset: 'Identifica la plataforma de la placa; compara sus conexiones y compatibilidad.',
  Resolución: 'Define el detalle de imagen; considera el tamaño, la distancia de uso y el contenido.',
  Panel: 'La tecnología de pantalla influye en la imagen y los ángulos de visión.',
  Procesador: 'El modelo identifica la plataforma; su velocidad real depende de la tarea y de pruebas comparables.',
  Gráficos: 'Revisa el modelo para el software y los juegos que utilizarás.',
  Conexión: 'Debe ser compatible con los puertos del equipo donde lo conectarás.',
  Conectividad: 'Comprueba qué conexiones necesita tu instalación.',
  Funciones: 'Elige las tareas que necesitas realizar: imprimir, copiar o escanear.',
  Switches: 'El mecanismo de las teclas influye en la sensación y el sonido al escribir.',
  Inalámbrico: 'Permite trabajar sin cable; verifica conexión y alimentación.',
  Material: 'Valora la comodidad y el mantenimiento en tu espacio de trabajo.',
  'Soporte Lumbar': 'Compara el apoyo y la posibilidad de ajustarlo a tu postura.',
  'Patrón polar': 'Describe desde qué direcciones recoge sonido el micrófono.',
  'Pines I/O': 'Comprueba que dispone de suficientes entradas y salidas para tu circuito.',
  Voltaje: 'Verifica que el circuito y sus periféricos usan niveles compatibles.',
  'Sistema operativo': 'Comprueba que permite ejecutar tus aplicaciones.',
  Modalidad: 'Compara las condiciones de conexión del teléfono a la red del operador.',
};

export const getComparisonRows = (a, b) => {
  const definitions = profiles[a.category] || [];
  const keys = [...new Set([...definitions.map(d => d.key), ...Object.keys(a.specs), ...Object.keys(b.specs)])];
  const aliases = new Set(definitions.flatMap(d => d.aliases));
  return keys.filter(key => !hidden.has(key) && !aliases.has(key)).map(key => {
    const definition = definitions.find(d => d.key === key);
    const value = p => [key, ...(definition?.aliases || [])].map(k => p.specs[k]).find(v => v !== undefined && v !== null && v !== '');
    const valueA = value(a), valueB = value(b);
    if (valueA === undefined && valueB === undefined) return null;
    const parsedA = definition && parseMetric(valueA, definition.kind), parsedB = definition && parseMetric(valueB, definition.kind);
    const comparable = parsedA && parsedB && parsedA.unit === parsedB.unit;
    let advantage = null;
    if (comparable && parsedA.number !== parsedB.number) {
      const aHigher = parsedA.number > parsedB.number;
      advantage = (definition.direction === 'lower' ? !aHigher : aHigher) ? 'a' : 'b';
    }
    return { key, valueA: valueA ?? 'No especificado', valueB: valueB ?? 'No especificado',
      different: normalizeText(valueA) !== normalizeText(valueB), missing: valueA === undefined || valueB === undefined,
      meaning: definition?.meaning || explanations[key] || '', comparable: Boolean(comparable), advantage,
      numericA: parsedA?.number, numericB: parsedB?.number,
      kind: definition?.kind, direction: definition?.direction };
  }).filter(Boolean);
};

const compatibilityNotes = (a, b) => {
  const notes = [];
  const distinct = key => a.specs[key] && b.specs[key] && normalizeText(a.specs[key]) !== normalizeText(b.specs[key]);
  if (['Procesadores (CPU)', 'Tarjetas madre'].includes(a.category)) {
    if (distinct('Socket')) notes.push(`Usan sockets diferentes: ${a.specs.Socket} y ${b.specs.Socket}. Elige el que corresponde a tu plataforma y verifica la lista de procesadores compatibles y la BIOS de la placa.`);
    else if (a.specs.Socket) notes.push(`Ambos indican socket ${a.specs.Socket}. Confirma el modelo de placa y su BIOS antes de elegir.`);
  }
  if (a.category === 'Memoria RAM') notes.push(distinct('Tipo')
    ? `Los módulos son ${a.specs.Tipo} y ${b.specs.Tipo}. DDR4 y DDR5 requieren placas compatibles con su tipo; no son intercambiables.`
    : `Confirma el tipo de memoria, formato del módulo y velocidad admitida por tu placa. La capacidad y la velocidad son criterios distintos.`);
  if (a.category === 'SSD') notes.push(`Interfaces publicadas: ${a.specs.Interfaz || 'no especificada'} y ${b.specs.Interfaz || 'no especificada'}. Comprueba que la ranura admite el protocolo y formato del SSD; las velocidades indicadas son secuenciales, no tiempos de carga medidos.`);
  if (a.category === 'Tarjetas gráficas (GPU)') notes.push('Comprueba las dimensiones del gabinete, los conectores y la fuente requerida por cada tarjeta. La VRAM y la potencia declarada no bastan para predecir FPS; para eso se necesitan pruebas del mismo juego y resolución.');
  if (a.category === 'Computadoras') notes.push(`Procesadores: ${a.specs.Procesador || 'no especificado'} y ${b.specs.Procesador || 'no especificado'}. Gráficos: ${a.specs.Gráficos || 'no especificados'} y ${b.specs.Gráficos || 'no especificados'}. Más RAM o almacenamiento no demuestra por sí solo mayor velocidad del procesador o de los gráficos.`);
  const useNotes = {
    'Tarjetas madre': 'Compara también el formato, el tipo de memoria y los puertos que necesitas; un chipset con otro nombre no demuestra mayor velocidad.',
    'Gabinetes/Cajas': 'Elige por el formato de la placa, espacio de los componentes y ventilación. Verifica medidas de GPU y disipador.',
    Teclados: 'Para escribir, prioriza distribución, idioma y switches. Para llevarlo contigo, compara formato y conexión.',
    Mouse: 'Elige según tamaño, agarre, peso y botones. Un DPI máximo mayor no significa más precisión.',
    Auriculares: 'Prioriza comodidad, conexión y micrófono para tu uso. Las etiquetas de sonido espacial no permiten evaluar la calidad de audio por sí solas.',
    Sillas: 'Prioriza ajustes y apoyo lumbar, además de la capacidad y las dimensiones adecuadas para ti.',
    Celulares: 'Para multitarea compara RAM; para archivos compara almacenamiento. La autonomía y la calidad de cámara requieren más datos que mAh y megapíxeles.',
    Tablets: 'Para estudio revisa pantalla y compatibilidad de aplicaciones; para guardar contenido compara almacenamiento. La capacidad de batería no basta para medir autonomía.',
    Consolas: 'Elige según el catálogo de juegos, controles y posibilidad de uso portátil. La resolución máxima no garantiza la misma resolución en todos los juegos.',
    Microcontroladores: 'Elige según entradas y salidas, voltaje, conectividad y software del proyecto. Una placa de desarrollo y una computadora de placa única cumplen funciones diferentes.',
    Impresoras: 'Compara tecnología, color, dúplex y funciones según tus documentos. Para uso frecuente, revisa también costo y rendimiento de tinta o tóner.',
    Fotocopiadoras: 'Prioriza velocidad de copia, manejo de papel y funciones. El costo por página requiere precio y rendimiento de consumibles.',
    'Discos duros HDD': 'Revisa capacidad y uso declarado: escritorio, vigilancia o NAS. Para instalaciones internas y externas se necesitan conexiones distintas.',
    'Tarjetas SD': 'Comprueba formato, clase de velocidad y compatibilidad con tu cámara o dispositivo; una velocidad máxima de lectura no demuestra la velocidad sostenida de grabación.',
    Micrófonos: 'Elige conexión, tipo y patrón polar según grabación, videollamadas o movilidad. Comprueba que el receptor funciona con tu dispositivo.',
    SmartWatch: 'Prioriza pantalla, compatibilidad con el teléfono y funciones que usarás. La autonomía anunciada depende de la configuración.',
    Cañoneras: 'Compara brillo, resolución y conexiones para tu salón. Verifica distancia de proyección y tamaño de imagen.',
    Scanners: 'Para fotos compara resolución óptica; para muchos documentos prioriza alimentador y escaneo dúplex.',
    Plotters: 'Elige el ancho de impresión según tus planos y revisa conexiones y consumibles para tu volumen de trabajo.',
    'Monitores/Pantallas': 'Para juegos compara frecuencia y resolución; para trabajo considera tamaño, panel y conexiones. Revisa que tu equipo pueda alimentar la resolución y frecuencia elegidas.',
  };
  if (useNotes[a.category]) notes.push(useNotes[a.category]);
  return notes;
};

export const generateConclusion = (a, b, priority = 'balanced') => {
  const rows = getComparisonRows(a, b);
  const sameCategory = a.category === b.category;
  const validPrices = sameCategory && hasPrice(a) && hasPrice(b) && a.currency === b.currency && a.billingPeriod === b.billingPeriod;
  const difference = validPrices ? Math.abs(a.price - b.price) : null;
  const cheaper = validPrices && difference > 0 ? (a.price < b.price ? a : b) : null;
  const priceText = validPrices ? difference ? `${cheaper.name} cuesta ${formatPrice({price: difference, currency: a.currency})} menos. La otra opción cuesta ${(difference / cheaper.price * 100).toFixed(1)}% más.` : 'Ambos tienen el mismo precio publicado.' : 'El precio no permite calcular una diferencia directa; compara las características publicadas.';
  const advantages = side => rows.filter(r => r.advantage === side);
  const aAdvantages = advantages('a'), bAdvantages = advantages('b');
  const primary = priority.startsWith('metric:')
    ? rows.find(r => r.comparable && r.key === priority.slice(7))
    : rows.find(r => r.comparable && r.direction !== 'lower');
  const technical = rows.filter(r => r.different && !r.missing).slice(0, 4).map(r => ({ title: r.key,
    detail: `${a.name}: ${r.valueA}. ${b.name}: ${r.valueB}.`, meaning: r.meaning,
    leader: r.advantage === 'a' ? a.name : r.advantage === 'b' ? b.name : null }));
  let title = 'Elige según tu uso', reason = '', winner = null;
  if (!sameCategory) {
    title = 'Selecciona la misma categoría'; reason = 'Elige dos productos de la misma categoría para comparar sus características.';
  } else if (a.category === 'Inteligencia artificial') {
    reason = 'ChatGPT Plus reúne análisis de datos y generación de imágenes. Claude Pro ofrece proyectos, trabajo con documentos y Claude Code. Para contenido visual y tareas generales, considera ChatGPT; para trabajar con proyectos y código, considera Claude. Revisa las herramientas y límites de cada plan.';
  } else if (priority === 'budget' && cheaper) {
    winner = cheaper; title = 'Para ahorrar'; reason = `${priceText} Es la elección por presupuesto. ${rows.filter(r => r.advantage === (cheaper === a ? 'b' : 'a')).map(r => `La otra opción ofrece ${r.key.toLowerCase()}: ${cheaper === a ? r.valueB : r.valueA} frente a ${cheaper === a ? r.valueA : r.valueB}.`).slice(0, 2).join(' ') || 'Consulta las diferencias de funciones y compatibilidad antes de elegir.'}`;
  } else if ((priority === 'capacity' || priority.startsWith('metric:')) && primary?.advantage) {
    winner = primary.advantage === 'a' ? a : b; title = `Prioridad: ${primary.key.toLowerCase()}`;
    reason = `${winner.name} ofrece ${primary.advantage === 'a' ? primary.valueA : primary.valueB}, frente a ${primary.advantage === 'a' ? primary.valueB : primary.valueA} de la otra opción. ${primary.meaning} ${priceText}`;
  } else {
    const describe = (p, list) => list.length ? `${p.name} destaca en ${list.map(r => `${r.key.toLowerCase()} (${p === a ? r.valueA : r.valueB})`).slice(0, 3).join(', ')}.` : '';
    reason = [describe(a, aAdvantages), describe(b, bAdvantages), priceText].filter(Boolean).join(' ');
    if (!aAdvantages.length && !bAdvantages.length) reason += ' Decide por las funciones y la compatibilidad descritas en las diferencias principales.';
    else {
      const leading = rows.find(r => r.advantage && r.direction !== 'lower');
      if (leading) reason += ` Si priorizas ${leading.key.toLowerCase()}, elige ${leading.advantage === 'a' ? a.name : b.name}.`;
      if (cheaper) reason += ` Para gastar menos, elige ${cheaper.name}.`;
    }
  }
  const cap = rows.find(r => r.kind === 'storage' && r.key === 'Capacidad' && r.comparable);
  const unitPrices = cap && validPrices ? { a: a.price / cap.numericA, b: b.price / cap.numericB } : null;
  return { title, reason, winner, scoreA: null, scoreB: null, rows, technical,
    notes: compatibilityNotes(a, b), priceText, difference, cheaper, primary, unitPrices };
};
