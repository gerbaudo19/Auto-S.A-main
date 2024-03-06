package com.ProgramacionAvanzada.AutoSA.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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

import com.ProgramacionAvanzada.AutoSA.dto.DetalleOrdenTrabajoDto;
import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.service.DetalleOrdenTrabajoService;

public class DetalleOrdenTrabajoControllerTest {

    @InjectMocks
    private DetalleOrdenTrabajoController detalleOrdenTrabajoController;

    @Mock
    private DetalleOrdenTrabajoService detalleOrdenTrabajoService;

    @SuppressWarnings("deprecation")
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @SuppressWarnings("null")
    @Test
    public void testFindAll() {
        List<DetalleOrdenTrabajo> detalles = new ArrayList<>();
        detalles.add(new DetalleOrdenTrabajo());
        when(detalleOrdenTrabajoService.findAll()).thenReturn(detalles);

        ResponseEntity<List<DetalleOrdenTrabajo>> response = detalleOrdenTrabajoController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    public void testCreate() {
        DetalleOrdenTrabajoDto detalleOrdenTrabajoDto = new DetalleOrdenTrabajoDto();
        detalleOrdenTrabajoDto.setOrdenDeTrabajo(new OrdenDeTrabajo());
        detalleOrdenTrabajoDto.setServicio(new Servicio());
        doNothing().when(detalleOrdenTrabajoService).save(any());

        ResponseEntity<?> response = detalleOrdenTrabajoController.create(detalleOrdenTrabajoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        DetalleOrdenTrabajoDto detalleOrdenTrabajoDto = new DetalleOrdenTrabajoDto();
        detalleOrdenTrabajoDto.setOrdenDeTrabajo(new OrdenDeTrabajo());
        detalleOrdenTrabajoDto.setServicio(new Servicio());
        when(detalleOrdenTrabajoService.findById(id)).thenReturn(Optional.of(new DetalleOrdenTrabajo()));

        ResponseEntity<?> response = detalleOrdenTrabajoController.update(id, detalleOrdenTrabajoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;
        doNothing().when(detalleOrdenTrabajoService).deleteById(id);

        ResponseEntity<?> response = detalleOrdenTrabajoController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @SuppressWarnings("null")
    @Test
    public void testFindByOrdenDeTrabajoId() {
        int ordenTrabajoId = 1;
        List<DetalleOrdenTrabajo> detalles = new ArrayList<>();
        detalles.add(new DetalleOrdenTrabajo());
        when(detalleOrdenTrabajoService.findByOrdenDeTrabajoId(ordenTrabajoId)).thenReturn(detalles);

        ResponseEntity<List<DetalleOrdenTrabajo>> response = detalleOrdenTrabajoController.findByOrdenDeTrabajoId(ordenTrabajoId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }
}

