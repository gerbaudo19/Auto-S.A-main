package com.ProgramacionAvanzada.AutoSA.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ProgramacionAvanzada.AutoSA.dto.VehiculoDto;
import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.service.ClienteService;
import com.ProgramacionAvanzada.AutoSA.service.VehiculoService;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockitoAnnotations;

public class VehiculoControllerTest {

    @Mock
    private VehiculoService vehiculoService;

    @Mock
    private ClienteService clienteService;

    @InjectMocks
    private VehiculoController vehiculoController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        // Mock de los datos a devolver por VehiculoService.findAll()
        List<Vehiculo> vehiculos = Arrays.asList(new Vehiculo(), new Vehiculo());

        when(vehiculoService.findAll()).thenReturn(vehiculos);

        ResponseEntity<List<Vehiculo>> response = vehiculoController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehiculos, response.getBody());
    }

    @Test
    public void testCreate() {
        // Datos de prueba
        VehiculoDto vehiculoDto = new VehiculoDto();
        vehiculoDto.setPatente("ABC123");
        Cliente cliente = new Cliente();
        cliente.setId(1);
        vehiculoDto.setCliente(cliente);

        when(vehiculoService.existsByPatente(anyString())).thenReturn(false);
        when(clienteService.findById(anyInt())).thenReturn(Optional.of(cliente));

        ResponseEntity<?> response = vehiculoController.create(vehiculoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        VehiculoDto vehiculoDto = new VehiculoDto();
        vehiculoDto.setPatente("ABC123");
        Cliente cliente = new Cliente();
        cliente.setId(1);
        vehiculoDto.setCliente(cliente);

        when(vehiculoService.existsById(id)).thenReturn(true);
        when(vehiculoService.findById(id)).thenReturn(Optional.of(new Vehiculo()));

        ResponseEntity<?> response = vehiculoController.update(id, vehiculoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;

        when(vehiculoService.existsById(id)).thenReturn(true);

        ResponseEntity<?> response = vehiculoController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindByClienteId() {
        int id = 1;
        List<Vehiculo> vehiculos = Arrays.asList(new Vehiculo(), new Vehiculo());

        when(vehiculoService.findByClienteId(id)).thenReturn(vehiculos);

        ResponseEntity<List<Vehiculo>> response = vehiculoController.findByClienteId(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehiculos, response.getBody());
    }

    @Test
    public void testFindByPatente() {
        String patente = "ABC123";
        Optional<Vehiculo> vehiculo = Optional.of(new Vehiculo());

        when(vehiculoService.findByPatente(patente)).thenReturn(vehiculo);

        ResponseEntity<Optional<Vehiculo>> response = vehiculoController.findByClienteId(patente);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(vehiculo, response.getBody());
    }
}
