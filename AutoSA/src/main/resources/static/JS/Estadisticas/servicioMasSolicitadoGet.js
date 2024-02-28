const tablaServicios = document.getElementById("tablaServiciosMasSolicitados");

// Función para formatear la fecha al formato AAAA-MM-DD
function formatearFecha(fecha) {
    const partes = fecha.split('-');
    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    return `${dia}/${mes}/${anio}`;
}

// Función para obtener las estadísticas de los servicios más solicitados en un período de tiempo
async function obtenerEstadisticasServicios() {
    try {
        const fechaInicio = document.getElementById("fechaInicio").value;
        const fechaFin = document.getElementById("fechaFin").value;

        const fechaInicioFormateada = formatearFecha(fechaInicio);
        const fechaFinFormateada = formatearFecha(fechaFin);

        const url = `/estadisticas/servicios-mas-solicitados?fechaInicio=${fechaInicioFormateada}&fechaFin=${fechaFinFormateada}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al obtener las estadísticas de servicios: ${response.status}`);
        }

        const estadisticas = await response.json();
        mostrarEstadisticasEnTabla(estadisticas);
    } catch (error) {
        console.error('Error al obtener las estadísticas de servicios:', error);
    }
}

// Función para mostrar las estadísticas de los servicios en la tabla
function mostrarEstadisticasEnTabla(estadisticas) {
    tablaServicios.innerHTML = '';

    Object.entries(estadisticas).forEach(function([key, value]) {
        const nombreServicio = key;
        const cantidad = value;

        const fila = document.createElement('tr');

        const columnaNombre = document.createElement('td');
        columnaNombre.textContent = nombreServicio;

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = cantidad;

        fila.appendChild(columnaNombre);
        fila.appendChild(columnaCantidad);

        tablaServicios.appendChild(fila);
    });
}

// Escuchar el evento submit del formulario de búsqueda
document.getElementById("formBusqueda").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario automáticamente
    obtenerEstadisticasServicios(); // Llamar a la función para obtener las estadísticas de servicios
});
