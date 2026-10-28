import { ChevronDown } from "lucide-react";
import { FormulaCard } from "./FormulaCard";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export function ConteudoAccordion({ conteudo, formulas, isOpen, onToggle }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div 
      ref={ref} 
      className={`accordion-wrapper mb-2 ${isVisible ? "fade-in-down" : "opacity-0"}`}
    >
      <button 
        type="button"
        className={`formula-accordion-header ${isOpen ? "active" : ""}`}
        onClick={onToggle}
      >
        <span>{conteudo}</span>
        <div className={`chevron-icon ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <div className={`formula-accordion-collapse ${isOpen ? "open" : ""}`}>
        <div className="formula-accordion-body">
          <div className="formulas-grid">
            {formulas.map((formula) => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}