const btnBuscarOrden = document.getElementById("btn-buscarOrden");
const inputBuscarOrden = document.getElementById("input-BuscarOrden");
const selectFiltrarBusqueda = document.getElementById("select-FiltrarBusqueda");
const tablaOrden = document.getElementById("tabla-OrdenTrabajo");
const urlOrden = "http://localhost:8080/ordenDeTrabajo";
const urlPersonal = "http://localhost:8080/personalDeTrabajo";
const urlDetalle = "http://localhost:8080/detalleOrdenTrabajo";
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
        btnVerFactura.textContent = "Factura";
        btnVerFactura.classList= 'btn btn-outline-success';
        btnVerFactura.style = "margin: 0px 5px;"
        btnVerFactura.addEventListener("click",async function(){

        })
        //Boton Editar Orden
        const btnEditarOrden = document.createElement('button');
        btnEditarOrden.textContent = "Editar";
        btnEditarOrden.classList= 'btn btn-outline-primary';
        btnEditarOrden.style = "margin: 0px 5px;"
        btnEditarOrden.addEventListener("click",async function(){

        })
        //Boton Eliminar Orden
        const btnEliminarOrden = document.createElement('button');
        btnEliminarOrden.textContent = "Eliminar";
        btnEliminarOrden.classList= 'btn btn-outline-danger';
        btnEliminarOrden.style = "margin: 0px 5px;"
        btnEliminarOrden.addEventListener("click",async function(){

        })
        //Boton detalle Orden
        const btnDetalleOrden = document.createElement('button');
        btnDetalleOrden.textContent = "Detalles";
        btnDetalleOrden.classList= 'btn btn-outline-success';
        btnDetalleOrden.style = "margin: 0px 5px;"
        btnDetalleOrden.addEventListener("click",async function(){

        })

        columnaOpciones.appendChild(btnVerFactura);
        columnaOpciones.appendChild(btnEditarOrden);
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
})