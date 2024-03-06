package com.ProgramacionAvanzada.AutoSA.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
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
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.service.PersonalDeTrabajoService;

@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class PersonalDeTrabajoRepositoryTest {

    @Mock
    private PersonalDeTrabajoRepository personalDeTrabajoRepository;

    @InjectMocks
    private PersonalDeTrabajoService personalDeTrabajoService;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        PersonalDeTrabajo personal = new PersonalDeTrabajo();
        // Configurar el comportamiento simulado del repositorio
        when(personalDeTrabajoRepository.findById(id)).thenReturn(Optional.of(personal));

        // Llamar al método del servicio que utiliza el repositorio
        Optional<PersonalDeTrabajo> result = personalDeTrabajoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(personal, result.get());
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        // Simular datos
        int ordenTrabajoId = 1;
        List<PersonalDeTrabajo> personalList = new ArrayList<>();
        // Agregar personal de trabajo a la lista

        // Configurar el comportamiento simulado del repositorio
        when(personalDeTrabajoRepository.findByOrdenDeTrabajoId(ordenTrabajoId)).thenReturn(personalList);

        // Llamar al método del servicio que utiliza el repositorio
        List<PersonalDeTrabajo> result = personalDeTrabajoService.findByOrdenDeTrabajoId(ordenTrabajoId);

        // Verificar el resultado
        assertEquals(personalList, result);
    }

    @Test
    public void testDeleteByOrdenDeTrabajoId() {
        // Simular datos
        int ordenDeTrabajoId = 1;

        // Llamar al método del servicio que utiliza el repositorio
        personalDeTrabajoService.deleteByOrdenDeTrabajoId(ordenDeTrabajoId);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(personalDeTrabajoRepository).deleteByOrdenDeTrabajoId(ordenDeTrabajoId);
    }
}

