const url = "http://localhost:8080/marca"; 
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
// Editar --------------------------------------------------------------------
// ----------------------------------------------------------------------------
const btnEditarMarca = document.getElementById("btn-EditarMarca");
btnEditarMarca.addEventListener("click", function(){
    var nombreEditarMarca = document.getElementById("nombreEditarMarca").value;
    var nombreEditarMarca = formatearString(nombreEditarMarca);
    if(nombreEditarMarca.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var editarMarcaData = {
            nombre: nombreEditarMarca
        }
        fetch(url+`/update/${editarMarcaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editarMarcaData)
        })
        .then(function(response) {
            if (response.ok) {
                getMarcas();
            } else {
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

function setMarca(){
    var nombreNuevaMarca = document.getElementById("nombreNuevaMarca").value;
    var nombreNuevaMarca = formatearString(nombreNuevaMarca);
    if(nombreNuevaMarca.trim() === ""){
        alert("El nombre de la marca no puede estar vacio");
    }else{
        var nuevaMarcaData = {
            nombre: nombreNuevaMarca
        }
        
        fetch(url + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaMarcaData)
        })
        .then(function (response) {
            if (response.ok) {
    
                getMarcas();
                var modal = new bootstrap.Modal(document.getElementById('modalMarca'));
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



const btnAgregarMarca = document.getElementById("btn-CrearMarca"); //Boton Agregar

btnAgregarMarca.addEventListener("click", function(){
    setMarca();
})



// ----------------------------------------------------------------------------
// Cargar Tabla ---------------------------------------------------------------
// ----------------------------------------------------------------------------
var editarMarcaId; //

// Función para cargar y mostrar las marcas en una tabla
async function getMarcas() {
    try {
        const response = await fetch(url+'/list');
        if (!response.ok) {
            throw new Error(`Error al cargar las marcas: ${response.status}`);
        }
        const dataMarcas = await response.json();

        const tabla = document.getElementById('tablaMarca');
        const tbody = tabla.querySelector('tbody');
        tbody.innerHTML = '';

        dataMarcas.forEach(function (marca) {
            const fila = document.createElement('tr');
            const columnaId = document.createElement('td');
            const columnaNombre = document.createElement('td');
            const columnaOpciones = document.createElement('td');

            columnaId.textContent = marca.id;
            columnaNombre.textContent = marca.nombre;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Modificar';
            botonModificar.classList= 'btn btn-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarMarca");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarMarcaId = marca.id;
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-primary';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click', function () {
                eliminarMarca(marca.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaId);
            fila.appendChild(columnaNombre);
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

const btnBuscar = document.getElementById("btn-buscar");
btnBuscar.addEventListener("click", async function(event){
   event.preventDefault(); // Prevenir la recarga de la página
   await getMarcas();
});
