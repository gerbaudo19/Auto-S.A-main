package com.ProgramacionAvanzada.AutoSA.dto;



import static org.junit.Assert.assertEquals;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.Test;
import org.mockito.Mockito;

import com.ProgramacionAvanzada.AutoSA.entity.Estado;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;

public class OrdenDeTrabajoDtoTest {

    @Test
    public void testConstructorAndGetters() {
        // Mock de objetos necesarios
        Estado estadoMock = Mockito.mock(Estado.class);
        Vehiculo vehiculoMock = Mockito.mock(Vehiculo.class);

        // Valores de ejemplo para el OrdenDeTrabajoDto
        String observacion = "Observación de la orden";
        LocalDate fechaCreacion = LocalDate.of(2024, 3, 5);
        LocalTime horaCreacion = LocalTime.of(12, 30);

        // Crear el OrdenDeTrabajoDto utilizando el constructor
        OrdenDeTrabajoDto ordenDeTrabajoDto = new OrdenDeTrabajoDto(observacion, fechaCreacion, horaCreacion, estadoMock, vehiculoMock);

        // Verificar que los valores se asignan correctamente
        assertEquals(observacion, ordenDeTrabajoDto.getObservacion());
        assertEquals(fechaCreacion, ordenDeTrabajoDto.getFechaCreacion());
        assertEquals(horaCreacion, ordenDeTrabajoDto.getHoraCreacion());
        assertEquals(estadoMock, ordenDeTrabajoDto.getEstado());
        assertEquals(vehiculoMock, ordenDeTrabajoDto.getVehiculo());
    }
}
