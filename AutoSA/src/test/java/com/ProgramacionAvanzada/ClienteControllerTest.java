package com.ProgramacionAvanzada;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ProgramacionAvanzada.AutoSA.controller.ClienteController;
import com.ProgramacionAvanzada.AutoSA.dto.ClienteDto;
import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.service.ClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class ClienteControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ClienteService clienteService;

    @InjectMocks
    private ClienteController clienteController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(clienteController).build();
    }

    @Test
    public void createCliente() throws Exception {
        // Crear un ClienteDto para la creación
        ClienteDto clienteDto = new ClienteDto("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio", LocalDate.now());

        // Realizar la solicitud de creación
        mockMvc.perform(post("/cliente/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(clienteDto)))
                .andExpect(status().isOk());

        // Verificar que el método save del servicio se llamó una vez
        verify(clienteService, times(1)).save(any(Cliente.class));
    }


    @Test
    public void findAll() throws Exception {
        when(clienteService.findAll()).thenReturn(Collections.singletonList(new Cliente("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio", LocalDate.now())));

        mockMvc.perform(get("/cliente/list"))
                .andExpect(status().isOk());
    }

    @Test
    public void updateCliente() throws Exception {
        // Configurar el servicio para devolver true al verificar si el cliente existe por ID
        when(clienteService.existsById(1)).thenReturn(true);

        // Configurar el servicio para devolver un Cliente existente cuando se solicita por ID
        when(clienteService.findById(1)).thenReturn(Optional.of(new Cliente()));

        // Crear un ClienteDto para la actualización
        ClienteDto clienteDto = new ClienteDto("NuevoNombre", "NuevoApellido", "87654321", "987654321", "nuevo@dominio.com", "NuevoDomicilio", LocalDate.now());

        // Realizar la solicitud de actualización
        mockMvc.perform(put("/cliente/update/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(clienteDto)))
                .andExpect(status().isOk());

        // Verificar que el método save del servicio se llamó una vez
        verify(clienteService, times(1)).save(any(Cliente.class));
    }
    
    @Test
    public void deleteCliente() throws Exception {
        when(clienteService.existsById(anyInt())).thenReturn(true);

        mockMvc.perform(delete("/cliente/delete/{id}", 1))
                .andExpect(status().isOk());
    }

    @Test
    public void findById() throws Exception {
        Cliente cliente = new Cliente("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio", LocalDate.now());
        when(clienteService.findById(anyInt())).thenReturn(java.util.Optional.of(cliente));

        mockMvc.perform(get("/cliente/listById/{id}", 1))
                .andExpect(status().isOk());
    }

    @Test
    public void findByDni() throws Exception {
        Cliente cliente = new Cliente("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio", LocalDate.now());
        when(clienteService.findByDni(anyString())).thenReturn(java.util.Optional.of(cliente));

        mockMvc.perform(get("/cliente/listByDni/{dni}", "12345678"))
                .andExpect(status().isOk());
    }

    @Test
    public void findByNombre() throws Exception {
        when(clienteService.findByNombre(anyString())).thenReturn(Collections.singletonList(new Cliente("Nombre", "Apellido", "12345678", "123456789", "correo@dominio.com", "Domicilio", LocalDate.now())));

        mockMvc.perform(get("/cliente/listByNombre/{nombre}", "Nombre"))
                .andExpect(status().isOk());
    }

    private static String asJsonString(final Object obj) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
