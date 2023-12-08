//Definicion de variables
import { url, listarMarcas } from "./ModeloSet.js";
import { editModelo, deleteModelo, llenarSelectEditarModelo } from "./ModeloUD.js";
const btnBuscar = document.getElementById("btn-buscar");  //Boton para buscar
const btnEditarModelo = document.getElementById("btn-EditarModelo"); //Boton para editar Modelos
const selectFiltrar = document.getElementById("select-Filtrar"); //Select de filtrar
const selectTablaMarca = document.getElementById("select-TablaMarca"); //Select arriba de la tabla
let editarModeloId;
// ---------------------------------------------------------------------------------------------------------------------
// Buscar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Llenar con for ----------------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarTablaFor(dataModelo){

    const tabla = document.getElementById('tablaModelo');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    dataModelo.forEach(function (modelo) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaNombre = document.createElement('td');
        const columnaMarca = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaId.textContent = modelo.id;
        columnaNombre.textContent = modelo.nombre;
        columnaMarca.textContent = modelo.marca.nombre;

        // Boton Editar

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Editar';
        botonModificar.classList= 'btn btn-outline-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarModelo");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        
        botonModificar.addEventListener('click',async () => {
            editarModeloId = modelo.id;
            llenarSelectEditarModelo();
            btnEditarModelo.addEventListener("click", async () =>{
                await editModelo(editarModeloId);
            })
        });

        //Boton Eliminar

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-outline-danger';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click',async () => {
            await deleteModelo(modelo.id);
        });

        columnaOpciones.appendChild(botonModificar);
        columnaOpciones.appendChild(botonEliminar);

        fila.appendChild(columnaId);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaMarca);
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);
    });
}


// ----------------------------------------------------------------------------
// Buscar sin filtro ----------------------------------------------------------
// ----------------------------------------------------------------------------

export async function getModelos() {
    try {
        const response = await fetch(url+'/list'); //Hace consulta para traer todos los modelos
        if (!response.ok) {
            throw new Error(`Error al cargar los modelos: ${response.status}`);
        }
        const dataModelos = await response.json(); //Obtiene la respuesta y la almacena en una variable
        llenarTablaFor(dataModelos); //Llama a la funcion para llenar la tabla

    } catch (error) { //Captura y muestra error por consola
        console.error('Error al cargar los modelos:', error); 
    }
}

// ----------------------------------------------------------------------------
// Buscar con filtro marca ----------------------------------------------------
// ----------------------------------------------------------------------------

async function getModelosXMarca() {
    try {
        const response = await fetch(url+`/listByMarca/${selectTablaMarca.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataModelos = await response.json();

        llenarTablaFor(dataModelos); //llama a la funcion para llenar la tabla 

    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

//Leer opcion de filtrado y buscar -----------------------------------------------
//Carga el select si se selecciono un filtrado -----
selectFiltrar.addEventListener("change", async function() {
    if (selectFiltrar.value === "1") {
        selectTablaMarca.disabled = false; // Activa el Select
        try {
            const dataMarcas = await listarMarcas();
            selectTablaMarca.innerHTML = ""
            // Agrega la primera opción "Seleccionar una marca"
            const opcionSeleccionar = document.createElement("option");
            opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
            opcionSeleccionar.textContent = "Seleccionar una marca";
            selectTablaMarca.appendChild(opcionSeleccionar);
    
            dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
                const opcion = document.createElement("option");
                opcion.value = marca.id;
                opcion.textContent = marca.nombre;
                selectTablaMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
            });
        } catch (error) {
            console.error("Error al cargar las marcas: " + error);
        }
    }else{
        selectTablaMarca.innerHTML = ""; //Limpia el select
        selectTablaMarca.disabled = true; //Desactiva el select
    }
});

//Evento del boton buscar
btnBuscar.addEventListener("click", async (event) => {
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getModelosXMarca();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getModelos();
    }
});

