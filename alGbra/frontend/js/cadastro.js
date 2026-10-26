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
                mostrarToast("As senhas não coincidem.", "alerta");
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
                    mostrarToast("Usuário cadastrado com sucesso!", "sucesso");
                    
                    // Aguarda 1.5 segundo para o usuário ver o toast antes de mudar de página
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1500);
                } else {
                    mostrarToast(`Erro no cadastro: ${data.mensagem}`, "erro");
                }

            } catch (error) {
                console.error("Erro ao conectar com o backend:", error);
                alert("Não foi possível conectar ao servidor. Spring Boot não está rodando.");
            }
        });
    }
});


