import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const { register, handleGoogleCallback } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      await register(nome, email, senha);
      navigate("/");
    } catch (err) {
      setErro(err.message || "Erro ao realizar cadastro.");
    }
  };

  return (
    <div className="account-container fade-in">
      <div className="account-card">
        <h2 className="account-title">Criar Conta</h2>
        <p className="account-subtitle">Junte-se à comunidade .alGbra</p>

        {erro && <div className="account-error">{erro}</div>}

        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Repita a senha"
              required
            />
          </div>

          <button type="submit" className="btn-account">
            Cadastrar
          </button>
        </form>

        <div className="account-divider">
          <span>OU</span>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <GoogleLogin
            onSuccess={handleGoogleCallback}
            onError={() => setErro("Erro ao conectar com o Google.")}
            theme="filled_black"
            shape="pill"
            text="signup_with"
            locale="pt-BR"
          />
        </div>

        <p className="text-center text-secondary small mt-4 mb-0">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-warning text-decoration-none fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}