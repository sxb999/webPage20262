// --- BARRA DE BÚSQUEDA ---
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

// --- BOTÓN VOLVER ARRIBA ---
const btnVolverArriba = document.getElementById('btn-volver-arriba');
if (btnVolverArriba) {
    btnVolverArriba.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- MENÚ PANTALLA COMPLETA (MÓVIL) ---
const btnAbrirMenu = document.getElementById('btn-abrir-menu');
const btnCerrarMenu = document.getElementById('btn-cerrar-menu');
const navContainer = document.getElementById('nav-container');

if (btnAbrirMenu && btnCerrarMenu && navContainer) {
    btnAbrirMenu.addEventListener('click', function () {
        navContainer.classList.add('abierto');
        document.body.style.overflow = 'hidden';
    });

    btnCerrarMenu.addEventListener('click', function () {
        navContainer.classList.remove('abierto');
        document.body.style.overflow = 'auto';
    });
}

// --- SUBMENÚS DESPLEGABLES (TODAS LAS PANTALLAS) ---
const dropdownToggles = document.querySelectorAll('.dropdown-toggle-custom');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const submenu = this.nextElementSibling;

        if (submenu) {
            submenu.classList.toggle('activo');

            const flecha = this.querySelector('.flecha');
            if (flecha) {
                if (submenu.classList.contains('activo')) {
                    flecha.innerHTML = '&#708;';
                } else {
                    flecha.innerHTML = '&#709;';
                }
            }
        }
    });
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.submenu.activo').forEach(submenuAbierto => {
            submenuAbierto.classList.remove('activo');

            const flecha = submenuAbierto.previousElementSibling.querySelector('.flecha');
            if (flecha) {
                flecha.innerHTML = '&#709;';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* Filtrar materias por Semestre */
    const selectorSemestre = document.getElementById('semestre-select');
    const todasLasMaterias = document.querySelectorAll('.materia-card');

    selectorSemestre.addEventListener('change', (e) => {
        const semestreElegido = e.target.value;

        todasLasMaterias.forEach(materia => {
            materia.classList.remove('activa');

            if (materia.getAttribute('data-semestre') === semestreElegido) {
                materia.style.display = 'flex';
            } else {
                materia.style.display = 'none';
            }
        });
    });

    /* Abrir/cerrar el Overlay de Contenidos Programáticos con cierre automático */
    const botonesToggle = document.querySelectorAll('.btn-toggle-info');

    botonesToggle.forEach(boton => {
        boton.addEventListener('click', () => {
            const tarjetaPadre = boton.closest('.materia-card');

            tarjetaPadre.classList.toggle('activa');

            if (tarjetaPadre.temporizadorCierre) {
                clearTimeout(tarjetaPadre.temporizadorCierre);
            }

            if (tarjetaPadre.classList.contains('activa')) {
                tarjetaPadre.temporizadorCierre = setTimeout(() => {
                    tarjetaPadre.classList.remove('activa');
                }, 2500);
            }
        });
    });
});