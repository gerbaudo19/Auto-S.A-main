package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import org.junit.Test;

public class ModeloTest {

    @Test
    public void testConstructor() {
        // Mock de objeto necesario
        Marca marcaMock = mock(Marca.class);

        // Valor de ejemplo para el nombre del modelo
        String nombre = "Modelo de prueba";

        // Crear el modelo utilizando el constructor
        Modelo modelo = new Modelo(nombre, marcaMock);

        // Verificar que los atributos se inicializan correctamente
        assertEquals(nombre, modelo.getNombre());
        assertEquals(marcaMock, modelo.getMarca());
    }
}
