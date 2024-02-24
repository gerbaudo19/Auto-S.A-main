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

import com.ProgramacionAvanzada.AutoSA.dto.ModeloDto;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;
import com.ProgramacionAvanzada.AutoSA.service.MarcaService;
import com.ProgramacionAvanzada.AutoSA.service.ModeloService;

@RestController
@RequestMapping("/modelo")
@CrossOrigin("*")
public class ModeloController {
    
    @Autowired
    ModeloService modeloService;

    @Autowired
    MarcaService marcaService;

    @GetMapping("/list")
    public ResponseEntity<List<Modelo>> findAll(){

        List<Modelo> list = modeloService.findAll();
        //list.forEach(modelo -> Hibernate.initialize(modelo.getMarca()));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
/*
    @GetMapping("/listbymarca/{marca}")
    public ResponseEntity<List<Modelo>> findByMarca(@RequestParam("id") int id){

        try {
            Marca marca = marcaService.findById(id).get();
            List<Modelo> list = modeloService.findByMarca(marca);
            return new ResponseEntity<>(list, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
*/
    // Endpoint para obtener modelos por ID de marca
    @GetMapping("/listByMarca/{marcaId}")
    public ResponseEntity<List<Modelo>> findByMarcaId(@PathVariable int marcaId) {
        try {
            List<Modelo> modelos = modeloService.findByMarcaId(marcaId);
            return new ResponseEntity<>(modelos, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ModeloDto modeloDto){
        String nombreModeloNuevo = modeloDto.getNombre();
        if(modeloDto.getNombre().isBlank() || modeloService.existsByNombre(nombreModeloNuevo)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            try{            
            Modelo modeloNuevo = new Modelo(
                modeloDto.getNombre(), 
                modeloDto.getMarca()
                );

            modeloService.save(modeloNuevo);
            /* return ResponseEntity.status(HttpStatus.CREATED).build(); */
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody ModeloDto modeloDto){
        String nombreModeloEditar = modeloDto.getNombre();
        if(!modeloService.existsById(id) || modeloService.existsByNombre(nombreModeloEditar)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Modelo modelo = modeloService.findById(id).get();
        modelo.setNombre(modeloDto.getNombre());
        modelo.setMarca(modeloDto.getMarca());
        modeloService.save(modelo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){

        if(!modeloService.existsById(id)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        modeloService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
