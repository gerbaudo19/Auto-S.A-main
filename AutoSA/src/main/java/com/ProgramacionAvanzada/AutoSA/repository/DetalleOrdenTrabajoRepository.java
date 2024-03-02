package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;

@Repository
public interface DetalleOrdenTrabajoRepository extends JpaRepository<DetalleOrdenTrabajo, Integer> {
    Optional<DetalleOrdenTrabajo> findById(int id);
    List<DetalleOrdenTrabajo> findByOrdenDeTrabajoId(int ordenTrabajoId);
    void deleteByOrdenDeTrabajoId(int ordenDeTrabajoId);

    // Método para encontrar los servicios asociados a los detalles de una orden de trabajo por su ID
    @Query("SELECT d.servicio FROM DetalleOrdenTrabajo d WHERE d.ordenDeTrabajo.id = :ordenId")
    List<Servicio> findServiciosByOrdenId(@Param("ordenId") int ordenId);
}

