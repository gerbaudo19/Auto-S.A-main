package com.ProgramacionAvanzada.AutoSA.controller;

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

import com.ProgramacionAvanzada.AutoSA.dto.FacturaDto;
import com.ProgramacionAvanzada.AutoSA.entity.Factura;
import com.ProgramacionAvanzada.AutoSA.service.FacturaService;

@RestController
@RequestMapping("/factura")
@CrossOrigin("*")
public class FacturaController {
    @Autowired
    FacturaService facturaService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody FacturaDto facturaDto){

        Factura facturaNueva = new Factura(
            facturaDto.getSubTotal(),
            facturaDto.getFecha(),
            facturaDto.getHora(),
            facturaDto.getOrdenDeTrabajo()
        );

        facturaService.save(facturaNueva);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody FacturaDto facturaDto){
        
       // if(!ordenDeTrabajoService.existsById(id)){
        //    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       // }

        Factura factura = facturaService.findById(id).get();

        factura.setSubTotal(facturaDto.getSubTotal());
        factura.setFecha(facturaDto.getFecha());
        factura.setHora(facturaDto.getHora());
        factura.setOrdenDeTrabajo(facturaDto.getOrdenDeTrabajo());

        facturaService.save(factura);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){

        facturaService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/listById/{id}")
    public ResponseEntity<Optional<Factura>> findById(@PathVariable int id){

        try {
            Optional<Factura> factura = facturaService.findById(id);
            return new ResponseEntity<>(factura, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } 
    }

    @GetMapping("/listByOrdenDeTrabajoId/{id}")
    public ResponseEntity<Optional<Factura>> findByOrdenDeTrabajoId(@PathVariable int ordenDeTrabajoId){

        try {
            Optional<Factura> factura = facturaService.findByOrdenDeTrabajoId(ordenDeTrabajoId);
            return new ResponseEntity<>(factura, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } 
    }
}
