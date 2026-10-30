import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    } catch {
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

      const usuarioLogado = await response.json();

      localStorage.setItem("@alGbra:token", "token-session");
      localStorage.setItem("@alGbra:user", JSON.stringify(usuarioLogado));

      setUser(usuarioLogado);
      navigate("/profile");
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

      // Após cadastrar com sucesso, realiza o login automático
      return await login(email, senha);
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleGoogleCallback = async (credentialResponse) => {
    try {
      const tokenGoogle = credentialResponse.credential;

      const response = await fetch("http://localhost:8080/api/usuarios/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenGoogle }),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação via Google no servidor");
      }

      const usuarioLogado = await response.json();

      localStorage.setItem("@alGbra:token", tokenGoogle);
      localStorage.setItem("@alGbra:user", JSON.stringify(usuarioLogado));

      setUser(usuarioLogado);
      navigate("/profile");
    } catch (error) {
      return { success: false, message: error.message };
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