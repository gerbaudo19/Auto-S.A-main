const url = "http://localhost:8080/vehiculo"; 

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
// Cargar Tablas --------------------------------------------------------------
// ----------------------------------------------------------------------------
//Con For ---------------------------------------------------------------------
async function llenarTablaFor(data){
    const tabla = document.getElementById('tablaVehiculo');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    data.forEach(function (vehiculo) {
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

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Modificar';
        botonModificar.classList= 'btn btn-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarVehiculo");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        botonModificar.addEventListener('click', function () {
            editarVehiculoId = vehiculo.id;
            llenarSelectMarcaEditar();
            llenarSelectClienteEditar();
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
            editarVehiculoId = vehiculo.id;
        });

        columnaOpciones.appendChild(botonModificar);
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

//Con If ----------------------------------------------------------------------

async function llenarTablaIf(data){
    const tabla = document.getElementById('tablaVehiculo');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';
        vehiculo = data;
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

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Modificar';
            botonModificar.classList= 'btn btn-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarVehiculo");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarVehiculoId = vehiculo.id;
                llenarSelectMarcaEditar();
                llenarSelectClienteEditar();
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
                editarVehiculoId = vehiculo.id;
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);
            columnaOpciones.appendChild(botonVer);

            fila.appendChild(columnaPatente);
            fila.appendChild(columnaMarca);
            fila.appendChild(columnaModelo);
            fila.appendChild(columnaAño);
            fila.appendChild(columnaKilometraje);
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        }else{
            alert("no se encontro vehiculo con patente : " + patente);
        }
}

// Sin filtros ---------------------------------------------------------------
var editarVehiculoId;

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

// filtrar por Patente ----------------------------------------------------------------

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

// filtrar por Marca ----------------------------------------------------------------

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

// filtrar por Cliente ----------------------------------------------------------------

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

//Leer opcion de filtrado y buscar -------------------------------------

const btnBuscar = document.getElementById("btn-Buscar");  //Contiene el boton buscar
const selectFiltrar = document.getElementById("selectFiltrar"); //contiene el select de filtrar
const selectTablaVehiculo = document.getElementById("select-TablaVehiculo"); //Contiene el select arriba de la tabla
const inputTablaVehiculo = document.getElementById("input-TablaVehiculo");


selectFiltrar.addEventListener("change", async () => { //Carga el select si se selecciono un filtrado

    if (selectFiltrar.value === "1") { //Opcion Marca
        inputTablaVehiculo.style.display = "none";
        selectTablaVehiculo.style.display = "block";
        selectTablaVehiculo.disabled = false;
        selectTablaVehiculo.value = "";
        try { //carga el select con marcas
            const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
            if (!response.ok) { //Si la peticion tubo un error entonces
                throw new Error("Error en la petición");  //Muestra el mensaje en consola
            }
            const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
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
            const response = await fetch("http://localhost:8080/cliente/list"); // Realiza una petición fetch
            if (!response.ok) { //Si la peticion tubo un error entonces
                throw new Error("Error en la petición");  //Muestra el mensaje en consola
            }
            const dataCliente = await response.json(); //Guarda los datos de la peticion en una varible
            selectTablaVehiculo.innerHTML = "";
            // Agrega la primera opción "Seleccionar una marca"
            const opcionSeleccionarCliente = document.createElement("option");
            opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
            opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
            selectTablaVehiculo.appendChild(opcionSeleccionarCliente);
    
            dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
                const opcion = document.createElement("option");
                opcion.value = cliente.id;
                opcion.textContent = cliente.dni + " "+ cliente.nombre + " " + cliente.apellido;
                selectTablaVehiculo.appendChild(opcion); //con appendChild() se agrega el elemento al select
            });
        } catch (error) {
            console.error("Error al cargar las marcas: " + error);
        }
        
    }else{
        selectTablaVehiculo.disabled = true; //Desactiva el select
        selectTablaVehiculo.value = "";
    }
});

//Evento del boton buscar
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


// ----------------------------------------------------------------------------
// Agregar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

const btnCargarModalAgrega = document.getElementById("btn-CargarModalAgregaVehiculo");
const btnAgregaVehiculo = document.getElementById("btn-AgregarVehiculo");
const selectAgregarMarca = document.getElementById("select-AgregarMarcaVehiculo");
const selectAgregarModelo = document.getElementById("select-AgregarModeloVehiculo");
const selectAgregarCliente = document.getElementById("select-AgregarClienteVehiculo");

//Llena el select con Marcas
async function llenarSelectMarcaAgregar(){
    try {
        const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
        selectAgregarMarca.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarMarca = document.createElement("option");
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";
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
//Una vez que se selecciono una marca se cargan los modelos de esa marca
selectAgregarMarca.addEventListener("change",async function(){
    selectAgregarModelo.disabled = false;
    try {
        const response = await fetch(`http://localhost:8080/modelo/listByMarca/${selectAgregarMarca.value}`); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataModelos = await response.json(); //Guarda los datos de la peticion en una varible
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
        console.error("Error al cargar las marcas: " + error);
    }
})

//Cargan los clientes
async function llenarSelectClienteAgregar(){
    try {
        const response = await fetch("http://localhost:8080/cliente/list"); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataCliente = await response.json(); //Guarda los datos de la peticion en una varible
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
        console.error("Error al cargar las marcas: " + error);
    }
};

//Opcion agregar nuevo vehiculo
btnCargarModalAgrega.addEventListener("click", function(){
    llenarSelectMarcaAgregar();
    llenarSelectClienteAgregar();
})

//Crea un nuevo modelo
function setVehiculo(){

    const pate = document.getElementById("AgregarNombrePatente").value;
    const patente = formatearString(pate);
    const modelo = document.getElementById("select-AgregarModeloVehiculo").value;
    const cliente = document.getElementById("select-AgregarClienteVehiculo").value;
    const año = document.getElementById("AgregarAñoVehiculo").value;
    const kilometraje = document.getElementById("AgregarkilometrajeVehiculo").value;

    if(patente.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var nuevoVehiculoData = {
            cliente: {
                id: cliente
            },
            modelo: {
                id: modelo
            },
            año : año,
            kilometraje : kilometraje,
            patente: patente
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
    
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregaVehiculo.addEventListener("click", function(){
    setVehiculo();
})

// ----------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function eliminarVehiculo(id){
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

// ----------------------------------------------------------------------------
// Editar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

const btnEditarVehiculo = document.getElementById("btn-EditarVehiculo");
const selectEditarMarca = document.getElementById("select-EditarMarcaVehiculo");
const selectEditarModelo = document.getElementById("select-EditarModeloVehiculo");
const selectEditarCliente = document.getElementById("select-EditarClienteVehiculo");

//Llena el select con Marcas
async function llenarSelectMarcaEditar(){
    try {
        const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
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
//Una vez que se selecciono una marca se cargan los modelos de esa marca
selectEditarMarca.addEventListener("change",async function(){
    selectEditarModelo.disabled = false;
    try {
        const response = await fetch(`http://localhost:8080/modelo/listByMarca/${selectEditarMarca.value}`); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataModelos = await response.json(); //Guarda los datos de la peticion en una varible
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
        const response = await fetch("http://localhost:8080/cliente/list"); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataCliente = await response.json(); //Guarda los datos de la peticion en una varible
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
function editVehiculo(){

    const pate = document.getElementById("EditarNombrePatente").value;
    const patente = formatearString(pate);
    const modelo = document.getElementById("select-EditarModeloVehiculo").value;
    const cliente = document.getElementById("select-EditarClienteVehiculo").value;
    const año = document.getElementById("EditarAñoVehiculo").value;
    const kilometraje = document.getElementById("EditarkilometrajeVehiculo").value;

    if(patente.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var editarVehiculoData = {
            cliente: {
                id: cliente
            },
            modelo: {
                id: modelo
            },
            año : año,
            kilometraje : kilometraje,
            patente: patente
        }
        
        fetch(url+`/update/${editarVehiculoId}`, {
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
    
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

btnEditarVehiculo.addEventListener("click", function(){
    editVehiculo();
})