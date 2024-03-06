package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.Test;

public class OrdenDeTrabajoTest {

    @Test
    public void testConstructor() {
        // Mock de objetos necesarios
        Estado estadoMock = mock(Estado.class);
        Vehiculo vehiculoMock = mock(Vehiculo.class);

        // Valores de ejemplo para la orden de trabajo
        String observacion = "Observación de prueba";
        LocalDate fechaCreacion = LocalDate.of(2024, 3, 5);
        LocalTime horaCreacion = LocalTime.of(10, 30);

        // Crear la orden de trabajo utilizando el constructor
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo(observacion, fechaCreacion, horaCreacion, estadoMock, vehiculoMock);

        // Verificar que los atributos se inicializan correctamente
        assertEquals(observacion, ordenDeTrabajo.getObservacion());
        assertEquals(fechaCreacion, ordenDeTrabajo.getFechaCreacion());
        assertEquals(horaCreacion, ordenDeTrabajo.getHoraCreacion());
        assertEquals(estadoMock, ordenDeTrabajo.getEstado());
        assertEquals(vehiculoMock, ordenDeTrabajo.getVehiculo());
    }
}
