import { useState } from 'react';

export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!product.image || failed) {
    return (
        <span className="text-slate-500 text-sm text-center">
        Fotografía pendiente de verificar
        <br />
          {product.name}
      </span>
    );
  }

  // Si la imagen es externa, utiliza la URL directamente.
  // Si es una imagen local, agrega automáticamente la ruta base de Vite.
  const imageUrl =
      product.image.startsWith('http://') ||
      product.image.startsWith('https://')
          ? product.image
          : `${import.meta.env.BASE_URL}${product.image.replace(/^\/+/, '')}`;

  return (
      <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={className}
          onError={() => setFailed(true)}
      />
  );
}