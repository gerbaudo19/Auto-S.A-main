package com.ProgramacionAvanzada.AutoSA.controller;

import static org.mockito.ArgumentMatchers.anyString;
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

import com.ProgramacionAvanzada.AutoSA.dto.TecnicoDto;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.service.TecnicoService;

public class TecnicoControllerTest {

    @Mock
    private TecnicoService tecnicoService;

    @InjectMocks
    private TecnicoController tecnicoController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        // Mock de los datos a devolver por TecnicoService.findAll()
        List<Tecnico> tecnicos = Arrays.asList(new Tecnico(), new Tecnico());

        when(tecnicoService.findAll()).thenReturn(tecnicos);

        ResponseEntity<List<Tecnico>> response = tecnicoController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tecnicos, response.getBody());
    }

    @Test
    public void testCreate() {
        // Crear objeto de prueba TecnicoDto
        TecnicoDto tecnicoDto = new TecnicoDto();
        tecnicoDto.setNombre("Nombre");
        tecnicoDto.setApellido("Apellido");
        tecnicoDto.setDni("12345678A");
        tecnicoDto.setDomicilio("Domicilio");
        tecnicoDto.setEmail("correo@example.com");
        tecnicoDto.setTelefono("123456789");

        // Mock para indicar que no existe un técnico con el mismo DNI
        when(tecnicoService.existsByDni(anyString())).thenReturn(false);

        // Llamada al método create del controlador
        ResponseEntity<?> response = tecnicoController.create(tecnicoDto);

        // Verificar que se devuelve un código de estado HTTP OK
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        TecnicoDto tecnicoDto = new TecnicoDto();
        tecnicoDto.setDni("12345678A");
        tecnicoDto.setNombre("John");
        tecnicoDto.setApellido("Doe");

        when(tecnicoService.existsById(id)).thenReturn(true);
        when(tecnicoService.findById(id)).thenReturn(Optional.of(new Tecnico()));

        ResponseEntity<?> response = tecnicoController.update(id, tecnicoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;

        when(tecnicoService.existsById(id)).thenReturn(true);

        ResponseEntity<?> response = tecnicoController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindByDni() {
        String dni = "12345678A";
        Optional<Tecnico> tecnico = Optional.of(new Tecnico());

        when(tecnicoService.findByDni(dni)).thenReturn(tecnico);

        ResponseEntity<Optional<Tecnico>> response = tecnicoController.findByDni(dni);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tecnico, response.getBody());
    }

    @Test
    public void testFindById() {
        int id = 1;
        Optional<Tecnico> tecnico = Optional.of(new Tecnico());

        when(tecnicoService.findById(id)).thenReturn(tecnico);

        ResponseEntity<Optional<Tecnico>> response = tecnicoController.findById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tecnico, response.getBody());
    }

    @Test
    public void testFindByNombre() {
        String nombre = "John";
        List<Tecnico> tecnicos = Arrays.asList(new Tecnico(), new Tecnico());

        when(tecnicoService.findByNombre(nombre)).thenReturn(tecnicos);

        ResponseEntity<List<Tecnico>> response = tecnicoController.findByNombre(nombre);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tecnicos, response.getBody());
    }
}

