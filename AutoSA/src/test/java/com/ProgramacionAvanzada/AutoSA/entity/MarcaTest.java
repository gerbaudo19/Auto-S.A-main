package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class MarcaTest {

    @Test
    public void testConstructor() {
        // Valores de ejemplo para la marca
        String nombre = "Marca de prueba";
        int impuesto = 10;

        // Crear la marca utilizando el constructor
        Marca marca = new Marca(nombre, impuesto);

        // Verificar que los atributos se inicializan correctamente
        assertEquals(nombre, marca.getNombre());
        assertEquals(impuesto, marca.getImpuesto());
    }
}
