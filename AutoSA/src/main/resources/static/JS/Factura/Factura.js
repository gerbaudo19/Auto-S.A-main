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
        const columnaTotal = document.createElement('td')
        const columnaOrdenDeTrabajo = document.createElement('td');
        const columnaAcciones = document.createElement('td');

        columnaId.textContent = factura.id;
        columnaFecha.textContent = factura.fecha;
        columnaHora.textContent = factura.hora;
        columnaSubTotal.textContent = factura.subTotal;
        columnaTotal.textContent = factura.total;
        columnaOrdenDeTrabajo.textContent = factura.ordenDeTrabajo.id;

        // Botón Ver Factura
        const btnVerFactura = document.createElement('button');
        btnVerFactura.textContent = "Ver Factura";
        btnVerFactura.classList = 'btn btn-outline-primary';
        btnVerFactura.style.marginRight = "5px";
        btnVerFactura.addEventListener('click', function() {
            mostrarDetallesFactura(factura);
        });

        // Agregar botón Ver Factura a la columna de acciones
        columnaAcciones.appendChild(btnVerFactura);

        // Agregar todas las columnas a la fila
        fila.appendChild(columnaId);
        fila.appendChild(columnaFecha);
        fila.appendChild(columnaHora);
        fila.appendChild(columnaSubTotal);
        fila.appendChild(columnaTotal);
        fila.appendChild(columnaOrdenDeTrabajo);
        fila.appendChild(columnaAcciones);

        // Agregar fila a la tabla
        tbody.appendChild(fila);
    });
}

function mostrarDetallesFactura(factura) {
    const modalBodyFactura = document.getElementById("modalBodyFactura");
    modalBodyFactura.innerHTML = `
        <div>
            <h4>Detalles de la Factura - Auto S.A</h4>
            <p><strong>Fecha:</strong> ${factura.fecha}</p>
            <p><strong>Hora:</strong> ${factura.hora}</p>
            <p><strong>Cliente:</strong> ${factura.ordenDeTrabajo.vehiculo.cliente.nombre} ${factura.ordenDeTrabajo.vehiculo.cliente.apellido}</p>
            <p><strong>Datos del Cliente:</strong></p>
            <ul>
                <li><strong>DNI:</strong> ${factura.ordenDeTrabajo.vehiculo.cliente.dni}</li>
                <li><strong>Teléfono:</strong> ${factura.ordenDeTrabajo.vehiculo.cliente.telefono}</li>
                <li><strong>Email:</strong> ${factura.ordenDeTrabajo.vehiculo.cliente.email}</li>
                <li><strong>Domicilio:</strong> ${factura.ordenDeTrabajo.vehiculo.cliente.domicilio}</li>
            </ul>
            <p><strong>Vehículo:</strong> ${factura.ordenDeTrabajo.vehiculo.modelo.nombre} (${factura.ordenDeTrabajo.vehiculo.patente})</p>
            <p><strong>Servicios Realizados:</strong></p>
            <ul>
                ${factura.ordenDeTrabajo.detallesOrdenTrabajo.map(detalle => `<li>${detalle.servicio.nombre} - Precio: $${detalle.servicio.precio}</li>`).join('')}
            </ul>
            <p><strong>Subtotal:</strong> $${factura.subTotal}</p>
            <p><strong>Impuesto (15%):</strong> $${(factura.total - factura.subTotal)}</p>
            <p><strong>Total:</strong> $${factura.total}</p>
            <p><strong>ID Orden de Trabajo:</strong> ${factura.ordenDeTrabajo.id}</p>
            <button id="btnImprimirFactura" class="btn btn-outline-success">Imprimir Factura</button>
        </div>
    `;

    // Agregar evento al botón de imprimir factura
    const btnImprimirFactura = document.getElementById("btnImprimirFactura");
    btnImprimirFactura.addEventListener("click", function() {
        window.print(); // Acción para imprimir la factura
    });

    // Mostrar la ventana modal
    const modal = new bootstrap.Modal(document.getElementById('modalDetallesFactura'));
    modal.show();
}


// Evento para realizar la búsqueda cuando se presiona el botón
btnBuscar.addEventListener("click", async function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    try {
        const response = await fetch(urlFactura);
        if (response.ok) {
            const data = await response.json();
            llenarTablaFactura(data);
            tablaFactura.style.display = 'table'; // Mostrar la tabla una vez que se hayan cargado los datos
        } else {
            console.error("Error al obtener las facturas:", response.statusText);
            // Puedes manejar el error aquí
        }
    } catch (error) {
        console.error("Error al obtener las facturas:", error);
        // Puedes manejar el error aquí
    }
});

// Ocultar la tabla al cargar la página
tablaFactura.style.display = 'none';
