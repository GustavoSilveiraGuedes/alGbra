document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================================
    // PARTE 1: LÓGICA DO ACORDEÃO (Accordion) - ATUALIZADA
    // =========================================================================
    
    const accordionHeaders = document.querySelectorAll('.set');

    function closeAllContents(currentHeader) {
        accordionHeaders.forEach(header => {
            if (header !== currentHeader) {
                // Encontra o card pai
                const card = header.closest('.subject-card');
                const content = header.nextElementSibling;
                
                if (card) card.classList.remove('active');
                
                if (content && content.classList.contains('content')) {
                    content.classList.remove('active-content');
                    content.style.maxHeight = "0";
                }
            }
        });
    }

    accordionHeaders.forEach(header => {
        const content = header.nextElementSibling;
        const card = header.closest('.subject-card'); // Pega o container pai
        
        if (content && content.classList.contains('content')) {
             content.style.maxHeight = "0";

             header.addEventListener('click', function(e) {
                 e.preventDefault();
                
                 // Fecha os outros
                 closeAllContents(header);

                 // Alterna a classe no CARD PAI (isso ativa a borda e a cor no CSS)
                 if (card) card.classList.toggle('active');

                 // Alterna classes antigas por segurança/compatibilidade
                 header.classList.toggle('active-geo');
                 content.classList.toggle('active-content');
                
                 // Gerencia a altura
                 if (content.classList.contains('active-content')) {
                     // Ao abrir, somamos um pouco de respiro para o padding
                     content.style.maxHeight = content.scrollHeight + 50 + "px"; 
                 } else {
                     content.style.maxHeight = "0";
                 }
             });
        }
    });

    // =========================================================================
    // PARTE 2: LÓGICA DE ANIMAÇÃO NO SCROLL (Permanece igual)
    // =========================================================================
    const animatedElements = document.querySelectorAll('[data-animation]'); 

    animatedElements.forEach(el => {
        if (!el.classList.contains('hiddenScroll')) {
            el.classList.add('hiddenScroll');
        }
    });

    const observerOptions = {
        root: null, 
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.0 
    };

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.getAttribute('data-animation'); 
                element.classList.remove('hiddenScroll');
                if (animationClass) {
                    element.classList.add(animationClass); 
                }
                observer.unobserve(element);
            }
        });
    }

    const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
});