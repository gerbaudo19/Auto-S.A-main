package com.ProgramacionAvanzada.AutoSA.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.repository.OrdenDeTrabajoRepository;
import com.ProgramacionAvanzada.AutoSA.repository.PersonalDeTrabajoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EstadisticasService {
    @Autowired
    private OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    @Autowired
    private PersonalDeTrabajoRepository personalDeTrabajoRepository;

    public Map<Tecnico, Integer> obtenerRendimientoTecnicosEnPeriodo(LocalDate fechaInicio, LocalDate fechaFin) {
        List<OrdenDeTrabajo> ordenes = ordenDeTrabajoRepository.findByFechaCreacionBetween(fechaInicio, fechaFin);
        Map<Tecnico, Integer> rendimientoPorTecnico = new HashMap<>();

        for (OrdenDeTrabajo orden : ordenes) {
            List<PersonalDeTrabajo> personal = personalDeTrabajoRepository.findByOrdenDeTrabajoId(orden.getId());
            for (PersonalDeTrabajo persona : personal) {
                Tecnico tecnico = persona.getTecnico();
                rendimientoPorTecnico.put(tecnico, rendimientoPorTecnico.getOrDefault(tecnico, 0) + 1);
            }
        }

        return rendimientoPorTecnico;
    }
}
