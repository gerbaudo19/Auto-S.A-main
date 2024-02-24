const url = "http://localhost:8080/modelo"; 
//Variables -
const btnBuscar = document.getElementById("btn-buscar");  //Contiene el boton buscar
const selectFiltrar = document.getElementById("selectFiltrar"); //contiene el select de filtrar
const selectTablaMarca = document.getElementById("select-TablaMarca"); //Contiene el select arriba de la tabla

// ----------------------------------------------------------------------------
// formatearTexto -------------------------------------------------------------
// ----------------------------------------------------------------------------

function formatearString(textoEntrada) {
    const palabras = textoEntrada.split(" ");// Divide el string en palabras
    let resultado = "";// Inicializa una cadena para almacenar el resultado formateado
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();// Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " "; //concatena
      }
    }
    return resultado.trim();// Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

// ----------------------------------------------------------------------------
// Llenar Tablas --------------------------------------------------------------
// ----------------------------------------------------------------------------
// con for --------------------------------------------------------------------
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
        botonModificar.classList= 'btn btn-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarModelo");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        botonModificar.addEventListener('click', function () {
            editarModeloId = modelo.id;
            llenarSelectEditarModelo();
        });

        //Boton Eliminar

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-primary';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click', function () {
            eliminarModelo(modelo.id);
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
// Cargar Tablas --------------------------------------------------------------
// ----------------------------------------------------------------------------

// Sin filtros ---------------------------------------------------------------
var editarModeloId;

async function getModelos() {
    try {
        const response = await fetch(url+'/list'); //Hace consulta para traer todos los modelos
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataModelos = await response.json(); //Obtiene la respuesta y la almacena en una variable
        llenarTablaFor(dataModelos); //Llama a la funcion para llenar la tabla

    } catch (error) { //Captura y muestra error por consola
        console.error('Error al cargar las marcas:', error); 
    }
}

// Con filtros ----------------------------------------------------------------

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

//Listar marcas 
async function listarMarcas(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    return dataMarcas;
}

//Carga el select si se selecciono un filtrado -----
selectFiltrar.addEventListener("change", async () => {
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
btnBuscar.addEventListener("click", async function(event){
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getModelosXMarca();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getModelos();
    }
});


// ----------------------------------------------------------------------------
// Agregar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

const btnAgregarModelo = document.getElementById("btn-AgregarModelo");
const selectAgregarMarca = document.getElementById("select-AgregarMarca");

//Llena el select con Marcas
async function llenarSelectAgregarModelo(){
    try {
        const dataMarcas = await listarMarcas();
        selectAgregarMarca.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionar = document.createElement("option");
        opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionar.textContent = "Seleccionar una marca";
        selectAgregarMarca.appendChild(opcionSeleccionar);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectAgregarMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};


//Crea un nuevo modelo
function crearModelo(){
    var nombreNuevoModelo = document.getElementById("nombreNuevoModelo").value;
    var nombreNuevoModelo = formatearString(nombreNuevoModelo);
    const nuevoModeloMarcaId = selectAgregarMarca.value;
    if(nombreNuevoModelo.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var nuevoModeloaData = {
            nombre: nombreNuevoModelo,
            marca: {
                id: nuevoModeloMarcaId
            }
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoModeloaData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getModelos();
                var modal = new bootstrap.Modal(document.getElementById('modalModelo'));
                modal.hide();
    
            }else if(response.status === 400){
                alert("Ya existe un modelo con ese nombre");
            }else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregarModelo.addEventListener("click", function(){
    crearModelo();
})

// ----------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function eliminarModelo(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getModelos();
        } else {
            alert("Hubo un error al eliminar la marca");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

// ----------------------------------------------------------------------------
// Editar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

const btnEditarModelo = document.getElementById("btn-EditarModelo");
const selectEditarMarca = document.getElementById("select-EditarMarca");

//Llena el select con Marcas
async function llenarSelectEditarModelo(){
    try {
        const dataMarcas = await listarMarcas();
        selectEditarMarca.innerHTML = "";

        const opcionSeleccionar = document.createElement("option"); // Agrega la primera opción "Seleccionar una marca"
        opcionSeleccionar.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionar.textContent = "Seleccionar una marca";
        selectEditarMarca.appendChild(opcionSeleccionar);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectEditarMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};

btnEditarModelo.addEventListener("click", function(){
    var nombreEditarModelo = document.getElementById("nombreEditarModelo").value;
    var nombreEditarModelo = formatearString(nombreEditarModelo);
    if(nombreEditarModelo.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var editarmodeloData = {
            nombre: nombreEditarModelo,
            marca: {
                id : selectEditarMarca.value
            }
        }
        fetch(url+`/update/${editarModeloId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarmodeloData)
        })
        .then(function(response) {
            if (response.ok) {
                getModelos();
            } else if(response.status === 400) {
                alert("Ya existe un modelo con ese nombre");
            }else{
                alert("Hubo un problema al editar modelo");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
})