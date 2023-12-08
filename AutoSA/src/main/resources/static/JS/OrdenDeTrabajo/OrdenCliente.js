// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
const url = 'http://localhost:8080/cliente';
import { cargarSelectVehiculo, limpiarvehiculo } from "./OrdenVehiculo.js";
//Tabla
const tabla = document.getElementById('tablaCliente');
const tbody = tabla.querySelector('tbody');
//Buscar
const inputClienteBuscar = document.getElementById("input-ClienteBuscar");
const btnBuscarCliente = document.getElementById("btn-BuscarCliente");
const selectFiltrarCliente = document.getElementById("select-FiltrarCliente");
//Campos cliente
const inputClienteDni = document.getElementById("input-ClienteDni");
const inputClienteNombre = document.getElementById("input-ClienteNombre");
const inputClienteApellido = document.getElementById("input-ClienteApellido");
const inputClienteTel = document.getElementById("input-ClienteTel");
const inputClienteEmail = document.getElementById("input-ClienteEmail");
const inputClienteDomicilio = document.getElementById("input-ClienteDomicilio");
//limpiar 
const btnClienteLimpiar = document.getElementById("btn-ClienteBorrarDatos");
export let idClienteElegido;
const selectBuscarVehiculo = document.getElementById("select-BuscarVehiculo");


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
// Cargar Tablas For -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function llenarTabla(cliente){
    const fila = document.createElement('tr');
    const columnaDni = document.createElement('td');
    const columnaApellido = document.createElement('td');
    const columnaNombre = document.createElement('td');
    const columnaOpciones = document.createElement('td');

    columnaDni.textContent = cliente.dni;
    columnaApellido.textContent = cliente.apellido;
    columnaNombre.textContent = cliente.nombre;

    // Botones de Cargar datos

    const botonCargar = document.createElement('button');
    botonCargar.textContent = 'Cargar';
    botonCargar.type = "button";
    botonCargar.classList= 'btn btn-outline-success';
    botonCargar.style = "margin: 0px 5px;"
    botonCargar.setAttribute("data-bs-target", "#modalCliente");
    botonCargar.setAttribute("data-bs-toggle", "modal");
    botonCargar.addEventListener('click',async function () {
        idClienteElegido = cliente.id;
        await cargarCliente(cliente.id);
        await cargarSelectVehiculo(idClienteElegido);
    });

    columnaOpciones.appendChild(botonCargar);

    fila.appendChild(columnaDni)
    fila.appendChild(columnaApellido)
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaOpciones);

    tbody.appendChild(fila);
}
// -------------------------------------------------------------------------------------------------------------------
// Cargar Tablas For -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function llenarTablaFor(dataCliente){
    tbody.innerHTML = '';

    dataCliente.forEach(async function (cliente) {
        await llenarTabla(cliente);
    })
}
// -------------------------------------------------------------------------------------------------------------------
// Cargar Tablas If --------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function llenarTablaIf(dataCliente){

    tbody.innerHTML = '';

    const cliente = dataCliente;
        
    if (cliente) {
       await llenarTabla(cliente);
    }else{
        alert("No se encontro ningun Cliente");
    }

}

// -------------------------------------------------------------------------------------------------------------------
// Cargar Clientes ---------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function cargarCliente(cliente){
    try{
        const response = await fetch(url+`/listById/${cliente}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataCliente = await response.json();
        inputClienteDni.value = dataCliente.dni;
        inputClienteNombre.value = dataCliente.nombre;
        inputClienteApellido.value = dataCliente.apellido;
        inputClienteTel.value = dataCliente.telefono;
        inputClienteEmail.value = dataCliente.email;
        inputClienteDomicilio.value = dataCliente.domicilio;
        //Desabilita los datos
        inputClienteApellido.disabled = true;
        inputClienteDni.disabled = true;
        inputClienteDomicilio.disabled = true;
        inputClienteNombre.disabled = true;
        inputClienteTel.disabled = true;
        inputClienteEmail.disabled = true;
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// -------------------------------------------------------------------------------------------------------------------
// Traer cliente -----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

async function getCliente(){
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

// -------------------------------------------------------------------------------------------------------------------
// Traer Clientes por Nombre -----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function getClienteXDni(){
    const dniConsulta = inputClienteBuscar.value;
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

// -------------------------------------------------------------------------------------------------------------------
// Traer Clientes por Dni --------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
async function getClienteXNombre(){
    const nombreConsulta = inputClienteBuscar.value;
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

// -------------------------------------------------------------------------------------------------------------------
// Evento cambio Filtrar ---------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
selectFiltrarCliente.addEventListener("change", function(){
    if(selectFiltrarCliente.value === "0"){
        inputClienteBuscar.disabled = true;
        inputClienteBuscar.value = "";
    }else if(selectFiltrarCliente.value === "1"){  
        inputClienteBuscar.disabled = false;
        inputClienteBuscar.type = "number";
        inputClienteBuscar.value = "";
    }else if(selectFiltrarCliente.value === "2"){
        inputClienteBuscar.disabled = false;
        inputClienteBuscar.type = "text";
        inputClienteBuscar.value = "";
    }
});

// -------------------------------------------------------------------------------------------------------------------
// Evento boton Buscar -----------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
btnBuscarCliente.addEventListener("click",async function(){
    if(selectFiltrarCliente.value === "0" ){
        await getCliente();
    }else if(selectFiltrarCliente.value === "1"){  
        await getClienteXDni();
    }else if(selectFiltrarCliente.value === "2"){
        await getClienteXNombre();
    }
});

// -------------------------------------------------------------------------------------------------------------------
// Limpiar campos ----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

btnClienteLimpiar.addEventListener("click", function(){
    inputClienteApellido.value = "";
    inputClienteDni.value = "";
    inputClienteDomicilio.value = "";
    inputClienteEmail.value = "";
    inputClienteNombre.value = "";
    inputClienteTel.value = "";
    selectBuscarVehiculo.disabled = true;
    //Activa los campos
    inputClienteApellido.disabled = false
    inputClienteDni.disabled = false
    inputClienteDomicilio.disabled = false
    inputClienteEmail.disabled = false
    inputClienteNombre.disabled = false
    inputClienteTel.disabled = false
    limpiarvehiculo();
})

//----------------------------------------------------------------------------------------------------------------------
// Verificar ------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
export async function verificarCliente(){
    const nombre = inputClienteNombre.value;
    const apellido = inputClienteApellido.value;
    const dni =  inputClienteDni.value;
    const telefono = inputClienteTel.value;
    const email = inputClienteEmail.value;
    const domicilio = inputClienteDomicilio.value;
    let clienteCargado;
    console.log("Datos de inicio "+nombre, apellido, dni, telefono, email, domicilio);
    if(!nombre.trim() || !apellido.trim() || !dni.trim() || !telefono.trim() || !email.trim() || !domicilio.trim()){
        alert("No debe haber ningun campo vacio");
    }else{  
        try {
            const responseConsulta = await fetch(url+`/listByDni/${dni}`);
            if (!responseConsulta.ok) {
                throw new Error(`Error al cargar los Clientes: ${responseConsulta.status}`);
            }
            const clienteConsulta = await responseConsulta.json();
            if (clienteConsulta === null) {
              console.log("El cliente no existe");
              await setCliente(nombre, apellido, dni, telefono, email, domicilio);
              console.log("Se creo el cliente");
              const responsClienteAux = await fetch(url+`/listByDni/${dni}`)
              clienteCargado = await responsClienteAux.json();
              return clienteCargado;
            }else{
              clienteCargado = clienteConsulta;
              console.log("cliente encontrado con dni " + clienteCargado.dni);
              return clienteCargado;
            }
        } catch (error) {
         console.error('Error al cargar los Tecnicos:', error);
        }
    }
}

async function setCliente(nombre, apellido, dni, telefono, email, domicilio){
    var nuevoClienteData = {
        nombre: formatearString(nombre),
        apellido : formatearString(apellido),
        dni : dni,
        telefono : telefono,
        email : email,
        domicilio : formatearString(domicilio)
    }
    
    fetch(url + "/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoClienteData)
    })
}