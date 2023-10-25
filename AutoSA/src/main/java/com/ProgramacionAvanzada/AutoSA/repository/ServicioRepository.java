package com.ProgramacionAvanzada.AutoSA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Integer> {

}
