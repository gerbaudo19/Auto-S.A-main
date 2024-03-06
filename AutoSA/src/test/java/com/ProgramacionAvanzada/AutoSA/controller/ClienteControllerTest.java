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

import com.ProgramacionAvanzada.AutoSA.dto.ClienteDto;
import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.service.ClienteService;

public class ClienteControllerTest {

    @InjectMocks
    private ClienteController clienteController;

    @Mock
    private ClienteService clienteService;

    @SuppressWarnings("deprecation")
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @SuppressWarnings("null")
    @Test
    public void testFindAll() {
        List<Cliente> clientes = new ArrayList<>();
        clientes.add(new Cliente());
        when(clienteService.findAll()).thenReturn(clientes);

        ResponseEntity<List<Cliente>> response = clienteController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    public void testCreate() {
        ClienteDto clienteDto = new ClienteDto();
        clienteDto.setDni("12345678");
        clienteDto.setNombre("John");
        clienteDto.setApellido("Doe");
        clienteDto.setDomicilio("Calle 123");
        clienteDto.setTelefono("123456789");
        clienteDto.setEmail("john@example.com");
        when(clienteService.existsByDni(clienteDto.getDni())).thenReturn(false);
        doNothing().when(clienteService).save(any());

        ResponseEntity<?> response = clienteController.create(clienteDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        ClienteDto clienteDto = new ClienteDto();
        clienteDto.setNombre("Jane");
        clienteDto.setApellido("Doe");
        clienteDto.setDni("87654321");
        clienteDto.setDomicilio("Calle 456");
        clienteDto.setTelefono("987654321");
        clienteDto.setEmail("jane@example.com");
        when(clienteService.existsById(id)).thenReturn(true);
        when(clienteService.findById(id)).thenReturn(Optional.of(new Cliente()));

        ResponseEntity<?> response = clienteController.update(id, clienteDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;
        when(clienteService.existsById(id)).thenReturn(true);
        doNothing().when(clienteService).deleteById(id);

        ResponseEntity<?> response = clienteController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindByDni() {
        String dni = "12345678";
        when(clienteService.findByDni(dni)).thenReturn(Optional.of(new Cliente()));

        ResponseEntity<Optional<Cliente>> response = clienteController.findByDni(dni);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindById() {
        int id = 1;
        when(clienteService.findById(id)).thenReturn(Optional.of(new Cliente()));

        ResponseEntity<Optional<Cliente>> response = clienteController.findById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @SuppressWarnings("null")
    @Test
    public void testFindByNombre() {
        String nombre = "John";
        List<Cliente> clientes = new ArrayList<>();
        clientes.add(new Cliente());
        when(clienteService.findByNombre(nombre)).thenReturn(clientes);

        ResponseEntity<List<Cliente>> response = clienteController.findByNombre(nombre);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }
}

