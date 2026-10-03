import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Compare from './pages/Compare';
import { useState, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (product) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length < 2) {
        setCompareList([...compareList, product]);
      } else {
        alert("Solo puedes comparar 2 productos a la vez. Elimina uno primero.");
      }
    }
  };

  const removeCompare = (id) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  return (
      <Router>
        <ScrollToTop />

        <div className="flex flex-col min-h-screen">
          <Header compareCount={compareList.length} />

          <main className="flex-1">
            <Routes>
              <Route
                  path="/"
                  element={
                    <Home
                        startComparison={setCompareList}
                        toggleCompare={toggleCompare}
                        compareList={compareList}
                    />
                  }
              />

              <Route
                  path="/products"
                  element={
                    <Products
                        toggleCompare={toggleCompare}
                        compareList={compareList}
                    />
                  }
              />

              <Route
                  path="/compare"
                  element={
                    <Compare
                        compareList={compareList}
                        removeCompare={removeCompare}
                    />
                  }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
  );
}

export default App;
