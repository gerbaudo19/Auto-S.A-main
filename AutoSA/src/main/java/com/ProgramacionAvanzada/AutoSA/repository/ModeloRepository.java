package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Integer>{
    Optional<Modelo> findByNombre (String nombre);
    List<Modelo> findByMarca(Marca marca);
    List<Modelo> findByMarcaId(int marcaid);
    Boolean existsByNombre(String nombre);
}
