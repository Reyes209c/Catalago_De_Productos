import ProductImage from './ProductImage';
import { formatPrice, hasPrice } from '../utils/catalog';
import { ShoppingCart, Calendar, CheckSquare, Square, Info } from 'lucide-react';

const ProductCard = ({ product, toggleCompare, isCompared }) => {
  return (
    <div className="card-hover bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-full relative group">
      {/* Badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10 pointer-events-none">
        {product.demo && (
          <span className="bg-danger/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-danger/50 uppercase tracking-wider">
            Demo
          </span>
        )}
        {product.gama && (
          <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-primary/50 uppercase tracking-wider ml-auto">
            {product.gama}
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-white p-6 flex items-center justify-center border-b border-border">
        <ProductImage
          product={product} 
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-2">
          {product.brand} <span className="text-muted mx-1">•</span> {product.category}
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-4 text-white flex-1">{product.name}</h3>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
            {formatPrice(product)}
          </span>
        </div>
        
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-muted bg-background/50 py-1.5 px-3 rounded-lg border border-border/50">
            <ShoppingCart className="w-3.5 h-3.5 text-primary" />
            <span>Tienda: <strong className="text-white">{product.source}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted bg-background/50 py-1.5 px-3 rounded-lg border border-border/50">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Actualizado: {product.updatedAt}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline py-2.5 text-xs">
            <Info className="w-4 h-4" />
            {hasPrice(product) ? 'Ver en tienda' : 'Buscar en Pacifiko'}
          </a>
          <button 
            className={`btn py-2.5 text-xs ${isCompared ? 'bg-success text-white border-transparent' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'}`}
            onClick={() => toggleCompare(product)}
          >
            {isCompared ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
            {isCompared ? 'Añadido' : 'Comparar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
