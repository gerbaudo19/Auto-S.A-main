package com.ProgramacionAvanzada.AutoSA.repository;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ProgramacionAvanzada.AutoSA.service.ServicioService;

@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class ServicioRepositoryTest {

    @Mock
    private ServicioRepository servicioRepository;

    @InjectMocks
    private ServicioService servicioService;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testExistsByNombre() {
        // Simular datos
        String nombre = "Servicio de prueba";
        
        // Configurar el comportamiento simulado del repositorio
        when(servicioRepository.existsByNombre(nombre)).thenReturn(true);

        // Llamar al método del servicio que utiliza el repositorio
        boolean result = servicioService.existsByNombre(nombre);

        // Verificar el resultado
        assertTrue(result);
    }
}

