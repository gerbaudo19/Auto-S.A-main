const btnBuscar = document.getElementById("btn-buscar");
const tablaFactura = document.getElementById("tablaFactura");
const urlFactura = "http://localhost:8080/factura";

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
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.textContent = `FACTURA N° ${factura.id}`; // Agregar el número de factura al título del modal

    const modalBodyFactura = document.getElementById("modalBodyFactura");
    modalBodyFactura.innerHTML = `
        <div>
            <h5>Detalles de la Factura - Auto S.A</h5>
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
        const filtro = document.getElementById("select-Filtrar").value; // Obtener el valor del filtro seleccionado
        if (filtro === "idFactura") {
            const filtroId = document.getElementById("input-filtro").value; // Obtener el valor del campo de entrada
            const response = await fetch(`${urlFactura}/listById/${filtroId}`); // Enviar solicitud al backend con el ID
            if (response.ok) {
                const factura = await response.json(); // Obtener la factura correspondiente al ID
                if (factura) {
                    llenarTablaFactura([factura]); // Llenar la tabla con la factura encontrada
                    tablaFactura.style.display = 'table'; // Mostrar la tabla
                } else {
                    tablaFactura.style.display = 'none'; // Ocultar la tabla si no se encuentra ninguna factura
                    console.log("No se encontró ninguna factura con el ID especificado.");
                }
            } else {
                console.error("Error al obtener la factura:", response.statusText);
                // Puedes manejar el error aquí
            }
        } else {
            const response = await fetch(`${urlFactura}/list`); // Enviar solicitud al backend para obtener todas las facturas
            if (response.ok) {
                const data = await response.json(); // Obtener todas las facturas
                llenarTablaFactura(data); // Llenar la tabla con todas las facturas
                tablaFactura.style.display = 'table'; // Mostrar la tabla
            } else {
                console.error("Error al obtener las facturas:", response.statusText);
                // Puedes manejar el error aquí
            }
        }
    } catch (error) {
        console.error("Error al obtener las facturas:", error);
        // Puedes manejar el error aquí
    }
});


// Ocultar la tabla al cargar la página
tablaFactura.style.display = 'none';
