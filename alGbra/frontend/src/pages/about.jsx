import minhaFoto from "../assets/visual/euRedondo.png";

export function About() {
  return (
    <div className="container py-5 fade-in">
      <div className="about-wrapper mx-auto">
        <section className="about-section mb-5">
          <h1 className="about-title text-center mb-5">Sobre Mim</h1>

          <div className="about-content-container">
            <div className="about-avatar-wrapper">
              <img
                src={minhaFoto}
                alt="Foto de perfil"
                className="about-avatar-img"
              />
            </div>

            <div className="about-text-content">
              <p>
                Sou natural de Cruzeiro do Oeste, no Paraná, onde nasci e cresci. Meu interesse pela área de programação começou por volta dos 12 anos, quando comecei a assistir vídeos sobre tecnologia e desenvolvimento de software. Desde então, passei a me interessar cada vez mais pelo funcionamento dos sistemas e pela criação de soluções digitais.
              </p>

              <p>
                Com o objetivo de aprofundar meus conhecimentos, ingressei no curso Técnico em Informática integrado ao ensino médio no Instituto Federal do Paraná (IFPR), Campus Umuarama, onde tive a oportunidade de desenvolver habilidades em programação e tecnologia.
              </p>

              <p>
                Atualmente, pretendo continuar minha formação acadêmica cursando Ciência da Computação na Universidade Estadual de Maringá (UEM), com o objetivo de atuar profissionalmente na área de desenvolvimento de software e contribuir com soluções tecnológicas inovadoras.
              </p>
            </div>
          </div>
        </section>

        <section className="tech-stack-section text-center">
          <h2 className="tech-stack-title mb-4">Linguagens Usadas</h2>

          <div className="tech-stack-card">
            <div className="tech-column">
              <h3 className="tech-column-title">Front-End</h3>
              <div className="tech-badges-group">
                <span className="tech-badge">react</span>
                <span className="tech-badge">vite</span>
                <span className="tech-badge">bootstrap</span>
                <span className="tech-badge">html</span>
                <span className="tech-badge">css</span>
                <span className="tech-badge">js</span>
                <span className="tech-badge">json</span>
              </div>
            </div>

            <div className="tech-divider"></div>

            <div className="tech-column">
              <h3 className="tech-column-title">Back-End</h3>
              <div className="tech-badges-group">
                <span className="tech-badge">Java - SpringBoot</span>
                <span className="tech-badge">Sql</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}