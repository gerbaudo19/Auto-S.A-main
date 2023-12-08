package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;

public interface TecnicoRepository extends JpaRepository<Tecnico, Integer>{
    Optional<Tecnico> findByDni(String dni);
    Optional<Tecnico> findById(int id);
    List<Tecnico> findByNombre(String nombre);
    Boolean existsByDni(String dni);
}
