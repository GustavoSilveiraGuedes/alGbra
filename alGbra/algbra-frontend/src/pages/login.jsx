import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { login, handleGoogleCallback } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroApi("");
    setCarregando(true);

    const result = await login(email, senha);
    if (!result.success) {
      setErroApi(result.message);
    }
    
    setCarregando(false);
  };

  return (
    <div className="account-container fade-in">
      <div className="account-card">
        <h1 className="account-title">.alGbra</h1>
        <p className="account-subtitle">Entre para acessar suas fórmulas e desafios</p>

        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erroApi && (
            <p className="text-danger small mb-3 text-center fw-bold">
              {erroApi}
            </p>
          )}

          <button type="submit" className="btn-account" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="account-divider">
          <span>OU</span>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <GoogleLogin
            onSuccess={handleGoogleCallback}
            onError={() => setErroApi("Erro na autenticação com o Google")}
            theme="filled_black"
            shape="pill"
            locale="pt-BR"
          />
        </div>

        <p className="text-center text-secondary small mt-4 mb-0">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-warning text-decoration-none fw-bold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}