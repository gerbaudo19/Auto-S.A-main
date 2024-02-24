package com.ProgramacionAvanzada;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ProgramacionAvanzada.AutoSA.controller.MarcaController;
import com.ProgramacionAvanzada.AutoSA.dto.MarcaDto;
import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.service.MarcaService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MarcaControllerTest {

    @InjectMocks
    private MarcaController marcaController;

    @Mock
    private MarcaService marcaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAll() {
        // Configuración del mock
        List<Marca> mockMarcas = Arrays.asList(new Marca("Toyota"), new Marca("Honda"));
        when(marcaService.findAll()).thenReturn(mockMarcas);

        // Llamada al método del controlador que quieres probar
        ResponseEntity<List<Marca>> responseEntity = marcaController.findAll();

        // Verificación de la respuesta
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verificación de la entidad devuelta
        List<Marca> marcas = responseEntity.getBody();
        assertEquals(mockMarcas, marcas);

        // Verificación de que el método del servicio fue llamado
        verify(marcaService, times(1)).findAll();
    }

    @Test
    void create() {
        // Configuración del mock
        MarcaDto marcaDto = new MarcaDto("Nissan");
        when(marcaService.existsByNombre("Nissan")).thenReturn(false);

        // Llamada al método del controlador que quieres probar
        ResponseEntity<?> responseEntity = marcaController.create(marcaDto);

        // Verificación de la respuesta
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verificación de que el método del servicio fue llamado
        verify(marcaService, times(1)).save(any(Marca.class));
    }

    @Test
    void update() {
        // Configuración del mock
        int id = 1;
        MarcaDto marcaDto = new MarcaDto("UpdatedName");
        when(marcaService.existsById(id)).thenReturn(true);
        when(marcaService.existsByNombre("UpdatedName")).thenReturn(false);
        when(marcaService.findById(id)).thenReturn(Optional.of(new Marca("OldName")));

        // Llamada al método del controlador que quieres probar
        ResponseEntity<?> responseEntity = marcaController.update(id, marcaDto);

        // Verificación de la respuesta
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verificación de que el método del servicio fue llamado
        verify(marcaService, times(1)).save(any(Marca.class));
    }

    @Test
    void delete() {
        // Configuración del mock
        int id = 1;
        when(marcaService.existsById(id)).thenReturn(true);

        // Llamada al método del controlador que quieres probar
        ResponseEntity<?> responseEntity = marcaController.delete(id);

        // Verificación de la respuesta
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verificación de que el método del servicio fue llamado
        verify(marcaService, times(1)).deleteById(id);
    }

    @Test
    void findByNombre() {
        // Configuración del mock
        String nombre = "Ford";
        Optional<Marca> mockMarca = Optional.of(new Marca(nombre));
        when(marcaService.findByNombre(nombre)).thenReturn(mockMarca);

        // Llamada al método del controlador que quieres probar
        ResponseEntity<Optional<Marca>> responseEntity = marcaController.findByNombre(nombre);

        // Verificación de la respuesta
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verificación de la entidad devuelta
        Optional<Marca> marca = responseEntity.getBody();
        assertEquals(mockMarca, marca);

        // Verificación de que el método del servicio fue llamado
        verify(marcaService, times(1)).findByNombre(nombre);
    }
}
