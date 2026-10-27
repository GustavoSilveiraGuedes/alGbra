import { useState, useEffect } from "react";
import { Gamepad2 } from "lucide-react";
import { MateriaBlock } from "../components/MateriaBlock";

export function Home() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/materias")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar matérias");
        return res.json();
      })
      .then((data) => setMaterias(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-4">
      {/* SEÇÃO HERO PRINCIPAL */}
      <section className="text-center my-5 hero-section">
        <span className="hero-domain fade-in">
          www.alGbra.com
        </span>
        
        <h1 className="hero-title fade-in">.alGbra</h1>

        <p className="hero-description mx-auto fade-in">
          Descubra os padrões que regem o universo. Navegue por
          módulos interativos de geometria, álgebra e mecânica,
          transformando fórmulas complexas em conhecimento
          prático e visual.
        </p>

        {/* SEÇÃO DESAFIE-SE */}
        <div className="challenge-block">
          <h2 className="challenge-title fade-in">Desafie-se</h2>
          <p className="challenge-subtitle fade-in-down">Descubra a fórmula algébrica do dia.</p>
          
          <button className="btn-challenge fade-in">
            <Gamepad2 size={24} />
          </button>
        </div>
      </section>

      {/* RENDERIZAÇÃO DINÂMICA DAS MATÉRIAS */}
      <div className="materias-container fade-in-down">
        {materias && materias.length > 0 ? (
          materias.map((materia) => (
            <MateriaBlock key={materia.id} materia={materia} />
          ))
        ) : (
          <p className="text-center text-secondary mt-5">Nenhuma matéria encontrada.</p>
        )}
      </div>
    </div>
  );
}