package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;

@Repository
public interface OrdenDeTrabajoRepository extends JpaRepository<OrdenDeTrabajo, Integer>{
    Optional<OrdenDeTrabajo> findById(int id);
}
