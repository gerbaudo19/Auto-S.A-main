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

import com.ProgramacionAvanzada.AutoSA.dto.ServicioDto;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.service.ServicioService;

@RestController
@RequestMapping("/servicio")
@CrossOrigin("*")
public class ServicioController {
    @Autowired
    ServicioService servicioService;

    @GetMapping("/list")
    public ResponseEntity<List<Servicio>> findAll(){

        List<Servicio> list = servicioService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ServicioDto servicioDto){

        if(servicioDto.getNombre().isBlank()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Servicio servicioNuevo = new Servicio(
            servicioDto.getNombre(),
            servicioDto.getDescripcion()
        );

        servicioService.save(servicioNuevo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

   @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody ServicioDto servicioDto){
        
        if(!servicioService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Servicio servicio = servicioService.findById(id).get();

        servicio.setNombre(servicioDto.getNombre());
        servicio.setDescripcion(servicioDto.getDescripcion());

        servicioService.save(servicio);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){

        if(!servicioService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        servicioService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
