package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;

@Repository
public interface DetalleOrdenTrabajoRepository extends JpaRepository<DetalleOrdenTrabajo, Integer> {
    Optional<DetalleOrdenTrabajo> findById(int id);
}
