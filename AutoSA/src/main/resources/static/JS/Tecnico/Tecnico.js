const url = "http://localhost:8080/tecnico"; 
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
// Cargar Tablas --------------------------------------------------------------
// ----------------------------------------------------------------------------

// Con ForEach ----------------------------------------------------------------

async function llenarTablaFor(data){

    const tabla = document.getElementById('tablaTecnico');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(function (tecnico) {
            const fila = document.createElement('tr');
            const columnaLegajo = document.createElement('td');
            const columnaDni = document.createElement('td');
            const columnaApellido = document.createElement('td');
            const columnaNombre = document.createElement('td');
            const columnaTelefono = document.createElement('td');
            const columnaEmail = document.createElement('td');
            const columnaDomicilio = document.createElement('td');
            const columnaOpciones = document.createElement('td');

            columnaLegajo.textContent = tecnico.id;
            columnaDni.textContent = tecnico.dni;
            columnaApellido.textContent = tecnico.apellido;
            columnaNombre.textContent = tecnico.nombre;
            columnaTelefono.textContent = tecnico.telefono;
            columnaEmail.textContent = tecnico.email;
            columnaDomicilio.textContent = tecnico.domicilio;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Modificar';
            botonModificar.classList= 'btn btn-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarTecnico");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarTecnicoId = tecnico.id;
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-primary';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                eliminarTecnico(tecnico.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaLegajo);
            fila.appendChild(columnaDni)
            fila.appendChild(columnaApellido)
            fila.appendChild(columnaNombre);
            fila.appendChild(columnaTelefono);
            fila.appendChild(columnaEmail)
            fila.appendChild(columnaDomicilio)
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
    });
}
// Con if ---------------------------------------------------------------------

async function llenarTablaIf(data){
    const tabla = document.getElementById('tablaTecnico');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';
        tecnico = data;
        if (tecnico) {
            const fila = document.createElement('tr');
            const columnaLegajo = document.createElement('td');
            const columnaDni = document.createElement('td');
            const columnaApellido = document.createElement('td');
            const columnaNombre = document.createElement('td');
            const columnaTelefono = document.createElement('td');
            const columnaEmail = document.createElement('td');
            const columnaDomicilio = document.createElement('td');
            const columnaOpciones = document.createElement('td');

            columnaLegajo.textContent = tecnico.id;
            columnaDni.textContent = tecnico.dni;
            columnaApellido.textContent = tecnico.apellido;
            columnaNombre.textContent = tecnico.nombre;
            columnaTelefono.textContent = tecnico.telefono;
            columnaEmail.textContent = tecnico.email;
            columnaDomicilio.textContent = tecnico.domicilio;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Modificar';
            botonModificar.classList= 'btn btn-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarTecnico");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarTecnicoId = tecnico.id;
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-primary';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                eliminarTecnico(tecnico.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaLegajo);
            fila.appendChild(columnaDni)
            fila.appendChild(columnaApellido)
            fila.appendChild(columnaNombre);
            fila.appendChild(columnaTelefono);
            fila.appendChild(columnaEmail)
            fila.appendChild(columnaDomicilio)
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        }else{
            alert("No se encontro ningun Tencinco");
        }
}

// Sin filtros ---------------------------------------------------------------
var editarTecnicoId;

async function getTecnico() {
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataTecnico = await response.json();
        
        llenarTablaFor(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// Filtra por Dni ----------------------------------------------------------------

async function getTecnicoXDni() {
    //var dniConsulta = inputTablaTecnico.value.toString();
    try {
        const response = await fetch(url+`/listByDni/${inputTablaTecnico.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();
        llenarTablaIf(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// Filtra por Id ----------------------------------------------------------------

async function getTecnicoXId() {
    try {
        const response = await fetch(url+`/listById/${inputTablaTecnico.value}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();
        llenarTablaIf(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}

// Filtra por Nombre ----------------------------------------------------------------

async function getTecnicoXNombre(){
    var nombreConsulta = inputTablaTecnico.value;
    var nombreConsulta = formatearString(nombreConsulta);
    try {
        const response = await fetch(url+`/listByNombre/${nombreConsulta}`);
        if (!response.ok) {
            throw new Error(`Error al cargar los Tecnicos: ${response.status}`);
        }
        const dataTecnico = await response.json();

        llenarTablaFor(dataTecnico);
    } catch (error) {
        console.error('Error al cargar los Tecnicos:', error);
    }
}
//Leer opcion de filtrado y buscar -------------------------------------

const btnBuscar = document.getElementById("btn-Buscar");  //Contiene el boton buscar
const selectFiltrar = document.getElementById("selectFiltrar"); //contiene el select de filtrar
const inputTablaTecnico= document.getElementById("input-TablaTecnico"); //Contiene el input arriba de la tabla

//Carga el select si se selecciono un filtrado
selectFiltrar.addEventListener("change", async () => {

    if (selectFiltrar.value === "1") { //Opcion DNI
        inputTablaTecnico.disabled = false; // Activa el input
        inputTablaTecnico.type = "number";
        inputTablaTecnico.value = "";
    
    }else if(selectFiltrar.value=== "2"){ //Opcion Legajo
        inputTablaTecnico.disabled = false;
        inputTablaTecnico.type = "number";
        inputTablaTecnico.value = "";

    }else if(selectFiltrar.value === "3"){ //Opcion Apellido
        inputTablaTecnico.disabled = false;
        inputTablaTecnico.type = "text";
        inputTablaTecnico.value = "";
        
    }else{
        inputTablaTecnico.disabled = true; //Desactiva el select
        inputTablaTecnico.value = "";
    }
});

//Evento del boton buscar
btnBuscar.addEventListener("click", async function(event){
    if(selectFiltrar.value === "1"){
        event.preventDefault();
        await getTecnicoXDni();

    }else if(selectFiltrar.value === "2"){
        event.preventDefault();
        await getTecnicoXId();

    }else if(selectFiltrar.value === "3"){
        event.preventDefault();
        await getTecnicoXNombre();
    }else{
        event.preventDefault(); // Prevenir la recarga de la página
        await getTecnico();
    }
});


// ----------------------------------------------------------------------------
// Agregar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

const btnAgregarTecnico = document.getElementById("btn-AgregarTecnico");

function setTecnico(){
    var nombreNuevoTecnico = document.getElementById("nombreNuevoTecnico").value;
    var nombreNuevoTecnico = formatearString(nombreNuevoTecnico);
    var apellidoNuevoTecnico = document.getElementById("apellidoNuevoTecnico").value;
    var apellidoNuevoTecnico = formatearString(apellidoNuevoTecnico);
    var dniNuevoTecnico = document.getElementById("dniNuevoTecnico").value;
    var telefonoNuevoTecnico = document.getElementById("telefonoNuevoTecnico").value;
    var emailNuevoTecnico = document.getElementById("emailNuevoTecnico").value;
    var domicilioNuevoTecnico = document.getElementById("domicilioNuevoTecnico").value
    var domicilioNuevoTecnico = formatearString(domicilioNuevoTecnico);
    if(nombreNuevoTecnico.trim() === "" || apellidoNuevoTecnico.trim() === "" || dniNuevoTecnico.trim() === null || telefonoNuevoTecnico.trim() ===  null || emailNuevoTecnico.trim() === null || domicilioNuevoTecnico.trim() === ""){
        alert("Ningun campo puede estar vacio");
    }else{
        var nuevoTecnicoData = {
            nombre: nombreNuevoTecnico,
            apellido : apellidoNuevoTecnico,
            dni : dniNuevoTecnico,
            telefono : telefonoNuevoTecnico,
            email : emailNuevoTecnico,
            domicilio : domicilioNuevoTecnico
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoTecnicoData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getTecnico();
                var modal = new bootstrap.Modal(document.getElementById('modalTecnico'));
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


btnAgregarTecnico.addEventListener("click", function(){
    setTecnico();
})

// ----------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function eliminarTecnico(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getTecnico();
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

const btnEditarTecnico = document.getElementById("btn-EditarTecnico");

btnEditarTecnico.addEventListener("click", function(){
    var nombreEditarTecnico = document.getElementById("nombreEditarTecnico").value;
    var nombreEditarTecnico = formatearString(nombreEditarTecnico);
    var apellidoEditarTecnico = document.getElementById("apellidoEditarTecnico").value;
    var apellidoEditarTecnico = formatearString(apellidoEditarTecnico);
    var dniEditarTecnico = document.getElementById("dniEditarTecnico").value;
    var telefonoEditarTecnico = document.getElementById("telefonoEditarTecnico").value;
    var emailEditarTecnico = document.getElementById("emailEditarTecnico").value;
    var domicilioEditarTecnico = document.getElementById("domicilioEditarTecnico").value
    var domicilioEditarTecnico = formatearString(domicilioEditarTecnico);
    if(nombreEditarTecnico.trim() === "" || apellidoEditarTecnico.trim() === "" || dniEditarTecnico.trim() === null || telefonoEditarTecnico.trim() ===  null || emailEditarTecnico.trim() === null || domicilioEditarTecnico.trim() === ""){
        alert("Ningun campo puede estar vacio");
    }else{
        var editarTecnicoData = {
            nombre: nombreEditarTecnico,
            apellido : apellidoEditarTecnico,
            dni : dniEditarTecnico,
            telefono : telefonoEditarTecnico,
            email : emailEditarTecnico,
            domicilio : domicilioEditarTecnico
        }
        fetch(url+`/update/${editarTecnicoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarTecnicoData)
        })
        .then(function(response) {
            if (response.ok) {
                getTecnico();
            } else {
                alert("Hubo un error al editar la marca");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
})