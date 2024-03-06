package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class ServicioTest {

    @Test
    public void testConstructorAndGetters() {
        // Creamos valores de prueba para el constructor
        String nombre = "Servicio de prueba";
        String descripcion = "Descripción del servicio de prueba";
        int precio = 100;

        // Creamos un objeto Servicio utilizando el constructor
        Servicio servicio = new Servicio(nombre, descripcion, precio);

        // Verificamos que los valores se hayan asignado correctamente
        assertNotNull(servicio);
        assertEquals(nombre, servicio.getNombre());
        assertEquals(descripcion, servicio.getDescripcion());
        assertEquals(precio, servicio.getPrecio());
    }

}

