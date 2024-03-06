package com.ProgramacionAvanzada.AutoSA.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ProgramacionAvanzada.AutoSA.dto.FacturaDto;
import com.ProgramacionAvanzada.AutoSA.entity.Factura;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.service.FacturaService;
import com.ProgramacionAvanzada.AutoSA.service.OrdenDeTrabajoService;

public class FacturaControllerTest {

    @InjectMocks
    private FacturaController facturaController;

    @Mock
    private FacturaService facturaService;

    @Mock
    private OrdenDeTrabajoService ordenDeTrabajoService;

    @SuppressWarnings("deprecation")
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreate() {
        FacturaDto facturaDto = new FacturaDto();
        OrdenDeTrabajo ordenDeTrabajo = new OrdenDeTrabajo();
        facturaDto.setOrdenDeTrabajo(ordenDeTrabajo);
        when(facturaService.calcularSubTotal(ordenDeTrabajo)).thenReturn(100);
        doNothing().when(facturaService).save(any());
        doNothing().when(ordenDeTrabajoService).cambiarEstadoOrdenCuandoFacturada(anyInt());

        ResponseEntity<?> response = facturaController.create(facturaDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

@Test
public void testUpdate() {
    int id = 1;
    FacturaDto facturaDto = new FacturaDto();
    facturaDto.setSubTotal(100);
    facturaDto.setFecha(LocalDate.parse("2024-03-06"));
    facturaDto.setHora(LocalTime.parse("12:00"));
    facturaDto.setOrdenDeTrabajo(new OrdenDeTrabajo());
    when(facturaService.findById(id)).thenReturn(Optional.of(new Factura()));

    ResponseEntity<?> response = facturaController.update(id, facturaDto);

    assertEquals(HttpStatus.OK, response.getStatusCode());
}

    @Test
    public void testDelete() {
        int id = 1;
        doNothing().when(facturaService).deleteById(id);

        ResponseEntity<?> response = facturaController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindById() {
        int id = 1;
        when(facturaService.findById(id)).thenReturn(Optional.of(new Factura()));

        ResponseEntity<Optional<Factura>> response = facturaController.findById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        int ordenDeTrabajoId = 1;
        when(facturaService.findByOrdenDeTrabajoId(ordenDeTrabajoId)).thenReturn(Optional.of(new Factura()));

        ResponseEntity<Optional<Factura>> response = facturaController.findByOrdenDeTrabajoId(ordenDeTrabajoId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @SuppressWarnings("null")
    @Test
    public void testFindAll() {
        List<Factura> facturas = new ArrayList<>();
        facturas.add(new Factura());
        when(facturaService.findAll()).thenReturn(facturas);

        ResponseEntity<List<Factura>> response = facturaController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }
}

