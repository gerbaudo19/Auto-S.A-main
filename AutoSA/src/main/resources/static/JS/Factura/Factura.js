const btnBuscar = document.getElementById("btn-buscar");
const tablaFactura = document.getElementById("tablaFactura");
const urlFactura = "http://localhost:8080/factura/list";

// Función para llenar la tabla con las facturas
function llenarTablaFactura(data) {
    const tbody = tablaFactura.querySelector('tbody');
    tbody.innerHTML = "";
    data.forEach(function (factura) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaFecha = document.createElement('td');
        const columnaHora = document.createElement('td');
        const columnaSubTotal = document.createElement('td');
        const columnaOrdenDeTrabajo = document.createElement('td');
        const columnaAcciones = document.createElement('td');

        columnaId.textContent = factura.id;
        columnaFecha.textContent = factura.fecha;
        columnaHora.textContent = factura.hora;
        columnaSubTotal.textContent = factura.subTotal;
        columnaOrdenDeTrabajo.textContent = factura.ordenDeTrabajo.id;

        // Botón Ver Factura
        const btnVerFactura = document.createElement('button');
        btnVerFactura.textContent = "Ver";
        btnVerFactura.classList = 'btn btn-outline-primary';
        btnVerFactura.style.margin = "0px 5px";
        btnVerFactura.addEventListener("click", function() {
            // Aquí puedes definir qué hacer al hacer clic en Ver Factura
            // Por ejemplo, podrías redirigir a una página de detalles de la factura
            alert("Implementa la lógica para ver la factura aquí");
        });

        // Agregar botón Ver Factura a la columna de acciones
        columnaAcciones.appendChild(btnVerFactura);

        // Agregar todas las columnas a la fila
        fila.appendChild(columnaId);
        fila.appendChild(columnaFecha);
        fila.appendChild(columnaHora);
        fila.appendChild(columnaSubTotal);
        fila.appendChild(columnaOrdenDeTrabajo);
        fila.appendChild(columnaAcciones);

        // Agregar fila a la tabla
        tbody.appendChild(fila);
    });
}

// Función para realizar la búsqueda de facturas
async function buscarFacturas() {
    let filterId = document.getElementById("select-Filtrar").value;
    let filterValue = "";
    if (filterId === "1") { // Filtrar por ID de factura
        filterValue = document.getElementById("input-id-factura").value;
    } else if (filterId === "2") { // Filtrar por ID de orden
        filterValue = document.getElementById("input-id-orden").value;
    }

    try {
        const response = await fetch(urlFactura);
        if (response.ok) {
            const data = await response.json();
            if (filterValue) {
                // Filtrar por el valor ingresado en el filtro
                const filteredData = data.filter(factura => factura.id == filterValue);
                llenarTablaFactura(filteredData);
            } else {
                // Si no se especifica ningún filtro, mostrar todas las facturas
                llenarTablaFactura(data);
            }
            tablaFactura.style.display = 'table'; // Mostrar la tabla una vez que se hayan cargado los datos
        } else {
            console.error("Error al obtener las facturas:", response.statusText);
            // Puedes manejar el error aquí
        }
    } catch (error) {
        console.error("Error al obtener las facturas:", error);
        // Puedes manejar el error aquí
    }
}

// Evento para realizar la búsqueda cuando se presiona el botón
btnBuscar.addEventListener("click", function (event) {
    event.preventDefault(); // Evitar el envío del formulario
    buscarFacturas();
});

// Ocultar la tabla al cargar la página
tablaFactura.style.display = 'none';
