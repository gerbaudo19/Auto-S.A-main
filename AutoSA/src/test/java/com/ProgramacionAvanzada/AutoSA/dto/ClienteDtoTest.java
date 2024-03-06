package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class ClienteDtoTest {

    @Test
    public void testConstructorAndGetters() {
        // Valores de ejemplo para el ClienteDto
        String nombre = "Nombre";
        String apellido = "Apellido";
        String dni = "12345678A";
        String telefono = "123456789";
        String email = "correo@ejemplo.com";
        String domicilio = "Dirección de prueba";

        // Crear el ClienteDto utilizando el constructor
        ClienteDto clienteDto = new ClienteDto(nombre, apellido, dni, telefono, email, domicilio);

        // Verificar que los valores se asignan correctamente
        assertEquals(nombre, clienteDto.getNombre());
        assertEquals(apellido, clienteDto.getApellido());
        assertEquals(dni, clienteDto.getDni());
        assertEquals(telefono, clienteDto.getTelefono());
        assertEquals(email, clienteDto.getEmail());
        assertEquals(domicilio, clienteDto.getDomicilio());
    }

}

