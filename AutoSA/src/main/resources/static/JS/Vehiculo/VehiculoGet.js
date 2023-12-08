// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url, formatearString, listarCliente, listarMarca } from "./VehiculoSet.js";
import { deleteVehiculo, llenarSelectClienteEditar, llenarSelectMarcaEditar, editVehiculo} from "./VehiculoUD.js";
const selectFiltrar = document.getElementById("select-FiltrarVehiculo");
const inputTablaVehiculo = document.getElementById("input-TablaVehiculo");
const selectTablaVehiculo = document.getElementById("select-TablaVehiculo");
const btnBuscar = document.getElementById("btn-Buscar");
const btnEditarVehiculo = document.getElementById("btn-EditarVehiculo");
let editarVehiculoId;
// --------------------------------------------------------------------------------------------------------------------------------------------
// Buscar -------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Llenar tabla con For -------------------------------------------------------
// ----------------------------------------------------------------------------


async function llenarTablaFor(dataVehiculo){
    const tabla = document.getElementById('tablaVehiculo');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    dataVehiculo.forEach(function (vehiculo) {
        const fila = document.createElement('tr');
        const columnaPatente = document.createElement('td');
        const columnaMarca = document.createElement('td');
        const columnaModelo = document.createElement('td');
        const columnaAño = document.createElement('td');
        const columnaKilometraje = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaPatente.textContent = vehiculo.patente;
        columnaMarca.textContent = vehiculo.modelo.marca.nombre;
        columnaModelo.textContent = vehiculo.modelo.nombre;
        columnaAño.textContent = vehiculo.año;
        columnaKilometraje.textContent = vehiculo.kilometraje

        // Botones de modificar y eliminar

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.classList= 'btn btn-outline-primary';
        botonEditar.style = "margin: 0px 5px;"
        botonEditar.setAttribute("data-bs-target", "#modalEditarVehiculo");
        botonEditar.setAttribute("data-bs-toggle", "modal");
        botonEditar.addEventListener('click',async function () {
            editarVehiculoId = vehiculo.id;
            await llenarSelectMarcaEditar();
            await llenarSelectClienteEditar();
            btnEditarVehiculo.addEventListener("click", async function(){
                await editVehiculo(editarVehiculoId);
            })
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-outline-danger';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click',async function () {
            await deleteVehiculo(vehiculo.id);
        });

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList= 'btn btn-outline-success';
        botonVer.style = "margin: 0px 5px;"
        botonVer.setAttribute("data-bs-target", "#modalEditarVehiculo");
        botonVer.setAttribute("data-bs-toggle", "modal");
        botonVer.addEventListener('click',async function () {
            
        });

        columnaOpciones.appendChild(botonVer);
        columnaOpciones.appendChild(botonEditar);
        columnaOpciones.appendChild(botonEliminar);

        fila.appendChild(columnaPatente);
        fila.appendChild(columnaMarca);
        fila.appendChild(columnaModelo);
        fila.appendChild(columnaAño);
        fila.appendChild(columnaKilometraje);
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);
    });
}

// ----------------------------------------------------------------------------
// llenar tabla con if --------------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarTablaIf(dataVehiculo){
    const tabla = document.getElementById('tablaVehiculo');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';
        const vehiculo = dataVehiculo;
        if(vehiculo){
            const fila = document.createElement('tr');
            const columnaPatente = document.createElement('td');
            const columnaMarca = document.createElement('td');
            const columnaModelo = document.createElement('td');
            const columnaAño = document.createElement('td');
            const columnaKilometraje = document.createElement('td');
            const columnaOpciones = document.createElement('td');

            columnaPatente.textContent = vehiculo.patente;
            columnaMarca.textContent = vehiculo.modelo.marca.nombre;
            columnaModelo.textContent = vehiculo.modelo.nombre;
            columnaAño.textContent = vehiculo.año;
            columnaKilometraje.textContent = vehiculo.kilometraje

            // Botones de modificar y eliminar

            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.classList= 'btn btn-outline-primary';
            botonEditar.style = "margin: 0px 5px;"
            botonEditar.setAttribute("data-bs-target", "#modalEditarVehiculo");
            botonEditar.setAttribute("data-bs-toggle", "modal");
            botonEditar.addEventListener('click',async function () {
                editarVehiculoId = vehiculo.id;
                await llenarSelectMarcaEditar();
                await llenarSelectClienteEditar();
                btnEditarVehiculo.addEventListener("click", async function(){
                    await editVehiculo(editarVehiculoId);
                })
            });
    

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-outline-danger';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                deleteVehiculo(vehiculo.id);
            });

            const botonVer = document.createElement('button');
            botonVer.textContent = 'Ver';
            botonVer.classList= 'btn btn-outline-success';
            botonVer.style = "margin: 0px 5px;"
            botonVer.setAttribute("data-bs-target", "#modalEditarVehiculo");
            botonVer.setAttribute("data-bs-toggle", "modal");
            botonVer.addEventListener('click', function () {
            });

            columnaOpciones.appendChild(botonVer);
            columnaOpciones.appendChild(botonEditar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaPatente);
            fila.appendChild(columnaMarca);
            fila.appendChild(columnaModelo);
            fila.appendChild(columnaAño);
            fila.appendChild(columnaKilometraje);
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        }
}

// ----------------------------------------------------------------------------
// Buscar sin filtro ----------------------------------------------------------
// ----------------------------------------------------------------------------

export async function getVehiculos() {
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataVehiculos = await response.json();
        llenarTablaFor(dataVehiculos);
    } catch (error) {
        console.error('Error al cargar los Vehiculos:', error);
    }
}

// ----------------------------------------------------------------------------
// Buscar por patente -------------------------------------------------------------
// ----------------------------------------------------------------------------

async function getVehiculoXPatente() {
    var patente = formatearString(inputTablaVehiculo.value);
    try {
        const response = await fetch(url+`/listByPatente/${patente}`);
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }

        const dataVehiculos = await response.json();

        llenarTablaIf(dataVehiculos);
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

// ----------------------------------------------------------------------------
// Buscar por marca------------------------------------------------------------
// ----------------------------------------------------------------------------

async function getVehiculoXMarca() {
    try {
        const response = await fetch(url+`/listByMarca/${selectTablaMarca.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los vehivulos: ${response.status}`);
        }
        const dataVehiculos = await response.json();

        llenarTablaFor(dataVehiculos);

    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

// ----------------------------------------------------------------------------
// Buscar por cliente ---------------------------------------------------------
// ----------------------------------------------------------------------------

async function getVehiculoXCliente() {
    try {
        const response = await fetch(url+`/listByClienteId/${selectTablaVehiculo.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataVehiculos = await response.json();

        llenarTablaFor(dataVehiculos);
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

// ----------------------------------------------------------------------------
// Seleccion de filtrado ------------------------------------------------------
// ----------------------------------------------------------------------------

selectFiltrar.addEventListener("change", async () => { //Carga el select si se selecciono un filtrado

    if (selectFiltrar.value === "1") { //Opcion Marca
        inputTablaVehiculo.style.display = "none";
        selectTablaVehiculo.style.display = "block";
        selectTablaVehiculo.disabled = false;
        selectTablaVehiculo.value = "";
        try { //carga el select con marcas
            const dataMarcas = await listarMarca();
            selectTablaVehiculo.innerHTML = ""
            // Agrega la primera opción "Seleccionar una marca"
            const opcionSeleccionar = document.createElement("option");
            opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
            opcionSeleccionar.textContent = "Seleccionar una marca";
            selectTablaVehiculo.appendChild(opcionSeleccionar);
    
            dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
                const opcion = document.createElement("option");
                opcion.value = marca.id;
                opcion.textContent = marca.nombre;
                selectTablaVehiculo.appendChild(opcion); //con appendChild() se agrega el elemento al select
            });
        } catch (error) {
            console.error("Error al cargar las marcas: " + error);
        }
    
    }else if(selectFiltrar.value=== "2"){ //Opcion Patente
        selectTablaVehiculo.style.display = "none";
        inputTablaVehiculo.style.display = "block";

    }else if(selectFiltrar.value === "3"){ //Opcion Cliente
        inputTablaVehiculo.style.display = "none";
        selectTablaVehiculo.style.display = "block";
        selectTablaVehiculo.disabled = false;
        selectTablaVehiculo.value = "";
        try {
            const dataCliente = await listarCliente();
            selectTablaVehiculo.innerHTML = "";
            // Agrega la primera opción "Seleccionar una marca"
            const opcionSeleccionarCliente = document.createElement("option");
            opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
            opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
            selectTablaVehiculo.appendChild(opcionSeleccionarCliente);
    
            dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
                const opcion = document.createElement("option");
                opcion.value = cliente.id;
                opcion.textContent = cliente.dni + ", "+ cliente.nombre + ", " + cliente.apellido;
                selectTablaVehiculo.appendChild(opcion); //con appendChild() se agrega el elemento al select
            });
        } catch (error) {
            console.error("Error al cargar los clientes: " + error);
        }
        
    }else{
        selectTablaVehiculo.disabled = true; //Desactiva el select
        selectTablaVehiculo.value = "";
    }
}); 


// ----------------------------------------------------------------------------
// Evento boton Buscar --------------------------------------------------------
// ----------------------------------------------------------------------------

btnBuscar.addEventListener("click", async function(event){
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getVehiculoXMarca();
    }else if(selectFiltrar.value === "2"){
        event.preventDefault();
        await getVehiculoXPatente();
    }else if(selectFiltrar.value === "3"){
        event.preventDefault();
        await getVehiculoXCliente();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getVehiculos();
    }
});
