import { Search } from "lucide-react";

export function FormulaCard({ formula }) {
  return (
    <div className="formula-card">
      <div className="formula-card-img">
        <img src={formula.imagemUrl} alt={formula.nomePt} />
      </div>
      <div className="formula-card-body">
        <h5>{formula.nomePt}</h5>
        <button className="btn-sobre">
          Sobre <Search size={14} />
        </button>
      </div>
    </div>
  );
}