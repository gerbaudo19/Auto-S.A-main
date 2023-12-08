// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
const url = 'http://localhost:8080/servicio';
const urlDetalle = "http://localhost:8080/detalleOrdenTrabajo"; 
const selectElegirServicio = document.getElementById("select-Servicio");
const btnAgregarServicios = document.getElementById("");
const listaServicios = [];

// -------------------------------------------------------------------------------------------------------------------
// Llenar select -----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function llenarSelectServicio(){
    const response = await fetch(url + "/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataServicio = await response.json(); //Guarda los datos de la peticion en una varible
    selectElegirServicio.innerHTML = ""; 
    try {
        const opcionSeleccionarServicio = document.createElement("option");// crea un elemnto option
        opcionSeleccionarServicio.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarServicio.textContent = "Seleccionar un servicio";// Agrega la primera opción "Seleccionar una marca"
        selectElegirServicio.appendChild(opcionSeleccionarServicio);

        dataServicio.forEach((servicio) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = servicio.id;
            opcion.textContent = servicio.nombre;
            opcion.dataset.descripcion = servicio.descripcion;
            selectElegirServicio.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};

document.addEventListener("DOMContentLoaded", async function(){
    await llenarSelectServicio();
})

// -------------------------------------------------------------------------------------------------------------------
// Seleccion de servicio -----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

selectElegirServicio.addEventListener("change", function(){
    if(!selectElegirServicio.value){
    }else{
        const idSeleccionado = selectElegirServicio.value;
        const nombreSeleccionado = selectElegirServicio.options[selectElegirServicio.selectedIndex].textContent;
        const descripcionSeleccionado = selectElegirServicio.options[selectElegirServicio.selectedIndex].dataset.descripcion;
        listaServicios.push(idSeleccionado);
        console.log(listaServicios);
        llenarTabla(idSeleccionado, nombreSeleccionado, descripcionSeleccionado);
    }
})
// -------------------------------------------------------------------------------------------------------------------
// Cargar Tablas -----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function llenarTabla(id, nombre, descripcion){
    const tablaServiciosElegidos = document.getElementById("tablaServicios");
    const tbody = tablaServiciosElegidos.querySelector('tbody');
    const fila = document.createElement('tr');
    const columnaId = document.createElement('td');
    const columnaNombre = document.createElement('td');
    const columnadescripcion = document.createElement('td');
    const columnaOpciones = document.createElement('td');

    columnaId.textContent = id;
    columnaNombre.textContent = nombre;
    columnadescripcion.textContent = descripcion;

    // Boton para eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.type = "button";
    botonEliminar.id = "FilaTecnico"+id;
    botonEliminar.classList= 'btn btn-outline-danger';
    botonEliminar.style = "margin: 0px 5px;"
    botonEliminar.addEventListener('click',async function (event) {
        console.log(event.target.parentNode.parentNode);
        const filaAEliminar = event.target.parentNode.parentNode;
        eliminarServicio(id, filaAEliminar);
    });

    columnaOpciones.appendChild(botonEliminar);

    fila.appendChild(columnaId);
    fila.appendChild(columnaNombre);
    fila.appendChild(columnadescripcion);
    fila.appendChild(columnaOpciones);

    tbody.appendChild(fila);
}


// -------------------------------------------------------------------------------------------------------------------
// Eliminar Servicios- -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function eliminarServicio(idServicio, filaAEliminar) {
    // Eliminar al servicio de la lista
    const index = listaServicios.indexOf(idServicio);
    if (index !== -1) {
        listaServicios.splice(index, 1);
    }
    console.log(listaServicios);

    filaAEliminar.remove();
}

// -------------------------------------------------------------------------------------------------------------------
// Set Detalle Orden -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

export async function setDetalleOrden(ordenDeTrabajoid){
    if(!listaServicios){
        alert("No se eligio ningun servicio");
    }else{
        listaServicios.forEach(async (servicio) =>{
            let nuevoDetalleServicio = {
                ordenDeTrabajo : {
                    id : ordenDeTrabajoid
                },
                servicio : {
                    id : servicio
                }
            }

            await fetch(urlDetalle + "/create",{
                method : "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(nuevoDetalleServicio)
            })
            .then(function (response) {
                if (response.ok) {
                    console.log("Orden de trabjo creado con exito");
                } else if(response.status === 400){
                    console.log("Respuesta de red OK pero respuesta HTTP no OK");
                }
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error);
            });
        })
    }
}