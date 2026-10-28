import { useState, useEffect } from "react";
import { Gamepad2 } from "lucide-react";
import { ConteudoAccordion } from "../components/ConteudoAccordion";

export function Home() {
  const [formulas, setFormulas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [openConteudo, setOpenConteudo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/formulas")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar fórmulas");
        return res.json();
      })
      .then((data) => {
        setFormulas(data);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  const formulasAgrupadas = formulas.reduce((acc, formula) => {
    const mat = formula.materia || "Geral";
    const cont = formula.conteudo || "Geral";

    if (!acc[mat]) acc[mat] = {};
    if (!acc[mat][cont]) acc[mat][cont] = [];

    acc[mat][cont].push(formula);
    return acc;
  }, {});

  const handleToggle = (materia, conteudo) => {
    const accordionKey = `${materia}-${conteudo}`;
    setOpenConteudo((prev) => (prev === accordionKey ? null : accordionKey));
  };

  return (
    <div className="container py-4 fade-in">
      <section className="text-center my-5 hero-section">
        <span className="hero-domain">www.alGbra.com</span>
        <h1 className="hero-title">.alGbra</h1>
        <p className="hero-description mx-auto">
          Descubra os padrões que regem o universo. Navegue por módulos interativos de geometria, álgebra e mecânica, transformando fórmulas complexas em conhecimento prático e visual.
        </p>

        <div className="challenge-block">
          <h2 className="challenge-title">Desafie-se</h2>
          <p className="challenge-subtitle">Descubra a fórmula algébrica do dia.</p>
          <button className="btn-challenge">
            <Gamepad2 size={24} />
          </button>
        </div>
      </section>

      {carregando ? (
        <p className="text-center text-secondary font-monospace">Carregando fórmulas...</p>
      ) : Object.keys(formulasAgrupadas).length > 0 ? (
        Object.entries(formulasAgrupadas).map(([materia, conteudos]) => (
          <div key={materia} className="materia-section mb-4 fade-in-down">
            <div className="text-center mb-4">
              <h2 className="formula-block-title">{materia}</h2>
              <p className="text-secondary small">Descubra sobre e navegue pelos conteúdos</p>
            </div>

            {Object.entries(conteudos).map(([conteudo, listaFormulas]) => {
              const accordionKey = `${materia}-${conteudo}`;
              return (
                <ConteudoAccordion
                  key={conteudo}
                  conteudo={conteudo}
                  formulas={listaFormulas}
                  isOpen={openConteudo === accordionKey}
                  onToggle={() => handleToggle(materia, conteudo)}
                />
              );
            })}
          </div>
        ))
      ) : (
        <p className="text-center text-secondary mt-5">Nenhuma fórmula cadastrada.</p>
      )}
    </div>
  );
}