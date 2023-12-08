// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url, formatearString } from "./ClienteSet.js";
import { deleteCliente, editCliente } from "./ClienteUD.js";
const btnBuscar = document.getElementById("btn-Buscar");  //Contiene el boton buscar
const inputTablaCliente= document.getElementById("input-TablaCliente"); //Contiene el input arriba de la tabla
const selectFiltrar = document.getElementById("selectFiltrar"); //contiene el select de filtrar
const btnEditarCliente = document.getElementById("btn-EditarCliente"); //Boton para editar Cliente
let editarClienteId; //Contiene el id del cliente a editar
// ----------------------------------------------------------------------------
// Cargar Tablas For ----------------------------------------------------------
// ----------------------------------------------------------------------------
async function llenarTablaFor(dataCliente){
    const tabla = document.getElementById('tablaCliente');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    dataCliente.forEach(function (cliente) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaDni = document.createElement('td');
        const columnaApellido = document.createElement('td');
        const columnaNombre = document.createElement('td');
        const columnaTelefono = document.createElement('td');
        const columnaEmail = document.createElement('td');
        const columnaDomicilio = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaId.textContent = cliente.id;
        columnaDni.textContent = cliente.dni;
        columnaApellido.textContent = cliente.apellido;
        columnaNombre.textContent = cliente.nombre;
        columnaTelefono.textContent = cliente.telefono;
        columnaEmail.textContent = cliente.email;
        columnaDomicilio.textContent = cliente.domicilio;

        // Botones de ver,  modificar y eliminar

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList= 'btn btn-outline-success';
        botonVer.style = "margin: 0px 5px;"
        botonVer.setAttribute("data-bs-target", "#modalVerCliente");
        botonVer.setAttribute("data-bs-toggle", "modal");
        botonVer.addEventListener('click', function () {
            editarTecnicoId = tecnico.id;
        });

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Editar';
        botonModificar.classList= 'btn btn-outline-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarCliente");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        botonModificar.addEventListener('click', function () {
            editarClienteId = cliente.id;
            btnEditarCliente.addEventListener("click", async function(){
                await editCliente(editarClienteId);
            })
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-outline-danger';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click',async function () {
            await deleteCliente(cliente.id);
        });

        columnaOpciones.appendChild(botonVer);
        columnaOpciones.appendChild(botonModificar);
        columnaOpciones.appendChild(botonEliminar);

        fila.appendChild(columnaId);
        fila.appendChild(columnaDni)
        fila.appendChild(columnaApellido)
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaTelefono);
        fila.appendChild(columnaEmail)
        fila.appendChild(columnaDomicilio)
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);
    })
}
// ----------------------------------------------------------------------------
// Cargar Tablas If ----------------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarTablaIf(dataCliente){

    const tabla = document.getElementById('tablaCliente');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    const cliente = dataCliente;
        
    if (cliente) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaDni = document.createElement('td');
        const columnaApellido = document.createElement('td');
        const columnaNombre = document.createElement('td');
        const columnaTelefono = document.createElement('td');
        const columnaEmail = document.createElement('td');
        const columnaDomicilio = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaId.textContent = cliente.id;
        columnaDni.textContent = cliente.dni;
        columnaApellido.textContent = cliente.apellido;
        columnaNombre.textContent = cliente.nombre;
        columnaTelefono.textContent = cliente.telefono;
        columnaEmail.textContent = cliente.email;
        columnaDomicilio.textContent = cliente.domicilio;

        // Botones de modificar y eliminar

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Editar';
        botonModificar.classList= 'btn btn-outline-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarCliente");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        botonModificar.addEventListener('click', function () {
            editarClienteId = cliente.id;
            btnEditarCliente.addEventListener("click", async function(){
                await editCliente(editarClienteId);
            })
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-outline-danger';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click', function () {
            eliminarCliente(cliente.id);
        });

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList= 'btn btn-outline-success';
        botonVer.style = "margin: 0px 5px;"
        botonVer.setAttribute("data-bs-target", "#modalVerCliente");
        botonVer.setAttribute("data-bs-toggle", "modal");
        botonVer.addEventListener('click', function () {
            editarTecnicoId = tecnico.id;
        });

        columnaOpciones.appendChild(botonVer);
        columnaOpciones.appendChild(botonModificar);
        columnaOpciones.appendChild(botonEliminar);

        fila.appendChild(columnaId);
        fila.appendChild(columnaDni)
        fila.appendChild(columnaApellido)
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaTelefono);
        fila.appendChild(columnaEmail)
        fila.appendChild(columnaDomicilio)
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);
    }else{
        alert("No se encontro ningun Cliente");
    }

}
// ---------------------------------------------------------------------------------------------------------------------
// Buscar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

export async function getCliente() {
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataCliente = await response.json();

        await llenarTablaFor(dataCliente);

    } catch (error) {
        console.error('Error al cargar los Clientes:', error);
    }
}

// ----------------------------------------------------------------------------
// Filtrar por Dni ------------------------------------------------------------
// ----------------------------------------------------------------------------

async function getClienteXDni() {
    const dniConsulta = inputTablaCliente.value;
    try {
        const response = await fetch(url+`/listByDni/${dniConsulta}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataCliente = await response.json();

        await llenarTablaIf(dataCliente);

    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// Filtrar por id -------------------------------------------------------------
// ----------------------------------------------------------------------------

async function getClienteXId() {
    try {
        const response = await fetch(url+`/listById/${inputTablaCliente.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataCliente = await response.json();
        await llenarTablaIf(dataCliente);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// Filtrar por Nombre ---------------------------------------------------------
// ----------------------------------------------------------------------------

async function getClienteXNombre() {
    const nombreConsulta = inputTablaCliente.value;
    try {
        const response = await fetch(url+`/listByNombre/${ formatearString(nombreConsulta)}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataCliente = await response.json();
        await llenarTablaFor(dataCliente);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// Leer tipo de filtrado y sus cambios ----------------------------------------
// ----------------------------------------------------------------------------

selectFiltrar.addEventListener("change", async () => {

    if (selectFiltrar.value === "1" || selectFiltrar.value === "2") { //Opcion DNI oID
        inputTablaCliente.disabled = false; // Activa el input
        inputTablaCliente.type = "number";
        inputTablaCliente.value = "";

    }else if(selectFiltrar.value === "3"){ //Opcion Nombre
        inputTablaCliente.disabled = false;
        inputTablaCliente.type = "text";
        inputTablaCliente.value = "";        
    }else{
        inputTablaCliente.disabled = true; //Desactiva el select
        inputTablaCliente.value = "";
    }
});

// ----------------------------------------------------------------------------
// Evento buscar --------------------------------------------------------------
// ----------------------------------------------------------------------------
btnBuscar.addEventListener("click", async function(event){
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getClienteXDni();

    }else if(selectFiltrar.value === "2"){
        event.preventDefault();
        await getClienteXId();

    }else if(selectFiltrar.value === "3"){
        event.preventDefault();
        await getClienteXNombre();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getCliente();
    }
});
