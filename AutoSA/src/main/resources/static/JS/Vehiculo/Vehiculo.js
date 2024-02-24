const url = "http://localhost:8080/vehiculo"; 
//Variables buscar
const selectFiltrar = document.getElementById("select-FiltrarVehiculo");
const inputTablaVehiculo = document.getElementById("input-TablaVehiculo");
const selectTablaVehiculo = document.getElementById("select-TablaVehiculo");
const btnBuscar = document.getElementById("btn-Buscar");
//varibales agregar
const btnCargarModalAgrega = document.getElementById("btn-CargarModalAgregaVehiculo");
const btnAgregaVehiculo = document.getElementById("btn-AgregarVehiculo");
const selectAgregarMarca = document.getElementById("select-AgregarMarcaVehiculo");
const selectAgregarModelo = document.getElementById("select-AgregarModeloVehiculo");
const selectAgregarCliente = document.getElementById("select-AgregarClienteVehiculo");
const inputAgregarPatente = document.getElementById("input-AgregarPatenteVehiculo");
const inputAgregarAño = document.getElementById("input-AgregarAñoVehiculo");
const inputAgregarKilometraje = document.getElementById("input-AgregarkilometrajeVehiculo");
//variables Editar
const inputEditarPatente = document.getElementById("input-EditarPatenteVehiculo");
const inputEditarAño = document.getElementById("input-EditarAñoVehiculo");
const inputEditarKilometraje = document.getElementById("input-EditarKilometrasjeVehiculo");
const selectEditarModelo = document.getElementById("select-EditarModeloVehiculo");
const selectEditarCliente = document.getElementById("select-EditarClienteVehiculo");
const selectEditarMarca = document.getElementById("select-EditarMarcaVehiculo");
const btnEditarVehiculo = document.getElementById("btn-EditarVehiculo");
var idEditarVehiculo;
// ----------------------------------------------------------------------------
// formatearTexto -------------------------------------------------------------
// ----------------------------------------------------------------------------

function formatearString(textoEntrada) {
    const palabras = textoEntrada.split(" ");// Divide el string en palabras
    let resultado = "";// Inicializa una cadena para almacenar el resultado formateado
    // Recorre cada palabra y forma el resultado
    for (const palabra of palabras) {
      if (palabra) { // Verifica si la palabra no está en blanco
        const palabraFormateada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toUpperCase();// Convierte la primera letra en mayúscula y el resto en minúscula
        resultado += palabraFormateada + " "; //concatena
      }
    }
    return resultado.trim();// Elimina el espacio en blanco adicional al final y retorna el resultado formateado
}

// ----------------------------------------------------------------------------
// Listar Cliente -------------------------------------------------------------
// ----------------------------------------------------------------------------

async function listarCliente(){
    const response = await fetch("http://localhost:8080/cliente/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataCliente = await response.json(); //Guarda los datos de la peticion en una varible
    return dataCliente;
}

// ----------------------------------------------------------------------------
// Listar Marca ---------------------------------------------------------------
// ----------------------------------------------------------------------------

async function listarMarca(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    return dataMarcas;
}

// ----------------------------------------------------------------------------
// Listar Modelo --------------------------------------------------------------
// ----------------------------------------------------------------------------

async function listarModelo(marca){
    const response = await fetch(`http://localhost:8080/modelo/listByMarca/${marca}`); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataModelos = await response.json(); //Guarda los datos de la peticion en una varible
    return dataModelos;
}

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
        botonEditar.classList= 'btn btn-primary';
        botonEditar.style = "margin: 0px 5px;"
        botonEditar.setAttribute("data-bs-target", "#modalEditarVehiculo");
        botonEditar.setAttribute("data-bs-toggle", "modal");
        botonEditar.addEventListener('click',async function () {
            idEditarVehiculo = vehiculo.id;
            await llenarSelectMarcaEditar();
            await llenarSelectClienteEditar();
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-primary';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click',async function () {
            await eliminarVehiculo(vehiculo.id);
        });

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList= 'btn btn-primary';
        botonVer.style = "margin: 0px 5px;"
        botonVer.setAttribute("data-bs-target", "#modalEditarVehiculo");
        botonVer.setAttribute("data-bs-toggle", "modal");
        botonVer.addEventListener('click',async function () {
            
        });

        columnaOpciones.appendChild(botonEditar);
        columnaOpciones.appendChild(botonEliminar);
        columnaOpciones.appendChild(botonVer);

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
            botonEditar.classList= 'btn btn-primary';
            botonEditar.style = "margin: 0px 5px;"
            botonEditar.setAttribute("data-bs-target", "#modalEditarVehiculo");
            botonEditar.setAttribute("data-bs-toggle", "modal");
            botonEditar.addEventListener('click',async function () {
                idEditarVehiculo = vehiculo.id;
                await llenarSelectMarcaEditar();
                await llenarSelectClienteEditar();
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-primary';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                eliminarVehiculo(vehiculo.id);
            });

            const botonVer = document.createElement('button');
            botonVer.textContent = 'Ver';
            botonVer.classList= 'btn btn-primary';
            botonVer.style = "margin: 0px 5px;"
            botonVer.setAttribute("data-bs-target", "#modalEditarVehiculo");
            botonVer.setAttribute("data-bs-toggle", "modal");
            botonVer.addEventListener('click', function () {
            });

            columnaOpciones.appendChild(botonEditar);
            columnaOpciones.appendChild(botonEliminar);
            columnaOpciones.appendChild(botonVer);

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

async function getVehiculos() {
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


// --------------------------------------------------------------------------------------------------------------------------------------------
// Agregar ------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Evento llenar Select Marca -------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarSelectMarcaAgregar(){
    const dataMarcas = await listarMarca();
    selectAgregarMarca.innerHTML = ""; 
    try {
        const opcionSeleccionarMarca = document.createElement("option");// crea un elemnto option
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";// Agrega la primera opción "Seleccionar una marca"
        selectAgregarMarca.appendChild(opcionSeleccionarMarca);

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


// ----------------------------------------------------------------------------
// Evento llenar Select Modelos -----------------------------------------------
// ----------------------------------------------------------------------------

selectAgregarMarca.addEventListener("change",async function(){
    selectAgregarModelo.disabled = false;
    try {
        const dataModelos = await listarModelo(selectAgregarMarca.value)
        selectAgregarModelo.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarModelo = document.createElement("option");
        opcionSeleccionarModelo.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarModelo.textContent = "Seleccionar una marca";
        selectAgregarModelo.appendChild(opcionSeleccionarModelo);

        dataModelos.forEach((modelo) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = modelo.id;
            opcion.textContent = modelo.nombre;
            selectAgregarModelo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los modelos: " + error);
    }
})


// ----------------------------------------------------------------------------
// Evento llenar Select cliente ----------------------------------------------
// ----------------------------------------------------------------------------

async function llenarSelectClienteAgregar(){
    try {
        const dataCliente = await listarCliente();
        selectAgregarCliente.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarCliente = document.createElement("option");
        opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
        selectAgregarCliente.appendChild(opcionSeleccionarCliente);

        dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = cliente.id;
            opcion.textContent = cliente.dni + " "+ cliente.nombre + " " + cliente.apellido;
            selectAgregarCliente.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los clientes: " + error);
    }
};


// ----------------------------------------------------------------------------
// Abre el modal para agregar -------------------------------------------------
// ----------------------------------------------------------------------------

btnCargarModalAgrega.addEventListener("click",async function(){
    await llenarSelectMarcaAgregar();
    await llenarSelectClienteAgregar();
})


// ----------------------------------------------------------------------------
// Funcion Agregar vehiculo --------------------------------------------------
// ----------------------------------------------------------------------------

async function setVehiculo(){
    const patenteNuevo = inputAgregarPatente.value;
    const añoNuevo = inputAgregarAño.value;
    const kilometrajeNuevo = inputAgregarKilometraje.value;
    const clienteNuevo = selectAgregarCliente.value;
    const modeloNuevo = selectAgregarModelo.value;
    const marcaNuevo = selectAgregarMarca.value;
    if(!patenteNuevo.trim() || !añoNuevo.trim() || !kilometrajeNuevo.trim() || !clienteNuevo || !modeloNuevo || !marcaNuevo){
        alert("No puede tener campos vacios");
    }else{
        var nuevoVehiculoData = {
            cliente: {
                id: clienteNuevo
            },
            modelo: {
                id: modeloNuevo
            },
            año : añoNuevo,
            kilometraje : kilometrajeNuevo,
            patente: formatearString(patenteNuevo)
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoVehiculoData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getVehiculos();
                var modal = new bootstrap.Modal(document.getElementById('modalVehiculo'));
                modal.hide();
    
            }else if(response.status === 4000){ 
                alert("Ya existe un vehiculo con esa patente");
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregaVehiculo.addEventListener("click",async function(){
    await setVehiculo();
})

// ---------------------------------------------------------------------------------------------------------------------------------------------
// Eliminar ------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

async function eliminarVehiculo(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getVehiculos();
        } else {
            alert("Hubo un error al eliminar la marca");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------------------
// Editar --------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Evento llenar Select Marca -------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarSelectMarcaEditar(){
    try {
        const dataMarcas = await listarMarca();
        selectEditarMarca.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarMarca = document.createElement("option");
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";
        selectEditarMarca.appendChild(opcionSeleccionarMarca);

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

// ----------------------------------------------------------------------------
// Evento llenar Select Modelo ------------------------------------------------
// ----------------------------------------------------------------------------

selectEditarMarca.addEventListener("change",async function(){
    selectEditarModelo.disabled = false;
    try {
        const dataModelos = await listarModelo(selectEditarMarca.value) //Guarda los datos de la peticion en una varible
        selectEditarModelo.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarModelo = document.createElement("option");
        opcionSeleccionarModelo.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarModelo.textContent = "Seleccionar una marca";
        selectEditarModelo.appendChild(opcionSeleccionarModelo);

        dataModelos.forEach((modelo) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = modelo.id;
            opcion.textContent = modelo.nombre;
            selectEditarModelo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
})

//Cargan los clientes
async function llenarSelectClienteEditar(){
    try {
        const dataCliente = await listarCliente(); //Guarda los datos de la peticion en una varible
        selectEditarCliente.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarCliente = document.createElement("option");
        opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
        selectEditarCliente.appendChild(opcionSeleccionarCliente);

        dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = cliente.id;
            opcion.textContent = cliente.dni + " " + cliente.nombre + " " + cliente.apellido;
            selectEditarCliente.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};

//Editar un Vehiculo
async function editVehiculo(){
    const patenteEditar = inputEditarPatente.value;
    const añoEditar = inputEditarAño.value;
    const kilometrajeEditar = inputEditarKilometraje.value;
    const clienteEditar = selectEditarCliente.value;
    const modeloEditar = selectEditarModelo.value;
    if(!patenteEditar.trim() || !añoEditar.trim() || !kilometrajeEditar.trim() || !clienteEditar || !modeloEditar){
        alert("No puede contener campos vacios");
    }else{
        var editarVehiculoData = {
            cliente: {
                id: clienteEditar
            },
            modelo: {
                id: modeloEditar
            },
            año : añoEditar,
            kilometraje : kilometrajeEditar,
            patente: formatearString(patenteEditar)
        }
        
        fetch(url+`/update/${idEditarVehiculo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarVehiculoData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getVehiculos();
                var modal = new bootstrap.Modal(document.getElementById('modalEditarVehiculo'));
                modal.hide();
    
            }else if(response.status === 4000){ 
                alert("Ya existe un vehiculo con esa patente");
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

btnEditarVehiculo.addEventListener("click",async function(){
    await editVehiculo();
})