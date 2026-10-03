import { hasPrice, formatPrice } from './catalog.js';
export const calculateScore = (specs, price) => {
  if (!['Rendimiento', 'Calidad', 'Relación calidad/precio'].every(key => Number.isFinite(specs[key]))) return null;
  // Existing editorial scores are shown only when all metrics are present.
  const perf = specs.Rendimiento || 50;
  const qual = specs.Calidad || 50;
  const val = specs["Relación calidad/precio"] || 50;
  return Math.round((perf * 0.4) + (qual * 0.3) + (val * 0.3));
};

export const generateConclusion = (productA, productB) => {
  const scoreA = calculateScore(productA.specs, productA.price);
  const scoreB = calculateScore(productB.specs, productB.price);
  
  if (productA.category === 'Inteligencia artificial' && productB.category === 'Inteligencia artificial') {
    return { winner: null, title: 'Elige según tu tarea', scoreA, scoreB,
      reason: 'ChatGPT Plus reúne análisis de datos, ayuda para estudiar y generación de imágenes. Claude Pro ofrece proyectos, trabajo con documentos y Claude Code. Ambos planes mensuales cuestan lo mismo en este catálogo; elige según las herramientas que usarás y sus límites de uso.' };
  }
  if (!hasPrice(productA) || !hasPrice(productB) || productA.currency !== productB.currency) {
    return { winner: null, title: 'Elige por sus características', reason: 'Compara capacidad, conexiones y funciones en la tabla para elegir el modelo que mejor se adapta a tus tareas.', scoreA, scoreB };
  }
  const difference = Math.abs(productA.price - productB.price);
  const diffPrice = formatPrice({ price: difference, currency: productA.currency });
  if (scoreA === null || scoreB === null) {
    const cheaper = productA.price <= productB.price ? productA : productB;
    return { winner: null, title: difference ? 'La opción de menor precio' : 'Mismo precio', scoreA, scoreB,
      reason: difference
        ? `${cheaper.name} cuesta ${diffPrice} menos. Si tu prioridad es el presupuesto, es la opción más económica; revisa en la tabla qué capacidad y funciones ofrece cada modelo.`
        : 'Ambos tienen el mismo precio. Elige según la capacidad, las conexiones y las funciones que necesitas.' };
  }
  if (difference === 0 && scoreA === scoreB) return { winner: null, title: 'Dos opciones equilibradas', reason: 'Ambos tienen el mismo precio y puntuación orientativa. Las diferencias de capacidad, conexiones y funciones de la tabla te ayudarán a elegir.', scoreA, scoreB };
  
  let winner = null;
  let reason = "";

  if (scoreA > scoreB) {
    winner = productA;
    if (productA.price < productB.price) {
      reason = `Presenta un precio menor por ${diffPrice} y obtiene una mayor puntuación orientativa en el catálogo. Es una alternativa adecuada para usuarios que buscan una excelente relación entre precio y características.`;
    } else {
      reason = `Aunque es más costoso por ${diffPrice}, obtiene una mayor puntuación orientativa en el catálogo. Valora si sus características adicionales son útiles para tus tareas.`;
    }
  } else if (scoreB > scoreA) {
    winner = productB;
    if (productB.price < productA.price) {
      reason = `Presenta un precio menor por ${diffPrice} y obtiene una mayor puntuación orientativa en el catálogo. Es una alternativa adecuada para usuarios que buscan una excelente relación entre precio y características.`;
    } else {
      reason = `Aunque es más costoso por ${diffPrice}, obtiene una mayor puntuación orientativa en el catálogo. Valora si sus características adicionales son útiles para tus tareas.`;
    }
  } else {
    // Tie
    if (productA.price < productB.price) {
      winner = productA;
      reason = `Ambos tienen la misma puntuación orientativa, y ${productA.name} es más económico por ${diffPrice}.`;
    } else {
      winner = productB;
      reason = `Ambos tienen la misma puntuación orientativa, y ${productB.name} es más económico por ${diffPrice}.`;
    }
  }
  
  return { winner, reason, scoreA, scoreB };
};
