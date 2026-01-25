/**
 * language.js
 * Sistema GLOBAL de idioma (100% funcional)
 */

document.addEventListener('DOMContentLoaded', () => {

    const langBtn = document.getElementById('language-toggle');
    if (!langBtn) return;

    const savedLang = localStorage.getItem('preferred-lang') || 'en';

    langBtn.innerHTML = savedLang === 'pt' ? 'PT-BR' : 'EN-US';
    changeLanguage(savedLang);

    langBtn.addEventListener('click', () => {
        const isEn = langBtn.innerHTML.trim() === 'EN-US';
        const newLang = isEn ? 'pt' : 'en';

        langBtn.innerHTML = isEn ? 'PT-BR' : 'EN-US';
        changeLanguage(newLang);
    });
});


async function changeLanguage(lang) {
    try {
        const body = document.body;

        const basePath = body.dataset.basePath ?? '.';
        const pagePath = body.dataset.i18nPath ?? 'home';

        // 🚨 SEM barra inicial
        const url = `${basePath}/i18n/${pagePath}/${lang}.json`
            .replace(/\/{2,}/g, '/');

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao carregar ${url}`);

        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[key]) {
                el.innerHTML = translations[key];
            }
        });

        localStorage.setItem('preferred-lang', lang);

    } catch (error) {
        console.error('Falha na tradução:', error);
    }
}
