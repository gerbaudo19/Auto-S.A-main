package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;

import java.time.LocalDate;
import java.util.List;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;



@Repository
public interface OrdenDeTrabajoRepository extends JpaRepository<OrdenDeTrabajo, Integer>{
    Optional<OrdenDeTrabajo> findById(int id);
    List<OrdenDeTrabajo> findByVehiculo(Vehiculo vehiculo);
    Optional<OrdenDeTrabajo> findFirstByOrderByIdDesc();
    List<OrdenDeTrabajo> findByFechaCreacionBetween(LocalDate fechaInicio, LocalDate fechaFin);
    
    // Método para encontrar el personal asociado a una orden de trabajo por su ID
    @Query("SELECT o.personalDeTrabajo FROM OrdenDeTrabajo o WHERE o.id = :ordenId")
    List<PersonalDeTrabajo> findPersonalDeTrabajoByOrdenId(@Param("ordenId") int ordenId);
    
    // Método para encontrar los detalles de orden de trabajo asociados a una orden por su ID
    @Query("SELECT o.detallesOrdenTrabajo FROM OrdenDeTrabajo o WHERE o.id = :ordenId")
    List<DetalleOrdenTrabajo> findDetallesOrdenTrabajoByOrdenId(@Param("ordenId") int ordenId);

    @Query("SELECT COUNT(o) FROM OrdenDeTrabajo o WHERE o.estado.id = :estadoId")
    int countByEstadoId(@Param("estadoId") int estadoId);
}
