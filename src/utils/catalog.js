export const hasPrice = product =>
    Number.isFinite(product.price) && product.price > 0;

export const formatPrice = product =>
    hasPrice(product)
        ? new Intl.NumberFormat('es-GT', {
          style: 'currency',
          currency: product.currency || 'GTQ',
          currencyDisplay:
              product.currency && product.currency !== 'GTQ' ? 'code' : 'symbol',
          minimumFractionDigits: 2
        }).format(product.price) +
        (product.billingPeriod === 'month' ? '/mes' : '')
        : 'Precio por confirmar';

export const matchesPriceFilter = (product, currency, min, max) => {
  const selected =
      currency || ((min !== '' || max !== '') ? 'GTQ' : '');

  return (
      (!selected || product.currency === selected) &&
      (min === '' ||
          (hasPrice(product) && product.price >= Number(min))) &&
      (max === '' ||
          (hasPrice(product) && product.price <= Number(max)))
  );
};

export const convertToQuetzales = (product, exchange) => {
  if (!hasPrice(product) || product.currency === 'GTQ') {
    return product;
  }

  const rate = exchange.rates[product.currency];

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error(`Falta tasa para ${product.currency}`);
  }

  return {
    ...product,
    originalPrice: product.price,
    originalCurrency: product.currency,
    price: Math.round((product.price / rate) * 100) / 100,
    currency: 'GTQ',
    exchangeRate: 1 / rate,
    exchangeUpdatedAt: exchange.time_last_update_utc
  };
};

// Oculta indicadores de condición en el nombre mostrado.
export const productDisplayName = name =>
    name
        .replace(
            /\s*\((?:seminuev[oa]s?|usad[oa]s?|reacondicionad[oa]s?)\)/gi,
            ''
        )
        .trim();