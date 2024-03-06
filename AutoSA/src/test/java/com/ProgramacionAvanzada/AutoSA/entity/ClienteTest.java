package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;


import org.junit.Test;

public class ClienteTest {

    @Test
    public void testConstructor() {
        // Valores de ejemplo para el cliente
        String nombre = "Nombre";
        String apellido = "Apellido";
        String dni = "12345678A";
        String telefono = "123456789";
        String email = "correo@ejemplo.com";
        String domicilio = "Dirección de prueba";

        // Crear el cliente utilizando el constructor
        Cliente cliente = new Cliente(nombre, apellido, dni, telefono, email, domicilio);

        // Verificar que los atributos se inicializan correctamente
        assertEquals(nombre, cliente.getNombre());
        assertEquals(apellido, cliente.getApellido());
        assertEquals(dni, cliente.getDni());
        assertEquals(telefono, cliente.getTelefono());
        assertEquals(email, cliente.getEmail());
        assertEquals(domicilio, cliente.getDomicilio());
    }
}
