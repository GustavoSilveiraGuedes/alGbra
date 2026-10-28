import { Search } from "lucide-react";

export function FormulaCard({ formula }) {
  return (
    <div className="formula-card">
      <div className="formula-card-img">
        {formula.imagemUrl ? (
          <img 
            src={formula.imagemUrl} 
            alt={formula.nomePT} 
            className="img-fluid"
          />
        ) : (
          <span className="font-monospace text-dark fs-5 fw-bold">
            {formula.aliasPT1 || formula.nomePT}
          </span>
        )}
      </div>

      <div className="formula-card-body">
        <h5>{formula.nomePT}</h5>
        
        <button type="button" className="btn-sobre">
          Sobre <Search size={14} />
        </button>
      </div>
    </div>
  );
}