package com.ProgramacionAvanzada.AutoSA.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Factura;


@Repository
public interface FacturaRepository extends JpaRepository<Factura, Integer> {
    Optional<Factura> findById(int id);
    Optional<Factura> findByOrdenDeTrabajoId(int ordenDeTrabajoId);
    List<Factura> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
}

