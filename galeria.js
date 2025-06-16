// Página de galería para cada estilo fotográfico
// Lee el parámetro ?style=Nombre para saber qué carpeta mostrar

const styleNames = [
    "Arquitectura",
    "Calle",
    "Estilo de vida",
    "Naturaleza",
    "Paisaje",
    "Producto",
    "Retratos"
];

const styleFolders = {
    "Animal": "./imagenes/Animal/Fotografia/Animal/",
    "Arquitectura": "./imagenes/Animal/Fotografia/Arquitectura/",
    "Calle": "./imagenes/Animal/Fotografia/Calle/",
    "Estilo de vida": "./imagenes/Animal/Fotografia/Estilo de vida/",
    "Naturaleza": "./imagenes/Animal/Fotografia/Naturaleza/",
    "Paisaje": "./imagenes/Animal/Fotografia/Paisaje/",
    "Producto": "./imagenes/Animal/Fotografia/Producto/",
    "Retratos": "./imagenes/Animal/Fotografia/Retratos/"
};

// Genera automáticamente la lista de imágenes para cada categoría (1.jpg, 2.jpg, ... 40.jpg, 1.JPG, 2.JPG, ... 40.JPG)
const styleImages = {};
const maxImages = 40;
Object.keys(styleFolders).forEach(cat => {
    const files = [];
    for (let i = 1; i <= maxImages; i++) {
        files.push(i + ".jpg");
        files.push(i + ".JPG");
    }
    // Elimina duplicados ignorando mayúsculas/minúsculas
    styleImages[cat] = files.filter((img, idx, arr) =>
        arr.findIndex(x => x.toLowerCase() === img.toLowerCase()) === idx
    );
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function renderGallery(style) {
    const folder = styleFolders[style];
    const images = styleImages[style];
    const gallery = document.getElementById('gallery-cascade');
    gallery.innerHTML = images.map(img => {
        const imgPath = folder + img;
        return `<div class=\"cascade-img-wrap\"><img src=\"${imgPath}\" class=\"cascade-img\" alt=\"${style}\" onerror=\"this.parentNode.style.display='none'\"></div>`;
    }).join('');
    document.getElementById('gallery-title').textContent = style;
}

function goToStyle(idx) {
    if (idx >= 0 && idx < styleNames.length) {
        const style = styleNames[idx];
        window.location.href = `galeria.html?style=${encodeURIComponent(style)}`;
    }
}

function openGalleryModal(src, alt) {
    let modal = document.querySelector('.fullscreen-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'fullscreen-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img class="modal-img">
                <button class="close-modal">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    const img = modal.querySelector('.modal-img');
    img.src = src;
    img.alt = alt;

    // Create a temporary image to check dimensions
    const tempImg = new Image();
    tempImg.onload = function() {
        const isVertical = this.height > this.width;
        img.style.maxWidth = isVertical ? '85vh' : '95vw';
        img.style.maxHeight = isVertical ? '95vh' : '85vh';
        modal.classList.add('active');
    };
    tempImg.src = src;
}

// Add click handlers to gallery images
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery-cascade');
    gallery.addEventListener('click', function(e) {
        const img = e.target.closest('img');
        if (img && img.classList.contains('cascade-img')) {
            openGalleryModal(img.src, img.alt);
        }
    });
});

window.onload = function() {
    const style = getQueryParam('style') || styleNames[0];
    const idx = styleNames.indexOf(style);
    renderGallery(style);
    // Cerrar galería SIEMPRE vuelve a index.html
    document.getElementById('gallery-close').onclick = function() {
        window.location.href = 'index.html';
    };
    // Flecha atrás
    document.getElementById('prev-style').onclick = function() {
        goToStyle((idx - 1 + styleNames.length) % styleNames.length);
    };
    // Flecha adelante
    document.getElementById('next-style').onclick = function() {
        goToStyle((idx + 1) % styleNames.length);
    };

    // Añadir la clase galeria-foto-bg al body
    document.body.classList.add('galeria-foto-bg');

    // Función para cerrar la galería
    document.getElementById('gallery-close').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Función para navegar entre estilos
    function goToStyle(idx) {
        if (idx >= 0 && idx < styleNames.length) {
            const style = styleNames[idx];
            window.location.href = `galeria.html?style=${encodeURIComponent(style)}`;
        }
    }

    // Obtener el índice actual del estilo
    const currentStyle = getQueryParam('style');
    const currentIndex = styleNames.indexOf(currentStyle);

    // Configurar los botones de navegación
    document.getElementById('prev-style').addEventListener('click', () => goToStyle(currentIndex - 1));
    document.getElementById('next-style').addEventListener('click', () => goToStyle(currentIndex + 1));

    // Deshabilitar botones si estamos en el primer o último estilo
    if (currentIndex === 0) {
        document.getElementById('prev-style').style.visibility = 'hidden';
    }
    if (currentIndex === styleNames.length - 1) {
        document.getElementById('next-style').style.visibility = 'hidden';
    }
};
