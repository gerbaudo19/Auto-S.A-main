package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;

public class VehiculoDtoTest {

    @SuppressWarnings("deprecation")
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void testValidVehiculoDto() {
        // Mock de objetos necesarios
        Modelo modeloMock = mock(Modelo.class);
        Cliente clienteMock = mock(Cliente.class);

        // Valores de ejemplo para el VehiculoDto
        String patente = "ABC123";
        int año = 2022;
        int kilometraje = 50000;

        // Crear el VehiculoDto utilizando el constructor
        VehiculoDto vehiculoDto = new VehiculoDto(patente, modeloMock, clienteMock, año, kilometraje);

        // Verificar que los valores se asignan correctamente
        assertEquals(patente, vehiculoDto.getPatente());
        assertEquals(año, vehiculoDto.getAño());
        assertEquals(kilometraje, vehiculoDto.getKilometraje());
        assertEquals(modeloMock, vehiculoDto.getModelo());
        assertEquals(clienteMock, vehiculoDto.getCliente());
    }
}
