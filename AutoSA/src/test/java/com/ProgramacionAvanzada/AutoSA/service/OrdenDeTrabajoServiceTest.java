package com.ProgramacionAvanzada.AutoSA.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import com.ProgramacionAvanzada.AutoSA.entity.Estado;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.repository.OrdenDeTrabajoRepository;

@RunWith(MockitoJUnitRunner.class)
public class OrdenDeTrabajoServiceTest {

    @Mock
    private OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    @Mock
    private EstadoService estadoService;

    @InjectMocks
    private OrdenDeTrabajoService ordenDeTrabajoService;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testSave() {
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        ordenDeTrabajoService.save(ordenDeTrabajo);
        verify(ordenDeTrabajoRepository).save(ordenDeTrabajo);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Simular el estado de la orden de trabajo
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        Estado estadoAnulada = new Estado();
        estadoAnulada.setId(2);
        ordenDeTrabajo.setEstado(estadoAnulada);
        when(ordenDeTrabajoRepository.findById(id)).thenReturn(Optional.of(ordenDeTrabajo));
        
        // Simular el servicio de estado
        when(estadoService.findById(2)).thenReturn(Optional.of(estadoAnulada));

        // Llamar al método del servicio
        ordenDeTrabajoService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(ordenDeTrabajoRepository).deleteById(id);
    }

    @Test
    public void testFindAll() {
        List<OrdenDeTrabajo> ordenes = new ArrayList<>();
        when(ordenDeTrabajoRepository.findAll()).thenReturn(ordenes);

        List<OrdenDeTrabajo> result = ordenDeTrabajoService.findAll();

        assertEquals(ordenes, result);
    }

    @Test
    public void testFindById() {
        int id = 1;
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        when(ordenDeTrabajoRepository.findById(id)).thenReturn(Optional.of(ordenDeTrabajo));

        Optional<OrdenDeTrabajo> result = ordenDeTrabajoService.findById(id);

        assertTrue(result.isPresent());
        assertEquals(ordenDeTrabajo, result.get());
    }

    @Test
    public void testObtenerUltimaOrdenDeTrabajo() {
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        when(ordenDeTrabajoRepository.findFirstByOrderByIdDesc()).thenReturn(Optional.of(ordenDeTrabajo));

        Optional<OrdenDeTrabajo> result = ordenDeTrabajoService.obtenerUltimaOrdenDeTrabajo();

        assertTrue(result.isPresent());
        assertEquals(ordenDeTrabajo, result.get());
    }

    @Test
    public void testExistsById() {
        int id = 1;
        when(ordenDeTrabajoRepository.existsById(id)).thenReturn(true);

        boolean result = ordenDeTrabajoService.existsById(id);

        assertTrue(result);
    }

    @Test
    public void testCambiarEstadoOrdenCuandoFacturada() {
        int ordenId = 1;
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        Estado estadoFinalizado = new Estado();
        estadoFinalizado.setId(3);
        when(estadoService.findById(3)).thenReturn(Optional.of(estadoFinalizado));
        when(ordenDeTrabajoRepository.findById(ordenId)).thenReturn(Optional.of(ordenDeTrabajo));

        ordenDeTrabajoService.cambiarEstadoOrdenCuandoFacturada(ordenId);

        assertEquals(estadoFinalizado, ordenDeTrabajo.getEstado());
        verify(ordenDeTrabajoRepository).save(ordenDeTrabajo);
    }

    @Test
    public void testFindByVehiculo() {
        Vehiculo vehiculo = new Vehiculo();
        List<OrdenDeTrabajo> ordenes = new ArrayList<>();
        when(ordenDeTrabajoRepository.findByVehiculo(vehiculo)).thenReturn(ordenes);

        List<OrdenDeTrabajo> result = ordenDeTrabajoService.findByVehiculo(vehiculo);

        assertEquals(ordenes, result);
    }

    @Test
    public void testFindFirstByOrderByIdDesc() {
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        when(ordenDeTrabajoRepository.findFirstByOrderByIdDesc()).thenReturn(Optional.of(ordenDeTrabajo));

        Optional<OrdenDeTrabajo> result = ordenDeTrabajoService.findFirstByOrderByIdDesc();

        assertTrue(result.isPresent());
        assertEquals(ordenDeTrabajo, result.get());
    }

    @Test
    public void testFindByFechaCreacionBetween() {
        LocalDate fechaInicio = LocalDate.now().minusDays(7);
        LocalDate fechaFin = LocalDate.now();
        List<OrdenDeTrabajo> ordenes = new ArrayList<>();
        when(ordenDeTrabajoRepository.findByFechaCreacionBetween(fechaInicio, fechaFin)).thenReturn(ordenes);

        List<OrdenDeTrabajo> result = ordenDeTrabajoService.findByFechaCreacionBetween(fechaInicio, fechaFin);

        assertEquals(ordenes, result);
    }

    @Test
    public void testCountByEstadoId() {
        int estadoId = 1;
        int cantidad = 5;
        when(ordenDeTrabajoRepository.countByEstadoId(estadoId)).thenReturn(cantidad);

        int result = ordenDeTrabajoService.countByEstadoId(estadoId);

        assertEquals(cantidad, result);
    }
}
