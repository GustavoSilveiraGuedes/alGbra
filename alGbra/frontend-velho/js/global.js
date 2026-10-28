/**
 * global.js
 * Funcionalidades globais do site:
 * - Sistema de idioma (i18n)
 * - Animações por IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       SISTEMA GLOBAL DE IDIOMA
    ===================================================== */

    const langBtn = document.getElementById('language-toggle');
    const savedLang = localStorage.getItem('preferred-lang') || 'en';

    if (langBtn) {
        // Estado inicial do botão
        langBtn.innerHTML = savedLang === 'pt' ? 'PT-BR' : 'EN-US';

        // Aplica idioma salvo
        changeLanguage(savedLang);

        // Alternar idioma
        langBtn.addEventListener('click', () => {
            const isEn = langBtn.innerHTML.trim() === 'EN-US';
            const newLang = isEn ? 'pt' : 'en';

            langBtn.innerHTML = isEn ? 'PT-BR' : 'EN-US';
            changeLanguage(newLang);
        });
    }

    /* =====================================================
       ANIMAÇÕES GLOBAIS (SCROLL)
    ===================================================== */

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            el.classList.remove('hiddenScroll');
            el.classList.add(el.dataset.animation);
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    document
        .querySelectorAll('[data-animation]')
        .forEach(el => animationObserver.observe(el));
});


/* =====================================================
   FUNÇÃO GLOBAL DE TRADUÇÃO
   (funciona em qualquer página)
===================================================== */

async function changeLanguage(lang) {
    try {
        const body = document.body;

        // Caminhos configuráveis pelo HTML
        const basePath = body.dataset.basePath ?? '.';
        const pagePath = body.dataset.i18nPath ?? 'home';

        const url = `${basePath}i18n/${pagePath}/${lang}.json`
            .replace(/\/{2,}/g, '/');

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${url}`);
        }

        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const attr = el.dataset.i18nAttr;

            if (!translations[key]) return;

            // Se tiver atributo, aplica nele (placeholder, value, etc.)
            if (attr) {
                el.setAttribute(attr, translations[key]);
            } 
            // Senão, aplica como texto normal
            else {
                el.innerHTML = translations[key];
            }
        });

        localStorage.setItem('preferred-lang', lang);

    } catch (error) {
        console.error('Falha na tradução:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const linkLoginHeader = document.getElementById("login");

    if (linkLoginHeader) {
        linkLoginHeader.addEventListener("click", (e) => {
            e.preventDefault();

            const usuarioLogado = localStorage.getItem("usuarioLogado");
            const paginaDestino = usuarioLogado ? "perfil.html" : "login.html";

            // 1. Lê o caminho relativo configurado no <body> da página atual (ex: "../../" ou "./")
            const basePath = document.body.getAttribute("data-base-path") || "./";

            // 2. Aponta para a pasta 'html/account/' (ou a estrutura exata onde está o perfil.html)
            const urlAbsoluta = new URL(`${basePath}html/account/${paginaDestino}`, window.location.href);

            // 3. Redireciona sem errar
            window.location.href = urlAbsoluta.href;
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
            mostrarToast(`Bem-vindo(a), ${data.nome}!`, "sucesso");

            // Aguarda 1.2 segundo para a animação subir e depois redireciona para a raiz
            setTimeout(() => {
                // Sobe de account -> html -> frontend -> raiz do site (index.html)
                window.location.href = "../../../index.html";
            }, 1200);
        } else {
            alert(`Erro no login com Google: ${data.mensagem}`);
        }
    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("Não foi possível conectar ao backend.");
    }
}


// Função reutilizável para exibir avisos no canto da tela (Toasts)
function mostrarToast(mensagem, tipo = "sucesso", tempo = 3000) {
    // Busca ou cria o container de toasts no body
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    // Cria o elemento da mensagem
    const toast = document.createElement("div");
    toast.className = `toast-mensagem ${tipo}`;
    toast.textContent = mensagem;

    container.appendChild(toast);

    // Força o navegador a processar o elemento antes de aplicar a animação de subir
    setTimeout(() => {
        toast.classList.add("mostrar");
    }, 10);

    // Remove o toast automaticamente após o tempo definido (padrão: 3 segundos)
    setTimeout(() => {
        toast.classList.remove("mostrar");
        setTimeout(() => {
            toast.remove();
        }, 300); // Aguarda o fim da transição de opacidade/deslocamento
    }, tempo);
}