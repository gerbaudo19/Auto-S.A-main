// ----------------------------------------------------------------------------
// Definicion de variables ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url, formatearString} from "./TecnicoSet.js";
import { editTecnico, deleteTecnico } from "./TecnicoUD.js";
const btnBuscar = document.getElementById("btn-Buscar");  //Contiene el boton buscar
const selectFiltrar = document.getElementById("selectFiltrar"); //contiene el select de filtrar
const inputTablaTecnico= document.getElementById("input-TablaTecnico"); //Contiene el input arriba de la tabla
const btnEditarTecnico = document.getElementById("btn-EditarTecnico");
let editarTecnicoId;

// ---------------------------------------------------------------------------------------------------------------------
// Buscar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Cargar Tablas For ----------------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarTablaFor(data){

    const tabla = document.getElementById('tablaTecnico');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(function (tecnico) {
            const fila = document.createElement('tr');
            const columnaLegajo = document.createElement('td');
            const columnaDni = document.createElement('td');
            const columnaApellido = document.createElement('td');
            const columnaNombre = document.createElement('td');
            const columnaTelefono = document.createElement('td');
            const columnaEmail = document.createElement('td');
            const columnaDomicilio = document.createElement('td');
            const columnaOpciones = document.createElement('td');

            columnaLegajo.textContent = tecnico.id;
            columnaDni.textContent = tecnico.dni;
            columnaApellido.textContent = tecnico.apellido;
            columnaNombre.textContent = tecnico.nombre;
            columnaTelefono.textContent = tecnico.telefono;
            columnaEmail.textContent = tecnico.email;
            columnaDomicilio.textContent = tecnico.domicilio;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Editar';
            botonModificar.classList= 'btn btn-outline-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarTecnico");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarTecnicoId = tecnico.id;
                btnEditarTecnico.addEventListener("click", async function(){
                    await editTecnico(editarTecnicoId);
                })
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-outline-danger';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                deleteTecnico(tecnico.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaLegajo);
            fila.appendChild(columnaDni)
            fila.appendChild(columnaApellido)
            fila.appendChild(columnaNombre);
            fila.appendChild(columnaTelefono);
            fila.appendChild(columnaEmail)
            fila.appendChild(columnaDomicilio)
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
    });
}
// ----------------------------------------------------------------------------
// Cargar Tablas If -----------------------------------------------------------
// ----------------------------------------------------------------------------
async function llenarTablaIf(data){
    const tabla = document.getElementById('tablaTecnico');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';
        const tecnico = data;
        if (tecnico) {
            const fila = document.createElement('tr');
            const columnaLegajo = document.createElement('td');
            const columnaDni = document.createElement('td');
            const columnaApellido = document.createElement('td');
            const columnaNombre = document.createElement('td');
            const columnaTelefono = document.createElement('td');
            const columnaEmail = document.createElement('td');
            const columnaDomicilio = document.createElement('td');
            const columnaOpciones = document.createElement('td');

            columnaLegajo.textContent = tecnico.id;
            columnaDni.textContent = tecnico.dni;
            columnaApellido.textContent = tecnico.apellido;
            columnaNombre.textContent = tecnico.nombre;
            columnaTelefono.textContent = tecnico.telefono;
            columnaEmail.textContent = tecnico.email;
            columnaDomicilio.textContent = tecnico.domicilio;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Editar';
            botonModificar.classList= 'btn btn-outline-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarTecnico");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarTecnicoId = tecnico.id;
                btnEditarTecnico.addEventListener("click", async function(){
                    await editTecnico(editarTecnicoId);
                })
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-outline-danger';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                deleteTecnico(tecnico.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaLegajo);
            fila.appendChild(columnaDni)
            fila.appendChild(columnaApellido)
            fila.appendChild(columnaNombre);
            fila.appendChild(columnaTelefono);
            fila.appendChild(columnaEmail)
            fila.appendChild(columnaDomicilio)
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        }else{
            alert("No se encontro ningun Tencinco");
        }
}

// ----------------------------------------------------------------------------
// Buscar sin filtro ----------------------------------------------------------
// ----------------------------------------------------------------------------
export async function getTecnico() {
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataTecnico = await response.json();
        
        llenarTablaFor(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// Buscar por Dni -------------------------------------------------------------
// ----------------------------------------------------------------------------

async function getTecnicoXDni() {
    const dniConsulta = inputTablaTecnico.value;
    try {
        const response = await fetch(url+`/listByDni/${dniConsulta}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();
        llenarTablaIf(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// Buscar por Id ----------------------------------------------------------
// ----------------------------------------------------------------------------

async function getTecnicoXId() {
    const idConsutla = inputTablaTecnico.value
    try {
        const response = await fetch(url+`/listById/${idConsutla}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();
        llenarTablaIf(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// Buscar por Nombre ----------------------------------------------------------
// ----------------------------------------------------------------------------

async function getTecnicoXNombre(){
    const nombreConsulta = inputTablaTecnico.value;
    try {
        const response = await fetch(url+`/listByNombre/${formatearString(nombreConsulta)}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();

        llenarTablaFor(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// ----------------------------------------------------------------------------
// leer filtrado   ------------------------------------------------------------
// ----------------------------------------------------------------------------

//Carga el select si se selecciono un filtrado
selectFiltrar.addEventListener("change", async () => {

    if (selectFiltrar.value === "1" || selectFiltrar.value === "2") { //Opcion DNI o ID
        inputTablaTecnico.disabled = false; // Activa el input
        inputTablaTecnico.type = "number";
        inputTablaTecnico.value = "";

    }else if(selectFiltrar.value === "3"){ //Opcion Apellido
        inputTablaTecnico.disabled = false;
        inputTablaTecnico.type = "text";
        inputTablaTecnico.value = "";
        
    }else{
        inputTablaTecnico.disabled = true; //Desactiva el select
        inputTablaTecnico.value = "";
    }
});

//Evento del boton buscar
btnBuscar.addEventListener("click", async function(event){
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getTecnicoXDni();

    }else if(selectFiltrar.value === "2"){
        event.preventDefault();
        await getTecnicoXId();

    }else if(selectFiltrar.value === "3"){
        event.preventDefault();
        await getTecnicoXNombre();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getTecnico();
    }
});
