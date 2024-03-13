const btnBuscarOrden = document.getElementById("btn-buscarOrden");
const inputBuscarOrden = document.getElementById("input-BuscarOrden");
const selectFiltrarBusqueda = document.getElementById("select-FiltrarBusqueda");
const tablaOrden = document.getElementById("tabla-OrdenTrabajo");
const urlOrden = "http://localhost:8080/ordenDeTrabajo";
const urlPersonal = "http://localhost:8080/personalDeTrabajo";
const urlDetalle = "http://localhost:8080/detalleOrdenTrabajo";

//----------------------------------------------------------------------------------------------------------------------
// Función para mostrar la ventana emergente
function mostrarVentanaEmergente(contenido) {
    const ventanaEmergente = document.createElement('div');
    ventanaEmergente.classList.add('ventana-emergente');
    ventanaEmergente.innerHTML = contenido;
    
    // Estilo de la ventana emergente
    ventanaEmergente.style.position = 'fixed';
    ventanaEmergente.style.top = '50%';
    ventanaEmergente.style.left = '50%';
    ventanaEmergente.style.transform = 'translate(-50%, -50%)';
    ventanaEmergente.style.backgroundColor = 'white';
    ventanaEmergente.style.padding = '20px';
    ventanaEmergente.style.border = '2px solid black';
    ventanaEmergente.style.zIndex = '9999';
    
    document.body.appendChild(ventanaEmergente);
}

//----------------------------------------------------------------------------------------------------------------------
// llenar tabla con muchas ordenes -------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
function llenarTablaFor(data){
    const tbody = tablaOrden.querySelector('tbody');
    tbody.innerHTML = "";
    data.forEach(function (OrdenTrabajo) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaPatente = document.createElement('td');
        const columnaMarca = document.createElement('td');
        const columnaModelo = document.createElement('td');
        const columnaFecha = document.createElement('td');
        const columnaEstado = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaId.textContent = OrdenTrabajo.id;
        columnaPatente.textContent = OrdenTrabajo.vehiculo.patente;
        columnaMarca.textContent = OrdenTrabajo.vehiculo.modelo.marca.nombre;
        columnaModelo.textContent = OrdenTrabajo.vehiculo.modelo.nombre;
        columnaFecha.textContent = OrdenTrabajo.fechaCreacion;
        columnaEstado.textContent = OrdenTrabajo.estado.nombre;
        
        //Boton Factura
        const btnVerFactura = document.createElement('button');
        btnVerFactura.textContent = "Facturar";
        btnVerFactura.classList= 'btn btn-outline-success';
        btnVerFactura.style = "margin: 0px 5px;"
        btnVerFactura.addEventListener("click",async function(){
            const idOrden = OrdenTrabajo.id;
            const fechaActual = new Date().toISOString().split('T')[0];
            const horaActual = new Date().toLocaleTimeString('en-US', { hour12: false });
            try {
                const response = await fetch(`http://localhost:8080/factura/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fecha: fechaActual,
                        hora: horaActual,
                        ordenDeTrabajo: {
                            id: idOrden
                        }
                    })
                });
                if (response.ok) {
                    alert("Se ha creado la factura correctamente.");
                    // Aquí puedes realizar alguna acción adicional si es necesario
                } else {
                    alert("Error al crear la factura.");
                }
            } catch (error) {
                console.error("Error al crear la factura:", error);
                alert("Error al crear la factura. Por favor, inténtalo de nuevo más tarde.");
            }
        });

        // Boton Eliminar Orden
        const btnEliminarOrden = document.createElement('button');
        btnEliminarOrden.textContent = "Eliminar";
        btnEliminarOrden.classList = 'btn btn-outline-danger';
        btnEliminarOrden.style.margin = "0px 5px";
        btnEliminarOrden.addEventListener("click", async function(){
            const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta orden de trabajo?");
            if (confirmacion) {
                const idOrden = OrdenTrabajo.id; // Asegúrate de tener acceso al objeto OrdenTrabajo
                try {
                    const response = await fetch(`${urlOrden}/delete/${idOrden}`, { // Cambiado a `/delete/${idOrden}`
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        // Eliminación exitosa, volver a cargar la tabla
                        await BuscarOrden();
                        alert("Orden de trabajo eliminada correctamente.");
                    } else {
                        // Error al eliminar
                        alert("Error al eliminar la orden de trabajo.");
                    }
                } catch (error) {
                    console.error("Error al eliminar la orden de trabajo:", error);
                    alert("Error al eliminar la orden de trabajo. Por favor, inténtalo de nuevo más tarde.");
                }
            }
        });

        // Botón Detalle Orden
        const btnDetalleOrden = document.createElement('button');
        btnDetalleOrden.textContent = "Detalles";
        btnDetalleOrden.classList = 'btn btn-outline-info';
        btnDetalleOrden.style.margin = "0px 5px";
        btnDetalleOrden.addEventListener("click", async function() {
            try {
                const ordenId = OrdenTrabajo.id;

                // Hacer una solicitud para obtener los detalles de la orden
                const responseOrden = await fetch(`http://localhost:8080/detalleOrdenTrabajo/listByOrdentrabajoId/${ordenId}`);
                const detallesOrden = await responseOrden.json();

                // Hacer una solicitud para obtener los técnicos asociados a la orden
                const responseTecnicos = await fetch(`http://localhost:8080/personalDeTrabajo/listByOrdentrabajoId/${ordenId}`);
                const tecnicos = await responseTecnicos.json();

                // Construir el contenido de la ventana emergente
                let detallesHTML = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"><h5>Servicios</h5></th>
                                <ul class="list-group">
                            </tr>
                        </thead>
                        <tbody>`;
                
                detallesOrden.forEach(detalle => {
                    detallesHTML += `
                        <tr>
                            <td>${detalle.servicio.nombre}</td>
                        </tr>`;
                });

                detallesHTML += `</tbody>
                    </table>
                    <h5>Tecnicos Encargados</h5>
                    <ul class="list-group">`;

                tecnicos.forEach(tecnico => {
                    detallesHTML += `
                        <li class="list-group-item">${tecnico.tecnico.nombre} ${tecnico.tecnico.apellido}</li>`;
                });

                detallesHTML += `</ul>
                    <button id="btnCerrarVentana" class="btn btn-outline-danger" style="float: right; margin-top: 10px;">Cerrar</button>`;

                // Mostrar la ventana emergente
                mostrarVentanaEmergente(detallesHTML);


                // Agregar evento al botón de cierre
                document.getElementById("btnCerrarVentana").addEventListener("click", function() {
                    cerrarVentanaEmergente();
                });

            } catch (error) {
                console.error("Error al obtener los detalles de la orden:", error);
            }
        });

        function cerrarVentanaEmergente() {
            // Seleccionar la ventana emergente y eliminarla del DOM
            const ventanaEmergente = document.getElementById("ventanaEmergente");
            if (ventanaEmergente) {
                ventanaEmergente.parentNode.removeChild(ventanaEmergente);
            }
        }

        function mostrarVentanaEmergente(contenido) {
            // Crear la ventana emergente y agregar el contenido
            const ventanaEmergente = document.createElement("div");
            ventanaEmergente.id = "ventanaEmergente";
            ventanaEmergente.innerHTML = contenido;
        
            // Aplicar estilos directamente a la ventana emergente
            ventanaEmergente.style.position = "fixed";
            ventanaEmergente.style.top = "50%";
            ventanaEmergente.style.left = "50%";
            ventanaEmergente.style.transform = "translate(-50%, -50%)";
            ventanaEmergente.style.backgroundColor = "white"; // Fondo blanco
            ventanaEmergente.style.padding = "20px";
            ventanaEmergente.style.borderRadius = "10px"; // Bordes redondeados
            ventanaEmergente.style.border = "2px solid black"; // Borde negro
            ventanaEmergente.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Sombra
            ventanaEmergente.style.zIndex = "9999";
            ventanaEmergente.style.maxWidth = "80%";
            ventanaEmergente.style.overflowY = "auto";
        
            // Aplicar estilo específico para la lista de técnicos
            const listaTecnicos = ventanaEmergente.querySelectorAll('.lista-tecnicos');
            listaTecnicos.forEach(item => {
                item.style.color = "black"; // Color negro para los técnicos
            });
        
            // Agregar la ventana emergente al cuerpo del documento
            document.body.appendChild(ventanaEmergente);
        }
        
        
        

        columnaOpciones.appendChild(btnVerFactura);
        columnaOpciones.appendChild(btnEliminarOrden);
        columnaOpciones.appendChild(btnDetalleOrden);

        fila.appendChild(columnaId);
        fila.appendChild(columnaPatente);
        fila.appendChild(columnaMarca);
        fila.appendChild(columnaModelo);
        fila.appendChild(columnaFecha);
        fila.appendChild(columnaEstado);
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);

    });
}

//----------------------------------------------------------------------------------------------------------------------
// Buscar --------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
async function BuscarOrden(){
    const response = await fetch(urlOrden + "/list");
    if(!response.ok){
        console.log("Error al listar todas las ordenes" + response.status + response.statusText);
    }
    const dataOrdenTrabajo = await response.json();
    llenarTablaFor(dataOrdenTrabajo);
}

//----------------------------------------------------------------------------------------------------------------------
// Boton buscar --------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
btnBuscarOrden.addEventListener("click", async function(){
    await BuscarOrden();
});
