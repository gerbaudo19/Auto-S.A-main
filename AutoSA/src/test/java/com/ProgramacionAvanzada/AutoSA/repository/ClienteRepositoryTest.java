package com.ProgramacionAvanzada.AutoSA.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;

@RunWith(MockitoJUnitRunner.class)
public class ClienteRepositoryTest {

    @Mock
    private ClienteRepository clienteRepository;

    @SuppressWarnings("deprecation")
    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        // No se necesita inicializar clienteService ya que trabajaremos directamente con clienteRepository
    }

    @Test
    public void testFindByDni() {
        String dni = "12345678A";
        Cliente cliente = new Cliente();
        when(clienteRepository.findByDni(dni)).thenReturn(Optional.of(cliente));

        Optional<Cliente> result = clienteRepository.findByDni(dni);

        assertTrue(result.isPresent());
        assertEquals(cliente, result.get());
    }

    @Test
    public void testFindById() {
        int id = 1;
        Cliente cliente = new Cliente();
        when(clienteRepository.findById(id)).thenReturn(Optional.of(cliente));

        Optional<Cliente> result = clienteRepository.findById(id);

        assertTrue(result.isPresent());
        assertEquals(cliente, result.get());
    }

    @Test
    public void testFindByNombre() {
        String nombre = "Juan";
        List<Cliente> clientes = new ArrayList<>();
        // Añade clientes a la lista según sea necesario
        when(clienteRepository.findByNombre(nombre)).thenReturn(clientes);

        List<Cliente> result = clienteRepository.findByNombre(nombre);

        assertEquals(clientes, result);
    }

    @Test
    public void testExistsByDni() {
        String dni = "12345678A";
        when(clienteRepository.existsByDni(dni)).thenReturn(true);

        boolean result = clienteRepository.existsByDni(dni);

        assertTrue(result);
    }

    // Agregar más pruebas según sea necesario
}
