document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.subject-card .set');

    // --- 1. LÓGICA DE ANIMAÇÃO NO SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animation = el.dataset.animation;
                el.classList.add(animation);
                el.classList.remove('hiddenScroll');
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-animation]').forEach(el => observer.observe(el));

    // --- 2. LÓGICA DO ACORDEÃO ---
    const updateHeight = (card) => {
        const content = card.querySelector('.content');
        if (card.classList.contains('active')) {
            content.style.maxHeight = `${content.scrollHeight + 60}px`;
        }
    };

    const toggleAccordion = (header) => {
        const card = header.closest('.subject-card');
        const isActive = card.classList.contains('active');

        // Fechar outros e resetar APENAS o conteúdo interno deles
        document.querySelectorAll('.subject-card').forEach(item => {
            if (item !== card) {
                item.classList.remove('active');
                item.querySelector('.content').style.maxHeight = '0';
                
                // NOTA: Resetamos apenas o que está DENTRO de .content
                item.querySelectorAll('.content [data-animation]').forEach(el => {
                    el.classList.remove(el.dataset.animation);
                    el.classList.add('hiddenScroll');
                });
            }
        });

        if (!isActive) {
            card.classList.add('active');
            updateHeight(card);
        } else {
            card.classList.remove('active');
            card.querySelector('.content').style.maxHeight = '0';
            
            // Resetamos apenas o conteúdo interno ao fechar
            card.querySelectorAll('.content [data-animation]').forEach(el => {
                el.classList.remove(el.dataset.animation);
                el.classList.add('hiddenScroll');
            });
        }
    };

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
    });

    window.addEventListener('resize', () => {
        const activeCard = document.querySelector('.subject-card.active');
        if (activeCard) updateHeight(activeCard);
    });
});