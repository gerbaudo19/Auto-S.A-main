package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.repository.MarcaRepository;

@Service
@Transactional
public class MarcaService {
    @Autowired
    MarcaRepository marcaRepository;

    public List<Marca> findAll(){
        return marcaRepository.findAll();
    }

    public void save(Marca marca){
        marcaRepository.save(marca);
    }

    public void deleteById(int id){
        marcaRepository.deleteById(id);
    }

    public Optional<Marca> findById(int id){
        return marcaRepository.findById(id);
    }

    public Optional<Marca> findByNombre(String nombre){
        return marcaRepository.findByNombre(nombre);
    }

    public boolean existsById(int id){
        return marcaRepository.existsById(id);
    }

    public boolean existsByNombre(String nombre) {
        return marcaRepository.existsByNombre(nombre);
    }
}
