package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Factura;


@Repository
public interface FacturaRespository extends JpaRepository<Factura, Integer>{
    Optional<Factura> findById(int id);
    Optional<Factura> findByOrdenDeTrabajoId(int ordenDeTrabajoId);
}