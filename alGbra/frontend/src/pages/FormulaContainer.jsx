import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/formulaContainer.css"; // Caminho ajustado para a tua pasta styles

export default function FormulaContainer() {
    const { id } = useParams();
    const { getFormulaById } = useAuth();
    const [formula, setFormula] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        if (getFormulaById) {
            getFormulaById(id).then((data) => {
                if (isMounted) {
                    setFormula(data);
                    setLoading(false);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [id, getFormulaById]);

    // Função para tratar o link do YouTube (converte para formato embed do iframe)
    const getEmbedUrl = (url) => {
        if (!url || url === 'VIDEO_A_DEFINIR') return null;
        if (url.includes('embed/')) return url;

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}`
            : url;
    };

    if (loading) {
        return (
            <div className="formula-loading">
                <p>Carregando informações da fórmula...</p>
            </div>
        );
    }

    if (!formula) {
        return (
            <div className="formula-loading">
                <p>Fórmula não encontrada.</p>
            </div>
        );
    }

    const {
        nomePT,
        imagemUrl,
        descricao,
        videoUrl,
        seculo,
        autor,
        periodoEnsinado,
        numeroVariaveis
    } = formula;

    const embedVideoUrl = getEmbedUrl(videoUrl);

    return (
        <div className="formula-page-wrapper">

            <main className="formula-main-content">
                {/* Título Principal */}
                <h1 className="formula-title">{nomePT}</h1>

                {/* Card com a imagem/fórmula */}
                <div className="formula-card-display">
                    <img
                        src={imagemUrl}
                        alt={nomePT}
                        className="formula-image"
                    />
                </div>

                {/* Badges de Metadados */}
                <div className="formula-metadata">
                    {periodoEnsinado && (
                        <span className="badge">
              <strong>Nível:</strong> {periodoEnsinado}
            </span>
                    )}
                    {seculo && (
                        <span className="badge">
              <strong>Século:</strong> {seculo}
            </span>
                    )}
                    {autor && (
                        <span className="badge">
              <strong>Autor:</strong> {autor}
            </span>
                    )}
                    {numeroVariaveis !== null && numeroVariaveis !== undefined && (
                        <span className="badge">
              <strong>Variáveis:</strong> {numeroVariaveis}
            </span>
                    )}
                </div>

                {/* Descrição em HTML vindos do banco */}
                <div
                    className="formula-description"
                    dangerouslySetInnerHTML={{ __html: descricao }}
                />

                {/* Vídeo do YouTube */}
                {embedVideoUrl && (
                    <section className="video-section">
                        <h2 className="video-section-title">Vídeo Recomendado</h2>
                        <div className="video-container">
                            <iframe
                                src={embedVideoUrl}
                                title={`Vídeo explicativo: ${nomePT}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}