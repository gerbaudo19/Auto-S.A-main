package com.ProgramacionAvanzada.AutoSA.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
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

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Factura;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.repository.DetalleOrdenTrabajoRepository;
import com.ProgramacionAvanzada.AutoSA.repository.FacturaRepository;

@RunWith(MockitoJUnitRunner.class)
public class FacturaServiceTest {

    @Mock
    FacturaRepository facturaRepository;

    @Mock
    DetalleOrdenTrabajoRepository detalleOrdenTrabajoRepository;

    @InjectMocks
    FacturaService facturaService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Factura factura = new Factura();
        // Configurar el comportamiento simulado del repositorio
        when(facturaRepository.save(any(Factura.class))).thenReturn(factura);

        // Llamar al método del servicio
        facturaService.save(factura);

        // Verificar que el método del repositorio fue llamado con la factura adecuada
        verify(facturaRepository).save(factura);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        facturaService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(facturaRepository).deleteById(id);
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        // Simular datos
        int ordenDeTrabajoId = 1;
        Factura factura = new Factura();
        // Configurar el comportamiento simulado del repositorio
        when(facturaRepository.findByOrdenDeTrabajoId(ordenDeTrabajoId)).thenReturn(Optional.of(factura));

        // Llamar al método del servicio
        Optional<Factura> result = facturaService.findByOrdenDeTrabajoId(ordenDeTrabajoId);

        // Verificar el resultado
        assertEquals(Optional.of(factura), result);
    }

    @Test
    public void testCalcularSubTotal() {
        // Simular datos
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        ordenDeTrabajo.setId(1);
        
        DetalleOrdenTrabajo detalle1 = new DetalleOrdenTrabajo();
        detalle1.setId(1);
        Servicio servicio1 = new Servicio();
        servicio1.setPrecio(100);
        detalle1.setServicio(servicio1);
        
        DetalleOrdenTrabajo detalle2 = new DetalleOrdenTrabajo();
        detalle2.setId(2);
        Servicio servicio2 = new Servicio();
        servicio2.setPrecio(200);
        detalle2.setServicio(servicio2);
        
        List<DetalleOrdenTrabajo> detalles = new ArrayList<>();
        detalles.add(detalle1);
        detalles.add(detalle2);

        // Configurar el comportamiento simulado del repositorio
        when(detalleOrdenTrabajoRepository.findByOrdenDeTrabajoId(ordenDeTrabajo.getId())).thenReturn(detalles);

        // Llamar al método del servicio
        int result = facturaService.calcularSubTotal(ordenDeTrabajo);

        // Verificar el resultado
        assertEquals(300, result);
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Factura> facturas = new ArrayList<>();
        // Agregar facturas a la lista

        // Configurar el comportamiento simulado del repositorio
        when(facturaRepository.findAll()).thenReturn(facturas);

        // Llamar al método del servicio
        List<Factura> result = facturaService.findAll();

        // Verificar el resultado
        assertEquals(facturas, result);
    }

    @Test
    public void testFindByFechaBetween() {
        // Simular datos
        LocalDate fechaInicio = LocalDate.now().minusDays(1);
        LocalDate fechaFin = LocalDate.now();
        List<Factura> facturas = new ArrayList<>();
        // Agregar facturas a la lista

        // Configurar el comportamiento simulado del repositorio
        when(facturaRepository.findByFechaBetween(fechaInicio, fechaFin)).thenReturn(facturas);

        // Llamar al método del servicio
        List<Factura> result = facturaService.findByFechaBetween(fechaInicio, fechaFin);

        // Verificar el resultado
        assertEquals(facturas, result);
    }
}

