package com.ProgramacionAvanzada.AutoSA.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.repository.ClienteRepository;

@RunWith(MockitoJUnitRunner.class)
public class ClienteServiceTest {

    @Mock
    ClienteRepository clienteRepository;

    @InjectMocks
    ClienteService clienteService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Cliente> clientes = new ArrayList<>();
        // Agregar clientes a la lista

        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.findAll()).thenReturn(clientes);

        // Llamar al método del servicio
        List<Cliente> result = clienteService.findAll();

        // Verificar el resultado
        assertEquals(clientes, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Cliente cliente = new Cliente();
        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        // Llamar al método del servicio
        clienteService.save(cliente);

        // Verificar que el método del repositorio fue llamado con el cliente adecuado
        verify(clienteRepository).save(cliente);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        clienteService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(clienteRepository).deleteById(id);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Cliente cliente = new Cliente();
        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.findById(id)).thenReturn(Optional.of(cliente));

        // Llamar al método del servicio
        Optional<Cliente> result = clienteService.findById(id);

        // Verificar el resultado
        assertEquals(Optional.of(cliente), result);
    }

    @Test
    public void testFindByDni() {
        // Simular datos
        String dni = "12345678A";
        Cliente cliente = new Cliente();
        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.findByDni(dni)).thenReturn(Optional.of(cliente));

        // Llamar al método del servicio
        Optional<Cliente> result = clienteService.findByDni(dni);

        // Verificar el resultado
        assertEquals(Optional.of(cliente), result);
    }

    @Test
    public void testFindByNombre() {
        // Simular datos
        String nombre = "Juan";
        List<Cliente> clientes = new ArrayList<>();
        // Agregar clientes a la lista

        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.findByNombre(nombre)).thenReturn(clientes);

        // Llamar al método del servicio
        List<Cliente> result = clienteService.findByNombre(nombre);

        // Verificar el resultado
        assertEquals(clientes, result);
    }

    @Test
    public void testExistsById() {
        // Simular datos
        int id = 1;
        
        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.existsById(id)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = clienteService.existsById(id);

        // Verificar el resultado
        assertEquals(true, result);
    }

    @Test
    public void testExistsByDni() {
        // Simular datos
        String dni = "12345678A";
        
        // Configurar el comportamiento simulado del repositorio
        when(clienteRepository.existsByDni(dni)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = clienteService.existsByDni(dni);

        // Verificar el resultado
        assertEquals(true, result);
    }
}



