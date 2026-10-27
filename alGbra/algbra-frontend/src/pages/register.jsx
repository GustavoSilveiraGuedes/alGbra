import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroForm("");

    if (senha !== confirmarSenha) {
      setErroForm("As senhas não coincidem!");
      return;
    }

    setCarregando(true);
    const result = await register(nome, email, senha);

    if (!result.success) {
      setErroForm(result.message);
    }

    setCarregando(false);
  };

  return (
    <div className="account-container fade-in">
      <div className="account-card">
        <h1 className="account-title">Criar Conta</h1>
        <p className="account-subtitle">Junte-se ao .alGbra e comece a praticar</p>

        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          {erroForm && (
            <p className="text-danger small mb-3 text-center fw-bold">
              {erroForm}
            </p>
          )}

          <button type="submit" className="btn-account" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-center text-secondary small mt-4 mb-0">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-warning text-decoration-none fw-bold">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}