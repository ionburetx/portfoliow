// Galería creativa para diseño y desarrollo
// Lee el parámetro ?style=Nombre para saber qué carpeta mostrar

const creativeStyles = [
    { name: "identidad", title: "Identidad Corporativa", folder: "imagenes/diseño/identidad/7Metropolis/Coasters/", images: ["coaster1.jpg","coaster2.jpg","coaster3.jpg","coaster4.jpg"] },
    { name: "ilustracion", title: "Ilustración", folder: "imagenes/diseño/ilustracion/carteles/", images: ["banatorrela.jpg","Bittore.png","SAN ROKE FIN.jpg"] },
    { name: "otros", title: "Otros Proyectos", folder: "imagenes/diseño/otros/", images: [
        "Packaging cascos 3D.jpg",
        "Packaging cascos planta.jpg",
        "triptico andre mari.jpg",
        "triptico argi2 3d.jpg",
        "triptico la salle.jpg",
        "trptico argi2 trasero.jpg",
        "trptico argi2.jpg"
    ] },
    { name: "Nalion", title: "Nalion (Frontend)", folder: "imagenes/desweb/Nalion/", images: [
        "logo.png",
        "Diseño Cartel película.png",
        "Diseño Logo.png",
        "Página de cada película (Desk Top).png",
        "Página de cada película (Movil).png",
        "Página Principal (movil) horizontal (1).png",
        "Página Principal (movil) horizontal.png",
        "Página principal (Desk Top).png",
        "Página principal (Movil).png",
        "Página principal géneros (Desk Top).png"
    ] },
    { name: "zodiaco", title: "Zodiaco (Frontend)", folder: "imagenes/desweb/zodiaco/", images: ["zodiaco.png"] }
];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function renderGallery(styleName) {
    const gallery = document.getElementById('gallery-cascade');
    if (styleName === 'identidad') {
        // Identidad Corporativa: 6 cards cuadradas, diseño uniforme y clicables
        const identidadData = [
            {
                name: 'Dra',
                img: 'imagenes/diseño/identidad/Dra/logu/egur kolori.png',
                label: 'Dra'
            },
            {
                name: 'Constone',
                img: 'imagenes/diseño/identidad/Constone/constone logo.jpg',
                label: 'Constone'
            },
            {
                name: 'Codigo',
                img: 'imagenes/diseño/identidad/Codigo/codigo logo.jpg',
                label: 'Codigo'
            },
            {
                name: '7Metropolis',
                img: 'imagenes/diseño/identidad/7Metropolis/Logos/logo colaboraciones.png',
                label: '7Metropolis'
            },
            {
                name: 'Kresala',
                img: 'imagenes/diseño/identidad/kresala/kresala 4 jpeg.jpg',
                label: 'Kresala'
            },
            {
                name: 'JCV/EGL',
                img: 'imagenes/diseño/identidad/gaztea/kooperatu.jpg',
                label: 'JCV/EGL'
            }
        ];
        gallery.innerHTML = `
            <div class="creative-styles-grid" style="max-width:600px;margin:2rem auto 0;">
                ${identidadData.map(item => `
                    <div class="creative-style-card identidad-card" data-identidad="${item.name}" tabindex="0">
                        <img src="${item.img}" alt="${item.label}" class="creative-style-img" />
                        <div class="card-overlay"></div>
                        <h3>${item.label}</h3>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('gallery-title').textContent = 'Identidad Corporativa';
        // Añadir funcionalidad clic para futuro modal/info
        document.querySelectorAll('.identidad-card').forEach(card => {
            card.onclick = function() {
                const identidad = card.getAttribute('data-identidad');
                renderIdentidadDetalle(identidad);
            };
        });
        return;
    }
    if (styleName === 'ilustracion') {
        // Carteles
        const carteles = [
            'banatorrela.jpg',
            'Bittore.png',
            'SAN ROKE FIN.jpg',
            'feria.jpg', // Cambiado a la ilustración del cartel de feria
        ];
        const cartelesHtml = `
            <h3 style="color:#fff;text-align:left;margin-bottom:1.2rem;">Carteles</h3>
            <div class="cascade-img-row">
                ${carteles.map((img, idx) => `<div class='cascade-img-wrap'><img src='imagenes/diseño/ilustracion/carteles/${img}' class='cascade-img' alt='Cartel' onclick='openModalIlustracion(${idx})'></div>`).join('')}
            </div>
        `;
        // Otros trabajos
        const otrosImgs = [
            'prest5.jpg',
            'prest4.jpg',
            'prest3.jpg',
            'prest1.jpg',
            'prest 2.jpg',
            'pintzak.jpg',
            'BRUJULI.png',
            'arlequin.png'
        ];
        let otrosHtml = '';
        if (otrosImgs.length > 0) {
            otrosHtml = `
                <h3 style="color:#fff;text-align:left;margin-bottom:1.2rem;">Otros trabajos</h3>
                <div class="cascade-img-row">
                    ${otrosImgs.map((img, idx) => `<div class='cascade-img-wrap'><img src='imagenes/diseño/ilustracion/otros/${img}' class='cascade-img' alt='Otros trabajos' onclick='openModalIlustracion(${carteles.length + idx}, true)'></div>`).join('')}
                </div>
            `;
        }
        gallery.innerHTML = cartelesHtml + otrosHtml;
        document.getElementById('gallery-title').textContent = 'Ilustración';
        // Guardar imágenes para navegación modal
        window.ilustracionImgs = [
            ...carteles.map(img => ({ src: `imagenes/diseño/ilustracion/carteles/${img}`, alt: 'Cartel' })),
            ...otrosImgs.map(img => ({ src: `imagenes/diseño/ilustracion/otros/${img}`, alt: 'Otros trabajos' }))
        ];
    } else if (styleName === 'Nalion') {
        // Galería Nalion: texto y bloques, sin mostrar logo suelto, imágenes grandes, click para fullscreen con navegación
        const nalionImgs = [
            { src: "imagenes/desweb/Nalion/Diseño Logo.png", alt: "Diseño Logo Nalion", label: "El diseño del logo" },
            { src: "imagenes/desweb/Nalion/Diseño Cartel película.png", alt: "Cartel Nalion", label: "Diseño de un cartel de película" },
            { src: "imagenes/desweb/Nalion/Página principal (Desk Top).png", alt: "Principal Desktop", group: "desktop" },
            { src: "imagenes/desweb/Nalion/Página principal géneros (Desk Top).png", alt: "Principal Géneros Desktop", group: "desktop" },
            { src: "imagenes/desweb/Nalion/Página de cada película (Desk Top).png", alt: "Película Desktop", group: "desktop" },
            { src: "imagenes/desweb/Nalion/Página principal (Movil).png", alt: "Principal Móvil", group: "movil-vert" },
            { src: "imagenes/desweb/Nalion/Página de cada película (Movil).png", alt: "Película Móvil", group: "movil-vert" },
            { src: "imagenes/desweb/Nalion/Página Principal (movil) horizontal.png", alt: "Principal Móvil Horizontal", group: "movil-horiz" },
            { src: "imagenes/desweb/Nalion/Página Principal (movil) horizontal (1).png", alt: "Principal Móvil Horizontal 2", group: "movil-horiz" }
        ];
        gallery.innerHTML = `
            <div class="nalion-structure" style="max-width:900px;margin:2rem auto 0;display:flex;flex-direction:column;gap:2.5rem;">
                <div style='margin-bottom:1.5rem;'>
                    <h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>El diseño del logo</h3>
                    <img src="${nalionImgs[0].src}" alt="${nalionImgs[0].alt}" class="nalion-img-full" style="max-width:600px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(0)">
                </div>
                <div style='margin-bottom:1.5rem;'>
                    <h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Diseño de un cartel de película</h3>
                    <img src="${nalionImgs[1].src}" alt="${nalionImgs[1].alt}" class="nalion-img-full" style="max-width:600px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(1)">
                </div>
                <div style='margin-bottom:1.5rem;'>
                    <h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Boceto alta fidelidad para desktop:</h3>
                    <div style='display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;'>
                        <img src="${nalionImgs[2].src}" alt="${nalionImgs[2].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(2)">
                        <img src="${nalionImgs[3].src}" alt="${nalionImgs[3].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(3)">
                        <img src="${nalionImgs[4].src}" alt="${nalionImgs[4].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(4)">
                    </div>
                </div>
                <div style='margin-bottom:1.5rem;'>
                    <h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Boceto alta fidelidad para móvil (vertical):</h3>
                    <div style='display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;'>
                        <img src="${nalionImgs[5].src}" alt="${nalionImgs[5].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(5)">
                        <img src="${nalionImgs[6].src}" alt="${nalionImgs[6].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(6)">
                    </div>
                </div>
                <div style='margin-bottom:1.5rem;'>
                    <h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Boceto alta fidelidad para móvil (horizontal):</h3>
                    <div style='display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;'>
                        <img src="${nalionImgs[7].src}" alt="${nalionImgs[7].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(7)">
                        <img src="${nalionImgs[8].src}" alt="${nalionImgs[8].alt}" class="nalion-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalNalion(8)">
                    </div>
                </div>
            </div>
        `;
        document.getElementById('gallery-title').textContent = 'Nalion (Frontend)';
        // Guardar imágenes en window para navegación modal
        window.nalionImgs = nalionImgs;
        return;
    } else if (styleName === 'portfolio') {
        // Galería Portfolio: bloques de texto e imágenes, click para fullscreen con navegación
        const portfolioImgs = [
            // Desktop
            { src: "imagenes/desweb/PORTFO/Idiomas (DeskTop).png", alt: "Idiomas Desktop", label: "Boceto de alta fidelidad para desktop" },
            { src: "imagenes/desweb/PORTFO/Bienvenida (DeskTop).png", alt: "Bienvenida Desktop" },
            { src: "imagenes/desweb/PORTFO/Línea (DeskTop).png", alt: "Línea Desktop" },
            { src: "imagenes/desweb/PORTFO/Presentación(DeskTop).png", alt: "Presentación Desktop" },
            { src: "imagenes/desweb/PORTFO/Main (DeskTop).png", alt: "Main Desktop" },
            { src: "imagenes/desweb/PORTFO/Fotografía(DeskTop).png", alt: "Fotografía Desktop" },
            { src: "imagenes/desweb/PORTFO/Fotografía Cat Animales(DeskTop).png", alt: "Fotografía Cat Animales Desktop" },
            // Móvil (vertical) - ORDEN PERSONALIZADO
            { src: "imagenes/desweb/PORTFO/Idiomas Movil (Vertical).png", alt: "Idiomas Móvil Vertical", label: "Boceto alta fidelidad para móvil (vertical)" },
            { src: "imagenes/desweb/PORTFO/Bienvenida Movil (Vertical).png", alt: "Bienvenida Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Linea Movil (Vertical).png", alt: "Linea Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Sobre mi Movil (Vertical).png", alt: "Sobre mí Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Diseño Gráfico Movil (Vertical).png", alt: "Diseño Gráfico Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Ide Cor Movil (Vertical) (1).png", alt: "Ide Cor Móvil Vertical 1" },
            { src: "imagenes/desweb/PORTFO/Ide Cor Movil (Vertical) (2).png", alt: "Ide Cor Móvil Vertical 2" },
            { src: "imagenes/desweb/PORTFO/Ide Cor Movil (Vertical) (3).png", alt: "Ide Cor Móvil Vertical 3" },
            { src: "imagenes/desweb/PORTFO/Fotografía Movil (Vertical).png", alt: "Fotografía Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Rama fotográfica Movil (Vertical).png", alt: "Rama fotográfica Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Modal fotografía Movil (Vertical).png", alt: "Modal fotografía Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/CV Movil (Vertical).png", alt: "CV Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Contacto Movil (Vertical).png", alt: "Contacto Móvil Vertical" }
        ];
        let html = `<div class="portfolio-structure" style="max-width:900px;margin:2rem auto 0;display:flex;flex-direction:column;gap:2.5rem;">`;
        // Desktop
        html += `<div style='margin-bottom:1.5rem;'><h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Boceto de alta fidelidad para desktop</h3><div style='display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;'>`;
        for(let i=0;i<=6;i++) {
            html += `<img src="${portfolioImgs[i].src}" alt="${portfolioImgs[i].alt}" class="portfolio-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalPortfolio(${i})">`;
        }
        html += `</div></div>`;
        // Móvil (vertical) ORDEN PERSONALIZADO
        const portfolioMobileImgs = [
            { src: "imagenes/desweb/PORTFO/Idiomas Movil (Vertical).png", alt: "Idiomas Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Bienvenida Movil (Vertical).png", alt: "Bienvenida Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Linea Movil (Vertical).png", alt: "Linea Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Sobre mi Movil (Vertical).png", alt: "Sobre mí Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Diseño Gráfico Movil (Vertical).png", alt: "Diseño Gráfico Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Ide Cor Movil (Vertical) (1).png", alt: "Ide Cor Móvil Vertical 1" },
            { src: "imagenes/desweb/PORTFO/Ide Cor Movil (Vertical) (2).png", alt: "Ide Cor Móvil Vertical 2" },
            { src: "imagenes/desweb/PORTFO/Ide Cor Movil (Vertical) (3).png", alt: "Ide Cor Móvil Vertical 3" },
            { src: "imagenes/desweb/PORTFO/Fotografía Movil (Vertical).png", alt: "Fotografía Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Rama fotográfica Movil (Vertical).png", alt: "Rama fotográfica Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Modal fotografía Movil (Vertical).png", alt: "Modal fotografía Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/CV Movil (Vertical).png", alt: "CV Móvil Vertical" },
            { src: "imagenes/desweb/PORTFO/Contacto Movil (Vertical).png", alt: "Contacto Móvil Vertical" }
        ];
        html += `<div style='margin-bottom:1.5rem;'><h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Boceto alta fidelidad para móvil (vertical)</h3><div style='display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;'>`;
        for(let i=0;i<portfolioMobileImgs.length;i++) {
            html += `<img src="${portfolioMobileImgs[i].src}" alt="${portfolioMobileImgs[i].alt}" class="portfolio-img-full" style="max-width:220px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalPortfolio(${7+i})">`;
        }
        html += `</div></div>`;
        // Móvil (horizontal)
        const portfolioMobileHorizImgs = [
            { src: "imagenes/desweb/PORTFO/Idiomas Movil (Horizontal).png", alt: "Idiomas Móvil Horizontal" },
            { src: "imagenes/desweb/PORTFO/Bienvenida Movil (Horizontal).png", alt: "Bienvenida Móvil Horizontal" },
            { src: "imagenes/desweb/PORTFO/Linea Movil (Horizontal).png", alt: "Linea Móvil Horizontal" }
        ];
        html += `<div style='margin-bottom:1.5rem;'><h3 style='color:#fff;font-size:1.1rem;font-weight:700;margin-bottom:1.2rem;'>Boceto alta fidelidad para móvil (horizontal):</h3><div style='display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;'>`;
        for(let i=0;i<portfolioMobileHorizImgs.length;i++) {
            html += `<img src="${portfolioMobileHorizImgs[i].src}" alt="${portfolioMobileHorizImgs[i].alt}" class="portfolio-img-full" style="max-width:320px;width:100%;height:auto;object-fit:contain;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,0.07);border-radius:0;cursor:pointer;" onclick="openModalPortfolio(${20+i})">`;
        }
        html += `</div></div></div>`;
        gallery.innerHTML = html;
        document.getElementById('gallery-title').textContent = 'Portfolio';
        window.portfolioImgs = portfolioImgs;
        return;
    } else {
        const style = creativeStyles.find(s => s.name === styleName) || creativeStyles[0];
        gallery.innerHTML = style.images.map(img => `<div class="cascade-img-wrap"><img src="${style.folder}${img}" class="cascade-img" alt="${style.title}" onclick="openModal(this.src, this.alt)"></div>`).join('');
        document.getElementById('gallery-title').textContent = style.title;
    }
}

// Utilidad para fondo de modal con imagen
function setModalBackgroundWithImage(modal) {
    if (!modal.querySelector('.modal-bg-img')) {
        const bg = document.createElement('img');
        bg.src = 'imagenes/fondo.jpg';
        bg.alt = '';
        bg.className = 'modal-bg-img';
        bg.style.position = 'fixed';
        bg.style.top = '0';
        bg.style.left = '0';
        bg.style.width = '100vw';
        bg.style.height = '100vh';
        bg.style.objectFit = 'cover';
        bg.style.zIndex = '-1';
        bg.style.filter = 'blur(12px) brightness(0.7)';
        bg.style.pointerEvents = 'none';
        modal.prepend(bg);
    }
}

// Modal fullscreen para imágenes
function openModal(src, alt) {
    let modal = document.getElementById('img-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `<img id='modal-img' style='max-width:90vw;max-height:85vh;border-radius:12px;box-shadow:0 8px 32px 0 rgba(0,0,0,0.25);'><span id='close-modal' style='position:fixed;top:2rem;right:2rem;font-size:2.5rem;color:#fff;cursor:pointer;z-index:10001;'>&times;</span>`;
        document.body.appendChild(modal);
    }
    setModalBackgroundWithImage(modal);
    document.getElementById('modal-img').src = src;
    document.getElementById('modal-img').alt = alt;
    modal.style.background = 'transparent';
    modal.style.display = 'flex';
    document.getElementById('close-modal').onclick = function() {
        modal.style.display = 'none';
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Modal fullscreen para imágenes Ilustración con navegación
function openModalIlustracion(idx) {
    const imgs = window.ilustracionImgs;
    let modal = document.getElementById('img-modal-ilustracion');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal-ilustracion';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <button id='ilustracion-prev' style='position:absolute;left:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&lt;</button>
            <img id='modal-img-ilustracion' style='max-width:96vw;max-height:92vh;box-shadow:0 8px 32px 0 rgba(0,0,0,0.25);border-radius:0;display:block;'>
            <button id='ilustracion-next' style='position:absolute;right:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&gt;</button>
            <span id='close-modal-ilustracion' style='position:fixed;top:2rem;right:2rem;font-size:2.5rem;color:#fff;cursor:pointer;z-index:10001;'>&times;</span>`;
        document.body.appendChild(modal);
    }
    setModalBackgroundWithImage(modal);
    modal.style.background = 'transparent';
    function updateImg() {
        document.getElementById('modal-img-ilustracion').src = imgs[idx].src;
        document.getElementById('modal-img-ilustracion').alt = imgs[idx].alt;
    }
    updateImg();
    modal.style.display = 'flex';
    document.getElementById('close-modal-ilustracion').onclick = function() {
        modal.style.display = 'none';
    };
    document.getElementById('ilustracion-prev').onclick = function(e) {
        e.stopPropagation();
        idx = (idx - 1 + imgs.length) % imgs.length;
        updateImg();
    };
    document.getElementById('ilustracion-next').onclick = function(e) {
        e.stopPropagation();
        idx = (idx + 1) % imgs.length;
        updateImg();
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Modal fullscreen para imágenes Nalion con navegación
function openModalNalion(idx) {
    const imgs = window.nalionImgs;
    let modal = document.getElementById('img-modal-nalion');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal-nalion';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <button id='nalion-prev' style='position:absolute;left:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&#8592;</button>
            <img id='modal-img-nalion' style='max-width:96vw;max-height:92vh;box-shadow:0 8px 32px 0 rgba(0,0,0,0.25);border-radius:0;display:block;'>
            <button id='nalion-next' style='position:absolute;right:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&#8594;</button>
            <span id='close-modal-nalion' style='position:fixed;top:2rem;right:2rem;font-size:2.5rem;color:#fff;cursor:pointer;z-index:10001;'>&times;</span>`;
        document.body.appendChild(modal);
    }
    setModalBackgroundWithImage(modal);
    modal.style.background = 'transparent';
    function updateImg() {
        document.getElementById('modal-img-nalion').src = imgs[idx].src;
        document.getElementById('modal-img-nalion').alt = imgs[idx].alt;
    }
    updateImg();
    modal.style.display = 'flex';
    document.getElementById('close-modal-nalion').onclick = function() {
        modal.style.display = 'none';
    };
    document.getElementById('nalion-prev').onclick = function(e) {
        e.stopPropagation();
        idx = (idx - 1 + imgs.length) % imgs.length;
        updateImg();
    };
    document.getElementById('nalion-next').onclick = function(e) {
        e.stopPropagation();
        idx = (idx + 1) % imgs.length;
        updateImg();
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Modal fullscreen para imágenes Portfolio con navegación
function openModalPortfolio(idx) {
    const imgs = window.portfolioImgs;
    let modal = document.getElementById('img-modal-portfolio');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal-portfolio';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <button id='portfolio-prev' style='position:absolute;left:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&#8592;</button>
            <img id='modal-img-portfolio' style='max-width:96vw;max-height:92vh;box-shadow:0 8px 32px 0 rgba(0,0,0,0.25);border-radius:0;display:block;'>
            <button id='portfolio-next' style='position:absolute;right:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&#8594;</button>
            <span id='close-modal-portfolio' style='position:fixed;top:2rem;right:2rem;font-size:2.5rem;color:#fff;cursor:pointer;z-index:10001;'>&times;</span>`;
        document.body.appendChild(modal);
    }
    setModalBackgroundWithImage(modal);
    modal.style.background = 'transparent';
    function updateImg() {
        document.getElementById('modal-img-portfolio').src = imgs[idx].src;
        document.getElementById('modal-img-portfolio').alt = imgs[idx].alt;
    }
    updateImg();
    modal.style.display = 'flex';
    document.getElementById('close-modal-portfolio').onclick = function() {
        modal.style.display = 'none';
    };
    document.getElementById('portfolio-prev').onclick = function(e) {
        e.stopPropagation();
        idx = (idx - 1 + imgs.length) % imgs.length;
        updateImg();
    };
    document.getElementById('portfolio-next').onclick = function(e) {
        e.stopPropagation();
        idx = (idx + 1) % imgs.length;
        updateImg();
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Nueva función para mostrar el detalle de cada identidad
function renderIdentidadDetalle(identidad) {
    const gallery = document.getElementById('gallery-cascade');
    let html = '';
    if (identidad === 'Dra') {
        html += `<h2 style='color:#fff;margin-bottom:1.5rem;'>Dra</h2>`;
        // Logos (todos los indicados)
        const logos = [
            "dradultz.png",
            "dradultb.png",
            "drachild.png",
            "drachildb.png",
            "azulejo1.png",
            "azulejo5.png",
            "egurre4.png",
            "egur kolori.png"
        ];
        html += `<h3 style='color:#fff;margin:1.2rem 0 0.7rem;'>Logotipos</h3><div class='cascade-img-row'>`;
        logos.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Dra/logu/${img}' class='cascade-img dra-img' alt='Logo Dra' data-dra-idx='${idx}' data-dra-group='logo'></div>`;
        });
        html += `</div>`;
        // Tarjetas
        const tarjetas = ["tarjeti2.png","tarjeti3.png","tarjetiber.png","tarjetizb.png"];
        html += `<h3 style='color:#fff;margin:1.2rem 0 0.7rem;'>Tarjetas</h3><div class='cascade-img-row'>`;
        tarjetas.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Dra/Tarjeta/${img}' class='cascade-img dra-img' alt='Tarjeta Dra' data-dra-idx='${logos.length+idx}' data-dra-group='tarjetas'></div>`;
        });
        html += `</div>`;
        // Flyers
        const flyers = ["HOTEL ADULT ANVERSO.jpg","HOTEL ADULT REVERSO2.jpg","HOTEL CHILD ANVERSO.jpg","HOTEL CHILD REVERSO 2.jpg"];
        html += `<h3 style='color:#fff;margin:1.2rem 0 0.7rem;'>Flyers</h3><div class='cascade-img-row'>`;
        flyers.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Dra/flyers/${img}' class='cascade-img dra-img' alt='Flyer Dra' data-dra-idx='${logos.length+tarjetas.length+idx}' data-dra-group='flyers'></div>`;
        });
        html += `</div>`;
        // Mailing
        const mailing = ["definitibu nagusi 2.jpg","definitibu txiki.jpg","dra!paris.jpg"];
        html += `<h3 style='color:#fff;margin:1.2rem 0 0.7rem;'>Mailing</h3><div class='cascade-img-row'>`;
        mailing.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Dra/Mailing/${img}' class='cascade-img dra-img' alt='Mailing Dra' data-dra-idx='${logos.length+tarjetas.length+flyers.length+idx}' data-dra-group='mailing'></div>`;
        });
        html += `</div>`;
        // Banners
        const banners = ["facebokprest.jpg","facebokprest2.jpg"];
        html += `<h3 style='color:#fff;margin:1.2rem 0 0.7rem;'>Banners</h3><div class='cascade-img-row'>`;
        banners.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Dra/Banners/${img}' class='cascade-img dra-img' alt='Banner Dra' data-dra-idx='${logos.length+tarjetas.length+flyers.length+mailing.length+idx}' data-dra-group='banners'></div>`;
        });
        html += `</div>`;
        // Guardar todas las imágenes en orden para navegación
        window.draImgs = [
            ...logos.map(img => ({ src: `imagenes/diseño/identidad/Dra/logu/${img}`, alt: 'Logo Dra' })),
            ...tarjetas.map(img => ({ src: `imagenes/diseño/identidad/Dra/Tarjeta/${img}`, alt: 'Tarjeta Dra' })),
            ...flyers.map(img => ({ src: `imagenes/diseño/identidad/Dra/flyers/${img}`, alt: 'Flyer Dra' })),
            ...mailing.map(img => ({ src: `imagenes/diseño/identidad/Dra/Mailing/${img}`, alt: 'Mailing Dra' })),
            ...banners.map(img => ({ src: `imagenes/diseño/identidad/Dra/Banners/${img}`, alt: 'Banner Dra' }))
        ];
        setTimeout(() => {
            document.querySelectorAll('.dra-img').forEach(img => {
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openModalDra(parseInt(img.getAttribute('data-dra-idx')));
                });
            });
        }, 0);
    } else if (identidad === 'Kresala') {
        html += `<h2 style='color:#fff;margin-bottom:1.5rem;'>Logo</h2>`;
        const kresalaImgs = [
            'kresala 1 negatibo.jpg',
            'kresala 2 negatibo.jpg',
            'kresala 2.png',
            'kresala 4 jpeg.jpg'
        ];
        html += `<div class='cascade-img-row'>`;
        kresalaImgs.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/kresala/${img}' class='cascade-img identidad-img' alt='Logo Kresala' data-identidad-idx='${idx}' data-identidad='Kresala'></div>`;
        });
        html += `</div>`;
        window.KresalaImgs = kresalaImgs.map(img => ({ src: `imagenes/diseño/identidad/kresala/${img}`, alt: 'Logo Kresala' }));
    } else if (identidad === 'JCV/EGL') {
        html += `<h2 style='color:#fff;margin-bottom:1.5rem;'>Logos</h2>`;
        const logos = [
            'kooperatu.jpg',
            'Irribarre eginez.jpg'
        ];
        html += `<div class='cascade-img-row'>`;
        logos.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/gaztea/${img}' class='cascade-img identidad-img' alt='Logo JCV/EGL' data-identidad-idx='${idx}' data-identidad='JCV/EGL'></div>`;
        });
        html += `</div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Merchandising</h2>`;
        const merch = [
            'kamiseta (irribarre eginez).jpg',
            'kamiseta (Kooperatu).jpg'
        ];
        html += `<div class='cascade-img-row'>`;
        merch.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/gaztea/${img}' class='cascade-img identidad-img' alt='Merchandising JCV/EGL' data-identidad-idx='${logos.length+idx}' data-identidad='JCV/EGL'></div>`;
        });
        html += `</div>`;
        window['JCV/EGLImgs'] = [
            ...logos.map(img => ({ src: `imagenes/diseño/identidad/gaztea/${img}`, alt: 'Logo JCV/EGL' })),
            ...merch.map(img => ({ src: `imagenes/diseño/identidad/gaztea/${img}`, alt: 'Merchandising JCV/EGL' }))
        ];
    } else if (identidad === 'Codigo') {
        html += `<h2 style='color:#fff;margin-bottom:1.5rem;'>Logo</h2>`;
        html += `<div class='cascade-img-row'><div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Codigo/codigo logo.jpg' class='cascade-img identidad-img' alt='Logo Codigo' data-identidad-idx='0' data-identidad='Codigo'></div></div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Papelería</h2>`;
        html += `<div class='cascade-img-row'><div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Codigo/codigo papeleria.jpg' class='cascade-img identidad-img' alt='Papelería Codigo' data-identidad-idx='1' data-identidad='Codigo'></div></div>`;
        window.CodigoImgs = [
            { src: 'imagenes/diseño/identidad/Codigo/codigo logo.jpg', alt: 'Logo Codigo' },
            { src: 'imagenes/diseño/identidad/Codigo/codigo papeleria.jpg', alt: 'Papelería Codigo' }
        ];
    } else if (identidad === 'Constone') {
        html += `<h2 style='color:#fff;margin-bottom:1.5rem;'>Logo</h2>`;
        html += `<div class='cascade-img-row'><div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Constone/constone logo.jpg' class='cascade-img identidad-img' alt='Logo Constone' data-identidad-idx='0' data-identidad='Constone'></div></div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Papelería</h2>`;
        html += `<div class='cascade-img-row'>`;
        html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Constone/constone papeleria.jpg' class='cascade-img identidad-img' alt='Papelería Constone' data-identidad-idx='1' data-identidad='Constone'></div>`;
        html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Constone/constone papeleria2.jpg' class='cascade-img identidad-img' alt='Papelería Constone 2' data-identidad-idx='2' data-identidad='Constone'></div>`;
        html += `</div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Merchandising</h2>`;
        html += `<div class='cascade-img-row'>`;
        html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Constone/constone camiseta.jpg' class='cascade-img identidad-img' alt='Camiseta Constone' data-identidad-idx='3' data-identidad='Constone'></div>`;
        html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/Constone/constone vehiculo.jpg' class='cascade-img identidad-img' alt='Vehículo Constone' data-identidad-idx='4' data-identidad='Constone'></div>`;
        html += `</div>`;
        window.ConstoneImgs = [
            { src: 'imagenes/diseño/identidad/Constone/constone logo.jpg', alt: 'Logo Constone' },
            { src: 'imagenes/diseño/identidad/Constone/constone papeleria.jpg', alt: 'Papelería Constone' },
            { src: 'imagenes/diseño/identidad/Constone/constone papeleria2.jpg', alt: 'Papelería Constone 2' },
            { src: 'imagenes/diseño/identidad/Constone/constone camiseta.jpg', alt: 'Camiseta Constone' },
            { src: 'imagenes/diseño/identidad/Constone/constone vehiculo.jpg', alt: 'Vehículo Constone' }
        ];
    } else if (identidad === '7Metropolis') {
        html += `<h2 style='color:#fff;margin-bottom:1.5rem;'>Logos</h2>`;
        const logos = [
            'logo.jpg',
            'logo colaboraciones.png',
            'logocircular1.png',
            'logocircular2.png'
        ];
        html += `<div class='cascade-img-row'>`;
        logos.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/7Metropolis/Logos/${img}' class='cascade-img identidad-img' alt='Logo 7Metropolis' data-identidad-idx='${idx}' data-identidad='7Metropolis'></div>`;
        });
        html += `</div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Posavasos</h2>`;
        const posavasos = [
            'c.png',
            'menu american ugly.png',
            'menu black bear.png',
            'menu horacio barbato.png',
            'menu osaki.png',
            'posavasos frontal.jpg',
            'posavasos trasero.jpg'
        ];
        html += `<div class='cascade-img-row'>`;
        posavasos.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/7Metropolis/Posavasos/${img}' class='cascade-img identidad-img' alt='Posavasos 7Metropolis' data-identidad-idx='${logos.length+idx}' data-identidad='7Metropolis'></div>`;
        });
        html += `</div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Etiquetas</h2>`;
        const etiquetas = [
            'etiqueta vino.jpg',
            'etiquetas vino.png'
        ];
        html += `<div class='cascade-img-row'>`;
        etiquetas.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/7Metropolis/Etiquetas/${img}' class='cascade-img identidad-img' alt='Etiqueta 7Metropolis' data-identidad-idx='${logos.length+posavasos.length+idx}' data-identidad='7Metropolis'></div>`;
        });
        html += `</div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Coasters</h2>`;
        const coasters = [
            'coaster1.jpg',
            'coaster2.jpg',
            'coaster3.jpg',
            'coaster4.jpg'
        ];
        html += `<div class='cascade-img-row'>`;
        coasters.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/7Metropolis/Coasters/${img}' class='cascade-img identidad-img' alt='Coaster 7Metropolis' data-identidad-idx='${logos.length+posavasos.length+etiquetas.length+idx}' data-identidad='7Metropolis'></div>`;
        });
        html += `</div>`;
        html += `<h2 style='color:#fff;margin:2rem 0 1.5rem;'>Tarjetas</h2>`;
        const tarjetas = [
            'tarjeta 3d.png',
            'tarjeta frontal.jpg',
            'tarjeta trasera1.jpg'
        ];
        html += `<div class='cascade-img-row'>`;
        tarjetas.forEach((img, idx) => {
            html += `<div class='cascade-img-wrap'><img src='imagenes/diseño/identidad/7Metropolis/Tarjetas/${img}' class='cascade-img identidad-img' alt='Tarjeta 7Metropolis' data-identidad-idx='${logos.length+posavasos.length+etiquetas.length+coasters.length+idx}' data-identidad='7Metropolis'></div>`;
        });
        html += `</div>`;
        window['7MetropolisImgs'] = [
            ...logos.map(img => ({ src: `imagenes/diseño/identidad/7Metropolis/Logos/${img}`, alt: 'Logo 7Metropolis' })),
            ...posavasos.map(img => ({ src: `imagenes/diseño/identidad/7Metropolis/Posavasos/${img}`, alt: 'Posavasos 7Metropolis' })),
            ...etiquetas.map(img => ({ src: `imagenes/diseño/identidad/7Metropolis/Etiquetas/${img}`, alt: 'Etiqueta 7Metropolis' })),
            ...coasters.map(img => ({ src: `imagenes/diseño/identidad/7Metropolis/Coasters/${img}`, alt: 'Coaster 7Metropolis' })),
            ...tarjetas.map(img => ({ src: `imagenes/diseño/identidad/7Metropolis/Tarjetas/${img}`, alt: 'Tarjeta 7Metropolis' }))
        ];
    } else {
        html += `<h2 style='color:#fff;'>${identidad}</h2><p style='color:#fff;'>Próximamente contenido para esta identidad.</p>`;
    }
    gallery.innerHTML = html;
    // Asignar evento onclick a todas las imágenes de identidad (excepto Dra)
    if (identidad === 'Dra') {
        window.DraImgs = window.draImgs;
        setTimeout(() => {
            document.querySelectorAll('.dra-img').forEach(img => {
                img.onclick = function(e) {
                    e.stopPropagation();
                    const idx = parseInt(img.getAttribute('data-dra-idx'));
                    openModalIdentidad(idx, 'Dra');
                };
            });
        }, 0);
    } else if (['Kresala','JCV/EGL','Codigo','Constone','7Metropolis'].includes(identidad)) {
        setTimeout(() => {
            document.querySelectorAll('.identidad-img').forEach(img => {
                img.onclick = function() {
                    const idx = parseInt(img.getAttribute('data-identidad-idx'));
                    const identidad = img.getAttribute('data-identidad');
                    openModalIdentidad(idx, identidad);
                };
            });
        }, 0);
    }
}

// Modal fullscreen para imágenes de Identidad (incluido Dra) con navegación
function openModalIdentidad(idx, identidad) {
    const imgs = window[identidad + 'Imgs'] || window[identidad.replace('/', '') + 'Imgs'];
    if (!imgs || !imgs.length) return;
    let modal = document.getElementById('img-modal-identidad');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal-identidad';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
            <button id='identidad-prev' style='position:absolute;left:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&lt;</button>
            <img id='modal-img-identidad' style='max-width:96vw;max-height:92vh;box-shadow:0 8px 32px 0 rgba(0,0,0,0.25);border-radius:0;display:block;'>
            <button id='identidad-next' style='position:absolute;right:2rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:3rem;color:#fff;cursor:pointer;z-index:10001;'>&gt;</button>
            <span id='close-modal-identidad' style='position:fixed;top:2rem;right:2rem;font-size:2.5rem;color:#fff;cursor:pointer;z-index:10001;'>&times;</span>`;
        document.body.appendChild(modal);
    }
    setModalBackgroundWithImage(modal);
    modal.style.background = 'transparent';
    function updateImg() {
        document.getElementById('modal-img-identidad').src = imgs[idx].src;
        document.getElementById('modal-img-identidad').alt = imgs[idx].alt;
    }
    updateImg();
    modal.style.display = 'flex';
    document.getElementById('close-modal-identidad').onclick = function() {
        modal.style.display = 'none';
    };
    document.getElementById('identidad-prev').onclick = function(e) {
        e.stopPropagation();
        idx = (idx - 1 + imgs.length) % imgs.length;
        updateImg();
    };
    document.getElementById('identidad-next').onclick = function(e) {
        e.stopPropagation();
        idx = (idx + 1) % imgs.length;
        updateImg();
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

function goToStyle(idx) {
    const style = creativeStyles[idx];
    window.location.href = `galeria_creativa.html?style=${encodeURIComponent(style.name)}`;
}

window.onload = function() {
    const styleName = getQueryParam('style') || creativeStyles[0].name;
    renderGallery(styleName);
    // Cerrar galería
    document.getElementById('close-gallery').onclick = function() {
        window.location.href = 'index.html';
    };
    // Deshabilita flechas para diseño gráfico y desarrollo web
    const onlyOne = ['ilustracion', 'identidad', 'otros'];
    if (onlyOne.includes(styleName)) {
        document.getElementById('prev-style').style.display = 'none';
        document.getElementById('next-style').style.display = 'none';
    } else {
        // Flecha atrás
        document.getElementById('prev-style').onclick = function() {
            const idx = creativeStyles.findIndex(s => s.name === styleName);
            goToStyle((idx - 1 + creativeStyles.length) % creativeStyles.length);
        };
        // Flecha adelante
        document.getElementById('next-style').onclick = function() {
            const idx = creativeStyles.findIndex(s => s.name === styleName);
            goToStyle((idx + 1) % creativeStyles.length);
        };
    }
};
