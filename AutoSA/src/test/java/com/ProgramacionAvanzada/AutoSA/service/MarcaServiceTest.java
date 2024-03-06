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
import com.ProgramacionAvanzada.AutoSA.repository.MarcaRepository;

@RunWith(MockitoJUnitRunner.class)
public class MarcaServiceTest {

    @Mock
    MarcaRepository marcaRepository;

    @InjectMocks
    MarcaService marcaService;

    @Before
    public void setUp() throws Exception {
        // Configuración de comportamientos simulados
    }

    @Test
    public void testFindAll() {
        // Simular datos
        List<Marca> marcas = new ArrayList<>();
        // Agregar marcas a la lista

        // Configurar el comportamiento simulado del repositorio
        when(marcaRepository.findAll()).thenReturn(marcas);

        // Llamar al método del servicio
        List<Marca> result = marcaService.findAll();

        // Verificar el resultado
        assertEquals(marcas, result);
    }

    @SuppressWarnings("null")
    @Test
    public void testSave() {
        // Simular datos
        Marca marca = new Marca();
        // Configurar el comportamiento simulado del repositorio
        when(marcaRepository.save(any(Marca.class))).thenReturn(marca);

        // Llamar al método del servicio
        marcaService.save(marca);

        // Verificar que el método del repositorio fue llamado con la marca adecuada
        verify(marcaRepository).save(marca);
    }

    @Test
    public void testDeleteById() {
        // Simular datos
        int id = 1;
        
        // Llamar al método del servicio
        marcaService.deleteById(id);

        // Verificar que el método del repositorio fue llamado con el ID adecuado
        verify(marcaRepository).deleteById(id);
    }

    @Test
    public void testFindById() {
        // Simular datos
        int id = 1;
        Marca marca = new Marca();
        // Configurar el comportamiento simulado del repositorio
        when(marcaRepository.findById(id)).thenReturn(Optional.of(marca));

        // Llamar al método del servicio
        Optional<Marca> result = marcaService.findById(id);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(marca, result.get());
    }

    @Test
    public void testFindByNombre() {
        // Simular datos
        String nombre = "Marca 1";
        Marca marca = new Marca();
        // Configurar el comportamiento simulado del repositorio
        when(marcaRepository.findByNombre(nombre)).thenReturn(Optional.of(marca));

        // Llamar al método del servicio
        Optional<Marca> result = marcaService.findByNombre(nombre);

        // Verificar el resultado
        assertTrue(result.isPresent());
        assertEquals(marca, result.get());
    }

    @Test
    public void testExistsById() {
        // Simular datos
        int id = 1;
        // Configurar el comportamiento simulado del repositorio
        when(marcaRepository.existsById(id)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = marcaService.existsById(id);

        // Verificar el resultado
        assertTrue(result);
    }

    @Test
    public void testExistsByNombre() {
        // Simular datos
        String nombre = "Marca 1";
        // Configurar el comportamiento simulado del repositorio
        when(marcaRepository.existsByNombre(nombre)).thenReturn(true);

        // Llamar al método del servicio
        boolean result = marcaService.existsByNombre(nombre);

        // Verificar el resultado
        assertTrue(result);
    }
}

