package com.ProgramacionAvanzada.AutoSA.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ProgramacionAvanzada.AutoSA.dto.ModeloDto;
import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;
import com.ProgramacionAvanzada.AutoSA.service.MarcaService;
import com.ProgramacionAvanzada.AutoSA.service.ModeloService;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;


public class ModeloControllerTest {

    @InjectMocks
    private ModeloController modeloController;

    @Mock
    private ModeloService modeloService;

    @Mock
    private MarcaService marcaService;

    @SuppressWarnings("deprecation")
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @SuppressWarnings("null")
    @Test
    public void testFindAll() {
        List<Modelo> modelos = new ArrayList<>();
        modelos.add(new Modelo("Modelo1", new Marca()));
        modelos.add(new Modelo("Modelo2", new Marca()));
        when(modeloService.findAll()).thenReturn(modelos);

        ResponseEntity<List<Modelo>> response = modeloController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @SuppressWarnings("null")
    @Test
    public void testFindByMarcaId() {
        int marcaId = 1;
        List<Modelo> modelos = new ArrayList<>();
        modelos.add(new Modelo("Modelo1", new Marca()));
        when(modeloService.findByMarcaId(marcaId)).thenReturn(modelos);

        ResponseEntity<List<Modelo>> response = modeloController.findByMarcaId(marcaId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    public void testCreate() {
        ModeloDto modeloDto = new ModeloDto("ModeloNuevo", new Marca());
        when(modeloService.existsByNombre(modeloDto.getNombre())).thenReturn(false);
        doNothing().when(modeloService).save(any());

        ResponseEntity<?> response = modeloController.create(modeloDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        ModeloDto modeloDto = new ModeloDto("ModeloEditado", new Marca());
        when(modeloService.existsById(id)).thenReturn(true);
        when(modeloService.existsByNombre(modeloDto.getNombre())).thenReturn(false);
        when(modeloService.findById(id)).thenReturn(Optional.of(new Modelo()));

        ResponseEntity<?> response = modeloController.update(id, modeloDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;
        when(modeloService.existsById(id)).thenReturn(true);
        doNothing().when(modeloService).deleteById(id);

        ResponseEntity<?> response = modeloController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
