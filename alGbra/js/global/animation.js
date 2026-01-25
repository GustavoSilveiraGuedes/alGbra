/**
 * animations.js
 * Animações globais baseadas em IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
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

    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });

});
