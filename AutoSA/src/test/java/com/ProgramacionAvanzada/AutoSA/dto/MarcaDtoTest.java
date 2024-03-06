package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;


import org.junit.Test;

public class MarcaDtoTest {

    @Test
    public void testConstructorAndGetters() {
        // Valores de ejemplo para el MarcaDto
        String nombre = "Marca";
        int impuesto = 10;

        // Crear el MarcaDto utilizando el constructor
        MarcaDto marcaDto = new MarcaDto(nombre, impuesto);

        // Verificar que los valores se asignan correctamente
        assertEquals(nombre, marcaDto.getNombre());
        assertEquals(impuesto, marcaDto.getImpuesto());
    }

}

