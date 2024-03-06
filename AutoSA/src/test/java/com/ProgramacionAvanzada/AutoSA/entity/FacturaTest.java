package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.Test;

public class FacturaTest {

    @Test
    public void testConstructor() {
        // Mock de objeto necesario
        OrdenDeTrabajo ordenDeTrabajoMock = mock(OrdenDeTrabajo.class);

        // Valores de ejemplo para la factura
        int subTotal = 100;
        LocalDate fecha = LocalDate.of(2024, 3, 5);
        LocalTime hora = LocalTime.of(12, 30);

        // Crear la factura utilizando el constructor
        Factura factura = new Factura(subTotal, fecha, hora, ordenDeTrabajoMock);

        // Verificar que los atributos se inicializan correctamente
        assertEquals(subTotal, factura.getSubTotal());
        assertEquals(fecha, factura.getFecha());
        assertEquals(hora, factura.getHora());
        assertEquals(ordenDeTrabajoMock, factura.getOrdenDeTrabajo());
    }
}

