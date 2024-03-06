package com.ProgramacionAvanzada.AutoSA.entity;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class PersonalDeTrabajoTest {

    @Test
    public void testConstructorAndGetters() {
        // Creamos un técnico de prueba
        Tecnico tecnico = new Tecnico("Nombre", "Apellido", "12345678", "123456789", "email@example.com", "Domicilio");

        // Creamos una orden de trabajo de prueba
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();

        // Creamos un objeto PersonalDeTrabajo utilizando el constructor
        PersonalDeTrabajo personalDeTrabajo = new PersonalDeTrabajo(tecnico, ordenDeTrabajo);

        // Verificamos que los valores se hayan asignado correctamente
        assertNotNull(personalDeTrabajo);
        assertEquals(tecnico, personalDeTrabajo.getTecnico());
        assertEquals(ordenDeTrabajo, personalDeTrabajo.getOrdenDeTrabajo());
    }

}

