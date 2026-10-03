import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { products, categories } from '../data/mockData';
import { hasPrice, matchesPriceFilter } from '../utils/catalog';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

const Products = ({ toggleCompare, compareList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useSearchParams();
  const selectedCategory = params.get('category') || '';
  const selectedGama = params.get('gama') || '';
  const setSelectedCategory = value => setParams(current => { current.set('category', value); return current; });
  const setSelectedGama = value => setParams(current => { current.set('gama', value); return current; });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand);
    return [...new Set(allBrands)];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchBrand = selectedBrand ? product.brand === selectedBrand : true;
      
      return (!selectedGama || product.gama === selectedGama) && matchSearch && matchCategory && matchBrand && matchesPriceFilter(product, 'GTQ', minPrice, maxPrice);
    });
  }, [searchTerm, selectedCategory, selectedGama, selectedBrand, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-card p-6 rounded-2xl border border-border sticky top-28">
          <div className="flex items-center gap-3 mb-8 border-b border-border/50 pb-6">
            <div className="p-2 bg-primary/10 rounded-lg"><SlidersHorizontal className="w-5 h-5 text-primary" /></div>
            <h2 className="text-xl font-bold">Filtros</h2>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-3">Categoría</label>
              <select 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gama" className="block text-xs font-bold text-muted uppercase tracking-wider mb-3">Gama</label>
              <select id="gama" value={selectedGama} onChange={e => setSelectedGama(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white">
                <option value="">Todas las gamas</option>
                {['Baja', 'Media', 'Alta'].map(gama => <option key={gama}>{gama}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-3">Marca</label>
              <select 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Todas las marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-3">Rango de precio (Q)</label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  placeholder="Mínimo" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="text-muted">-</span>
                <input 
                  type="number" 
                  placeholder="Máximo" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              className="w-full btn bg-background hover:bg-background/80 text-muted hover:text-white border border-border/50 py-3"
              onClick={() => {
                setSearchTerm('');
                setParams({});
                setSelectedBrand('');
                setMinPrice('');
                setMaxPrice('');
              }}
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="relative mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-muted group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="w-full bg-card border-2 border-border rounded-2xl py-5 pl-14 pr-6 text-lg text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
            placeholder="Buscar por nombre, marca, modelo o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <p className="text-sm text-muted mb-6">{products.filter(hasPrice).length} productos con precios en quetzales. Los importes de otras monedas se convierten con la tasa consultada el 2 de octubre de 2026; no incluyen envío ni importación. Consulta las condiciones y el precio vigente en la tienda. Tipo de cambio: <a className="underline" href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">ExchangeRate-API</a>.</p>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between pb-4 border-b border-border/50">
          <p className="text-muted text-sm font-medium">Mostrando <span className="text-white font-bold">{filteredProducts.length}</span> resultados</p>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                toggleCompare={toggleCompare} 
                isCompared={!!compareList.find(p => p.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-2xl border border-dashed border-border flex flex-col items-center">
            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
              <Filter className="w-10 h-10 text-muted" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No hay resultados</h3>
            <p className="text-muted text-lg max-w-sm">No encontramos productos que coincidan con tu búsqueda. Intenta usar otros términos o elimina los filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
