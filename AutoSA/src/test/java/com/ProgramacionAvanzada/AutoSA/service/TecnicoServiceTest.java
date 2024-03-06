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

import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.repository.TecnicoRepository;

@RunWith(MockitoJUnitRunner.class)
public class TecnicoServiceTest {

    @Mock
    TecnicoRepository tecnicoRepository;

    @InjectMocks
    TecnicoService tecnicoService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Tecnico> tecnicos = new ArrayList<>();
        // Agregar técnicos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findAll()).thenReturn(tecnicos);

        // Llamar al método del servicio
        List<Tecnico> result = tecnicoService.findAll();

        // Verificar el resultado
        assertEquals(tecnicos, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Tecnico tecnico = new Tecnico();
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.save(any(Tecnico.class))).thenReturn(tecnico);

        // Llamar al método del servicio
        tecnicoService.save(tecnico);

        // Verificar que el método del repositorio fue llamado con el técnico adecuado
        verify(tecnicoRepository).save(tecnico);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;

        // Llamar al método del servicio
        tecnicoService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(tecnicoRepository).deleteById(id);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Optional<Tecnico> tecnicoOptional = Optional.of(new Tecnico());
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findById(id)).thenReturn(tecnicoOptional);

        // Llamar al método del servicio
        Optional<Tecnico> result = tecnicoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(tecnicoOptional.get(), result.get());
    }

    @Test
    public void testFindByDni() {
        // Simular datos
        String dni = "12345678A";
        Optional<Tecnico> tecnicoOptional = Optional.of(new Tecnico());
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findByDni(dni)).thenReturn(tecnicoOptional);

        // Llamar al método del servicio
        Optional<Tecnico> result = tecnicoService.findByDni(dni);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(tecnicoOptional.get(), result.get());
    }

    @Test
    public void testFindByNombre() {
        // Simular datos
        String nombre = "Juan";
        List<Tecnico> tecnicos = new ArrayList<>();
        // Agregar técnicos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.findByNombre(nombre)).thenReturn(tecnicos);

        // Llamar al método del servicio
        List<Tecnico> result = tecnicoService.findByNombre(nombre);

        // Verificar el resultado
        assertEquals(tecnicos, result);
    }

    @Test
    public void testExistsById() {
        // Simular datos
        int id = 1;
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.existsById(id)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = tecnicoService.existsById(id);

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    public void testExistsByDni() {
        // Simular datos
        String dni = "12345678A";
        // Configurar el comportamiento simulado del repositorio
        when(tecnicoRepository.existsByDni(dni)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = tecnicoService.existsByDni(dni);

        // Verificar el resultado
        assertTrue(result);
    }
}

