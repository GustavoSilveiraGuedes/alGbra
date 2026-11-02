import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { UserCircle, ChevronLeft, ChevronRight, ShieldAlert, BookOpen, Layers, Users, Sigma, Flame } from "lucide-react";
import "../styles/account.css";

export function Profile() {
  const { user, logout, getHistoricoParticipacoes } = useAuth();

  const [participacoes, setParticipacoes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const carregarHistorico = useCallback(async () => {
    if (user?.id) {
      const data = await getHistoricoParticipacoes(user.id);
      setParticipacoes(data || []);
    }
  }, [user, getHistoricoParticipacoes]);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  const statusMap = new Map();
  participacoes.forEach((p) => {
    const rawDate = p.desafioDiario?.dataDesafio || p.dataDesafio || p.data;
    if (rawDate) {
      let dateStr = "";
      if (Array.isArray(rawDate)) {
        dateStr = `${rawDate[0]}-${String(rawDate[1]).padStart(2, "0")}-${String(rawDate[2]).padStart(2, "0")}`;
      } else {
        dateStr = rawDate.toString().split("T")[0];
      }

      const acertou = p.acertou === 1 || p.acertou === true;
      statusMap.set(dateStr, acertou ? "win" : "loss");
    }
  });

  const calculateStreak = () => {
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    while (true) {
      const dateKey = checkDate.toISOString().split("T")[0];
      const status = statusMap.get(dateKey);

      if (status === "win") {
        streak++;
      } else {
        const hojeKey = new Date().toISOString().split("T")[0];
        const isToday = dateKey === hojeKey;
        if (!isToday || status === "loss") {
          break;
        }
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
  };

  const streakAtual = calculateStreak();

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`algbra_streak_${user.id}`, streakAtual);
      window.dispatchEvent(new Event("streak-updated"));
    }
  }, [streakAtual, user]);

  const totalPartidas = participacoes.length;
  const vitorias = participacoes.filter((p) => p.acertou === 1 || p.acertou === true).length;
  const derrotas = totalPartidas - vitorias;
  const winRate = totalPartidas > 0 ? Math.round((vitorias / totalPartidas) * 100) : 0;
  const strokeDasharrayWin = `${winRate} ${100 - winRate}`;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const datasHistorico = participacoes
      .map(p => p.desafioDiario?.dataDesafio || p.dataDesafio || p.data)
      .filter(Boolean)
      .map(d => {
        if (Array.isArray(d)) return new Date(d[0], d[1] - 1, d[2]);
        return new Date(d.toString().split("T")[0]);
      });

  const primeiraDataRegistro = datasHistorico.length > 0
      ? new Date(Math.min(...datasHistorico))
      : new Date();

  const canGoPrev = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    const minLimit = new Date(primeiraDataRegistro.getFullYear(), primeiraDataRegistro.getMonth(), 1);
    return prevMonthDate >= minLimit;
  };

  const prevMonth = () => {
    if (canGoPrev()) {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(year, month + 1, 1);
    const hoje = new Date();
    if (nextMonthDate <= new Date(hoje.getFullYear(), hoje.getMonth(), 1)) {
      setCurrentDate(nextMonthDate);
    }
  };

  const monthNames = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  if (!user) {
    return (
        <div className="account-container fade-in">
          <div className="account-card text-center">
            <p className="text-muted mb-0">Nenhum usuário logado no momento.</p>
          </div>
        </div>
    );
  }

  const avatarUrl = user.fotoUrl;

  return (
      <div className="account-container fade-in">
        <div className="profile-layout-card">

          {/* COLUNA 1: AVATAR E PAINEL ADMIN */}
          <div className="profile-left-col">
            <div className="profile-avatar-wrapper">
              {avatarUrl ? (
                  <img src={avatarUrl} alt={user.nome || "Foto de perfil"} className="profile-avatar-img" />
              ) : (
                  <UserCircle size={110} strokeWidth={1.5} className="text-secondary" />
              )}
            </div>

            {user.isAdmin && (
                <div className="admin-panel-section fade-in" style={{ width: "100%", marginTop: "24px" }}>
                  <div className="admin-panel-header">
                    <ShieldAlert size={18} color="#d4af37" />
                    <span>Painel de Administração</span>
                  </div>
                  <div className="admin-actions-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                    <button className="btn-admin-action"><Sigma size={16} /> Fórmulas</button>
                    <button className="btn-admin-action"><BookOpen size={16} /> Conteúdos</button>
                    <button className="btn-admin-action"><Layers size={16} /> Matérias</button>
                    <button className="btn-admin-action"><Users size={16} /> Usuários</button>
                  </div>
                </div>
            )}
          </div>

          <div className="profile-vertical-divider"></div>

          {/* COLUNA 2: DADOS & AÇÕES */}
          <div className="profile-center-col" style={{ justifyContent: "flex-start" }}>
            <div className="profile-info-group">
              <p><strong>Nome:</strong> <span>{user.nome || "Não informado"}</span></p>
              <p><strong>Email:</strong> <span>{user.email || "Não informado"}</span></p>
              <p><strong>Senha:</strong> <span>••••••••</span></p>
            </div>

            <div className="profile-actions-group">
              <button className="btn-profile-outline">Alterar senha</button>
              <button className="btn-profile-danger">Excluir conta</button>
              <button onClick={logout} className="btn-profile-solid">Sair da conta</button>
            </div>
          </div>

          <div className="profile-vertical-divider"></div>

          {/* COLUNA 3: ESTATÍSTICAS, STREAK E CALENDÁRIO */}
          <div className="profile-right-col">

            <div className={`streak-badge-card ${streakAtual === 0 ? "inactive" : "active"}`}>
              <Flame size={22} className={`streak-icon ${streakAtual === 0 ? "inactive-icon" : ""}`} />
              <span className="streak-count">{streakAtual} {streakAtual === 1 ? "Dia de Ofensiva" : "Dias de Ofensiva"}</span>
            </div>

            <div className="stats-chart-card">
              <h3 className="section-title">Taxa de Vitórias</h3>
              <div className="chart-wrapper">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  {/* Fundo Vermelho (Derrotas / Base) */}
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Círculo de Vitórias por cima */}
                  <path className="circle" strokeDasharray={strokeDasharrayWin} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text x="18" y="20.35" className="chart-percentage">{winRate}%</text>
                </svg>
                <div className="chart-legend">
                  <p><span className="dot dot-win"></span> Vitórias: <strong>{vitorias}</strong></p>
                  <p><span className="dot dot-loss"></span> Derrotas: <strong>{derrotas}</strong></p>
                </div>
              </div>
            </div>

            <div className="calendar-card">
              <div className="calendar-header">
                <button
                    onClick={prevMonth}
                    disabled={!canGoPrev()}
                    className={`btn-cal-arrow ${!canGoPrev() ? "disabled" : ""}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="calendar-month-title">{monthNames[month]} DE {year}</span>
                <button onClick={nextMonth} className="btn-cal-arrow"><ChevronRight size={18} /></button>
              </div>

              <div className="calendar-weekdays">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>

              <div className="calendar-days-grid">
                {daysArray.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="cal-day empty"></div>;
                  }

                  const monthFormatted = String(month + 1).padStart(2, "0");
                  const dayFormatted = String(day).padStart(2, "0");
                  const dateKey = `${year}-${monthFormatted}-${dayFormatted}`;
                  const dayStatus = statusMap.get(dateKey);

                  return (
                      <div key={dateKey} className={`cal-day ${dayStatus ? dayStatus : ""}`}>
                        <span>{day}</span>
                      </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
  );
}