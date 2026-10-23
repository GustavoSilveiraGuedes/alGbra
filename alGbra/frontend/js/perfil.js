document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica se existe um usuário logado no localStorage
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    // 2. Preenche os dados do perfil na tela
    document.getElementById("lblNome").textContent = usuario.nome || "Não informado";
    document.getElementById("lblEmail").textContent = usuario.email || "Não informado";

    // 3. Verifica se tem permissão de Admin (deixaremos preparado para quando criarmos chave_adm)
    if (usuario.chaveAdm) {
        document.getElementById("painelAdmin").style.display = "block";
    }

    // 4. Ação do Botão "Sair"
    const btnSair = document.getElementById("btnSair");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
        });
    }

    // 5. Botões de Ação (Avisos por enquanto)
    document.getElementById("btnAlterarSenha").addEventListener("click", () => {
        alert("Funcionalidade de alterar senha será implementada em breve.");
    });

    document.getElementById("btnExcluirConta").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
            alert("Funcionalidade de exclusão de conta será conectada ao backend.");
        }
    });
});