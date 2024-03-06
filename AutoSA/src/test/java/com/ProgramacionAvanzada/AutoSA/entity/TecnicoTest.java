package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class TecnicoTest {

    @Test
    public void testConstructorAndGetters() {
        // Creamos valores de prueba para el constructor
        String nombre = "John";
        String apellido = "Doe";
        String dni = "12345678";
        String telefono = "123456789";
        String email = "john.doe@example.com";
        String domicilio = "123 Main St";

        // Creamos un objeto Tecnico utilizando el constructor
        Tecnico tecnico = new Tecnico(nombre, apellido, dni, telefono, email, domicilio);

        // Verificamos que los valores se hayan asignado correctamente
        assertNotNull(tecnico);
        assertEquals(nombre, tecnico.getNombre());
        assertEquals(apellido, tecnico.getApellido());
        assertEquals(dni, tecnico.getDni());
        assertEquals(telefono, tecnico.getTelefono());
        assertEquals(email, tecnico.getEmail());
        assertEquals(domicilio, tecnico.getDomicilio());
    }

}
