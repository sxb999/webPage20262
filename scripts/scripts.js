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

const btnVolverArriba = document.getElementById('btn-volver-arriba');

btnVolverArriba.addEventListener('click', function () {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});