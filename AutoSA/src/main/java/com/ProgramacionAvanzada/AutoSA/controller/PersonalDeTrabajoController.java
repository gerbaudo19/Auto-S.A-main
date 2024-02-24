package com.ProgramacionAvanzada.AutoSA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.dto.PersonalDeTrabajoDto;
import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.service.PersonalDeTrabajoService;

@RestController
@RequestMapping("/personalDeTrabajo")
@CrossOrigin("*")
public class PersonalDeTrabajoController {
    @Autowired
    PersonalDeTrabajoService personalDeTrabajoService;

    @GetMapping("/list")
    public ResponseEntity<List<PersonalDeTrabajo>> findAll(){

        List<PersonalDeTrabajo> list = personalDeTrabajoService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody PersonalDeTrabajoDto personalDeTrabajoDto){

        PersonalDeTrabajo personbalDeTrabajoNuevo = new PersonalDeTrabajo(
            personalDeTrabajoDto.getTecnico(),
            personalDeTrabajoDto.getOrdenDeTrabajo()
        );

        personalDeTrabajoService.save(personbalDeTrabajoNuevo);

        return new ResponseEntity<>(HttpStatus.OK); 
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody PersonalDeTrabajoDto personbalDeTrabajoDto){

        PersonalDeTrabajo personbalDeTrabajo = personalDeTrabajoService.findById(id).get();

        personbalDeTrabajo.setTecnico(personbalDeTrabajoDto.getTecnico());
        personbalDeTrabajo.setOrdenDeTrabajo(personbalDeTrabajoDto.getOrdenDeTrabajo());

        personalDeTrabajoService.save(personbalDeTrabajo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){

        personalDeTrabajoService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/listByOrdentrabajoId/{ordenTrabajoId}")
    public ResponseEntity<List<PersonalDeTrabajo>> findByOrdenDeTrabajoId(@PathVariable int ordenTrabajoId){
        try {
            List<PersonalDeTrabajo> personalDeTrabajo = personalDeTrabajoService.findByOrdenDeTrabajoId(ordenTrabajoId);
            return new ResponseEntity<>(personalDeTrabajo, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
