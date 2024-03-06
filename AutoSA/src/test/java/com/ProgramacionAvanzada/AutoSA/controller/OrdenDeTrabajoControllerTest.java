package com.ProgramacionAvanzada.AutoSA.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ProgramacionAvanzada.AutoSA.dto.OrdenDeTrabajoDto;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.service.OrdenDeTrabajoService;

public class OrdenDeTrabajoControllerTest {

    @Mock
    private OrdenDeTrabajoService ordenDeTrabajoService;

    @InjectMocks
    private OrdenDeTrabajoController ordenDeTrabajoController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreate() {
        OrdenDeTrabajoDto ordenDeTrabajoDto = new OrdenDeTrabajoDto();

        ResponseEntity<?> response = ordenDeTrabajoController.create(ordenDeTrabajoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        OrdenDeTrabajoDto ordenDeTrabajoDto = new OrdenDeTrabajoDto();

        when(ordenDeTrabajoService.findById(id)).thenReturn(Optional.of(new OrdenDeTrabajo()));

        ResponseEntity<?> response = ordenDeTrabajoController.update(id, ordenDeTrabajoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;

        when(ordenDeTrabajoService.existsById(id)).thenReturn(true);

        ResponseEntity<?> response = ordenDeTrabajoController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindAll() {
        List<OrdenDeTrabajo> ordenDeTrabajoList = Arrays.asList(new OrdenDeTrabajo(), new OrdenDeTrabajo());

        when(ordenDeTrabajoService.findAll()).thenReturn(ordenDeTrabajoList);

        ResponseEntity<List<OrdenDeTrabajo>> response = ordenDeTrabajoController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ordenDeTrabajoList, response.getBody());
    }

    @SuppressWarnings("null")
    @Test
    public void testFindById() {
        int id = 1;

        when(ordenDeTrabajoService.findById(id)).thenReturn(Optional.of(new OrdenDeTrabajo()));

        ResponseEntity<Optional<OrdenDeTrabajo>> response = ordenDeTrabajoController.findById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
    }

    @SuppressWarnings("null")
    @Test
    public void testObtenerUltimaOrdenDeTrabajo() {
        when(ordenDeTrabajoService.obtenerUltimaOrdenDeTrabajo()).thenReturn(Optional.of(new OrdenDeTrabajo()));

        ResponseEntity<Optional<OrdenDeTrabajo>> response = ordenDeTrabajoController.obtenerUltimaOrdenDeTrabajo();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
    }
}
