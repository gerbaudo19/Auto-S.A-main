package com.ProgramacionAvanzada.AutoSA.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.Factura;

@RunWith(MockitoJUnitRunner.class)
public class FacturaRepositoryTest {

    @Mock
    private FacturaRepository facturaRepository;

    @Test
    public void testFindById() {
        int facturaId = 1;
        Factura factura = new Factura();
        factura.setId(facturaId);
        when(facturaRepository.findById(facturaId)).thenReturn(Optional.of(factura));

        Optional<Factura> result = facturaRepository.findById(facturaId);

        assertTrue(result.isPresent());
        assertEquals(factura, result.get());
    }

    @Test
    public void testFindByFechaBetween() {
        LocalDate fechaInicio = LocalDate.of(2022, 1, 1);
        LocalDate fechaFin = LocalDate.of(2022, 12, 31);
        List<Factura> facturas = new ArrayList<>();
        // Agregar facturas a la lista según sea necesario
        when(facturaRepository.findByFechaBetween(fechaInicio, fechaFin)).thenReturn(facturas);

        List<Factura> result = facturaRepository.findByFechaBetween(fechaInicio, fechaFin);

        assertEquals(facturas, result);
    }
}

