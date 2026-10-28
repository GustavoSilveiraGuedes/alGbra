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
                    // Salva os dados do usuário na sessão local
                    localStorage.setItem("usuarioLogado", JSON.stringify(data));

                    mostrarToast(`Bem-vindo(a), ${data.nome}!`, "sucesso");
                    
                    // Aguarda 1.2 segundo para a animação subir e depois redireciona para a raiz
                    setTimeout(() => {
                        // Sobe de account -> html -> frontend -> raiz do site (index.html)
                        window.location.href = "../../../index.html";
                    }, 1200);
                } else {
                    mostrarToast(`Erro no login: ${data.mensagem}`, "erro");
                }

            } catch (error) {
                console.error("Erro ao conectar com o backend:", error);
                alert("Não foi possível conectar ao servidor. Spring Boot não está rodando.");
            }
        });
    }
});
