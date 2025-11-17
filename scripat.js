// Esperar a que el DOM esté cargado antes de agregar el evento
document.addEventListener('DOMContentLoaded', () => {
    const botonImagen = document.getElementById('imagen-boton');
    if (botonImagen) {
        botonImagen.addEventListener('click', () => {
            irA('opciones'); // Cambiar a la sección de opciones
        });
    } else {
        console.error("No se encontró el elemento con id 'imagen-boton'.");
    }
});

// Función para mostrar una sección específica
function irA(seccion) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.pantalla').forEach(div => {
        div.classList.add('oculto');
    });
    // Mostrar la pantalla seleccionada
    document.getElementById(seccion).classList.remove('oculto');
}
