const url = "http://localhost:8080/cliente"; 
//Variables necesarias
const btnBuscar = document.getElementById("btn-Buscar");  //Contiene el boton buscar
const selectFiltrar = document.getElementById("selectFiltrar"); //contiene el select de filtrar
const inputTablaCliente= document.getElementById("input-TablaCliente"); //Contiene el input arriba de la tabla
const btnAgregarCliente = document.getElementById("btn-AgregarCliente"); //Boton para agregar cliente
const btnEditarCliente = document.getElementById("btn-EditarCliente"); //Boton para editar Cliente

//Funcion para dar formato al texto
function formatearString(textoEntrada) {

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

// ----------------------------------------------------------------------------
// Cargar Tablas --------------------------------------------------------------
// ----------------------------------------------------------------------------
var editarClienteId;
//Con For ---------------------------------------------------------------------
async function llenarTablaFor(dataCliente){
    const tabla = document.getElementById('tablaCliente');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    dataCliente.forEach(function (cliente) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaDni = document.createElement('td');
        const columnaApellido = document.createElement('td');
        const columnaNombre = document.createElement('td');
        const columnaTelefono = document.createElement('td');
        const columnaEmail = document.createElement('td');
        const columnaDomicilio = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaId.textContent = cliente.id;
        columnaDni.textContent = cliente.dni;
        columnaApellido.textContent = cliente.apellido;
        columnaNombre.textContent = cliente.nombre;
        columnaTelefono.textContent = cliente.telefono;
        columnaEmail.textContent = cliente.email;
        columnaDomicilio.textContent = cliente.domicilio;

        // Botones de modificar y eliminar

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Editar';
        botonModificar.classList= 'btn btn-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarCliente");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        botonModificar.addEventListener('click', function () {
            editarClienteId = cliente.id;
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-primary';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click', function () {
            eliminarCliente(cliente.id);
        });

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList= 'btn btn-primary';
        botonVer.style = "margin: 0px 5px;"
        botonVer.setAttribute("data-bs-target", "#modalVerCliente");
        botonVer.setAttribute("data-bs-toggle", "modal");
        botonVer.addEventListener('click', function () {
            editarTecnicoId = tecnico.id;
        });

        columnaOpciones.appendChild(botonModificar);
        columnaOpciones.appendChild(botonEliminar);
        columnaOpciones.appendChild(botonVer);

        fila.appendChild(columnaId);
        fila.appendChild(columnaDni)
        fila.appendChild(columnaApellido)
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaTelefono);
        fila.appendChild(columnaEmail)
        fila.appendChild(columnaDomicilio)
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);
    })
}
//Con if ----------------------------------------------------------------------
async function llenarTablaIf(dataCliente){

    const tabla = document.getElementById('tablaCliente');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    cliente = dataCliente;
        
    if (cliente) {
        const fila = document.createElement('tr');
        const columnaId = document.createElement('td');
        const columnaDni = document.createElement('td');
        const columnaApellido = document.createElement('td');
        const columnaNombre = document.createElement('td');
        const columnaTelefono = document.createElement('td');
        const columnaEmail = document.createElement('td');
        const columnaDomicilio = document.createElement('td');
        const columnaOpciones = document.createElement('td');

        columnaId.textContent = cliente.id;
        columnaDni.textContent = cliente.dni;
        columnaApellido.textContent = cliente.apellido;
        columnaNombre.textContent = cliente.nombre;
        columnaTelefono.textContent = cliente.telefono;
        columnaEmail.textContent = cliente.email;
        columnaDomicilio.textContent = cliente.domicilio;

        // Botones de modificar y eliminar

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Editar';
        botonModificar.classList= 'btn btn-primary';
        botonModificar.style = "margin: 0px 5px;"
        botonModificar.setAttribute("data-bs-target", "#modalEditarCliente");
        botonModificar.setAttribute("data-bs-toggle", "modal");
        botonModificar.addEventListener('click', function () {
            editarClienteId = cliente.id;
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList= 'btn btn-primary';
        botonEliminar.style = "margin: 0px 5px;"
        botonEliminar.addEventListener('click', function () {
            eliminarCliente(cliente.id);
        });

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList= 'btn btn-primary';
        botonVer.style = "margin: 0px 5px;"
        botonVer.setAttribute("data-bs-target", "#modalVerCliente");
        botonVer.setAttribute("data-bs-toggle", "modal");
        botonVer.addEventListener('click', function () {
            editarTecnicoId = tecnico.id;
        });

        columnaOpciones.appendChild(botonModificar);
        columnaOpciones.appendChild(botonEliminar);
        columnaOpciones.appendChild(botonVer);

        fila.appendChild(columnaId);
        fila.appendChild(columnaDni)
        fila.appendChild(columnaApellido)
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaTelefono);
        fila.appendChild(columnaEmail)
        fila.appendChild(columnaDomicilio)
        fila.appendChild(columnaOpciones);

        tbody.appendChild(fila);
    }else{
        alert("No se encontro ningun Cliente");
    }

}
// Sin filtros ---------------------------------------------------------------

async function getCliente() {
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

// Filtra por Dni ----------------------------------------------------------------

async function getClienteXDni() {
    try {
        const response = await fetch(url+`/listByDni/${inputTablaCliente.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataCliente = await response.json();

        await llenarTablaIf(dataCliente);

    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// Filtra por Id ----------------------------------------------------------------

async function getClienteXId() {
    try {
        const response = await fetch(url+`/listById/${inputTablaCliente.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Clientes: ${response.status}`);
        }
        const dataCliente = await response.json();
        await llenarTablaIf(dataCliente);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// Filtra por Nombre ----------------------------------------------------------------

async function getClienteXNombre() {
    var nombreConsulta = inputTablaCliente.value;
    var nombreConsulta = formatearString(nombreConsulta);
    try {
        const response = await fetch(url+`/listByNombre/${nombreConsulta}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataCliente = await response.json();
        await llenarTablaFor(dataCliente);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// Filtra por Fecha ----------------------------------------------------------------

async function getClienteXFecha() {
    try {
        const response = await fetch(url+`/listByFecha/${inputTablaCliente.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataCliente = await response.json();

        await llenarTablaFor(dataCliente);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}
//Leer opcion de filtrado y buscar -------------------------------------

//Carga el select si se selecciono un filtrado
selectFiltrar.addEventListener("change", async () => {

    if (selectFiltrar.value === "1" || selectFiltrar.value === "2") { //Opcion DNI
        inputTablaCliente.disabled = false; // Activa el input
        inputTablaCliente.type = "number";
        inputTablaCliente.value = "";

    }else if(selectFiltrar.value === "3"){ //Opcion Nombre
        inputTablaCliente.disabled = false;
        inputTablaCliente.type = "text";
        inputTablaCliente.value = "";
        
    }else if(selectFiltrar.value === "4"){
        inputTablaCliente.disabled = false;
        inputTablaCliente.type = "date";
        inputTablaCliente.value = "";
    }else{
        inputTablaCliente.disabled = true; //Desactiva el select
        inputTablaCliente.value = "";
    }
});

//Evento del boton buscar
btnBuscar.addEventListener("click", async function(event){
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getClienteXDni();

    }else if(selectFiltrar.value === "2"){
        event.preventDefault();
        await getClienteXId();

    }else if(selectFiltrar.value === "3"){
        event.preventDefault();
        await getClienteXNombre();
    }else if(selectFiltrar.value === "4"){
        event.preventDefault();
        await getClienteXFecha();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getCliente();
    }
});


// ----------------------------------------------------------------------------
// Agregar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function setCliente(){
    var nombreNuevoCliente = document.getElementById("nombreNuevoCliente").value;
    var apellidoNuevoCliente = document.getElementById("apellidoNuevoCliente").value;
    var dniNuevoCliente = document.getElementById("dniNuevoCliente").value;
    var telefonoNuevoCliente = document.getElementById("telefonoNuevoCliente").value;
    var emailNuevoCliente = document.getElementById("emailNuevoCliente").value;
    var domicilioNuevoCliente = document.getElementById("domicilioNuevoCliente").value

    if(!nombreNuevoCliente.trim() || !apellidoNuevoCliente.trim() || !dniNuevoCliente.trim() || !telefonoNuevoCliente.trim() || !emailNuevoCliente.trim() || !domicilioNuevoCliente.trim()){
        alert("Ningun campo puede estar vacio");
    }else{
        var nuevoClienteData = {
            nombre: formatearString(nombreNuevoCliente),
            apellido : formatearString(apellidoNuevoCliente),
            dni : dniNuevoCliente,
            telefono : telefonoNuevoCliente,
            email : emailNuevoCliente,
            domicilio : formatearString(domicilioNuevoCliente),
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoClienteData)
        })
        .then(function (response) {
            if (response.ok) {
                getCliente();
                var modal = new bootstrap.Modal(document.getElementById('modalCliente'));
                modal.hide();
    
            } else if(response.status === 400) {
                alert("Ya existe un cliente con ese DNI");
            }else{
                alert("Response Estatus"+ response.statusText);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }
}


btnAgregarCliente.addEventListener("click", function(){
    setCliente();
})

// ----------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function eliminarCliente(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getCliente();
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

btnEditarCliente.addEventListener("click", function(){
    var nombreEditarCliente = document.getElementById("nombreEditarCliente").value;
    var apellidoEditarCliente = document.getElementById("apellidoEditarCliente").value;
    var dniEditarCliente = document.getElementById("dniEditarCliente").value;
    var telefonoEditarCliente = document.getElementById("telefonoEditarCliente").value;
    var emailEditarCliente = document.getElementById("emailEditarCliente").value;
    var domicilioEditarCliente = document.getElementById("domicilioEditarCliente").value

    if(!nombreEditarCliente.trim() || !apellidoEditarCliente.trim() || !dniEditarCliente.trim() || !telefonoEditarCliente.trim() || !emailEditarCliente.trim() || !domicilioEditarCliente.trim()){
        alert("Ningun campo puede estar vacio");
    }else{
        var editarClienteData = {
            nombre: formatearString(nombreEditarCliente),
            apellido : formatearString(apellidoEditarCliente),
            dni : dniEditarCliente,
            telefono : telefonoEditarCliente,
            email : emailEditarCliente,
            domicilio : formatearString(domicilioEditarCliente)
        }
        fetch(url+`/update/${editarClienteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarClienteData)
        })
        .then(function(response) {
            if (response.ok) {
                getCliente();
            }else if(response.status === 400){
                alert("Ya hay un cliente con ese DNI");
            }else {
                alert("Hubo un error al editar la marca");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
})