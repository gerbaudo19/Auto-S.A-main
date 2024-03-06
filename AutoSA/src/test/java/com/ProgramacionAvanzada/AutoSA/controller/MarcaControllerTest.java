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

import com.ProgramacionAvanzada.AutoSA.dto.MarcaDto;
import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.service.MarcaService;

public class MarcaControllerTest {

    @InjectMocks
    private MarcaController marcaController;

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
        List<Marca> marcas = new ArrayList<>();
        marcas.add(new Marca("Marca1", 10));
        marcas.add(new Marca("Marca2", 15));
        when(marcaService.findAll()).thenReturn(marcas);

        ResponseEntity<List<Marca>> response = marcaController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    public void testCreate() {
        MarcaDto marcaDto = new MarcaDto("NuevaMarca", 20);
        when(marcaService.existsByNombre(marcaDto.getNombre())).thenReturn(false);
        doNothing().when(marcaService).save(any());

        ResponseEntity<?> response = marcaController.create(marcaDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        MarcaDto marcaDto = new MarcaDto("MarcaEditada", 25);
        when(marcaService.existsById(id)).thenReturn(true);
        when(marcaService.findById(id)).thenReturn(Optional.of(new Marca()));

        ResponseEntity<?> response = marcaController.update(id, marcaDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;
        when(marcaService.existsById(id)).thenReturn(true);
        doNothing().when(marcaService).deleteById(id);

        ResponseEntity<?> response = marcaController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @SuppressWarnings("null")
    @Test
    public void testFindByNombre() {
        String nombre = "Marca1";
        when(marcaService.findByNombre(nombre)).thenReturn(Optional.of(new Marca(nombre, 10)));

        ResponseEntity<Optional<Marca>> response = marcaController.findByNombre(nombre);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(nombre, response.getBody().get().getNombre());
    }
}

