package com.ProgramacionAvanzada;

import com.ProgramacionAvanzada.AutoSA.controller.ModeloController;
import com.ProgramacionAvanzada.AutoSA.dto.ModeloDto;
import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;
import com.ProgramacionAvanzada.AutoSA.service.ModeloService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ModeloControllerTest {

    @InjectMocks
    private ModeloController modeloController;

    @Mock
    private ModeloService modeloService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindAll() {
        // Simula el servicio para devolver una lista de modelos
        when(modeloService.findAll()).thenReturn(Arrays.asList(new Modelo(), new Modelo()));

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<List<Modelo>> responseEntity = modeloController.findAll();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, responseEntity.getBody().size());
    }

    @Test
    public void testCreate() {
        // Crea un objeto ModeloDto para simular la entrada del cliente
        ModeloDto modeloDto = new ModeloDto("Modelo1", new Marca());

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = modeloController.create(modeloDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verifica que el método del servicio se haya llamado con el modelo correcto
        verify(modeloService, times(1)).save(any(Modelo.class));
    }

    @Test
    public void testUpdate() {
        // Datos de prueba
        int modeloId = 1;
        ModeloDto modeloDto = new ModeloDto("ModeloActualizado", new Marca());
        Modelo modeloExistente = new Modelo();
    
        // Simula que existe un modelo con el ID proporcionado
        when(modeloService.findById(modeloId)).thenReturn(Optional.of(modeloExistente));
        when(modeloService.existsById(modeloId)).thenReturn(true); // Agrega esta línea
    
        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = modeloController.update(modeloId, modeloDto);
    
        // Verifica que el método del servicio se haya llamado con el modelo correcto
        verify(modeloService, times(1)).save(any(Modelo.class));
    
        // Verifica el código de respuesta esperado
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    

    @Test
    public void testDelete() {
        int modeloId = 1;

        // Simula que existe un modelo con el ID proporcionado
        when(modeloService.existsById(modeloId)).thenReturn(true);

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = modeloController.delete(modeloId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verifica que el método del servicio se haya llamado con el ID correcto
        verify(modeloService, times(1)).deleteById(modeloId);
    }

    @Test
    public void testFindByMarcaId() {
        int marcaId = 1;

        // Simula el servicio para devolver una lista de modelos por ID de marca
        when(modeloService.findByMarcaId(marcaId)).thenReturn(Arrays.asList(new Modelo(), new Modelo()));

        // Llama al método del controlador y verifica la respuesta
        ResponseEntity<List<Modelo>> responseEntity = modeloController.findByMarcaId(marcaId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(2, responseEntity.getBody().size());
    }

    // Otros métodos de prueba similares para findByNombre, etc.
}
