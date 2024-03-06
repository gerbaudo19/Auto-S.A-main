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

import com.ProgramacionAvanzada.AutoSA.dto.ServicioDto;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.service.ServicioService;

public class ServicioControllerTest {

    @Mock
    private ServicioService servicioService;

    @InjectMocks
    private ServicioController servicioController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        // Mock de los datos a devolver por ServicioService.findAll()
        List<Servicio> servicios = Arrays.asList(new Servicio(), new Servicio());

        when(servicioService.findAll()).thenReturn(servicios);

        ResponseEntity<List<Servicio>> response = servicioController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(servicios, response.getBody());
    }

    @Test
    public void testCreate() {
        // Datos de prueba
        ServicioDto servicioDto = new ServicioDto();
        servicioDto.setNombre("ServicioTest");
        servicioDto.setDescripcion("Descripción de prueba");
        servicioDto.setPrecio(100);

        when(servicioService.existsByNombre(anyString())).thenReturn(false);

        ResponseEntity<?> response = servicioController.create(servicioDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        ServicioDto servicioDto = new ServicioDto();
        servicioDto.setNombre("ServicioTest");
        servicioDto.setDescripcion("Descripción de prueba");
        servicioDto.setPrecio(100);

        when(servicioService.findById(id)).thenReturn(Optional.of(new Servicio()));

        ResponseEntity<?> response = servicioController.update(id, servicioDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;

        when(servicioService.existsById(id)).thenReturn(true);

        ResponseEntity<?> response = servicioController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}

