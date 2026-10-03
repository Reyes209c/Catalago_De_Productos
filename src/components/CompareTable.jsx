import { formatPrice } from '../utils/catalog';
import React from 'react';

const CompareTable = ({ prodA, prodB }) => {
  // Get all unique keys from both specs objects
  const allSpecKeys = Array.from(new Set([
    ...Object.keys(prodA.specs),
    ...Object.keys(prodB.specs)
  ]));

  // Filter out the scoring metrics from the main table
  const hiddenKeys = ['Estado', 'Condición','Rendimiento', 'Calidad', 'Relación calidad/precio', 'Ventajas', 'Desventajas'];
  const displayKeys = allSpecKeys.filter(key => !hiddenKeys.includes(key));
  const textKeys = ['Ventajas', 'Desventajas'].filter(key => allSpecKeys.includes(key));

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-background">
              <th className="p-5 border-b border-border font-bold text-muted uppercase tracking-wider text-xs w-1/3">Característica</th>
              <th className="p-5 border-b border-border border-l font-bold text-white w-1/3 text-center">{prodA.name}</th>
              <th className="p-5 border-b border-border border-l font-bold text-white w-1/3 text-center">{prodB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-5 font-medium text-muted">Marca</td>
              <td className="p-5 border-l border-border text-center text-white">{prodA.brand}</td>
              <td className="p-5 border-l border-border text-center text-white">{prodB.brand}</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-5 font-medium text-muted">Precio</td>
              <td className="p-5 border-l border-border text-center font-bold text-primary text-lg">{formatPrice(prodA)}</td>
              <td className="p-5 border-l border-border text-center font-bold text-cyan-400 text-lg">{formatPrice(prodB)}</td>
            </tr>
            
            {displayKeys.map((key) => {
              const valA = prodA.specs[key] || '-';
              const valB = prodB.specs[key] || '-';
              const isDifferent = valA !== valB && valA !== '-' && valB !== '-';
              
              return (
                <tr key={key} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-medium text-muted">{key}</td>
                  <td className={`p-5 border-l border-border text-center text-white ${isDifferent ? 'bg-primary/5' : ''}`}>
                    {valA}
                  </td>
                  <td className={`p-5 border-l border-border text-center text-white ${isDifferent ? 'bg-cyan-500/5' : ''}`}>
                    {valB}
                  </td>
                </tr>
              );
            })}

            {/* Render Long Text Fields at the bottom */}
            {textKeys.map((key) => {
              const valA = prodA.specs[key] || '-';
              const valB = prodB.specs[key] || '-';
              const isPositive = key === 'Ventajas';
              
              return (
                <tr key={key} className="bg-background/50">
                  <td className={`p-5 font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>{key}</td>
                  <td className="p-5 border-l border-border text-left text-sm text-muted leading-relaxed align-top">
                    {valA}
                  </td>
                  <td className="p-5 border-l border-border text-left text-sm text-muted leading-relaxed align-top">
                    {valB}
                  </td>
                </tr>
              );
            })}
            
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-5 font-medium text-muted">Fuente / Tienda</td>
              <td className="p-5 border-l border-border text-center text-white"><a href={prodA.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">{prodA.source}</a></td>
              <td className="p-5 border-l border-border text-center text-white"><a href={prodB.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">{prodB.source}</a></td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-5 font-medium text-muted">Fecha de actualización</td>
              <td className="p-5 border-l border-border text-center text-xs text-muted">{prodA.updatedAt}</td>
              <td className="p-5 border-l border-border text-center text-xs text-muted">{prodB.updatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareTable;
