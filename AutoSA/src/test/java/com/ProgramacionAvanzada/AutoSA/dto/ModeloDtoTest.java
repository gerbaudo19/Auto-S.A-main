package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.mockito.Mockito;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;

public class ModeloDtoTest {

    @Test
    public void testConstructorAndGetters() {
        // Mock de objetos necesarios
        Marca marcaMock = Mockito.mock(Marca.class);

        // Valores de ejemplo para el ModeloDto
        String nombre = "Modelo";
        
        // Crear el ModeloDto utilizando el constructor
        ModeloDto modeloDto = new ModeloDto(nombre, marcaMock);

        // Verificar que los valores se asignan correctamente
        assertEquals(nombre, modeloDto.getNombre());
        assertEquals(marcaMock, modeloDto.getMarca());
    }

}
