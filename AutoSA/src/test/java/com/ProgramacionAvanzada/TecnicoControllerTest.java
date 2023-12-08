package com.ProgramacionAvanzada;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ProgramacionAvanzada.AutoSA.controller.TecnicoController;
import com.ProgramacionAvanzada.AutoSA.dto.TecnicoDto;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.service.TecnicoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class TecnicoControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TecnicoService tecnicoService;

    @InjectMocks
    private TecnicoController tecnicoController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(tecnicoController).build();
    }

    @Test
    public void createTecnico() throws Exception {
        TecnicoDto tecnicoDto = new TecnicoDto("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio");

        mockMvc.perform(post("/tecnico/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(tecnicoDto)))
                .andExpect(status().isOk());
    }

    @Test
    public void findAll() throws Exception {
        when(tecnicoService.findAll()).thenReturn(Collections.singletonList(new Tecnico("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio")));

        mockMvc.perform(get("/tecnico/list"))
                .andExpect(status().isOk());
    }

    @Test
    public void updateTecnico() throws Exception {
        // Crear un Tecnico existente con ID 1 en tu base de datos o usando tu servicio de repositorio
        Tecnico existentTecnico = new Tecnico("NombreExistente", "ApellidoExistente", "12345678", "987654321", "existente@dominio.com", "DomicilioExistente");
    
        // Configurar el servicio para devolver true al verificar si el tecnico existe por ID
        when(tecnicoService.existsById(1)).thenReturn(true);
    
        // Configurar el servicio para devolver el Tecnico existente cuando se solicita por ID
        when(tecnicoService.findById(1)).thenReturn(Optional.of(existentTecnico));
    
        // Crear un TecnicoDto para la actualización
        TecnicoDto tecnicoDto = new TecnicoDto("NuevoNombre", "NuevoApellido", "87654321", "987654321", "nuevo@dominio.com", "NuevoDomicilio");
    
        // Realizar la solicitud de actualización
        mockMvc.perform(put("/tecnico/update/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(tecnicoDto)))
                .andExpect(status().isOk());
    }
    

    @Test
    public void deleteTecnico() throws Exception {
        when(tecnicoService.existsById(anyInt())).thenReturn(true);

        mockMvc.perform(delete("/tecnico/delete/{id}", 1))
                .andExpect(status().isOk());
    }

    @Test
    public void findById() throws Exception {
        Tecnico tecnico = new Tecnico("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio");
        when(tecnicoService.findById(anyInt())).thenReturn(java.util.Optional.of(tecnico));

        mockMvc.perform(get("/tecnico/listById/{id}", 1))
                .andExpect(status().isOk());
    }

    @Test
    public void findByDni() throws Exception {
        Tecnico tecnico = new Tecnico("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio");
        when(tecnicoService.findByDni(anyString())).thenReturn(java.util.Optional.of(tecnico));

        mockMvc.perform(get("/tecnico/listByDni/{dni}", "12345678"))
                .andExpect(status().isOk());
    }

    @Test
    public void findByNombre() throws Exception {
        when(tecnicoService.findByNombre(anyString())).thenReturn(Collections.singletonList(new Tecnico("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio")));

        mockMvc.perform(get("/tecnico/listByNombre/{nombre}", "Nombre"))
                .andExpect(status().isOk());
    }


    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
