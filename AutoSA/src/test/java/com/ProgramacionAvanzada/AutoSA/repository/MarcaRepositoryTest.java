package com.ProgramacionAvanzada.AutoSA.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;

@RunWith(MockitoJUnitRunner.class)
public class MarcaRepositoryTest {

    @Mock
    private MarcaRepository marcaRepository;

    @Test
    public void testFindByNombre() {
        String nombre = "Toyota";
        Marca marca = new Marca();
        marca.setNombre(nombre);
        when(marcaRepository.findByNombre(nombre)).thenReturn(Optional.of(marca));

        Optional<Marca> result = marcaRepository.findByNombre(nombre);

        assertTrue(result.isPresent());
        assertEquals(marca, result.get());
    }

    @Test
    public void testExistsByNombre() {
        String nombre = "Toyota";
        when(marcaRepository.existsByNombre(nombre)).thenReturn(true);

        boolean result = marcaRepository.existsByNombre(nombre);

        assertTrue(result);
    }
}

