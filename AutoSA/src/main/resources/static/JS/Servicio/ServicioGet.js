// ----------------------------------------------------------------------------
// Definicion de variables ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url } from "./ServicioSet.js";
import { editServicio, deleteServicio } from "./ServicioUD.js";
const btnBuscar = document.getElementById("btn-Buscar");
const btnEditarServicio = document.getElementById("btn-EditarServicio");
let editarServicioId;
// ---------------------------------------------------------------------------------------------------------------------
// Buscar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Llenar con for --------------------------------------------------------------
// -----------------------------------------------------------------------------
// Función para cargar y mostrar las marcas en una tabla
export async function getServicios() {
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
            columnaId.style.verticalAlign = "middle";
            const columnaNombre = document.createElement('td');
            columnaNombre.style.verticalAlign = "middle";
            const columanDescripcion = document.createElement('textarea');
            columanDescripcion.style.width = "400px";
            columanDescripcion.style.height = "100px";
            columanDescripcion.setAttribute = ("form-control");
            columanDescripcion.disabled = "true";
            const columnaPrecio = document.createElement('td');
            columnaPrecio.style.verticalAlign = "middle";
            const columnaOpciones = document.createElement('td');
            columnaOpciones.style.verticalAlign = "middle";

            columnaId.textContent = servicio.id;
            columnaNombre.textContent = servicio.nombre;
            columanDescripcion.textContent = servicio.descripcion;
            columnaPrecio.textContent = "$" + servicio.precio;

            // Botones de modificar y eliminar

            const botonModificar = document.createElement('button');
            botonModificar.textContent = 'Editar';
            botonModificar.classList= 'btn btn-outline-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarServicio");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            botonModificar.addEventListener('click', function () {
                editarServicioId = servicio.id;
                btnEditarServicio.addEventListener("click", async () =>{
                    await editServicio(editarServicioId);
                })
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-outline-danger';
            botonEliminar.style = "margin: 0px 5px;"
            botonEliminar.addEventListener('click',async function () {
                await deleteServicio(servicio.id);
            });

            columnaOpciones.appendChild(botonModificar);
            columnaOpciones.appendChild(botonEliminar);

            fila.appendChild(columnaId);
            fila.appendChild(columnaNombre);
            fila.appendChild(columanDescripcion);
            fila.appendChild(columnaPrecio);
            fila.appendChild(columnaOpciones);

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}

btnBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    await getServicios();
});