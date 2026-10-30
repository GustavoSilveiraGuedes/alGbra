import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sigma, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState("PT-BR");

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
            <Link to="/" className="nav-logo-desktop">
              <Sigma size={32} />
            </Link>

            <div className="nav-center-links">
              <Link to="/" className="nav-link-mobile-home">Início</Link>
              <Link to="/">Math</Link>

              <a href="#" onClick={handleUserClick} className="nav-user-mobile">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={user?.nome || "Perfil"} className="nav-avatar-img" />
                ) : (
                    <UserCircle size={30} />
                )}
              </a>

              <Link to="/">Phys</Link>
              <Link to="/about">About</Link>
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