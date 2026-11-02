import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Modal } from "../components/Modal";
import "../styles/dailyChallenge.css";

const MAX_ATTEMPTS = 10;
const STOP_WORDS = new Set(["de", "da", "do", "dos", "das", "e", "com", "em", "a", "o", "para", "por"]);

function parseSeculoToNumber(secStr) {
    if (!secStr) return null;
    const str = String(secStr).trim().toUpperCase();
    const isBC = str.includes("A.C");
    const cleanStr = str.replace(/A\.C\.?/g, "").trim();

    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    const directNum = parseInt(cleanStr, 10);

    if (!/[IVXLCDM]+/.test(cleanStr)) {
        return isNaN(directNum) ? null : (isBC ? -directNum : directNum);
    }

    const match = cleanStr.match(/[IVXLCDM]+/);
    if (!match) return isNaN(directNum) ? null : (isBC ? -directNum : directNum);

    const roman = match[0];
    let num = 0;
    let i = 0;
    while (i < roman.length) {
        if (i + 1 < roman.length && lookup[roman.substring(i, i + 2)]) {
            num += lookup[roman.substring(i, i + 2)];
            i += 2;
        } else {
            num += lookup[roman[i]] || 0;
            i += 1;
        }
    }

    return isBC ? -num : num;
}

export function DailyChallenge() {
    const { user, getFormulas, getDailyFormula, registrarParticipacao } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [targetFormula, setTargetFormula] = useState(null);
    const [allFormulas, setAllFormulas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [guesses, setGuesses] = useState([]);
    const [isWon, setIsWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [pendingPath, setPendingPath] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    const searchContainerRef = useRef(null);

    const todayDateStr = new Date().toISOString().slice(0, 10);
    const userKey = user?.id ? `user_${user.id}` : `guest`;
    const storageKey = `algbra_daily_${todayDateStr}_${userKey}`;

    useEffect(() => {
        async function loadData() {
            try {
                const formulas = await getFormulas();
                setAllFormulas(formulas || []);

                const formulaHoje = await getDailyFormula();
                if (formulaHoje) {
                    setTargetFormula(formulaHoje);

                    const savedState = localStorage.getItem(storageKey);
                    if (savedState) {
                        const parsed = JSON.parse(savedState);
                        setGuesses(parsed.guesses || []);
                        setIsWon(parsed.isWon || false);
                        setIsGameOver(parsed.isGameOver || false);
                    } else {
                        setGuesses([]);
                        setIsWon(false);
                        setIsGameOver(false);
                    }
                }
            } catch (err) {
                console.error("Erro ao carregar dados do Desafio Diário:", err);
            }
        }
        loadData();
    }, [getFormulas, getDailyFormula, storageKey]);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const diff = tomorrow - now;

            const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
            const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (user && (guesses.length > 0 || isWon || isGameOver)) {
            localStorage.setItem(storageKey, JSON.stringify({ guesses, isWon, isGameOver }));
        }
    }, [guesses, isWon, isGameOver, storageKey, user]);

    // Função robusta para disparar a requisição POST para o backend
    const salvarParticipacao = async (acertou) => {
        if (!user?.id) return;
        try {
            await registrarParticipacao(user.id, acertou);
        } catch (error) {
            console.error("Erro ao salvar participação:", error);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (user && !isWon && !isGameOver && guesses.length > 0) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [user, isWon, isGameOver, guesses]);

    useEffect(() => {
        const handleInternalNavigation = (e) => {
            if (!user || isWon || isGameOver || guesses.length === 0) return;
            const clickableElement = e.target.closest("a, button, [role='button']");
            if (clickableElement) {
                if (searchContainerRef.current && searchContainerRef.current.contains(clickableElement)) return;
                const href = clickableElement.getAttribute("href") || clickableElement.dataset?.path;
                if (href && !href.startsWith("#")) {
                    e.preventDefault();
                    e.stopPropagation();
                    setPendingPath(href);
                    setShowLeaveModal(true);
                } else if (!clickableElement.classList.contains("search-input-box")) {
                    const targetLink = clickableElement.closest("a");
                    if (targetLink && targetLink.pathname !== location.pathname) {
                        e.preventDefault();
                        e.stopPropagation();
                        setPendingPath(targetLink.pathname);
                        setShowLeaveModal(true);
                    }
                }
            }
        };
        document.addEventListener("click", handleInternalNavigation, true);
        return () => document.removeEventListener("click", handleInternalNavigation, true);
    }, [user, isWon, isGameOver, guesses, location.pathname]);

    const handleConfirmLeave = async () => {
        await salvarParticipacao(false);
        setIsGameOver(true);
        localStorage.setItem(storageKey, JSON.stringify({ guesses, isWon: false, isGameOver: true }));
        setShowLeaveModal(false);
        if (pendingPath) navigate(pendingPath);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const updateSuggestions = (term) => {
        const guessedIds = new Set(guesses.map((g) => g.id));
        const cleanTerm = term.trim().toLowerCase();

        const matches = allFormulas.filter((f) => {
            if (guessedIds.has(f.id)) return false;
            if (!cleanTerm) return true;
            return (
                f.nomePT?.toLowerCase().includes(cleanTerm) ||
                f.aliasPT1?.toLowerCase().includes(cleanTerm) ||
                f.aliasPT2?.toLowerCase().includes(cleanTerm) ||
                f.nomeEN?.toLowerCase().includes(cleanTerm) ||
                f.aliasEN1?.toLowerCase().includes(cleanTerm) ||
                f.aliasEN2?.toLowerCase().includes(cleanTerm)
            );
        });

        setFilteredSuggestions(matches);
        setShowDropdown(matches.length > 0);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        updateSuggestions(e.target.value);
    };

    const handleSelectFormula = async (formula) => {
        if (isWon || isGameOver) return;

        setSearchTerm("");
        setShowDropdown(false);

        const updatedGuesses = [formula, ...guesses];
        setGuesses(updatedGuesses);

        // Se acertou
        if (targetFormula && Number(formula.id) === Number(targetFormula.id)) {
            setIsWon(true);
            await salvarParticipacao(true);
            return;
        }

        // Se esgotou as tentativas (Derrota)
        if (updatedGuesses.length >= MAX_ATTEMPTS) {
            setIsGameOver(true);
            await salvarParticipacao(false);
        }
    };

    const compareAttribute = (attrType, valGuess, valTarget) => {
        const guess = valGuess === "" || valGuess === undefined || valGuess === null ? null : String(valGuess).trim();
        const target = valTarget === "" || valTarget === undefined || valTarget === null ? null : String(valTarget).trim();

        if (guess === null && target === null) return { status: "correct", display: "🤷‍♂️", arrow: null };
        if (guess === null || target === null) return { status: "wrong", display: guess ?? "🤷‍♂️", arrow: null };

        if (attrType === "nome") {
            if (guess.toLowerCase() === target.toLowerCase()) return { status: "correct", display: guess, arrow: null };
            const wordsGuess = guess.toLowerCase().split(/\s+/).filter((w) => !STOP_WORDS.has(w));
            const wordsTarget = target.toLowerCase().split(/\s+/).filter((w) => !STOP_WORDS.has(w));
            const hasCommonWord = wordsGuess.some((w) => wordsTarget.includes(w));
            return { status: hasCommonWord ? "partial" : "wrong", display: guess, arrow: null };
        }

        if (attrType === "variaveis" || attrType === "seculo") {
            let numGuess = attrType === "seculo" ? parseSeculoToNumber(guess) : Number(guess);
            let numTarget = attrType === "seculo" ? parseSeculoToNumber(target) : Number(target);

            if (numGuess !== null && numTarget !== null && !isNaN(numGuess) && !isNaN(numTarget)) {
                if (numGuess === numTarget) return { status: "correct", display: guess, arrow: null };
                return { status: "wrong", display: guess, arrow: numTarget > numGuess ? "↑" : "↓" };
            }
        }

        return {
            status: guess.toLowerCase() === target.toLowerCase() ? "correct" : "wrong",
            display: guess,
            arrow: null
        };
    };

    return (
        <div className="daily-challenge-wrapper">
            <header className="daily-header">
                <h1 className="daily-title">Adivinhe a fórmula diária</h1>
                <p className="daily-attempts-count">
                    Tentativas: {guesses.length} / {MAX_ATTEMPTS}
                </p>
                {(isWon || isGameOver) && (
                    <div className="timer-container fade-in">
                        <Clock size={16} />
                        <span>Próximo desafio em: <strong>{timeLeft}</strong></span>
                    </div>
                )}
            </header>

            {!isWon && !isGameOver && (
                <div className="search-container fade-in" ref={searchContainerRef}>
                    <div className="search-input-box">
                        <input
                            type="text"
                            placeholder="Busque ou selecione uma fórmula..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => updateSuggestions(searchTerm)}
                            disabled={!user}
                        />
                        <Search className="search-icon" size={20} />
                    </div>

                    {showDropdown && filteredSuggestions.length > 0 && (
                        <ul className="autocomplete-dropdown">
                            {filteredSuggestions.map((item) => (
                                <li key={item.id} onMouseDown={(e) => { e.preventDefault(); handleSelectFormula(item); }}>
                                    <img src={item.imagemUrl} alt={item.nomePT} className="dropdown-item-img" />
                                    <span className="dropdown-item-name">{item.nomePT}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <div className="table-header-grid">
                <span>Fórmula</span>
                <span>Nome</span>
                <span>Conteúdo</span>
                <span>N° Variáveis</span>
                <span>Período Ensinado</span>
                <span>Século</span>
                <span>Autor</span>
            </div>

            <div className="guesses-list fade-in">
                {guesses.map((guess, idx) => {
                    const resNome = compareAttribute("nome", guess.nomePT, targetFormula?.nomePT);
                    const resConteudo = compareAttribute("conteudo", guess.conteudo, targetFormula?.conteudo);
                    const resVariaveis = compareAttribute("variaveis", guess.numeroVariaveis, targetFormula?.numeroVariaveis);
                    const resPeriodo = compareAttribute("periodo", guess.periodoEnsinado, targetFormula?.periodoEnsinado);
                    const resSeculo = compareAttribute("seculo", guess.seculo, targetFormula?.seculo);
                    const resAutor = compareAttribute("autor", guess.autor, targetFormula?.autor);

                    return (
                        <div className="guess-row-grid" key={`guess-${guess.id}-${idx}`}>
                            <div className="tile tile-image"><img src={guess.imagemUrl} alt={guess.nomePT} /></div>
                            <div className={`tile tile-${resNome.status}`}><span>{resNome.display}</span></div>
                            <div className={`tile tile-${resConteudo.status}`}><span>{resConteudo.display}</span></div>
                            <div className={`tile tile-${resVariaveis.status}`}>
                                <span>{resVariaveis.display}</span>
                                {resVariaveis.arrow && <span className="arrow-indicator">{resVariaveis.arrow}</span>}
                            </div>
                            <div className={`tile tile-${resPeriodo.status}`}><span>{resPeriodo.display}</span></div>
                            <div className={`tile tile-${resSeculo.status}`}>
                                <span>{resSeculo.display}</span>
                                {resSeculo.arrow && <span className="arrow-indicator">{resSeculo.arrow}</span>}
                            </div>
                            <div className={`tile tile-${resAutor.status}`}><span>{resAutor.display}</span></div>
                        </div>
                    );
                })}
            </div>

            {isWon && targetFormula && (
                <div className="victory-card fade-in">
                    <div className="victory-badge"><CheckCircle2 size={32} color="#2ef8a0" /><h2>Parabéns! Você acertou!</h2></div>
                    <h3 className="victory-formula-title">{targetFormula.nomePT}</h3>
                    <div className="victory-image-container"><img src={targetFormula.imagemUrl} alt={targetFormula.nomePT} /></div>
                </div>
            )}

            {isGameOver && !isWon && targetFormula && (
                <div className="victory-card defeat-card fade-in">
                    <div className="victory-badge defeat-badge"><XCircle size={32} color="#ff4b4b" /><h2>Fim de Jogo!</h2></div>
                    <p className="defeat-subtitle">A fórmula correta era:</p>
                    <h3 className="victory-formula-title">{targetFormula.nomePT}</h3>
                    <div className="victory-image-container"><img src={targetFormula.imagemUrl} alt={targetFormula.nomePT} /></div>
                </div>
            )}

            <Modal
                isOpen={!user}
                type="auth"
                title="Login Necessário"
                description={<p>Você precisa estar cadastrado para jogar o <strong>Desafio Diário</strong> e salvar a sua ofensiva!</p>}
                confirmText="Fazer Login"
                cancelText="Voltar para a Home"
                onConfirm={() => navigate("/login")}
                onCancel={() => navigate("/")}
            />

            <Modal
                isOpen={showLeaveModal}
                type="danger"
                title="Atenção!"
                description={<p>Se você sair da página agora, seu jogo do dia será considerado como <strong>uma derrota</strong>.</p>}
                confirmText="Sair e Perder"
                cancelText="Continuar Jogando"
                onConfirm={handleConfirmLeave}
                onCancel={() => setShowLeaveModal(false)}
            />
        </div>
    );
}