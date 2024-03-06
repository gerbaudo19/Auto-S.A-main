package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.mockito.Mockito;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;

public class DetalleOrdenTrabajoDtoTest {

    @Test
    public void testConstructorAndGetters() {
        // Mock de objetos necesarios
        OrdenDeTrabajo ordenDeTrabajoMock = Mockito.mock(OrdenDeTrabajo.class);
        Servicio servicioMock = Mockito.mock(Servicio.class);

        // Crear el DetalleOrdenTrabajoDto utilizando el constructor
        DetalleOrdenTrabajoDto detalleOrdenTrabajoDto = new DetalleOrdenTrabajoDto(ordenDeTrabajoMock, servicioMock);

        // Verificar que los valores se asignan correctamente
        assertEquals(ordenDeTrabajoMock, detalleOrdenTrabajoDto.getOrdenDeTrabajo());
        assertEquals(servicioMock, detalleOrdenTrabajoDto.getServicio());
    }

}
