package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;
import com.ProgramacionAvanzada.AutoSA.repository.ModeloRepository;

@Service
@Transactional
public class ModeloService {
    @Autowired
    ModeloRepository modeloRepository;

    public List<Modelo> findAll(){
        return modeloRepository.findAll();
    }

    public Optional<Modelo> findById(int id){
        return modeloRepository.findById(id);
    }

    public Optional<Modelo> findByNombre(String nombre){
        return modeloRepository.findByNombre(nombre);
    }

    public List<Modelo> findByMarca(Marca marca){
        return modeloRepository.findByMarca(marca);
    }


    public List<Modelo> findByMarcaId(int marcaId) {
        return modeloRepository.findByMarcaId(marcaId);
    }

    public boolean existsById(int id){
        return modeloRepository.existsById(id);
    }

    public void save(Modelo modelo){
        modeloRepository.save(modelo);
    }

    public void deleteById(int id){
        modeloRepository.deleteById(id);
    }
}
