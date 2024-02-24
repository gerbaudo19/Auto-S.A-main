package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Integer>{
    //FindBy se utiliza para indicar que se trata de una consulta por un atributo específico.
    //El método devuelve un Optional, que es un envoltorio que puede contener un valor de tipo Vehiculo.
    Optional<Vehiculo> findByPatente(String patenet);
    
    //Devuelve una lista de vehiculos.
    List<Vehiculo> findByClienteId(int id);

    //List<Vehiculo> findByMarcaNombre(String nombre);

    List<Vehiculo> findByCliente(Cliente cliente);

    Boolean existsByPatente(String patente);
}
