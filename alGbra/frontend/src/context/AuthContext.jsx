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

      if (!response.ok) throw new Error("Falha na autenticação via Google no servidor");

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

  const getFormulaById = async (id) => {
    try {
      const token = localStorage.getItem("@alGbra:token");
      const response = await fetch(`http://localhost:8080/api/formulas/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      });
      if (!response.ok) throw new Error("Erro ao carregar dados da fórmula");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getFormulas = async () => {
    try {
      const token = localStorage.getItem("@alGbra:token");
      const response = await fetch("http://localhost:8080/api/formulas", {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      });
      if (!response.ok) throw new Error("Erro ao listar fórmulas");
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar fórmulas:", error);
      return [];
    }
  };

  const getDailyFormula = async () => {
    try {
      const token = localStorage.getItem("@alGbra:token");
      const response = await fetch("http://localhost:8080/api/daily/dayliChallenge", {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      });
      if (!response.ok) throw new Error("Erro ao carregar fórmula do dia");
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar fórmula diária:", error);
      return null;
    }
  };

  const registrarParticipacao = async (usuarioId, acertou) => {
    try {
      const token = localStorage.getItem("@alGbra:token");
      const response = await fetch(
          `http://localhost:8080/api/daily/registrar?usuarioId=${usuarioId}&acertou=${acertou}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
          }
      );
      if (!response.ok) throw new Error("Erro ao registrar participação");
      return await response.json();
    } catch (error) {
      console.error("Erro ao registrar participação diária:", error);
      return null;
    }
  };

  const getHistoricoParticipacoes = async (usuarioId) => {
    try {
      const token = localStorage.getItem("@alGbra:token");
      const response = await fetch(`http://localhost:8080/api/daily/historico/${usuarioId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      });
      if (!response.ok) throw new Error("Erro ao obter histórico do usuário");
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar histórico de participações:", error);
      return [];
    }
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
            getFormulaById,
            getFormulas,
            getDailyFormula,
            registrarParticipacao,
            getHistoricoParticipacoes,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);