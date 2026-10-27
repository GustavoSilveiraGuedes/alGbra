import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Função para decodificar o payload do JWT do Google no cliente
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("@alGbra:user");
      const token = localStorage.getItem("@alGbra:token");

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      localStorage.removeItem("@alGbra:user");
      localStorage.removeItem("@alGbra:token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensagem || "Credenciais inválidas");
      }

      const data = await response.json();
      const usuarioLogado = data.usuario || data;

      localStorage.setItem("@alGbra:token", data.token || "token-session");
      localStorage.setItem("@alGbra:user", JSON.stringify(usuarioLogado));
      
      setUser(usuarioLogado);
      navigate("/perfil");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (nome, email, senha) => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensagem || "Erro ao realizar cadastro");
      }

      navigate("/login");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleGoogleCallback = async (credentialResponse) => {
    try {
      const tokenGoogle = credentialResponse.credential;
      const googlePayload = parseJwt(tokenGoogle); // Extrai os dados do Google (picture, name, email)

      const response = await fetch("http://localhost:8080/api/usuarios/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          idToken: tokenGoogle,
          token: tokenGoogle 
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação via Google no servidor");
      }

      const data = await response.json();
      const usuarioLogado = data.usuario || data;

      // Anexa a imagem do Google ao objeto do usuário caso o Spring Boot não tenha retornado
      const usuarioFinal = {
        ...usuarioLogado,
        picture: usuarioLogado.picture || usuarioLogado.fotoUrl || googlePayload?.picture
      };

      localStorage.setItem("@alGbra:token", data.token || tokenGoogle);
      localStorage.setItem("@alGbra:user", JSON.stringify(usuarioFinal));
      
      setUser(usuarioFinal);
      navigate("/perfil");
    } catch (error) {
      console.error("Erro na autenticação Google:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("@alGbra:token");
    localStorage.removeItem("@alGbra:user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        handleGoogleCallback,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);