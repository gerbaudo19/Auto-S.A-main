package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.repository.OrdenDeTrabajoRepository;

@Service
@Transactional
public class OrdenDeTrabajoService {
    @Autowired
    OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    public void save(OrdenDeTrabajo ordenDeTrabajo){
        ordenDeTrabajoRepository.save(ordenDeTrabajo);
    }

    public void deleteById(int id){
        ordenDeTrabajoRepository.deleteById(id);
    }

    public List<OrdenDeTrabajo> findAll(){
        return ordenDeTrabajoRepository.findAll();
    }
    
    public Optional<OrdenDeTrabajo> findById(int id){
        return ordenDeTrabajoRepository.findById(id);
    }

    public Optional<OrdenDeTrabajo> obtenerUltimaOrdenDeTrabajo(){
        return ordenDeTrabajoRepository.findFirstByOrderByIdDesc();
    }
}
