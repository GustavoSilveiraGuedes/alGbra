import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FormulaCard } from "./FormulaCard";

export function ConteudoAccordion({ nomeConteudo, formulas }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="conteudo-accordion-container mb-3">
      {/* Botão da caixa do conteúdo */}
      <button
        className="conteudo-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{nomeConteudo}</span>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Grid de Fórmulas se o accordion estiver aberto */}
      {isOpen && (
        <div className="conteudo-accordion-body">
          <div className="formulas-grid">
            {formulas.map((f) => (
              <FormulaCard key={f.id} formula={f} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}