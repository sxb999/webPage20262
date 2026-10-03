// --- 1. LÓGICA DE LA BARRA DE BÚSQUEDA ---
const iconoLupa = document.getElementById('search-icon');
const campoBusqueda = document.getElementById('campo-busqueda');

iconoLupa.addEventListener('click', function () {
    campoBusqueda.classList.toggle('activo');
    if (campoBusqueda.classList.contains('activo')) {
        campoBusqueda.focus();
    }
});

campoBusqueda.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const textoBuscado = campoBusqueda.value.trim();
        if (textoBuscado !== "") {
            window.location.href = "https://www.uniamazonia.edu.co/inicio/index.php/es/component/search/?searchword=" + encodeURIComponent(textoBuscado);
        }
    }
});

// --- 2. LÓGICA DEL BOTÓN VOLVER ARRIBA ---
const btnVolverArriba = document.getElementById('btn-volver-arriba');
if (btnVolverArriba) {
    btnVolverArriba.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- 3. LÓGICA DEL MENÚ PANTALLA COMPLETA (MÓVIL) ---
const btnAbrirMenu = document.getElementById('btn-abrir-menu');
const btnCerrarMenu = document.getElementById('btn-cerrar-menu');
const navContainer = document.getElementById('nav-container');

if (btnAbrirMenu && btnCerrarMenu && navContainer) {
    // Abrir menú
    btnAbrirMenu.addEventListener('click', function () {
        navContainer.classList.add('abierto');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    });

    // Cerrar menú
    btnCerrarMenu.addEventListener('click', function () {
        navContainer.classList.remove('abierto');
        document.body.style.overflow = 'auto'; // Restaura scroll
    });
}

// --- 4. LÓGICA DE LOS SUBMENÚS ACORDEÓN (MÓVIL) ---
// Nota: Usamos la nueva clase .dropdown-toggle-custom que añadimos al HTML
const dropdownToggles = document.querySelectorAll('.dropdown-toggle-custom');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {

        // Solo ejecuta esta lógica de acordeón si estamos en versión móvil (max 768px)
        if (window.innerWidth <= 1024) {
            e.preventDefault(); // Evita el salto de página por el href="#"

            const submenu = this.nextElementSibling; // Selecciona el <ul> submenu

            if (submenu) {
                submenu.classList.toggle('activo');

                // Cambia la dirección de la flecha visualmente
                const flecha = this.querySelector('.flecha');
                if (flecha) {
                    if (submenu.classList.contains('activo')) {
                        flecha.innerHTML = '&#708;'; // Flecha arriba
                    } else {
                        flecha.innerHTML = '&#709;'; // Flecha abajo
                    }
                }
            }
        }
    });
});
