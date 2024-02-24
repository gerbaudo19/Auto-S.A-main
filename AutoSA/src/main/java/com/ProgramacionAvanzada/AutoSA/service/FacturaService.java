package com.ProgramacionAvanzada.AutoSA.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Factura;
import com.ProgramacionAvanzada.AutoSA.repository.FacturaRespository;


@Service
@Transactional  
public class FacturaService {
    @Autowired
    FacturaRespository facturaRespository;

    public void save(Factura factura) {
        facturaRespository.save(factura);
    }

    public void deleteById(int id){
        facturaRespository.deleteById(id);
    }

    public Optional<Factura> findByOrdenDeTrabajoId(int ordenDeTrabajoId){
        return facturaRespository.findByOrdenDeTrabajoId(ordenDeTrabajoId);
    }

    public Optional<Factura> findById(int id){
        return facturaRespository.findById(id);
    }
}
