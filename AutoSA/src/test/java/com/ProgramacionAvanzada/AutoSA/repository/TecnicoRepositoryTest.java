package com.ProgramacionAvanzada.AutoSA.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
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

import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.service.TecnicoService;

@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class TecnicoRepositoryTest {

    @Mock
    private TecnicoRepository tecnicoRepository;

    @InjectMocks
    private TecnicoService tecnicoService;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testFindByDni() {
        // Simular datos
        String dni = "12345678A";
        Tecnico tecnico = new Tecnico();
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findByDni(dni)).thenReturn(Optional.of(tecnico));

        // Llamar al método del servicio que utiliza el repositorio
        Optional<Tecnico> result = tecnicoService.findByDni(dni);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(tecnico, result.get());
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Tecnico tecnico = new Tecnico();
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findById(id)).thenReturn(Optional.of(tecnico));

        // Llamar al método del servicio que utiliza el repositorio
        Optional<Tecnico> result = tecnicoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(tecnico, result.get());
    }

    @Test
    public void testFindByNombre() {
        // Simular datos
        String nombre = "Juan";
        List<Tecnico> tecnicos = new ArrayList<>();
        // Agregar tecnicos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findByNombre(nombre)).thenReturn(tecnicos);

        // Llamar al método del servicio que utiliza el repositorio
        List<Tecnico> result = tecnicoService.findByNombre(nombre);

        // Verificar el resultado
        assertEquals(tecnicos, result);
    }

    @Test
    public void testExistsByDni() {
        // Simular datos
        String dni = "12345678A";
        
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.existsByDni(dni)).thenReturn(true);

        // Llamar al método del servicio que utiliza el repositorio
        boolean result = tecnicoService.existsByDni(dni);

        // Verificar el resultado
        assertTrue(result);
    }
}

