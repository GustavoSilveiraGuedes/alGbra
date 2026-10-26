document.addEventListener("DOMContentLoaded", () => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    // Preenche os dados do usuário
    document.getElementById("lblNome").textContent = usuario.nome || "Não informado";
    document.getElementById("lblEmail").textContent = usuario.email || "Não informado";

    // Se no futuro houver fotoUrl gravada no localStorage
    if (usuario.fotoUrl) {
        const img = document.getElementById("imgPerfil");
        const svgPadrao = document.getElementById("svgPerfilPadrao");
        img.src = usuario.fotoUrl;
        img.style.display = "block";
        svgPadrao.style.display = "none";
    }

    // Botão de alterar foto (apenas aviso por enquanto)
    document.getElementById("btnAlterarFoto").addEventListener("click", () => {
        alert("Em breve você poderá fazer upload da sua foto de perfil!");
    });

    // Botão Modo Admin (Layout / alternância visual por enquanto)
    const btnAdmin = document.getElementById("btnAtivarAdmin");
    const painelAdmin = document.getElementById("painelAdmin");

    btnAdmin.addEventListener("click", () => {
        if (painelAdmin.style.display === "none" || painelAdmin.style.display === "") {
            painelAdmin.style.display = "block";
            btnAdmin.classList.replace("btn-outline-warning", "btn-warning");
            btnAdmin.textContent = "Ocultar Painel ADM";
        } else {
            painelAdmin.style.display = "none";
            btnAdmin.classList.replace("btn-warning", "btn-outline-warning");
            btnAdmin.textContent = "Modo de Administrador";
        }
    });

    // Ação do Botão "Sair"
    document.getElementById("btnSair").addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    });
});