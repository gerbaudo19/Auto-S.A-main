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

import com.ProgramacionAvanzada.AutoSA.dto.MarcaDto;
import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.service.MarcaService;

@RestController
@RequestMapping("/marca")
@CrossOrigin("*")
public class MarcaController {
    
    @Autowired
    MarcaService marcaService;

    @GetMapping("/list")
    public ResponseEntity<List<Marca>> findAll(){

        List<Marca> list = marcaService.findAll();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody MarcaDto marcaDto){
        String nombreMarcaNuevo = marcaDto.getNombre();
        if(marcaDto.getNombre().isBlank() || marcaService.existsByNombre(nombreMarcaNuevo)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            Marca marcaNuevo = new Marca(
                marcaDto.getNombre(),
                marcaDto.getImpuesto()
                );
            marcaService.save(marcaNuevo);

            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable /*("id")*/ int id, @RequestBody MarcaDto marcaDto){
      // String nombreMarcaEditar = marcaDto.getNombre();
        /*if(!marcaService.existsById(id) || marcaService.existsByNombre(nombreMarcaEditar) ){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }*/

        Marca marca = marcaService.findById(id).get();
        marca.setNombre(marcaDto.getNombre());
        marca.setImpuesto(marcaDto.getImpuesto()); 
        marcaService.save(marca);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){

        if(!marcaService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        marcaService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/listByNombre/{nombre}")
    public ResponseEntity<Optional<Marca>> findByNombre(@PathVariable String nombre) {
        try {
            Optional<Marca> marca = marcaService.findByNombre(nombre);
            return new ResponseEntity<>(marca, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
