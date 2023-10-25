const urlOrden = "http://localhost:8080/ordenDeTrabajo";
const urlDetalle = "http://localhost:8080/detalleOrdenTrabajo"; 
const urlPersonal = "http://localhost:8080/personalDeTrabajo";
const urlCliente = "http://localhost:8080/cliente"
//Campos Modal Cliente
const modalSelectClienteDni = document.getElementById("modal-select-ClienteDni");
const modalInputClienteNombre = document.getElementById("modal-input-ClienteNombre");
const modalInputClienteApellido = document.getElementById("modal-input-ClienteApellido");
//Campos Cliente
const inputClienteDni = document.getElementById("input-ClienteDni");
const inputClienteNombre = document.getElementById("input-ClienteNombre");
const inputClienteApellido = document.getElementById("input-ClienteApellido");
const inputClienteTel = document.getElementById("input-ClienteTel");
const inputClienteEmail = document.getElementById("input-ClienteEmail");
const inputClienteDomicilio = document.getElementById("input-ClienteDomicilio");
//Cmapos Vehiculo
const inptuVehiculoPatente = document.getElementById("input-VehiculoPatente");
const selectVehiculoMarca = document.getElementById("select-VehiculoMarca");
const selectVehiculoModelo = document.getElementById("select-VehiculoModelo");
const inputVehiculoAño = document.getElementById("input-VehiculoAño");
const inputVehiculoKilometraje = document.getElementById("input-VehiculoKilometraje");
//Campo servicios
const checkboxServicio = document.getElementById("checkbox-Servicios");
//Campo tecnico
const checkboxTecnico = document.getElementById("checkbox-Tecnico");
//Boton para guaradar
const btnSetOrden = document.getElementById("btn-SetOrdenDeTrabajo");
//Variable de cargas
var cargaCliente = "0";
var cargaVehiculo = "0";
// -----------------------------------------------------------------------------
//Carga la fecha automaticamente -----------------------------------------------
// -----------------------------------------------------------------------------
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora");

document.addEventListener("DOMContentLoaded", function(){
    //SET HORA
    const fechaActual = new Date();
    // Formatea la fecha actual en el formato YYYY-MM-DD para el elemento input tipo date
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses en JavaScript se indexan desde 0
    const anio = fechaActual.getFullYear();
    const fechaFormatted = `${anio}-${mes}-${dia}`;
    inputFecha.value = fechaFormatted;// Establece el valor del input con la fecha actual

    // Obtiene la hora actual en formato HH:MM
    const horas = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    inputHora.value = horaActual; // Establece el valor del input con la hora actual
})

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
// Rellenar Campos ------------------------------------------------------------
// ----------------------------------------------------------------------------

//Select cliente---------------------------------------------------------------
async function llenarSelectCliente(){
    try {
        const response = await fetch("http://localhost:8080/cliente/list"); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataCliente = await response.json(); //Guarda los datos de la peticion en una varible
        modalSelectClienteDni.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarCliente = document.createElement("option");
        opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarCliente.textContent = "Seleccionar una cliente";
        modalSelectClienteDni.appendChild(opcionSeleccionarCliente);

        dataCliente.forEach((cliente) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = cliente.id;
            opcion.textContent = cliente.dni;
            // Agrega datos adicionales al atributo data-* de HTML
            opcion.dataset.dni = cliente.dni;
            opcion.dataset.nombre = cliente.nombre;
            opcion.dataset.apellido = cliente.apellido;
            modalSelectClienteDni.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar los clientes: " + error);
    }
}

var dniSelect; //almaecna el dni del cliente seleccionado
modalSelectClienteDni.addEventListener("change", function(){
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value !== "") {
        // Obtiene los datos del cliente seleccionado
        dniSelect = selectedOption.dataset.dni;
        const nombre = selectedOption.dataset.nombre;
        const apellido = selectedOption.dataset.apellido;

        // Llena los campos de nombre y apellido con los valores correspondientes
        modalInputClienteNombre.value = nombre;
        modalInputClienteApellido.value = apellido;
        cargaCliente = "1";
    } else {
        // En caso de que se seleccione "Seleccionar un cliente", borra los campos
        modalInputClienteNombre.value = "";
        modalInputClienteApellido.value = "";
    }
})

//Cargar cliente seleccionado ----------------------------------
async function loadCliente(){
    try {
        const response = await fetch(`http://localhost:8080/cliente/listByDni/${dniSelect}`)
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataCargarCliente = await response.json();
        inputClienteDni.value = dataCargarCliente.dni;
        inputClienteNombre.value = dataCargarCliente.nombre;
        inputClienteApellido.value = dataCargarCliente.apellido;
        inputClienteTel.value = dataCargarCliente.telefono;
        inputClienteEmail.value = dataCargarCliente.email;
        inputClienteDomicilio.value = dataCargarCliente.domicilio;

    } catch (error) {
        
    }
}

// -----------------------------------------------------------------------------------------
// Llenar select Marca ---------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
async function llenarSelectMarca(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    selectVehiculoMarca.innerHTML = "";
    // Agrega la primera opción "Seleccionar una marca"
    const opcionSeleccionarMarca = document.createElement("option");
    opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
    opcionSeleccionarMarca.textContent = "Seleccionar una marca";
    selectVehiculoMarca.appendChild(opcionSeleccionarMarca);

    dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
        const opcion = document.createElement("option");
        opcion.value = marca.id;
        opcion.textContent = marca.nombre;
        selectVehiculoMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
    });
}

selectVehiculoMarca.addEventListener("change", async function(){
    selectVehiculoModelo.disabled = false;
    try {
        const response = await fetch(`http://localhost:8080/modelo/listByMarca/${selectVehiculoMarca.value}`); // Realiza una petición fetch
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataModelos = await response.json(); //Guarda los datos de la peticion en una varible
        selectVehiculoModelo.innerHTML = "";
        // Agrega la primera opción "Seleccionar una marca"
        const opcionSeleccionarModelo = document.createElement("option");
        opcionSeleccionarModelo.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarModelo.textContent = "Seleccionar una marca";
        selectVehiculoModelo.appendChild(opcionSeleccionarModelo);

        dataModelos.forEach((modelo) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = modelo.id;
            opcion.textContent = modelo.nombre;
            selectVehiculoModelo.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
})


// -----------------------------------------------------------------------------------------
// Llenar select Servicios ---------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
async function llenarCheckboxesServicios() {
    try {
        const response = await fetch("http://localhost:8080/servicio/list");
        if (!response.ok) {
            throw new Error("Error en la petición");
        }
        const dataServicio = await response.json();

        checkboxServicio.innerHTML = ""; // Limpia el contenedor

        dataServicio.forEach((servicio) => {
            const checkboxLabel = document.createElement("label");
            checkboxLabel.classList.add("form-check", "form-check"); // Clases de Bootstrap para form-check-inline
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-check-input"); // Clase de Bootstrap para form-check-input
            checkbox.name = "servicios";
            checkbox.value = servicio.id;

            const servicioNombre = document.createTextNode(servicio.nombre);

            checkboxLabel.appendChild(checkbox);
            checkboxLabel.appendChild(servicioNombre);

            checkboxServicio.appendChild(checkboxLabel);
        });
    } catch (error) {
        console.error("Error al cargar los servicios: " + error);
    }
}
// -----------------------------------------------------------------------------------------
// Llenar select Tecnico ---------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
async function llenarCheckboxesTecnico() {
    const response = await fetch("http://localhost:8080/tecnico/list");
    if (!response.ok) {
        throw new Error("Error en la petición");
    }
    const dataTecnico = await response.json();

    checkboxTecnico.innerHTML = ""; // Limpia el contenedor

    dataTecnico.forEach((tecnico) => {
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("form-check", "form-check"); // Clases de Bootstrap para form-check-inline
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input"); // Clase de Bootstrap para form-check-input
        checkbox.name = "tecnicos";
        checkbox.value = tecnico.id;

        const nombreApellido = document.createTextNode(tecnico.nombre + ", " + tecnico.apellido);

        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(nombreApellido);

        checkboxTecnico.appendChild(checkboxLabel);
    });
}

//Llama a la funciones para llenar
document.addEventListener("DOMContentLoaded", async function(){
    await llenarSelectMarca();
    await llenarCheckboxesServicios();
    await llenarCheckboxesTecnico();
})

// ---------------------------------------------------------------------------
//Guaradar Orden de trabajo --------------------------------------------------
// ---------------------------------------------------------------------------
async function setCliente() {
    var nombreNuevoCliente = inputClienteNombre.value;
    nombreNuevoCliente = formatearString(nombreNuevoCliente);
    var apellidoNuevoCliente = inputClienteApellido.value;
    apellidoNuevoCliente = formatearString(apellidoNuevoCliente);
    var dniNuevoCliente = inputClienteDni.value;
    var telefonoNuevoCliente = inputClienteTel.value;
    var emailNuevoCliente = inputClienteEmail.value;
    var domicilioNuevoCliente = inputClienteDomicilio.value;
    domicilioNuevoCliente = formatearString(domicilioNuevoCliente);

    if (
        nombreNuevoCliente.trim() === "" ||
        apellidoNuevoCliente.trim() === "" ||
        dniNuevoCliente.trim() === null ||
        telefonoNuevoCliente.trim() === null ||
        emailNuevoCliente.trim() === "" ||
        domicilioNuevoCliente.trim() === ""
    ) {
        alert("Ningún campo puede estar vacío");
    } else {
        var nuevoClienteData = {
            nombre: nombreNuevoCliente,
            apellido: apellidoNuevoCliente,
            dni: dniNuevoCliente,
            telefono: telefonoNuevoCliente,
            email: emailNuevoCliente,
            domicilio: domicilioNuevoCliente,
            //fecha: inputFecha
        };

        fetch(urlCliente + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoClienteData)
        })
        .then(response => {
            if (response.ok) {
                alert("Cliente creado correctamente");
            } else {
                throw new Error("Error en la solicitud POST");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

//Set vehiculo

async function setVehiculo(){
    const dniCliente = inputClienteDni.value; 
    try {
        const response = await fetch(`http://localhost:8080/cliente/listByDni/${dniCliente}`)
        if (!response.ok) { //Si la peticion tubo un error entonces
            throw new Error("Error en la petición");  //Muestra el mensaje en consola
        }
        const dataCargarCliente = await response.json();

        var idClienteNuevo = dataCargarCliente.id;

    } catch (error) {
        
    }
    const pate = inptuVehiculoPatente.value;
    const patente = formatearString(pate);
    const modelo = selectVehiculoModelo.value;
    const cliente = idClienteNuevo; 
    const año = inputVehiculoAño.value;
    const kilometraje = inputVehiculoKilometraje.value;

    if(patente.trim() === "" ||
        kilometraje === null ||
        año === null){
        alert("Los campos del vehiculo no pueden estar vacios");
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
    
            } else {
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}

btnSetOrden.addEventListener("click", async function () {
    if(cargaCliente === "0" && cargaVehiculo === "0"){
        alert("Crea las dos cosas");
        await setCliente();
        await setVehiculo();
    }else if(cargaVehiculo === "0" && cargaCliente === "1"){
        await setVehiculo();
        alert("Setear lo demas")
    }else if(cargaCliente === "0" && cargaVehiculo ==="1"){
        await setCliente();
    }
});
