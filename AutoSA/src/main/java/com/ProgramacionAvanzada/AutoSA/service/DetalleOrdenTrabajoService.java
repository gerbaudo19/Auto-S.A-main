package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.repository.DetalleOrdenTrabajoRepository;

@Service
@Transactional
public class DetalleOrdenTrabajoService {
    @Autowired
    DetalleOrdenTrabajoRepository detalleOrdenTrabajoRepository;
    public List<DetalleOrdenTrabajo> findAll(){
        return detalleOrdenTrabajoRepository.findAll();
    }

    public void save(DetalleOrdenTrabajo detalleOrdenTrabajo){
        detalleOrdenTrabajoRepository.save(detalleOrdenTrabajo);
    }

    public void deleteById(int id){
        detalleOrdenTrabajoRepository.deleteById(id);
    }

    public Optional<DetalleOrdenTrabajo> findById(int id){
        return detalleOrdenTrabajoRepository.findById(id);
    }
}
