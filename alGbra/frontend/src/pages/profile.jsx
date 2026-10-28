import { useAuth } from "../context/AuthContext";
import { UserCircle } from "lucide-react";

export function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="account-container fade-in">
        <div className="account-card text-center">
          <p className="text-muted mb-0">Nenhum usuário logado no momento.</p>
        </div>
      </div>
    );
  }

  const avatarUrl = user.picture || user.fotoUrl || user.foto || user.avatar;

  return (
    <div className="account-container fade-in">
      <div className="profile-layout-card">
        <div className="profile-left-col">
          <div className="profile-avatar-wrapper mb-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user.nome || "Foto de perfil"}
                className="profile-avatar-img"
              />
            ) : (
              <UserCircle size={100} strokeWidth={1.5} className="text-secondary" />
            )}
          </div>

          <button className="btn-profile-admin">
            Modo de Administrador
          </button>
        </div>

        <div className="profile-vertical-divider"></div>

        <div className="profile-right-col">
          <div className="profile-info-group">
            <p><strong>Nome:</strong> <span>{user.nome || "Não informado"}</span></p>
            <p><strong>Email:</strong> <span>{user.email || "Não informado"}</span></p>
            <p><strong>Senha:</strong> <span>••••••••</span></p>
          </div>

          <div className="profile-actions-group">
            <button className="btn-profile-outline">
              Alterar senha
            </button>

            <button className="btn-profile-danger">
              Excluir conta
            </button>

            <button onClick={logout} className="btn-profile-solid">
              Sair da conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}