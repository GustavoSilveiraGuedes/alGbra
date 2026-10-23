document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("iemal").value;
            const senha = document.getElementById("ipassword").value;

            try {
                const response = await fetch("http://localhost:8080/api/usuarios/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) { // Status 200 OK
                    // Salva os dados do usuário logado na sessão local do navegador
                    localStorage.setItem("usuarioLogado", JSON.stringify(data));

                    window.location.href = "../../../index.html";
                    alert(`Bem-vindo(a), ${data.nome}!`);
                } else { // Trata exceções do GlobalExceptionHandler (ex: e-mail ou senha incorretos)
                    alert(`Erro no login: ${data.mensagem}`);
                }

            } catch (error) {
                console.error("Erro ao conectar com o backend:", error);
                alert("Não foi possível conectar ao servidor. Verifique se o Spring Boot está rodando.");
            }
        });
    }
});

window.onload = function () {
    // 1. Inicializa o botão nativo do Google
    google.accounts.id.initialize({
        client_id: "154431325898-rspn81ndile98j638331324b7ugpmkhs.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    // 2. Renderiza o botão oficial do Google dentro da div
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
    );
};

// 3. Callback chamado automaticamente quando o usuário faz login no pop-up do Google
async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

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
            // Guarda a sessão e redireciona
            localStorage.setItem("usuarioLogado", JSON.stringify(data));
            alert(`Bem-vindo(a) via Google, ${data.nome}!`);
            window.location.href = "../../../index.html";
        } else {
            alert(`Erro no login com Google: ${data.mensagem}`);
        }
    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("Não foi possível conectar ao backend.");
    }
}