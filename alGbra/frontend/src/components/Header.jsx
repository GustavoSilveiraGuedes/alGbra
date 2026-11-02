import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sigma, UserCircle, Flame, Gamepad2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState("PT-BR");
  const [streakCount, setStreakCount] = useState(0);

  const atualizarStreakHeader = () => {
    if (user?.id) {
      const savedStreak = localStorage.getItem(`algbra_streak_${user.id}`);
      setStreakCount(savedStreak ? Number(savedStreak) : 0);
    } else {
      setStreakCount(0);
    }
  };

  useEffect(() => {
    atualizarStreakHeader();
    window.addEventListener("streak-updated", atualizarStreakHeader);
    return () => {
      window.removeEventListener("streak-updated", atualizarStreakHeader);
    };
  }, [user]);

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "PT-BR" ? "EN-US" : "PT-BR"));
  };

  const handleUserClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const avatarUrl = user?.fotoUrl;

  return (
      <>
        <header className="main-header">
          <nav className="main-nav">
            <Link to="/" className="nav-logo-desktop" title="Início">
              <Sigma size={32} />
            </Link>

            <div className="nav-center-links">
              <Link to="/" className="nav-link-mobile-home">Início</Link>

              <Link to="/dailyChallenge" className="nav-btn-challenge" title="Desafio Diário">
                <Gamepad2 size={24} />
              </Link>

              <a href="#" onClick={handleUserClick} className="nav-user-mobile">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={user?.nome || "Perfil"} className="nav-avatar-img" />
                ) : (
                    <UserCircle size={30} />
                )}
              </a>

              {/* Foguinho idêntico ao do Profile (sem preenchimento sólido interno) */}
              <div
                  className={`nav-streak-badge ${streakCount > 0 ? "active" : "inactive"}`}
                  title={streakCount > 0 ? "Sua ofensiva está ativa!" : "Ofensiva apagada. Faça o desafio hoje!"}
              >
                <Flame size={20} className={`streak-icon ${streakCount === 0 ? "inactive-icon" : ""}`} />
                <span className="streak-count">{streakCount}</span>
              </div>

              <Link to="/about" className="nav-link-about">About</Link>
            </div>

            <a href="#" onClick={handleUserClick} className="nav-user-desktop">
              {avatarUrl ? (
                  <img src={avatarUrl} alt={user?.nome || "Perfil"} className="nav-avatar-img" />
              ) : (
                  <UserCircle size={32} />
              )}
            </a>
          </nav>
        </header>

        <div className="lang-selector-container">
          <button onClick={toggleLanguage} className="btn-lang">
            {lang}
          </button>
        </div>
      </>
  );
}