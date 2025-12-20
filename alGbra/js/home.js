document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO ACORDEÃO ---
    const accordionHeaders = document.querySelectorAll('.subject-card .set');

    const updateHeight = (card) => {
        const content = card.querySelector('.content');
        if (card.classList.contains('active')) {
            // Recalcula o scrollHeight atual (importante para quando os cards empilham)
            content.style.maxHeight = `${content.scrollHeight + 60}px`;
        }
    };

    const toggleAccordion = (header) => {
        const card = header.closest('.subject-card');
        const content = card.querySelector('.content');
        const isActive = card.classList.contains('active');

        document.querySelectorAll('.subject-card').forEach(item => {
            if (item !== card) {
                item.classList.remove('active');
                item.querySelector('.content').style.maxHeight = '0';
            }
        });

        if (!isActive) {
            card.classList.add('active');
            updateHeight(card);
        } else {
            card.classList.remove('active');
            content.style.maxHeight = '0';
        }
    };

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
    });

    // RECALCULAR AO REDIMENSIONAR: Garante que o card não suma ao diminuir a tela
    window.addEventListener('resize', () => {
        const activeCard = document.querySelector('.subject-card.active');
        if (activeCard) {
            updateHeight(activeCard);
        }
    });

    // --- ANIMAÇÃO NO SCROLL ---
    const animatedElements = document.querySelectorAll('[data-animation]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.remove('hiddenScroll');
                el.classList.add(el.dataset.animation);
                observer.unobserve(el);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
});