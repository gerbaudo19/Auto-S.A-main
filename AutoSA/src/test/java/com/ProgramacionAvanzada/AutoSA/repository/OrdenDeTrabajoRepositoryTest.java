package com.ProgramacionAvanzada.AutoSA.repository;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
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
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.service.OrdenDeTrabajoService;

@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class OrdenDeTrabajoRepositoryTest {

    @Mock
    private OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    @InjectMocks
    private OrdenDeTrabajoService ordenDeTrabajoService;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        // Configurar el comportamiento simulado del repositorio
        when(ordenDeTrabajoRepository.findById(id)).thenReturn(Optional.of(ordenDeTrabajo));

        // Llamar al método del servicio que utiliza el repositorio
        Optional<OrdenDeTrabajo> result = ordenDeTrabajoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(ordenDeTrabajo, result.get());
    }

    @Test
    public void testFindByVehiculo() {
        // Simular datos
        Vehiculo vehiculo = new Vehiculo();
        List<OrdenDeTrabajo> ordenes = new ArrayList<>();
        // Agregar ordenes a la lista

        // Configurar el comportamiento simulado del repositorio
        when(ordenDeTrabajoRepository.findByVehiculo(vehiculo)).thenReturn(ordenes);

        // Llamar al método del servicio que utiliza el repositorio
        List<OrdenDeTrabajo> result = ordenDeTrabajoService.findByVehiculo(vehiculo);

        // Verificar el resultado
        assertEquals(ordenes, result);
    }

    @Test
    public void testFindFirstByOrderByIdDesc() {
        // Simular datos
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        // Configurar el comportamiento simulado del repositorio
        when(ordenDeTrabajoRepository.findFirstByOrderByIdDesc()).thenReturn(Optional.of(ordenDeTrabajo));

        // Llamar al método del servicio que utiliza el repositorio
        Optional<OrdenDeTrabajo> result = ordenDeTrabajoService.findFirstByOrderByIdDesc();

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(ordenDeTrabajo, result.get());
    }

    @Test
    public void testFindByFechaCreacionBetween() {
        // Simular datos
        LocalDate fechaInicio = LocalDate.now().minusDays(7);
        LocalDate fechaFin = LocalDate.now();
        List<OrdenDeTrabajo> ordenes = new ArrayList<>();
        // Agregar ordenes a la lista

        // Configurar el comportamiento simulado del repositorio
        when(ordenDeTrabajoRepository.findByFechaCreacionBetween(fechaInicio, fechaFin)).thenReturn(ordenes);

        // Llamar al método del servicio que utiliza el repositorio
        List<OrdenDeTrabajo> result = ordenDeTrabajoService.findByFechaCreacionBetween(fechaInicio, fechaFin);

        // Verificar el resultado
        assertEquals(ordenes, result);
    }

    @Test
    public void testCountByEstadoId() {
        // Simular datos
        int estadoId = 1;
        int cantidad = 5;
        // Configurar el comportamiento simulado del repositorio
        when(ordenDeTrabajoRepository.countByEstadoId(estadoId)).thenReturn(cantidad);

        // Llamar al método del servicio que utiliza el repositorio
        int result = ordenDeTrabajoService.countByEstadoId(estadoId);

        // Verificar el resultado
        assertEquals(cantidad, result);
    }
}
