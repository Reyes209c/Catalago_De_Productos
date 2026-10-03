import React from 'react';

const ScoreBar = ({ label, score, colorClass }) => {
  const blocks = Math.round(score / 5);
  const totalBlocks = 20;
  
  const filledStr = "█".repeat(blocks);
  const emptyStr = "░".repeat(totalBlocks - blocks);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-muted">{label}</span>
        <span className="text-sm font-bold">{score}/100</span>
      </div>
      <div className={`font-mono text-lg tracking-tight ${colorClass} leading-none`}>
        {filledStr}<span className="text-muted/30">{emptyStr}</span>
      </div>
    </div>
  );
};

const CompareScore = ({ prodA, prodB, scoreA, scoreB }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-card p-6 rounded-xl border border-color">
        <h3 className="text-xl font-bold mb-6 text-center">{prodA.name}</h3>
        
        <ScoreBar label="Puntuación Global" score={scoreA} colorClass={scoreA >= scoreB ? "text-success" : "text-primary"} />
        
        <div className="mt-8 space-y-4 border-t border-color pt-6">
          <ScoreBar label="Rendimiento" score={prodA.specs.Rendimiento || 50} colorClass="text-main" />
          <ScoreBar label="Calidad" score={prodA.specs.Calidad || 50} colorClass="text-main" />
          <ScoreBar label="Relación calidad/precio" score={prodA.specs["Relación calidad/precio"] || 50} colorClass="text-main" />
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-xl border border-color">
        <h3 className="text-xl font-bold mb-6 text-center">{prodB.name}</h3>
        
        <ScoreBar label="Puntuación Global" score={scoreB} colorClass={scoreB >= scoreA ? "text-success" : "text-primary"} />
        
        <div className="mt-8 space-y-4 border-t border-color pt-6">
          <ScoreBar label="Rendimiento" score={prodB.specs.Rendimiento || 50} colorClass="text-main" />
          <ScoreBar label="Calidad" score={prodB.specs.Calidad || 50} colorClass="text-main" />
          <ScoreBar label="Relación calidad/precio" score={prodB.specs["Relación calidad/precio"] || 50} colorClass="text-main" />
        </div>
      </div>
      
      <div className="md:col-span-2 text-center text-sm text-muted mt-2">
        * La puntuación global se calcula considerando: 40% Rendimiento, 30% Calidad, 30% Relación calidad/precio.
      </div>
    </div>
  );
};

export default CompareScore;
