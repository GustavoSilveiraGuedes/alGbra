import { Link, useNavigate } from "react-router-dom";
import { Sigma, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Header({ lang = "PT-BR", toggleLanguage }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/perfil");
    } else {
      navigate("/login");
    }
  };

  // Pega a URL da foto salva no perfil do usuário
  const avatarUrl = user?.picture || user?.fotoUrl || user?.foto || user?.avatar;

  return (
    <>
      <header className="main-header">
        <nav className="main-nav">
          {/* Ícone Sigma (Desktop) */}
          <Link to="/" className="nav-logo-desktop">
            <Sigma size={32} />
          </Link>

          {/* Links Centrais */}
          <div className="nav-center-links">
            <Link to="/" className="nav-link-mobile-home">Início</Link>
            <Link to="/math">Math</Link>
            
            {/* Ícone ou Foto de Perfil (Mobile) */}
            <a href="#" onClick={handleUserClick} className="nav-user-mobile">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.nome || "Perfil"}
                  className="nav-avatar-img"
                />
              ) : (
                <UserCircle size={30} />
              )}
            </a>

            <Link to="/phys">Phys</Link>
            <Link to="/about">About</Link>
          </div>

          {/* Ícone ou Foto de Perfil (Desktop) */}
          <a href="#" onClick={handleUserClick} className="nav-user-desktop">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.nome || "Perfil"}
                className="nav-avatar-img"
              />
            ) : (
              <UserCircle size={32} />
            )}
          </a>
        </nav>
      </header>

      {/* Botão de Idioma FORA do header */}
      <div className="lang-selector-container">
        <button onClick={toggleLanguage} className="btn-lang">
          {lang}
        </button>
      </div>
    </>
  );
}