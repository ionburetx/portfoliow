// Portfolio 2025 - Animaciones, Tabs, Galería Fullscreen

document.addEventListener('DOMContentLoaded', () => {
    // Tabs principales
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            document.querySelectorAll('.category-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Subcategorías
    document.querySelectorAll('.subcategory-tabs').forEach(tabGroup => {
        tabGroup.querySelectorAll('.sub-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                tabGroup.parentElement.querySelectorAll('.sub-content').forEach(content => {
                    content.classList.remove('active');
                });
                tabGroup.parentElement.querySelector('#' + target).classList.add('active');
                tabGroup.querySelectorAll('.sub-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // Animaciones scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Galería Fotografía - Fullscreen
    const modal = document.getElementById('fullscreen-modal');
    const modalImg = modal?.querySelector('.modal-img');
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            if (modal && modalImg) {
                modal.classList.add('active');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            }
        });
    });
    modal?.querySelector('.close-modal')?.addEventListener('click', () => {
        modal.classList.remove('active');
        modalImg.src = '';
    });
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    });

    // Fotografía estilos: click para abrir galería
    document.querySelectorAll('.photo-style-card').forEach(card => {
        card.addEventListener('click', function() {
            const style = card.getAttribute('data-style');
            // Guarda el scroll actual
            sessionStorage.setItem('photoScroll', window.scrollY);
            window.location.href = `galeria.html?style=${encodeURIComponent(style)}`;
        });
    });

    // Diseño y Desarrollo: click para abrir galería creativa
    document.querySelectorAll('.creative-style-card').forEach(card => {
        card.addEventListener('click', function() {
            const style = card.getAttribute('data-style');
            sessionStorage.setItem('creativeScroll', window.scrollY);
            window.location.href = `galeria_creativa.html?style=${encodeURIComponent(style)}`;
        });
    });

    // Al volver de la galería, restaurar scroll
    window.addEventListener('pageshow', function(event) {
        if (sessionStorage.getItem('photoScroll')) {
            window.scrollTo(0, parseInt(sessionStorage.getItem('photoScroll'), 10));
            sessionStorage.removeItem('photoScroll');
        }
        if (sessionStorage.getItem('creativeScroll')) {
            window.scrollTo(0, parseInt(sessionStorage.getItem('creativeScroll'), 10));
            sessionStorage.removeItem('creativeScroll');
        }
    });
});
