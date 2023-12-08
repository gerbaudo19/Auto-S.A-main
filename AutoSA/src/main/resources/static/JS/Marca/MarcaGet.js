// ----------------------------------------------------------------------------
// Definicion de varibales ----------------------------------------------------
// ----------------------------------------------------------------------------
import { url } from "./MarcaSet.js";
import { deleteMarca, editMarca } from "./MarcaUD.js";

const btnBuscar = document.getElementById("btn-buscar"); //Boton de Buscar
const btnEditarMarca = document.getElementById("btn-EditarMarca"); //Boton de Editar
let editarMarcaId; //Variable para almacenar id a editar
// ---------------------------------------------------------------------------------------------------------------------
// Buscar --------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

// Función para cargar y mostrar las marcas en una tabla
export async function getMarcas() {
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
            botonModificar.textContent = 'Editar';
            botonModificar.classList= 'btn btn-outline-primary';
            botonModificar.style = "margin: 0px 5px;"
            botonModificar.setAttribute("data-bs-target", "#modalEditarMarca");
            botonModificar.setAttribute("data-bs-toggle", "modal");
            
            botonModificar.addEventListener('click', function () {
                editarMarcaId = marca.id;
                btnEditarMarca.addEventListener("click",async function(){
                    await editMarca(editarMarcaId);
                })
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList= 'btn btn-outline-danger';
            botonEliminar.style = "margin: 0px 5px;"
            
            botonEliminar.addEventListener('click',async function () {
                await deleteMarca(marca.id);
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

//
// Evento boton Buscar 
//

btnBuscar.addEventListener("click", async function(event){
   event.preventDefault(); // Prevenir la recarga de la página
   await getMarcas();
});