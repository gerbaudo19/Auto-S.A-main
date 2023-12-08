package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.repository.ServicioRepository;

@Service
@Transactional
public class ServicioService {
    @Autowired
    ServicioRepository servicioRepository;

    public List<Servicio> findAll(){
        return servicioRepository.findAll();
    }

    public void save(Servicio servicio){
        servicioRepository.save(servicio);
    }

    public void deleteById(int id){
        servicioRepository.deleteById(id);
    }

    public boolean existsById(int id){
        return servicioRepository.existsById(id);
    }

    public boolean existsByNombre(String nombre){
        return servicioRepository.existsByNombre(nombre);
    }

    public Optional<Servicio> findById(int id){
        return servicioRepository.findById(id);
    }
}
