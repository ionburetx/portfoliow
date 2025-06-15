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
    const style = styleNames[idx];
    window.location.href = `galeria.html?style=${encodeURIComponent(style)}`;
}

window.onload = function() {
    const style = getQueryParam('style') || styleNames[0];
    const idx = styleNames.indexOf(style);
    renderGallery(style);
    // Cerrar galería SIEMPRE vuelve a index.html
    document.getElementById('close-gallery').onclick = function() {
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
};
