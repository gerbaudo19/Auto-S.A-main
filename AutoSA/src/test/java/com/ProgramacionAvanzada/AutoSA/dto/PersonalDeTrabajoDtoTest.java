package com.ProgramacionAvanzada.AutoSA.dto;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.mockito.Mockito;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;

public class PersonalDeTrabajoDtoTest {

    @Test
    public void testConstructorAndGetters() {
        // Mock de objetos necesarios
        Tecnico tecnicoMock = Mockito.mock(Tecnico.class);
        OrdenDeTrabajo ordenDeTrabajoMock = Mockito.mock(OrdenDeTrabajo.class);

        // Crear PersonalDeTrabajoDto utilizando el constructor
        PersonalDeTrabajoDto personalDeTrabajoDto = new PersonalDeTrabajoDto(tecnicoMock, ordenDeTrabajoMock);

        // Verificar que los valores se asignan correctamente
        assertEquals(tecnicoMock, personalDeTrabajoDto.getTecnico());
        assertEquals(ordenDeTrabajoMock, personalDeTrabajoDto.getOrdenDeTrabajo());
    }

}
