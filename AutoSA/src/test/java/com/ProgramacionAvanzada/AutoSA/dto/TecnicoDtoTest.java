package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Test;

public class TecnicoDtoTest {

    @Test
    public void testValidTecnicoDto() {
        // Valores de ejemplo para el TecnicoDto
        String nombre = "Nombre";
        String apellido = "Apellido";
        String dni = "12345678A";
        String telefono = "123456789";
        String email = "correo@ejemplo.com";
        String domicilio = "Dirección de prueba";

        // Crear el TecnicoDto utilizando el constructor
        TecnicoDto tecnicoDto = new TecnicoDto(nombre, apellido, dni, telefono, email, domicilio);

        // Verificar que los valores se asignan correctamente
        assertEquals(nombre, tecnicoDto.getNombre());
        assertEquals(apellido, tecnicoDto.getApellido());
        assertEquals(dni, tecnicoDto.getDni());
        assertEquals(telefono, tecnicoDto.getTelefono());
        assertEquals(email, tecnicoDto.getEmail());
        assertEquals(domicilio, tecnicoDto.getDomicilio());
    }

    @Test
    public void testInvalidTecnicoDto() {
        // Crear un TecnicoDto con valores nulos
        TecnicoDto tecnicoDto = new TecnicoDto(null, null, null, null, null, null);

        // Verificar que los valores nulos no están permitidos
        assertNull(tecnicoDto.getNombre());
        assertNull(tecnicoDto.getApellido());
        assertNull(tecnicoDto.getDni());
        assertNull(tecnicoDto.getTelefono());
        assertNull(tecnicoDto.getEmail());
        assertNull(tecnicoDto.getDomicilio());
    }
}
