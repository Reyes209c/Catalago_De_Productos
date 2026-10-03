import { useState } from 'react';
import { formatPrice } from '../utils/catalog';
import { getComparisonRows } from '../utils/compareLogic';

const CompareTable = ({ prodA, prodB }) => {
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const allRows = getComparisonRows(prodA, prodB);
  const rows = onlyDifferences ? allRows.filter(row => row.different) : allRows;
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border flex flex-wrap justify-between gap-4">
        <p className="text-sm text-muted">Compara cada característica y su utilidad. Los valores destacados indican una diferencia numérica.</p>
        <label className="text-sm flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={onlyDifferences} onChange={e => setOnlyDifferences(e.target.checked)} className="accent-blue-500" />Solo diferencias</label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead><tr className="bg-background">
            <th scope="col" className="p-5 border-b border-border text-muted text-xs uppercase w-1/3">Característica</th>
            {[prodA, prodB].map(p => <th key={p.id || p.name} scope="col" className="p-5 border-b border-l border-border text-center w-1/3">{p.name}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-border">
            <tr><th scope="row" className="p-5 text-muted font-medium">Precio</th>
              {[prodA, prodB].map(p => <td key={p.id || p.name} className="p-5 border-l border-border text-center text-primary font-bold text-lg">{formatPrice(p)}</td>)}</tr>
            {rows.map(row => <tr key={row.key}>
              <th scope="row" className="p-5 text-muted font-medium align-top">{row.key}{row.meaning && <p className="mt-2 text-xs font-normal leading-relaxed">{row.meaning}</p>}</th>
              {['a', 'b'].map(side => <td key={side} className={`p-5 border-l border-border text-center align-top ${row.advantage === side ? 'bg-primary/10' : ''}`}>
                <span>{side === 'a' ? row.valueA : row.valueB}</span>
                {row.advantage === side && <span className="block text-xs text-primary mt-2">{row.direction === 'lower' ? 'Menor valor publicado' : 'Mayor valor publicado'}</span>}
              </td>)}
            </tr>)}
            {rows.length === 0 && <tr><td colSpan="3" className="p-6 text-center text-muted">Las especificaciones publicadas coinciden.</td></tr>}
            <tr><th scope="row" className="p-5 text-muted font-medium">Fuente / Tienda</th>
              {[prodA, prodB].map(p => <td key={p.id || p.name} className="p-5 border-l border-border text-center"><a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">{p.source}</a>{p.specsSourceUrl && <a href={p.specsSourceUrl} target="_blank" rel="noopener noreferrer" className="block text-xs text-primary mt-2 underline">Ficha del fabricante</a>}</td>)}</tr>
            <tr><th scope="row" className="p-5 text-muted font-medium">Fecha de consulta</th>
              {[prodA, prodB].map(p => <td key={p.id || p.name} className="p-5 border-l border-border text-center text-xs text-muted">{p.updatedAt}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CompareTable;
