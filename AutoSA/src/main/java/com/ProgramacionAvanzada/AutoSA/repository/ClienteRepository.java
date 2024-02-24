package com.ProgramacionAvanzada.AutoSA.repository;

//import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;;
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
    Optional<Cliente> findByDni(String dni);
    Optional<Cliente> findById(int id);
    List<Cliente> findByNombre(String nombre);
    //List<Cliente> findByFecha(LocalDate fecha);
    Boolean existsByDni(String dni);
}
