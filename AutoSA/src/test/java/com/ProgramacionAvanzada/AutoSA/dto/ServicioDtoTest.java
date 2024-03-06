package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Test;

public class ServicioDtoTest {

    @Test
    public void testValidServicioDto() {
        // Valores de ejemplo para el ServicioDto
        String nombre = "Nombre del servicio";
        String descripcion = "Descripción del servicio";
        int precio = 100;

        // Crear el ServicioDto utilizando el constructor
        ServicioDto servicioDto = new ServicioDto(nombre, descripcion, precio);

        // Verificar que los valores se asignan correctamente
        assertEquals(nombre, servicioDto.getNombre());
        assertEquals(descripcion, servicioDto.getDescripcion());
        assertEquals(precio, servicioDto.getPrecio());
    }

    @Test
    public void testInvalidServicioDto() {
        // Crear un ServicioDto con valores nulos
        ServicioDto servicioDto = new ServicioDto(null, null, 0);

        // Verificar que los valores nulos no están permitidos
        assertNull(servicioDto.getNombre());
        assertNull(servicioDto.getDescripcion());
        assertEquals(0, servicioDto.getPrecio());
    }
}
