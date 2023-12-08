// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
const url = 'http://localhost:8080/tecnico';
const urlPersonal = "http://localhost:8080/personalDeTrabajo";
//Variables para buscar tecnico
const btnBuscarTecnico = document.getElementById("btn-BuscarTecnico");
const selectFiltrarTecnico = document.getElementById("select-FlitrarTecnico");
const inputBuscarTecnico = document.getElementById("input-TablaTecnico");
const tablaBuscarTecnico = document.getElementById("tablaTecnicoBuscar");
const tbodyBuscar = tablaBuscarTecnico.querySelector('tbody');
//Varibales para cargar 
const tablaCargaTecnico = document.getElementById("tablaTecnico");
const tbodyCargar = tablaCargaTecnico.querySelector('tbody');
const listaTecnicos = [];
// -------------------------------------------------------------------------------------------------------------------
// Da formto al string -----------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
export function formatearString(textoEntrada) {

    const palabras = textoEntrada.split(" "); // Divide el string en palabras
    let resultado = ""; // Inicializa una cadena para almacenar el resultado formateado
  
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase(); // Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " ";
      }
    }
  
    return resultado.trim(); // Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

// -------------------------------------------------------------------------------------------------------------------
// Cargar Tablas -----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function llenarTabla(tecnico, tbodyOpcion){
    const tbody = tbodyOpcion;
    const fila = document.createElement('tr');
    fila.id =  "fila-" + tecnico.id;
    const columnaLegajo = document.createElement('td');
    const columnaApellido = document.createElement('td');
    const columnaNombre = document.createElement('td');
    const columnaOpciones = document.createElement('td');

    columnaLegajo.textContent = tecnico.id;
    columnaApellido.textContent = tecnico.apellido;
    columnaNombre.textContent = tecnico.nombre;
    if(tbodyOpcion === tbodyBuscar){
        // Botones de Cargar datos
        const botonCargar = document.createElement('button');
        botonCargar.textContent = 'Cargar';
        botonCargar.type = "button";
        botonCargar.classList= 'btn btn-outline-success';
        botonCargar.style = "margin: 0px 5px;"
        botonCargar.setAttribute("data-bs-target", "#modalTecnico");
        botonCargar.setAttribute("data-bs-toggle", "modal");
        botonCargar.addEventListener('click',async function () {
            listaTecnicos.push(tecnico.id);
            cargarTecnico(tecnico);
            console.log(listaTecnicos);
        });
        columnaOpciones.appendChild(botonCargar);
    }else if (tbodyOpcion === tbodyCargar){
        // Botones de Cargar datos
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.type = "button";
       // botonEliminar.id = "FilaTecnico"+tecnico.id;
        botonEliminar.classList= 'btn btn-outline-danger';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click',async function (event) {
           console.log(event.target.parentNode.parentNode); //parentNode sirve para encontrar el elemento padre del actual, es decir event.target me da el elemnto del boton, con un parentNode me da la celda del boton eliminar, y con otro mas me da el padre del padre, es decir la fila.
           const filaAEliminar = event.target.parentNode.parentNode; //Asigno la fila a eliminar.
           eliminarTecnico(tecnico.id, filaAEliminar);
        });
        //console.log("Boton del tecnico con ID = " + botonEliminar.id);
        columnaOpciones.appendChild(botonEliminar);
    }

    fila.appendChild(columnaLegajo)
    fila.appendChild(columnaApellido)
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaOpciones);

    tbody.appendChild(fila);
}
// -------------------------------------------------------------------------------------------------------------------
// Cargar Tablas For -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function llenarTablaFor(dataTecnico){
    tbodyBuscar.innerHTML = '';

    dataTecnico.forEach(function (tecnico) {
        llenarTabla(tecnico, tbodyBuscar);
    })
}
// -------------------------------------------------------------------------------------------------------------------
// Cargar Tablas If --------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function llenarTablaIf(dataTecnico){

    tbodyBuscar.innerHTML = '';

    const tecnico = dataTecnico;
        
    if (tecnico) {
        llenarTabla(tecnico, tbodyBuscar);
    }else{
        alert("No se encontro ningun Cliente");
    }

}
// -------------------------------------------------------------------------------------------------------------------
// Cargar Tecnicos ---------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function cargarTecnico(tecnico){
    llenarTabla(tecnico, tbodyCargar);
}
// -------------------------------------------------------------------------------------------------------------------
// Traer Tecnicos ----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function getTecnico(){
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnico: ${response.status}`);
        }
        const dataTecnico = await response.json();

        await llenarTablaFor(dataTecnico);

    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// -------------------------------------------------------------------------------------------------------------------
// Traer Tecnicos por Legajo -----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function getTecnicoXlegajo(){
    const idTecnico = inputBuscarTecnico.value;
    try {
        const response = await fetch(url+`/listById/${idTecnico}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataTecnico = await response.json();

        await llenarTablaIf(dataTecnico);

    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// -------------------------------------------------------------------------------------------------------------------
// Traer Tecnicos por Nombres ----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function getTecnicoXNombre(){
    const nombreConsulta = inputBuscarTecnico.value;
    try {
        const response = await fetch(url+`/listByNombre/${ formatearString(nombreConsulta)}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();
        await llenarTablaFor(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// -------------------------------------------------------------------------------------------------------------------
// Evento cambio Filtrar ---------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
selectFiltrarTecnico.addEventListener("change", function(){
    if(selectFiltrarTecnico.value === "0"){
        inputBuscarTecnico.disabled = true;
        inputBuscarTecnico.value = "";
    }else if(selectFiltrarTecnico.value === "1"){  
        inputBuscarTecnico.disabled = false;
        inputBuscarTecnico.type = "number";
        inputBuscarTecnico.value = "";
    }else if(selectFiltrarTecnico.value === "2"){
        inputBuscarTecnico.disabled = false;
        inputBuscarTecnico.type = "text";
        inputBuscarTecnico.value = "";
    }
});

// -------------------------------------------------------------------------------------------------------------------
// Evento boton Buscar -----------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
btnBuscarTecnico.addEventListener("click", async function(){
    if(selectFiltrarTecnico.value === "0" ){
        await getTecnico();
    }else if(selectFiltrarTecnico.value === "1"){  
        await getTecnicoXlegajo();
    }else if(selectFiltrarTecnico.value === "2"){
        await getTecnicoXNombre();
    }
})

// -------------------------------------------------------------------------------------------------------------------
// Eliminar Tecnicos -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function eliminarTecnico(tecnicoId, filaAEliminar) {
    // Eliminar al técnico de la lista
    const index = listaTecnicos.indexOf(tecnicoId);
    if (index !== -1) {
        listaTecnicos.splice(index, 1);
    }

    console.log(listaTecnicos);

    filaAEliminar.remove();
}

// -------------------------------------------------------------------------------------------------------------------
// Set Tecnicos ------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

export async function setPersonalTrabajo(ordenDeTrabajoid){
    if(!listaTecnicos){
        alert("No se selecciono ningun tecnico");
    }else{
    }
    listaTecnicos.forEach(async (tecnico) => {
        let nuevoPersonal = {
            tecnico : {
                id : tecnico
            },
            ordenDeTrabajo : {
                id : ordenDeTrabajoid
            }
        }

        await fetch(urlPersonal + "/create", {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(nuevoPersonal)
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