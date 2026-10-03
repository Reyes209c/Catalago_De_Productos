import { Link } from 'react-router-dom';
import { Search, TrendingUp, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const Home = ({ toggleCompare, compareList, startComparison }) => {
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Plataforma Profesional de Comparación
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Encuentra el producto que <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              realmente te conviene
            </span>
          </h1>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Compara precios, especificaciones técnicas y rendimiento de los mejores productos tecnológicos disponibles en Guatemala. Todo en un solo lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/products" className="btn btn-primary text-lg px-8 py-4 rounded-xl">
              <Search className="w-5 h-5" />
              Explorar Catálogo
            </Link>
            <Link to="/compare" className="btn btn-outline text-lg px-8 py-4 rounded-xl group bg-card">
              <TrendingUp className="w-5 h-5" />
              Ir a Comparaciones
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8 mt-8">
            <div>
              <div className="text-3xl font-black text-white mb-1">{products.length}</div>
              <div className="text-xs text-primary uppercase font-bold tracking-wider">Productos Reales</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">{categories.length}</div>
              <div className="text-xs text-primary uppercase font-bold tracking-wider">Categorías Top</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">Multitienda</div>
              <div className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Guatemala · GTQ</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">2</div>
              <div className="text-xs text-success uppercase font-bold tracking-wider">Comparación técnica</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h2 className="text-3xl font-bold mb-3">Explora todas las categorías</h2>
          <p className="text-muted mb-6">Equipos, componentes, accesorios e inteligencia artificial.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map(category => <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="bg-card border border-border hover:border-primary rounded-xl p-4 flex items-center justify-between gap-3 transition-colors">
              <span className="text-sm font-medium">{category}</span><span className="text-primary text-sm">{products.filter(p => p.category === category).length}</span>
            </Link>)}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-3">Comparaciones por gama</h2>
          <p className="text-muted mb-6">Dos opciones de cada gama, listas para comparar lado a lado.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {['Celulares', 'Computadoras'].map(category => <div key={category} className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-5">{category}</h3>
              <div className="space-y-4">{['Baja', 'Media', 'Alta'].map(gama => {
                const pair = products.filter(p => p.category === category && p.gama === gama).slice(0, 2);
                return <div key={gama} className="border-t border-border pt-4">
                  <div className="flex items-center justify-between gap-3"><Link className="font-bold hover:text-primary" to={`/products?category=${category}&gama=${gama}`}>Gama {gama.toLowerCase()}</Link>
                    <Link className="text-primary text-sm hover:underline" to="/compare" onClick={() => startComparison(pair)}>Comparar dos →</Link></div>
                  <p className="text-xs text-muted mt-2 leading-relaxed">{pair.map(p => p.name).join(' · ')}</p>
                </div>;
              })}</div>
            </div>)}
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/15 to-cyan-500/10 border border-primary/30 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div><p className="text-primary text-xs uppercase font-bold mb-2">Dos inteligencias artificiales</p><h2 className="text-2xl font-bold mb-2">ChatGPT Plus vs. Claude Pro</h2><p className="text-muted">Funciones, herramientas y suscripción mensual en quetzales.</p></div>
          <Link to="/compare" className="btn btn-primary shrink-0" onClick={() => startComparison(products.filter(p => p.category === 'Inteligencia artificial'))}>Comparar las dos IA <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-hover bg-card p-8 rounded-2xl border border-border">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Decisiones Inteligentes</h3>
            <p className="text-muted leading-relaxed">Analizamos especificaciones complejas y te damos un veredicto claro sobre qué producto ofrece la mejor relación calidad/precio.</p>
          </div>
          <div className="card-hover bg-card p-8 rounded-2xl border border-border">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Search className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Búsqueda Granular</h3>
            <p className="text-muted leading-relaxed">Filtra el catálogo por categoría, marca, gama y rango de precios con resultados en tiempo real.</p>
          </div>
          <div className="card-hover bg-card p-8 rounded-2xl border border-border">
            <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fuentes Confiables</h3>
            <p className="text-muted leading-relaxed">Cada precio cotejado incluye su ficha de la tienda y fecha de consulta. Confirma la disponibilidad y el precio vigente en la tienda.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Productos destacados</h2>
            <p className="text-muted">Una selección del catálogo con precios cotejados y enlaces a las tiendas.</p>
          </div>
          <Link to="/products" className="text-primary hover:text-white font-medium flex items-center gap-1 transition-colors">
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              toggleCompare={toggleCompare} 
              isCompared={compareList.some(item => item.id === product.id)} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
