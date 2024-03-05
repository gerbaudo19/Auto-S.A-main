$(document).ready(function() {
    $.ajax({
      url: 'http://localhost:8080/estadisticas/cantidadEstados',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        const labels = Object.keys(data);
        const valores = Object.values(data);
  
        // Configuración de los datos del gráfico circular
        const dataChart = {
          labels: labels,
          datasets: [{
            data: valores,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'],
          }]
        };
  
        const options = {
          responsive: false, // Ajusta a "false" para deshabilitar la capacidad de respuesta
          maintainAspectRatio: false, // Ajusta a "false" para deshabilitar la relación de aspecto
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cantidad de Órdenes de Trabajo por Estado',
            }
          }
        };
  
        // Creación del gráfico circular
        var ctx = document.getElementById('chartContainer').getContext('2d');
        var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: dataChart,
          options: options
        });
      }
    });
  });

  $(document).ready(function() {
    // Obtener la ganancia anual
    $.ajax({
      url: 'http://localhost:8080/ganancia-total/calcular',
      type: 'GET',
      data: {
        fechaInicio: '2024-01-01', // Cambiar según la fecha de inicio deseada
        fechaFin: '2024-12-31'  // Cambiar según la fecha de fin deseada
      },
      dataType: 'json',
      success: function(data) {
        // Actualizar el contenido del elemento con la ganancia anual
        $('#gananciaAnual').text('$' + data);
      },
      error: function(xhr, status, error) {
        console.error("Error al obtener la ganancia total anual:", error);
      }
    });
  });


$(document).ready(function() {
  // Obtener las estadísticas de servicios más solicitados
  $.ajax({
    url: 'http://localhost:8080/estadisticas/servicios-mas-solicitados',
    type: 'GET',
    data: {
      fechaInicio: '2024-01-01', // Cambiar según la fecha de inicio deseada
      fechaFin: '2024-12-31' // Cambiar según la fecha de fin deseada
    },
    dataType: 'json',
    success: function(data) {
      var tbodyServiciosHtml = '';
      $.each(data, function(servicioNombre, cantidad) {
        var colorFila = obtenerColorFila(cantidad);
        tbodyServiciosHtml += '<tr class="' + colorFila + '">';
        tbodyServiciosHtml += '<td>' + servicioNombre + '</td>';
        tbodyServiciosHtml += '<td>' + cantidad + '</td>';
        tbodyServiciosHtml += '</tr>';
      });
      $('#tbodyServicios').html(tbodyServiciosHtml);
    },
    error: function(xhr, status, error) {
      var errorMessage = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : 'Se produjo un error al obtener las estadísticas';
      $('#tbodyServicios').html('<tr><td colspan="2"><p>Error: ' + errorMessage + '</p></td></tr>');
    }
  });

  function obtenerColorFila(cantidad) {
    if (cantidad >= 100) {
      return 'fila-alta';
    } else if (cantidad >= 50) {
      return 'fila-media';
    } else {
      return 'fila-baja';
    }
  }
});



$(document).ready(function() {
  // Función para mostrar un mensaje de error
  function mostrarError(mensaje) {
    $("#rendimientoTecnicos").html(`<div class="alert alert-danger" role="alert">${mensaje}</div>`);
  }

  // Obtener la fecha de inicio y fin
  var fechaInicio = "2024-01-01";
  var fechaFin = "2024-12-31";

  // Hacer la solicitud AJAX al servidor
  $.ajax({
    url: "http://localhost:8080/estadisticas/rendimiento-tecnicos",
    data: {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    },
    dataType: "json",
    success: function(data) {
      // Mostrar los datos en la tabla
      mostrarRendimientoTecnicos(data);
    },
    error: function(xhr, status, error) {
      // Mostrar un mensaje de error
      var mensajeError = "Se produjo un error al obtener los datos: " + error;
      mostrarError(mensajeError);
    }
  });

  // Función para mostrar los datos en la página
  function mostrarRendimientoTecnicos(data) {
    var rendimientoTecnicosDiv = document.getElementById("rendimientoTecnicos");
    rendimientoTecnicosDiv.innerHTML = "";

    // Crear una tabla para mostrar los datos
    var table = document.createElement("table");
    table.className = "table table-bordered";

    // Crear el encabezado de la tabla
    var headerRow = table.createTHead().insertRow();
    var headers = ["Nombre", "Apellido", "DNI", "Teléfono", "Email", "Domicilio", "Cantidad de Órdenes"];
    headers.forEach(function(headerText) {
      var th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    // Agregar los datos de cada técnico a la tabla
    data.forEach(function(rendimiento) {
      var row = table.insertRow();
      var tecnico = rendimiento.tecnico;
      var cantidadOrdenes = rendimiento.cantidadOrdenes;
      [tecnico.nombre, tecnico.apellido, tecnico.dni, tecnico.telefono, tecnico.email, tecnico.domicilio, cantidadOrdenes].forEach(function(value) {
        var cell = row.insertCell();
        cell.textContent = value;
      });
    });

    // Agregar la tabla al div en la página
    rendimientoTecnicosDiv.appendChild(table);
  }
});


