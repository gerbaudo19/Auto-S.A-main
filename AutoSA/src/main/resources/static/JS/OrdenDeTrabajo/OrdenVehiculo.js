// -------------------------------------------------------------------------------------------------------------------
// Variales  ---------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
const url = 'http://localhost:8080/vehiculo';
import { formatearString } from "./OrdenCliente.js";
const selectBuscarVehiculo = document.getElementById("select-BuscarVehiculo");
const btnCargarVehiculo = document.getElementById("btn-CargarVehiculo");
const inputVehiculoPatente = document.getElementById("input-VehiculoPatente");
const selectVehiculoMarca = document.getElementById("select-VehiculoMarca");
const selectVehiculoModelo = document.getElementById("select-VehiculoModelo");
const inputVehiculoAño = document.getElementById("input-VehiculoAño");
const inputVehiculoKilometraje = document.getElementById("input-VehiculoKilometraje");
const btnVehiculoLimpiar = document.getElementById("btn-VehiculoBorrarDatos")

// -------------------------------------------------------------------------------------------------------------------
// Llenar select vehiculos  ------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
export async function cargarSelectVehiculo(idClienteVehiculo){
    selectBuscarVehiculo.disabled = false;
    selectBuscarVehiculo.value = "";
    try {
        const response = await fetch(url+`/listByClienteId/${idClienteVehiculo}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Vehiculos: ${response.status}`);
        }
        const dataVehiculos = await response.json();

            // Agrega la primera opción "Seleccionar una marca"
            selectBuscarVehiculo.innerHTML = ""
            const opcionSeleccionarCliente = document.createElement("option");
            opcionSeleccionarCliente.value = ""; // Puedes asignar un valor vacío o un valor especial
            opcionSeleccionarCliente.textContent = "Seleccione un vehiculo";
            selectBuscarVehiculo.appendChild(opcionSeleccionarCliente);
    
            dataVehiculos.forEach((vehiculo) => { // Agrega las nuevas opciones 
                const opcion = document.createElement("option");
                opcion.value = vehiculo.id;
                opcion.textContent = vehiculo.patente + ", "+ vehiculo.modelo.marca.nombre + ", " +  vehiculo.modelo.nombre;
                opcion.dataset.patente = vehiculo.patente;// Agrega un atributo personalizado para almacenar la patente
                selectBuscarVehiculo.appendChild(opcion); //con appendChild() se agrega el elemento al select
            });
    } catch (error) {
        console.error("Error al cargar los clientes: " + error);
    }
}

// -------------------------------------------------------------------------------------------------------------------
// Cargar vehiculo de cliente ----------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
btnCargarVehiculo.addEventListener("click", async function () {
    const selectedOption = selectBuscarVehiculo.options[selectBuscarVehiculo.selectedIndex];

    if (selectedOption) {
        const cargarVehiculoSeleccionado = selectedOption.dataset.patente;
        try {
            const response = await fetch(url + `/listByPatente/${cargarVehiculoSeleccionado}`);
            if (!response.ok) {
                throw new Error(`Error al cargar los Clientes: ${response.status}`);
            }
            const dataVehiculo = await response.json();
            inputVehiculoAño.value = dataVehiculo.año;
            inputVehiculoKilometraje.value = dataVehiculo.kilometraje;
            inputVehiculoPatente.value = dataVehiculo.patente;
            selectVehiculoMarca.value = dataVehiculo.modelo.marca.id;
            await llenarSelectModelo(dataVehiculo.modelo.marca.id); //llena la fucion para que aparesca el modelo
            selectVehiculoModelo.value = dataVehiculo.modelo.id;
            //Desabilita los inputs y selects
            selectVehiculoMarca.disabled = true;
            selectVehiculoModelo.disabled = true;
            inputVehiculoAño.disabled = true;
            inputVehiculoPatente.disabled = true;


        } catch (error) {
            console.error('Error al cargar los Tecnicos:', error);
        }
    }
})

// -------------------------------------------------------------------------------------------------------------------
// Cargar campos marca y modelo --------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function(){
    await llenarSelectMarca();
})

// ----------------------------------------------------------------------------
// Evento llenar Select Marca -------------------------------------------------
// ----------------------------------------------------------------------------

async function llenarSelectMarca(){
    const response = await fetch("http://localhost:8080/marca/list"); // Realiza una petición fetch
    if (!response.ok) { //Si la peticion tubo un error entonces
        throw new Error("Error en la petición");  //Muestra el mensaje en consola
    }
    const dataMarcas = await response.json(); //Guarda los datos de la peticion en una varible
    selectVehiculoMarca.innerHTML = ""; 
    try {
        const opcionSeleccionarMarca = document.createElement("option");// crea un elemnto option
        opcionSeleccionarMarca.value = ""; // Puedes asignar un valor vacío o un valor especial
        opcionSeleccionarMarca.textContent = "Seleccionar una marca";// Agrega la primera opción "Seleccionar una marca"
        selectVehiculoMarca.appendChild(opcionSeleccionarMarca);

        dataMarcas.forEach((marca) => { // Agrega las nuevas opciones 
            const opcion = document.createElement("option");
            opcion.value = marca.id;
            opcion.textContent = marca.nombre;
            selectVehiculoMarca.appendChild(opcion); //con appendChild() se agrega el elemento al select
        });
    } catch (error) {
        console.error("Error al cargar las marcas: " + error);
    }
};


// ----------------------------------------------------------------------------
// Evento llenar Select Modelos -----------------------------------------------
// ----------------------------------------------------------------------------
async function llenarSelectModelo(marcaModelo){
    selectVehiculoModelo.disabled = false;
    try {
        const response = await fetch(`http://localhost:8080/modelo/listByMarca/${marcaModelo}`); // Realiza una petición fetch
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
        console.error("Error al cargar los modelos: " + error);
    }
}
selectVehiculoMarca.addEventListener("change",async function(){
    await llenarSelectModelo(selectVehiculoMarca.value);
})

// -------------------------------------------------------------------------------------------------------------------
// Limpiar campos ----------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
export function limpiarvehiculo(){
    inputVehiculoPatente.value = "";
    selectVehiculoMarca.value = "";
    selectVehiculoModelo.value = "";
    inputVehiculoAño.value = "";
    inputVehiculoKilometraje.value = "";
    selectBuscarVehiculo.value = "" ;
    //Activa los campos
    inputVehiculoPatente.disabled = false;
    selectVehiculoMarca.disabled = false;
    inputVehiculoAño.disabled = false;
    inputVehiculoKilometraje.disabled = false;
}
btnVehiculoLimpiar.addEventListener("click", function(){
    limpiarvehiculo();
})

export async function verificarVehiculo(cliente){
    const patente = inputVehiculoPatente.value;
    const kilometraje = inputVehiculoKilometraje.value;
    const año =  inputVehiculoAño.value;
    const marca = selectVehiculoMarca.value;
    const modelo = selectVehiculoModelo.value;
    let vehiculoCargado;
    console.log("Datos de inicio "+patente, kilometraje, año, marca, modelo);
    if(!patente.trim() || !kilometraje.trim() || !año.trim() || !marca.trim() || !modelo.trim()){
        alert("No debe haber ningun campo vacio");
    }else{  
        try {
            const responseConsulta = await fetch(url+`/listByPatente/${formatearString(patente)}`);
            if (!responseConsulta.ok) {
                throw new Error(`Error al buscar vehiculo: ${responseConsulta.status}`);
            }
            const vehiculoConsulta = await responseConsulta.json();
            if (vehiculoConsulta === null) {
              console.log("El vehiculo no existe");
              await setVehiculo(patente, año, kilometraje,cliente, modelo);
              const responsVehiculoaux = await fetch(url+`/listByPatente/${formatearString(patente)}`);
              vehiculoCargado = await responsVehiculoaux.json();
              return vehiculoCargado;
            }else{
                vehiculoCargado = vehiculoConsulta;
              console.log("Vehiculo encontrado con patente " + vehiculoCargado.patente);
              return vehiculoCargado;
            }
        } catch (error) {
         console.error('Error al cargar los Tecnicos:', error);
        }
    }
}

async function setVehiculo(patente, año, kilometraje, cliente, modelo ){
    const anioActual = new Date().getFullYear();
    if(anioActual < año){
        alert("El año ingresado no es valido")
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
            patente: formatearString(patente)
        }
        
        await fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoVehiculoData)
        })
        .then(function (response) {
            if (response.ok) {
                console.log("vehiculo creado con exito");
            } else if(response.status === 400){
                alert("Ya existe un vehiculo con esa patente ");
                console.log("Respuesta de red OK pero respuesta HTTP no OK");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}
