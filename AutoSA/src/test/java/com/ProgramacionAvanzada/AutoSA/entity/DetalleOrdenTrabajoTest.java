package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import org.junit.Test;

public class DetalleOrdenTrabajoTest {

    @Test
    public void testConstructor() {
        // Mock de objetos necesarios
        OrdenDeTrabajo ordenDeTrabajoMock = mock(OrdenDeTrabajo.class);
        Servicio servicioMock = mock(Servicio.class);

        // Crear el detalle de orden de trabajo utilizando el constructor
        DetalleOrdenTrabajo detalleOrdenTrabajo = new DetalleOrdenTrabajo(ordenDeTrabajoMock, servicioMock);

        // Verificar que los atributos se inicializan correctamente
        assertEquals(ordenDeTrabajoMock, detalleOrdenTrabajo.getOrdenDeTrabajo());
        assertEquals(servicioMock, detalleOrdenTrabajo.getServicio());
    }
}

