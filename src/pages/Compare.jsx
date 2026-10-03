import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/catalog';
import { Link } from 'react-router-dom';
import { X, Trophy, AlertTriangle, ArrowLeft } from 'lucide-react';
import { generateConclusion } from '../utils/compareLogic';
import CompareTable from '../components/CompareTable';
import { useState } from 'react';

const Compare = ({ compareList, removeCompare }) => {
  const [priority, setPriority] = useState('balanced');
  if (compareList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
          <Trophy className="w-10 h-10 text-muted" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Aún no has seleccionado productos</h2>
        <p className="text-muted mb-8 max-w-md mx-auto text-lg">
          Ve a la página de productos y selecciona al menos dos productos de la misma categoría para comparar sus especificaciones.
        </p>
        <Link to="/products" className="btn btn-primary px-8 py-3 text-lg">Ir al catálogo</Link>
      </div>
    );
  }

  const prodA = compareList[0];
  const prodB = compareList.length > 1 ? compareList[1] : null;

  const categoryMismatch = prodB && prodA.category !== prodB.category;
  let conclusion = null;
  if (prodB && !categoryMismatch) {
    conclusion = generateConclusion(prodA, prodB, priority);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Link to="/products" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Volver a productos
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Análisis Comparativo</h1>
          <p className="text-muted text-lg">Compara especificaciones técnicas detalladas y toma la mejor decisión.</p>
        </div>
        
        {prodB && !categoryMismatch && (
          <button 
            onClick={() => window.print()}
            className="btn btn-outline border-primary/30 text-primary hover:bg-primary/10 hidden md:inline-flex shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
            Exportar / Imprimir Reporte
          </button>
        )}
      </div>

      {categoryMismatch && (
        <div className="bg-danger/10 border border-danger/30 text-danger p-4 rounded-xl mb-8 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Categorías incompatibles</p>
            <p className="text-sm mt-1 text-danger/80">Estás intentando comparar un <strong>{prodA.category}</strong> con un <strong>{prodB.category}</strong>. Las características técnicas no coinciden para una comparación directa.</p>
          </div>
        </div>
      )}

      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
        {/* VS Badge */}
        {prodB && (
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan-500 text-white font-black text-xl items-center justify-center border-4 border-background shadow-xl shadow-primary/20">
            VS
          </div>
        )}

        {/* Product A */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 relative group">
          <button 
            className="absolute top-4 right-4 text-muted hover:text-danger bg-background/50 hover:bg-background p-2 rounded-full transition-colors z-10"
            onClick={() => removeCompare(prodA.id)}
            title="Quitar de la comparación"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="h-64 flex justify-center mb-8 bg-white rounded-xl p-6 relative overflow-hidden">
            <ProductImage product={prodA} className="h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{prodA.brand}</p>
            <h3 className="text-2xl font-bold mb-3">{prodA.name}</h3>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">{formatPrice(prodA)}</p>
          </div>
        </div>

        {/* Product B or Empty State */}
        {prodB ? (
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 relative group">
            <button 
              className="absolute top-4 right-4 text-muted hover:text-danger bg-background/50 hover:bg-background p-2 rounded-full transition-colors z-10"
              onClick={() => removeCompare(prodB.id)}
              title="Quitar de la comparación"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 flex justify-center mb-8 bg-white rounded-xl p-6 relative overflow-hidden">
              <ProductImage product={prodB} className="h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">{prodB.brand}</p>
              <h3 className="text-2xl font-bold mb-3">{prodB.name}</h3>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">{formatPrice(prodB)}</p>
            </div>
          </div>
        ) : (
          <div className="bg-card/50 rounded-2xl border-2 border-dashed border-border p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-3">Añade tu segundo producto</h3>
            <p className="text-muted mb-8 max-w-sm">Selecciona un producto similar de la categoría <strong>{prodA.category}</strong> para comparar sus características lado a lado.</p>
            <Link to="/products" className="btn btn-outline px-6 py-3">Explorar catálogo</Link>
          </div>
        )}
      </div>

      {/* Comparison Body */}
      {prodB && !categoryMismatch && (
        <div className="space-y-16">
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Lo que cambia entre estos modelos</h2>
              <label className="text-sm text-muted">Tu prioridad
                <select value={priority} onChange={e => setPriority(e.target.value)} className="ml-3 bg-card border border-border rounded-xl p-3 text-white">
                  <option value="balanced">Comparación general</option>
                  <option value="budget">Ahorrar dinero</option>
                  {conclusion.rows.filter(row => row.comparable).map(row => <option key={row.key} value={`metric:${row.key}`}>{row.key}: {row.direction === 'lower' ? 'menor' : 'mayor'} valor</option>)}
                </select>
              </label>
            </div>
            <div className="bg-card border border-primary/30 rounded-2xl p-6">
              <h3 className="font-bold text-primary mb-2">Diferencia de precio</h3>
              <p className="text-muted leading-relaxed">{conclusion.priceText}</p>
              {conclusion.unitPrices && <p className="text-sm text-muted mt-3">Precio por GB: {prodA.name}, {formatPrice({price: conclusion.unitPrices.a, currency: 'GTQ'})}; {prodB.name}, {formatPrice({price: conclusion.unitPrices.b, currency: 'GTQ'})}. Este cálculo compara espacio y costo.</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {conclusion.technical.map(item => <article key={item.title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.detail}</p>
                {item.meaning && <p className="text-sm leading-relaxed mt-3">{item.meaning}</p>}
              </article>)}
            </div>
            {conclusion.notes.length > 0 && <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="font-bold mb-3">Compatibilidad y uso</h3>
              <ul className="space-y-3 text-sm text-muted leading-relaxed">{conclusion.notes.map(note => <li key={note}>{note}</li>)}</ul>
              {['Memoria RAM', 'SSD'].includes(prodA.category) && <a href={prodA.category === 'SSD' ? 'https://www.kingston.com/en/ssd/ssd-faq' : 'https://media.kingston.com/kingston/pdf/ktc-blog-pc-performance-upgrade-vs-replace-ebook-us.pdf'} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline inline-block mt-4">Guía de compatibilidad de Kingston</a>}
            </div>}
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-cyan-500/10 rounded-lg"><Trophy className="w-6 h-6 text-cyan-400" /></div>
              <h2 className="text-2xl font-bold">Especificaciones Técnicas</h2>
            </div>
            <CompareTable prodA={prodA} prodB={prodB} />
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-br from-card to-background border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Trophy className="w-64 h-64" />
            </div>
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-primary uppercase tracking-widest">
              Veredicto Final
            </h2>
            
            {conclusion.winner ? (
              <div className="relative z-10">
                <p className="text-muted text-lg mb-2">Para la prioridad elegida:</p>
                <p className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{conclusion.winner.name}</p>
                <div className="w-16 h-1 bg-primary mb-6 rounded-full" />
                <p className="text-xl text-muted/90 leading-relaxed max-w-3xl">{conclusion.reason}</p>
              </div>
            ) : (
              <div className="relative z-10">
                <p className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{conclusion.title || 'Elige según tus necesidades'}</p>
                <div className="w-16 h-1 bg-primary mb-6 rounded-full" />
                <p className="text-xl text-muted/90 leading-relaxed max-w-3xl">{conclusion.reason}</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Compare;
