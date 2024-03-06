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

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.repository.DetalleOrdenTrabajoRepository;

@RunWith(MockitoJUnitRunner.class)
public class DetalleOrdenTrabajoServiceTest {

    @Mock
    DetalleOrdenTrabajoRepository detalleOrdenTrabajoRepository;

    @InjectMocks
    DetalleOrdenTrabajoService detalleOrdenTrabajoService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<DetalleOrdenTrabajo> detalles = new ArrayList<>();
        // Agregar detalles a la lista

        // Configurar el comportamiento simulado del repositorio
        when(detalleOrdenTrabajoRepository.findAll()).thenReturn(detalles);

        // Llamar al método del servicio
        List<DetalleOrdenTrabajo> result = detalleOrdenTrabajoService.findAll();

        // Verificar el resultado
        assertEquals(detalles, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        DetalleOrdenTrabajo detalle = new DetalleOrdenTrabajo();
        // Configurar el comportamiento simulado del repositorio
        when(detalleOrdenTrabajoRepository.save(any(DetalleOrdenTrabajo.class))).thenReturn(detalle);

        // Llamar al método del servicio
        detalleOrdenTrabajoService.save(detalle);

        // Verificar que el método del repositorio fue llamado con el detalle adecuado
        verify(detalleOrdenTrabajoRepository).save(detalle);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        detalleOrdenTrabajoService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(detalleOrdenTrabajoRepository).deleteById(id);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        DetalleOrdenTrabajo detalle = new DetalleOrdenTrabajo();
        // Configurar el comportamiento simulado del repositorio
        when(detalleOrdenTrabajoRepository.findById(id)).thenReturn(Optional.of(detalle));

        // Llamar al método del servicio
        Optional<DetalleOrdenTrabajo> result = detalleOrdenTrabajoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(detalle, result.get());
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        // Simular datos
        int ordenDeTrabajoId = 1;
        List<DetalleOrdenTrabajo> detalles = new ArrayList<>();
        // Agregar detalles a la lista

        // Configurar el comportamiento simulado del repositorio
        when(detalleOrdenTrabajoRepository.findByOrdenDeTrabajoId(ordenDeTrabajoId)).thenReturn(detalles);

        // Llamar al método del servicio
        List<DetalleOrdenTrabajo> result = detalleOrdenTrabajoService.findByOrdenDeTrabajoId(ordenDeTrabajoId);

        // Verificar el resultado
        assertEquals(detalles, result);
    }

    @Test
    public void testDeleteByOrdenDeTrabajoId() {
        // Simular datos
        int ordenDeTrabajoId = 1;
        
        // Llamar al método del servicio
        detalleOrdenTrabajoService.deleteByOrdenDeTrabajoId(ordenDeTrabajoId);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(detalleOrdenTrabajoRepository).deleteByOrdenDeTrabajoId(ordenDeTrabajoId);
    }
}

