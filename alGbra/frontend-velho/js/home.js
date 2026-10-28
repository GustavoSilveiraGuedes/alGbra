/**
 * main.js
 * Lógica específica da página Home
 */
document.addEventListener('DOMContentLoaded', () => {

    initAccordions();

    /* ------------------------------
       ACORDEÕES
    ------------------------------ */
    function initAccordions() {
        const headers = document.querySelectorAll('.subject-card .set');

        const updateHeight = (card) => {
            const content = card.querySelector('.content');
            content.style.maxHeight = card.classList.contains('active')
                ? `${content.scrollHeight}px`
                : '0';
        };

        const resetAnimations = (card) => {
            card.querySelectorAll('.content [data-animation]').forEach(el => {
                el.classList.remove(el.dataset.animation);
                el.classList.add('hiddenScroll');
                void el.offsetWidth; // força reflow para permitir reanimação
            });
        };

        const toggleAccordion = (header) => {
            const card = header.closest('.subject-card');
            const isActive = card.classList.contains('active');

            // Fecha os outros
            document.querySelectorAll('.subject-card').forEach(item => {
                if (item !== card) {
                    item.classList.remove('active');
                    item.querySelector('.content').style.maxHeight = '0';
                    resetAnimations(item);
                }
            });

            // Fecha o atual
            if (isActive) {
                card.classList.remove('active');
                card.querySelector('.content').style.maxHeight = '0';
                resetAnimations(card);
                return;
            }

            // Abre o atual
            card.classList.add('active');
            updateHeight(card);
        };

        headers.forEach(header => {
            header.addEventListener('click', () => toggleAccordion(header));
        });

        // Ajusta altura ao redimensionar
        window.addEventListener('resize', () => {
            const active = document.querySelector('.subject-card.active');
            if (active) updateHeight(active);
        });
    }
});
