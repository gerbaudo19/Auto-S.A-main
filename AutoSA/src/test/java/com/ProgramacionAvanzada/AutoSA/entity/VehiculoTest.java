package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class VehiculoTest {

    @Test
    public void testConstructorAndGetters() {
        // Creamos objetos necesarios para instanciar un Vehiculo
        Cliente cliente = new Cliente();
        Modelo modelo = new Modelo();
        int año = 2022;
        int kilometraje = 10000;
        String patente = "ABC123";

        // Creamos un Vehiculo utilizando el constructor
        Vehiculo vehiculo = new Vehiculo(cliente, modelo, año, kilometraje, patente);

        // Verificamos que los valores se hayan asignado correctamente
        assertNotNull(vehiculo);
        assertEquals(cliente, vehiculo.getCliente());
        assertEquals(modelo, vehiculo.getModelo());
        assertEquals(año, vehiculo.getAño());
        assertEquals(kilometraje, vehiculo.getKilometraje());
        assertEquals(patente, vehiculo.getPatente());
    }

}

