export function FormulaBlock({ formula }) {
  return (
    <div className="card-formula p-3 mb-3 border-purple rounded bg-dark text-white">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-1 text-warning font-monospace">{formula.nomePT}</h5>
        <span className="badge bg-secondary font-monospace">{formula.materia}</span>
      </div>
      
      <p className="mb-1 text-muted small">{formula.conteudo}</p>
      
      {formula.autor && (
        <small className="text-secondary">Autor: {formula.autor}</small>
      )}
    </div>
  );
}