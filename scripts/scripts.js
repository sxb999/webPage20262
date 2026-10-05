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

// --- 4. LÓGICA DE LOS SUBMENÚS DESPLEGABLES (TODAS LAS PANTALLAS) ---
const dropdownToggles = document.querySelectorAll('.dropdown-toggle-custom');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto de página por el href="#"

        const submenu = this.nextElementSibling; // Selecciona el <ul> submenu

        if (submenu) {
            // Alternar la clase activo
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
    });
});

// Cerrar los submenús si se hace clic en cualquier lugar fuera de ellos
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.submenu.activo').forEach(submenuAbierto => {
            submenuAbierto.classList.remove('activo');

            // Restaura la flecha hacia abajo
            const flecha = submenuAbierto.previousElementSibling.querySelector('.flecha');
            if (flecha) {
                flecha.innerHTML = '&#709;';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Lógica para filtrar materias por Semestre */
    const selectorSemestre = document.getElementById('semestre-select');
    const todasLasMaterias = document.querySelectorAll('.materia-card');

    selectorSemestre.addEventListener('change', (e) => {
        const semestreElegido = e.target.value;

        todasLasMaterias.forEach(materia => {
            // Cerramos cualquier overlay abierto al cambiar de semestre
            materia.classList.remove('activa');

            if (materia.getAttribute('data-semestre') === semestreElegido) {
                materia.style.display = 'flex'; // Muestra la materia
            } else {
                materia.style.display = 'none'; // Oculta la materia
            }
        });
    });

    /* 2. Lógica para abrir/cerrar el Overlay de Contenidos Programáticos con cierre automático */
    const botonesToggle = document.querySelectorAll('.btn-toggle-info');

    botonesToggle.forEach(boton => {
        boton.addEventListener('click', () => {
            // Busca la tarjeta padre más cercana al botón clickeado
            const tarjetaPadre = boton.closest('.materia-card');

            // Alterna la clase 'activa' (Abre o cierra el panel oscuro)
            tarjetaPadre.classList.toggle('activa');

            // 1. Limpiamos cualquier temporizador previo si el usuario hace clic varias veces rápido
            if (tarjetaPadre.temporizadorCierre) {
                clearTimeout(tarjetaPadre.temporizadorCierre);
            }

            // 2. Si la tarjeta quedó abierta (activa), programamos su cierre automático
            if (tarjetaPadre.classList.contains('activa')) {
                tarjetaPadre.temporizadorCierre = setTimeout(() => {
                    tarjetaPadre.classList.remove('activa');
                }, 2500); // 3000 milisegundos = 3 segundos
            }
        });
    });
});