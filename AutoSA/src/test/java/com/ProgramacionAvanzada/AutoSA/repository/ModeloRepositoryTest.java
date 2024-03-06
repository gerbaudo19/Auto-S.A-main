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
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;


@RunWith(MockitoJUnitRunner.class)
public class ModeloRepositoryTest {

    @Mock
    private ModeloRepository modeloRepository;

    @Before
    public void setUp() {
        // Configurar comportamientos simulados aquí si es necesario
    }

    @Test
    public void testFindByNombre() {
        String nombre = "Modelo1";
        Modelo modelo = new Modelo();
        when(modeloRepository.findByNombre(nombre)).thenReturn(Optional.of(modelo));

        Optional<Modelo> result = modeloRepository.findByNombre(nombre);

        assertTrue(result.isPresent());
        assertEquals(modelo, result.get());
    }

    @Test
    public void testFindByMarca() {
        Marca marca = new Marca();
        List<Modelo> modelos = new ArrayList<>();
        when(modeloRepository.findByMarca(marca)).thenReturn(modelos);

        List<Modelo> result = modeloRepository.findByMarca(marca);

        assertEquals(modelos, result);
    }

    @Test
    public void testFindByMarcaId() {
        int marcaId = 1;
        List<Modelo> modelos = new ArrayList<>();
        when(modeloRepository.findByMarcaId(marcaId)).thenReturn(modelos);

        List<Modelo> result = modeloRepository.findByMarcaId(marcaId);

        assertEquals(modelos, result);
    }

    @Test
    public void testExistsByNombre() {
        String nombre = "Modelo1";
        when(modeloRepository.existsByNombre(nombre)).thenReturn(true);

        boolean result = modeloRepository.existsByNombre(nombre);

        assertTrue(result);
    }
}
