package com.ProgramacionAvanzada.AutoSA.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ProgramacionAvanzada.AutoSA.dto.PersonalDeTrabajoDto;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.service.PersonalDeTrabajoService;

public class PersonalDeTrabajoControllerTest {

    @Mock
    private PersonalDeTrabajoService personalDeTrabajoService;

    @InjectMocks
    private PersonalDeTrabajoController personalDeTrabajoController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        // Mock de los datos a devolver por PersonalDeTrabajoService.findAll()
        List<PersonalDeTrabajo> personalDeTrabajoList = Arrays.asList(new PersonalDeTrabajo(), new PersonalDeTrabajo());

        when(personalDeTrabajoService.findAll()).thenReturn(personalDeTrabajoList);

        ResponseEntity<List<PersonalDeTrabajo>> response = personalDeTrabajoController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(personalDeTrabajoList, response.getBody());
    }

    @Test
    public void testCreate() {
        // Datos de prueba
        PersonalDeTrabajoDto personalDeTrabajoDto = new PersonalDeTrabajoDto();
        personalDeTrabajoDto.setTecnico(new Tecnico());
        personalDeTrabajoDto.setOrdenDeTrabajo(new OrdenDeTrabajo());

        ResponseEntity<?> response = personalDeTrabajoController.create(personalDeTrabajoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        PersonalDeTrabajoDto personalDeTrabajoDto = new PersonalDeTrabajoDto();
        personalDeTrabajoDto.setTecnico(new Tecnico());
        personalDeTrabajoDto.setOrdenDeTrabajo(new OrdenDeTrabajo());

        when(personalDeTrabajoService.findById(id)).thenReturn(Optional.of(new PersonalDeTrabajo()));

        ResponseEntity<?> response = personalDeTrabajoController.update(id, personalDeTrabajoDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testDelete() {
        int id = 1;

        ResponseEntity<?> response = personalDeTrabajoController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testFindByOrdenDeTrabajoId() {
        int ordenTrabajoId = 1;
        List<PersonalDeTrabajo> personalDeTrabajoList = Arrays.asList(new PersonalDeTrabajo(), new PersonalDeTrabajo());

        when(personalDeTrabajoService.findByOrdenDeTrabajoId(ordenTrabajoId)).thenReturn(personalDeTrabajoList);

        ResponseEntity<List<PersonalDeTrabajo>> response = personalDeTrabajoController.findByOrdenDeTrabajoId(ordenTrabajoId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(personalDeTrabajoList, response.getBody());
    }
}

