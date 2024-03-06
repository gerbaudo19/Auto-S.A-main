package com.ProgramacionAvanzada.AutoSA.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
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
import org.springframework.boot.test.context.SpringBootTest;

import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.repository.VehiculoRepository;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class VehiculoServiceTest {

    @Mock
    VehiculoRepository vehiculoRepository;

    @InjectMocks
    VehiculoService vehiculoService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Vehiculo> vehiculos = new ArrayList<>();
        // Agregar vehículos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.findAll()).thenReturn(vehiculos);

        // Llamar al método del servicio
        List<Vehiculo> result = vehiculoService.findAll();

        // Verificar el resultado
        assertEquals(vehiculos, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Vehiculo vehiculo = new Vehiculo();
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.save(any(Vehiculo.class))).thenReturn(vehiculo);

        // Llamar al método del servicio
        vehiculoService.save(vehiculo);

        // Verificar que el método del repositorio fue llamado con el vehículo adecuado
        verify(vehiculoRepository).save(vehiculo);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        vehiculoService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(vehiculoRepository).deleteById(id);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Optional<Vehiculo> vehiculoOptional = Optional.of(new Vehiculo());
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.findById(id)).thenReturn(vehiculoOptional);

        // Llamar al método del servicio
        Optional<Vehiculo> result = vehiculoService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(vehiculoOptional.get(), result.get());
    }

    @Test
    public void testFindByPatente() {
        // Simular datos
        String patente = "ABC123";
        Optional<Vehiculo> vehiculoOptional = Optional.of(new Vehiculo());
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.findByPatente(patente)).thenReturn(vehiculoOptional);

        // Llamar al método del servicio
        Optional<Vehiculo> result = vehiculoService.findByPatente(patente);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(vehiculoOptional.get(), result.get());
    }

    @Test
    public void testFindByClienteId() {
        // Simular datos
        int clienteId = 1;
        List<Vehiculo> vehiculos = new ArrayList<>();
        // Agregar vehículos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.findByClienteId(clienteId)).thenReturn(vehiculos);

        // Llamar al método del servicio
        List<Vehiculo> result = vehiculoService.findByClienteId(clienteId);

        // Verificar el resultado
        assertEquals(vehiculos, result);
    }

    @Test
    public void testExistsById() {
        // Simular datos
        int id = 1;
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.existsById(id)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = vehiculoService.existsById(id);

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    public void testExistsByPatente() {
        // Simular datos
        String patente = "ABC123";
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.existsByPatente(patente)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = vehiculoService.existsByPatente(patente);

        // Verificar el resultado
        assertTrue(result);
    }
}
