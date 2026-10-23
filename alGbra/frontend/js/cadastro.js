document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nome = document.getElementById("iname").value;
            const email = document.getElementById("iemal").value;
            const senha = document.getElementById("ipassword").value;
            const confirmPassword = document.getElementById("iconfirmPassword").value;

            // Validação de confirmação de senha no frontend
            if (senha !== confirmPassword) {
                alert("As senhas não coincidem.");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nome, email, senha })
                });

                const data = await response.json();

                if (response.ok) { // Status 201 CREATED
                    window.location.href = "login.html";
                    alert("Usuário cadastrado com sucesso!");
                } else { // Trata exceções disparadas pelo UsuarioService (ex: e-mail duplicado)
                    alert(`Erro no cadastro: ${data.mensagem}`);
                }

            } catch (error) {
                console.error("Erro ao conectar com o backend:", error);
                alert("Não foi possível conectar ao servidor. Verifique se o Spring Boot está rodando.");
            }
        });
    }
});

window.onload = function () {
    // 1. Inicializa o Google Accounts
    google.accounts.id.initialize({
        client_id: "154431325898-rspn81ndile98j638331324b7ugpmkhs.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    // 2. Renderiza o botão oficial na tela de cadastro
    google.accounts.id.renderButton(
        document.getElementById("buttonDivContainer"),
        { theme: "outline", size: "large" }
    );
};

// 3. Função que recebe o token do Google e envia para o backend
async function handleCredentialResponse(response) {
    try {
        const apiResponse = await fetch("http://localhost:8080/api/usuarios/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: response.credential })
        });

        const data = await apiResponse.json();

        if (apiResponse.ok) {
            // Guarda a sessão do utilizador logado no navegador
            localStorage.setItem("usuarioLogado", JSON.stringify(data));
            alert(`Conta vinculada com sucesso! Bem-vindo(a), ${data.nome}!`);
            window.location.href = "../../../index.html";
        } else {
            alert(`Erro no cadastro via Google: ${data.mensagem}`);
        }
    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("Não foi possível conectar ao servidor Spring Boot.");
    }
}

