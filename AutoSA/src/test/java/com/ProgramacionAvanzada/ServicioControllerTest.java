package com.ProgramacionAvanzada;

import com.ProgramacionAvanzada.AutoSA.controller.ServicioController;
import com.ProgramacionAvanzada.AutoSA.dto.ServicioDto;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.service.ServicioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ServicioControllerTest {

    @InjectMocks
    private ServicioController servicioController;

    @Mock
    private ServicioService servicioService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAll() {
        // Simula el servicio para devolver una lista de servicios
        when(servicioService.findAll()).thenReturn(Arrays.asList(new Servicio(), new Servicio()));

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<List<Servicio>> responseEntity = servicioController.findAll();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, responseEntity.getBody().size());
    }

    @Test
    public void testCreate() {
        // Crea un objeto ServicioDto para simular la entrada del cliente
        ServicioDto servicioDto = new ServicioDto("Servicio1", "Descripción");

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = servicioController.create(servicioDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verifica que el método del servicio se haya llamado con el servicio correcto
        verify(servicioService, times(1)).save(any(Servicio.class));
    }

    @Test
    public void testUpdate() {
        // Datos de prueba
        int servicioId = 1;
        ServicioDto servicioDto = new ServicioDto("ServicioActualizado", "Nueva descripción");
        Servicio servicioExistente = new Servicio();

        // Simula que existe un servicio con el ID proporcionado
        when(servicioService.findById(servicioId)).thenReturn(java.util.Optional.of(servicioExistente));
        when(servicioService.existsById(servicioId)).thenReturn(true);

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = servicioController.update(servicioId, servicioDto);

        // Verifica que el método del servicio se haya llamado con el servicio correcto
        verify(servicioService, times(1)).save(any(Servicio.class));

        // Verifica el código de respuesta esperado
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testDelete() {
        int servicioId = 1;

        // Simula que existe un servicio con el ID proporcionado
        when(servicioService.existsById(servicioId)).thenReturn(true);

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = servicioController.delete(servicioId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verifica que el método del servicio se haya llamado con el ID correcto
        verify(servicioService, times(1)).deleteById(servicioId);
    }
}
