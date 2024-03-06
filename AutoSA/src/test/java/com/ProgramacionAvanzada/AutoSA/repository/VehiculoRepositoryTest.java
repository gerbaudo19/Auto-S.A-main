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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import com.ProgramacionAvanzada.AutoSA.service.VehiculoService;

@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class VehiculoRepositoryTest {

    @Mock
    private VehiculoRepository vehiculoRepository;

    @InjectMocks
    private VehiculoService vehiculoService;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testFindByPatente() {
        // Simular datos
        String patente = "ABC123";
        Vehiculo vehiculo = new Vehiculo();
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.findByPatente(patente)).thenReturn(Optional.of(vehiculo));

        // Llamar al método del servicio que utiliza el repositorio
        Optional<Vehiculo> result = vehiculoService.findByPatente(patente);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(vehiculo, result.get());
    }

    @Test
    public void testFindByClienteId() {
        // Simular datos
        int clienteId = 1;
        List<Vehiculo> vehiculos = new ArrayList<>();
        // Agregar vehiculos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.findByClienteId(clienteId)).thenReturn(vehiculos);

        // Llamar al método del servicio que utiliza el repositorio
        List<Vehiculo> result = vehiculoService.findByClienteId(clienteId);

        // Verificar el resultado
        assertEquals(vehiculos, result);
    }

    @Test
    public void testExistsByPatente() {
        // Simular datos
        String patente = "ABC123";
        
        // Configurar el comportamiento simulado del repositorio
        when(vehiculoRepository.existsByPatente(patente)).thenReturn(true);

        // Llamar al método del servicio que utiliza el repositorio
        boolean result = vehiculoService.existsByPatente(patente);

        // Verificar el resultado
        assertTrue(result);
    }
}
