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

import com.ProgramacionAvanzada.AutoSA.dto.DetalleOrdenTrabajoDto;
import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.service.DetalleOrdenTrabajoService;

@RestController
@RequestMapping("/detalleOrdenTrabajo")
@CrossOrigin("*")
public class DetalleOrdenTrabajoController {
    @Autowired
    DetalleOrdenTrabajoService detalleOrdenTrabajoService;

    @GetMapping("/list")
    public ResponseEntity<List<DetalleOrdenTrabajo>> findAll(){

        List<DetalleOrdenTrabajo> list = detalleOrdenTrabajoService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody DetalleOrdenTrabajoDto detalleOrdenTrabajoDto){

        DetalleOrdenTrabajo detalleOrdenTrabajoNuevo = new DetalleOrdenTrabajo(
            detalleOrdenTrabajoDto.getOrdenDeTrabajo(), 
            detalleOrdenTrabajoDto.getServicio()
        );
        detalleOrdenTrabajoService.save(detalleOrdenTrabajoNuevo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody DetalleOrdenTrabajoDto detalleOrdenTrabajoDto){

        DetalleOrdenTrabajo detalleOrdenTrabajo = detalleOrdenTrabajoService.findById(id).get();

        detalleOrdenTrabajo.setOrdenDeTrabajo(detalleOrdenTrabajoDto.getOrdenDeTrabajo());
        detalleOrdenTrabajo.setServicio(detalleOrdenTrabajoDto.getServicio());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){

        detalleOrdenTrabajoService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
