package com.ProgramacionAvanzada.AutoSA.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.repository.PersonalDeTrabajoRepository;

@RunWith(MockitoJUnitRunner.class)
public class PersonalDeTrabajoServiceTest {

    @Mock
    PersonalDeTrabajoRepository personalDeTrabajoRepository;

    @InjectMocks
    PersonalDeTrabajoService personalDeTrabajoService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<PersonalDeTrabajo> personalDeTrabajoList = new ArrayList<>();
        // Agregar personal de trabajo a la lista

        // Configurar el comportamiento simulado del repositorio
        when(personalDeTrabajoRepository.findAll()).thenReturn(personalDeTrabajoList);

        // Llamar al método del servicio
        List<PersonalDeTrabajo> result = personalDeTrabajoService.findAll();

        // Verificar el resultado
        assertEquals(personalDeTrabajoList, result);
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        // Simular datos
        int ordenDeTrabajoId = 1;
        List<PersonalDeTrabajo> personalDeTrabajoList = new ArrayList<>();
        // Agregar personal de trabajo a la lista

        // Configurar el comportamiento simulado del repositorio
        when(personalDeTrabajoRepository.findByOrdenDeTrabajoId(ordenDeTrabajoId)).thenReturn(personalDeTrabajoList);

        // Llamar al método del servicio
        List<PersonalDeTrabajo> result = personalDeTrabajoService.findByOrdenDeTrabajoId(ordenDeTrabajoId);

        // Verificar el resultado
        assertEquals(personalDeTrabajoList, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        PersonalDeTrabajo personalDeTrabajo = new PersonalDeTrabajo();
        // Configurar el comportamiento simulado del repositorio
        when(personalDeTrabajoRepository.save(any(PersonalDeTrabajo.class))).thenReturn(personalDeTrabajo);

        // Llamar al método del servicio
        personalDeTrabajoService.save(personalDeTrabajo);

        // Verificar que el método del repositorio fue llamado con el personal de trabajo adecuado
        verify(personalDeTrabajoRepository).save(personalDeTrabajo);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        personalDeTrabajoService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(personalDeTrabajoRepository).deleteById(id);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Optional<PersonalDeTrabajo> personalDeTrabajoOptional = Optional.of(new PersonalDeTrabajo());
        // Configurar el comportamiento simulado del repositorio
        when(personalDeTrabajoRepository.findById(id)).thenReturn(personalDeTrabajoOptional);

        // Llamar al método del servicio
        Optional<PersonalDeTrabajo> result = personalDeTrabajoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(personalDeTrabajoOptional.get(), result.get());
    }

    @Test
    public void testDeleteByOrdenDeTrabajoId() {
        // Simular datos
        int ordenDeTrabajoId = 1;

        // Llamar al método del servicio
        personalDeTrabajoService.deleteByOrdenDeTrabajoId(ordenDeTrabajoId);

        // Verificar que el método del repositorio fue llamado con el ID de la orden de trabajo adecuado
        verify(personalDeTrabajoRepository).deleteByOrdenDeTrabajoId(ordenDeTrabajoId);
    }
}
