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

import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.repository.ServicioRepository;

@RunWith(MockitoJUnitRunner.class)
public class ServicioServiceTest {

    @Mock
    ServicioRepository servicioRepository;

    @InjectMocks
    ServicioService servicioService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Servicio> servicios = new ArrayList<>();
        // Agregar servicios a la lista

        // Configurar el comportamiento simulado del repositorio
        when(servicioRepository.findAll()).thenReturn(servicios);

        // Llamar al método del servicio
        List<Servicio> result = servicioService.findAll();

        // Verificar el resultado
        assertEquals(servicios, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Servicio servicio = new Servicio();
        // Configurar el comportamiento simulado del repositorio
        when(servicioRepository.save(any(Servicio.class))).thenReturn(servicio);

        // Llamar al método del servicio
        servicioService.save(servicio);

        // Verificar que el método del repositorio fue llamado con el servicio adecuado
        verify(servicioRepository).save(servicio);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        servicioService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(servicioRepository).deleteById(id);
    }

    @Test
    public void testExistsById() {
        // Simular datos
        int id = 1;
        // Configurar el comportamiento simulado del repositorio
        when(servicioRepository.existsById(id)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = servicioService.existsById(id);

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    public void testExistsByNombre() {
        // Simular datos
        String nombre = "Servicio 1";
        // Configurar el comportamiento simulado del repositorio
        when(servicioRepository.existsByNombre(nombre)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = servicioService.existsByNombre(nombre);

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Optional<Servicio> servicioOptional = Optional.of(new Servicio());
        // Configurar el comportamiento simulado del repositorio
        when(servicioRepository.findById(id)).thenReturn(servicioOptional);

        // Llamar al método del servicio
        Optional<Servicio> result = servicioService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(servicioOptional.get(), result.get());
    }
}

