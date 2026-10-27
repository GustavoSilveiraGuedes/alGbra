import { ConteudoAccordion } from "./ConteudoAccordion";

export function MateriaBlock({ nomeMateria, formulas }) {
  // Agrupa as fórmulas por nome do conteúdo (ex: "Geometria Plana", "Funções")
  const conteudosAgrupados = formulas.reduce((acc, formula) => {
    const key = formula.conteudoNomePt;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(formula);
    return acc;
  }, {});

  return (
    <section className="materia-block mb-5">
      <h2 className="materia-title text-center mb-4">{nomeMateria}</h2>

      <div className="conteudos-list">
        {Object.entries(conteudosAgrupados).map(([nomeConteudo, listaFormulas]) => (
          <ConteudoAccordion
            key={nomeConteudo}
            nomeConteudo={nomeConteudo}
            formulas={listaFormulas}
          />
        ))}
      </div>
    </section>
  );
}