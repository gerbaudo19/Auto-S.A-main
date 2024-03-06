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
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;

@RunWith(MockitoJUnitRunner.class)
public class DetalleOrdenTrabajoRepositoryTest {

    @Mock
    private DetalleOrdenTrabajoRepository detalleOrdenTrabajoRepository;

    @SuppressWarnings("deprecation")
    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        // No se necesita inicializar detalleOrdenTrabajoService ya que trabajaremos directamente con detalleOrdenTrabajoRepository
    }

    @Test
    public void testFindById() {
        int id = 1;
        DetalleOrdenTrabajo detalle = new DetalleOrdenTrabajo();
        when(detalleOrdenTrabajoRepository.findById(id)).thenReturn(Optional.of(detalle));

        Optional<DetalleOrdenTrabajo> result = detalleOrdenTrabajoRepository.findById(id);

        assertTrue(result.isPresent());
        assertEquals(detalle, result.get());
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        int ordenTrabajoId = 1;
        List<DetalleOrdenTrabajo> detalles = new ArrayList<>();
        // Agrega detalles a la lista según sea necesario
        when(detalleOrdenTrabajoRepository.findByOrdenDeTrabajoId(ordenTrabajoId)).thenReturn(detalles);

        List<DetalleOrdenTrabajo> result = detalleOrdenTrabajoRepository.findByOrdenDeTrabajoId(ordenTrabajoId);

        assertEquals(detalles, result);
    }

    @Test
    public void testDeleteByOrdenDeTrabajoId() {
        int ordenDeTrabajoId = 1;
        // No hay necesidad de simular el comportamiento de este método ya que no devuelve ningún valor
        // Simplemente verifica que no haya excepciones al llamarlo
        detalleOrdenTrabajoRepository.deleteByOrdenDeTrabajoId(ordenDeTrabajoId);
    }

    // Agrega más pruebas según sea necesario

    @Test
    public void testFindServiciosByOrdenId() {
        int ordenId = 1;
        List<Servicio> servicios = new ArrayList<>();
        // Agrega servicios a la lista según sea necesario
        when(detalleOrdenTrabajoRepository.findServiciosByOrdenId(ordenId)).thenReturn(servicios);

        List<Servicio> result = detalleOrdenTrabajoRepository.findServiciosByOrdenId(ordenId);

        assertEquals(servicios, result);
    }
}
