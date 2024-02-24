package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
    Optional<Marca> findByNombre(String nombre);
    Boolean existsByNombre(String nombre);
}

