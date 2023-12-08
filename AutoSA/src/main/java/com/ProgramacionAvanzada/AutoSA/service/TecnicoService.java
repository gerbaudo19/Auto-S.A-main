package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.repository.TecnicoRepository;

@Service
@Transactional
public class TecnicoService {
    @Autowired
    TecnicoRepository tecnicoRepository;

    public List<Tecnico> findAll(){
        return tecnicoRepository.findAll();
    }

    public void save(Tecnico tecnico){
        tecnicoRepository.save(tecnico);
    }

    public void deleteById(int id){
        tecnicoRepository.deleteById(id);
    }

    public Optional<Tecnico> findById(int id){
        return tecnicoRepository.findById(id);
    }

    public Optional<Tecnico> findByDni(String dni){
        return tecnicoRepository.findByDni(dni);
    }

    public List<Tecnico> findByNombre(String nombre){
        return tecnicoRepository.findByNombre(nombre);
    }

    public boolean existsById(int id){
        return tecnicoRepository.existsById(id);
    }

    public boolean existsByDni(String dni){
        return tecnicoRepository.existsByDni(dni);
    }
}
