const url = "http://localhost:8080/servicio";

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
// Cargar Tabla ---------------------------------------------------------------
// ----------------------------------------------------------------------------
var editarServicioId;

// Función para cargar y mostrar las marcas en una tabla
async function getServicios() {
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataServicio = await response.json();

        const tabla = document.getElementById('tablaServicios');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';

        dataServicio.forEach(function (servicio) {
            const fila = document.createElement('tr');
            const columnaId = document.createElement('td');
            const columnaNombre = document.createElement('td');
            const columanDescripcion = document.createElement('textarea');
            columanDescripcion.style = "width: 100%";
            columanDescripcion.setAttribute = ("form-control");
            columanDescripcion.disabled = "true";
            const columnaOpciones = document.createElement('td');

            columnaId.textContent = servicio.id;
            columnaNombre.textContent = servicio.nombre;
            columanDescripcion.textContent = servicio.descripcion;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Editar';
            botonModificar.classList= 'btn btn-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarServicio");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarServicioId = servicio.id;
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-primary';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                deleteServicio(servicio.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaId);
            fila.appendChild(columnaNombre);
            fila.appendChild(columanDescripcion)
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

const btnBuscar = document.getElementById("btn-Buscar");

btnBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    getServicios();
});

// ----------------------------------------------------------------------------
// Eliminar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function deleteServicio(id){
    // Realiza la solicitud DELETE a la URL con el ID como parámetro
    fetch(url+`/delete/${id}`, {
        method: "DELETE"
    })
    .then(function(response) {
        if (response.ok) {
            getServicios();
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
const btnEditarServicio = document.getElementById("btn-EditarServicio");
btnEditarServicio.addEventListener("click", function(){
    var nombreEditarServicio = document.getElementById("nombreEditarServicio").value;
    var nombreEditarServicio = formatearString(nombreEditarServicio);
    var descripcionEditarServicio = document.getElementById("descripcionEditarServicio").value;
    if(nombreEditarServicio.trim() === ""){
        alert("Los campos no pueden estar vacio");
    }else{
        var editarServicioData = {
            nombre: nombreEditarServicio,
            descripcion : descripcionEditarServicio
        }
        fetch(url+`/update/${editarServicioId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarServicioData)
        })
        .then(function(response) {
            if (response.ok) {
                getServicios();
            }else {
                alert("Hubo un error al editar la marca");
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    }
})

// ----------------------------------------------------------------------------
// Agregar --------------------------------------------------------------------
// ----------------------------------------------------------------------------

function setServicio(){
    var nombreNuevoServicio = document.getElementById("nombreNuevoServicio").value;
    var nombreNuevoServicio = formatearString(nombreNuevoServicio);
    var descripcionNuevoServicio = document.getElementById("descripcionNuevoServicio").value;
    if(nombreNuevoServicio.trim() === "" || descripcionNuevoServicio === ""){
        alert("Revise que los campós no esten vacio");
    }else{
        var nuevoServicioData = {
            nombre: nombreNuevoServicio,
            descripcion : descripcionNuevoServicio
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoServicioData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getServicios();
                var modal = new bootstrap.Modal(document.getElementById('modalAgregarServicio'));
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

const btnAgregarServicio = document.getElementById("btn-CrearServicio");
btnAgregarServicio.addEventListener("click", function(){
    setServicio();
})
