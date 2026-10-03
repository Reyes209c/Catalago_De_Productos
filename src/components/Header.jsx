import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Scale, Menu, X } from 'lucide-react';

const Header = ({ compareCount }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
  ];

  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Cpu className="text-primary w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight">TechCompare GT</h1>
              <p className="text-[11px] font-medium text-primary tracking-wider uppercase">Compara antes de comprar</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-white' : 'text-muted hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/compare" className="btn btn-primary relative ml-4 px-6">
              <Scale className="w-4 h-4" />
              Comparar
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-danger text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-background shadow-lg animate-pulse">
                  {compareCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/compare" className="relative p-2 text-muted hover:text-white transition-colors">
              <Scale className="w-6 h-6" />
              {compareCount > 0 && (
                <span className="absolute top-0 right-0 bg-danger text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-background">
                  {compareCount}
                </span>
              )}
            </Link>
            <button 
              className="text-muted hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border absolute w-full left-0 shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-background hover:text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/compare" 
              className="mt-4 btn btn-primary w-full py-3 text-base flex justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Scale className="w-5 h-5 mr-2" />
              Ver Comparación {compareCount > 0 ? `(${compareCount})` : ''}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
