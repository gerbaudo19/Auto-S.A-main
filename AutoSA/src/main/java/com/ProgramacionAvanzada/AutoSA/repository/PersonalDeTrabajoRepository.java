package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;

@Repository
public interface PersonalDeTrabajoRepository extends JpaRepository<PersonalDeTrabajo, Integer> {
    Optional<PersonalDeTrabajo> findById(int id);
    List<PersonalDeTrabajo> findByOrdenDeTrabajoId(int ordenTrabajoId);
}
