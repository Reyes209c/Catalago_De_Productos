import { useState } from 'react';

export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!product.image || failed) {
    return <span className="text-slate-500 text-sm text-center">Fotografía pendiente de verificar<br />{product.name}</span>;
  }
  return <img src={product.image} alt={product.name} loading="lazy" decoding="async" className={className} onError={() => setFailed(true)} />;
}
