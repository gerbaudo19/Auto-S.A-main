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

import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;
import com.ProgramacionAvanzada.AutoSA.repository.ModeloRepository;

@RunWith(MockitoJUnitRunner.class)
public class ModeloServiceTest {

    @Mock
    ModeloRepository modeloRepository;

    @InjectMocks
    ModeloService modeloService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Modelo> modelos = new ArrayList<>();
        // Agregar modelos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.findAll()).thenReturn(modelos);

        // Llamar al método del servicio
        List<Modelo> result = modeloService.findAll();

        // Verificar el resultado
        assertEquals(modelos, result);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Modelo modelo = new Modelo();
        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.findById(id)).thenReturn(Optional.of(modelo));

        // Llamar al método del servicio
        Optional<Modelo> result = modeloService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(modelo, result.get());
    }

    @Test
    public void testFindByNombre() {
        // Simular datos
        String nombre = "Modelo 1";
        Modelo modelo = new Modelo();
        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.findByNombre(nombre)).thenReturn(Optional.of(modelo));

        // Llamar al método del servicio
        Optional<Modelo> result = modeloService.findByNombre(nombre);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(modelo, result.get());
    }

    @Test
    public void testFindByMarca() {
        // Simular datos
        Marca marca = new Marca();
        List<Modelo> modelos = new ArrayList<>();
        // Agregar modelos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.findByMarca(marca)).thenReturn(modelos);

        // Llamar al método del servicio
        List<Modelo> result = modeloService.findByMarca(marca);

        // Verificar el resultado
        assertEquals(modelos, result);
    }

    @Test
    public void testFindByMarcaId() {
        // Simular datos
        int marcaId = 1;
        List<Modelo> modelos = new ArrayList<>();
        // Agregar modelos a la lista

        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.findByMarcaId(marcaId)).thenReturn(modelos);

        // Llamar al método del servicio
        List<Modelo> result = modeloService.findByMarcaId(marcaId);

        // Verificar el resultado
        assertEquals(modelos, result);
    }

    @Test
    public void testExistsById() {
        // Simular datos
        int id = 1;
        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.existsById(id)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = modeloService.existsById(id);

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    public void testExistsByNombre() {
        // Simular datos
        String nombre = "Modelo 1";
        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.existsByNombre(nombre)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = modeloService.existsByNombre(nombre);

        // Verificar el resultado
        assertTrue(result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Modelo modelo = new Modelo();
        // Configurar el comportamiento simulado del repositorio
        when(modeloRepository.save(any(Modelo.class))).thenReturn(modelo);

        // Llamar al método del servicio
        modeloService.save(modelo);

        // Verificar que el método del repositorio fue llamado con el modelo adecuado
        verify(modeloRepository).save(modelo);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        modeloService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(modeloRepository).deleteById(id);
    }
}

