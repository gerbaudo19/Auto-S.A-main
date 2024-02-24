package com.ProgramacionAvanzada.AutoSA.controller;

import java.util.List;
import java.util.Optional;

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

import com.ProgramacionAvanzada.AutoSA.dto.OrdenDeTrabajoDto;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.service.OrdenDeTrabajoService;

@RestController
@RequestMapping("/ordenDeTrabajo")
@CrossOrigin("*")
public class OrdenDeTrabajoController {
    @Autowired
    OrdenDeTrabajoService ordenDeTrabajoService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody OrdenDeTrabajoDto ordenDeTrabajoDto){

        OrdenDeTrabajo ordenDeTrabajoNuevo = new OrdenDeTrabajo(
            ordenDeTrabajoDto.getObservacion(),
            ordenDeTrabajoDto.getFechaCreacion(),
            ordenDeTrabajoDto.getHoraCreacion(),
            ordenDeTrabajoDto.getEstado(),
            ordenDeTrabajoDto.getVehiculo()
        );

        ordenDeTrabajoService.save(ordenDeTrabajoNuevo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable /*("id")*/int id, @RequestBody OrdenDeTrabajoDto ordenDeTrabajoDto){
        
       // if(!ordenDeTrabajoService.existsById(id)){
        //    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       // }

        OrdenDeTrabajo ordenDeTrabajo = ordenDeTrabajoService.findById(id).get();

        ordenDeTrabajo.setObservacion(ordenDeTrabajoDto.getObservacion());
        ordenDeTrabajo.setFechaCreacion(ordenDeTrabajoDto.getFechaCreacion());
        ordenDeTrabajo.setHoraCreacion(ordenDeTrabajoDto.getHoraCreacion());
        ordenDeTrabajo.setEstado(ordenDeTrabajoDto.getEstado());
        ordenDeTrabajo.setVehiculo(ordenDeTrabajoDto.getVehiculo());

        ordenDeTrabajoService.save(ordenDeTrabajo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable /*("id")*/ int id){
        //if(!ordenDeTrabajoService.existsById(id)){
        //    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        //}

        ordenDeTrabajoService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<OrdenDeTrabajo>> findAll(){

        List<OrdenDeTrabajo> list = ordenDeTrabajoService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    
    @GetMapping("/listById/{id}")
    public ResponseEntity<Optional<OrdenDeTrabajo>> findById(@PathVariable int id){

        try {
            Optional<OrdenDeTrabajo> ordenDeTrabajo = ordenDeTrabajoService.findById(id);
            return new ResponseEntity<>(ordenDeTrabajo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } 
    }

    @GetMapping("/listUltimo")
    public ResponseEntity<Optional<OrdenDeTrabajo>> obtenerUltimaOrdenDeTrabajo(){

        try {
            Optional<OrdenDeTrabajo> ordenDeTrabajo = ordenDeTrabajoService.obtenerUltimaOrdenDeTrabajo();
            return new ResponseEntity<>(ordenDeTrabajo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } 
    }
    
}
