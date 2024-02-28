package com.ProgramacionAvanzada.AutoSA.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.repository.OrdenDeTrabajoRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EstadisticasServiciosService {

    @Autowired
    private OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    public Map<Integer, Integer> obtenerServiciosMasSolicitadosEnPeriodo(LocalDate fechaInicio, LocalDate fechaFin) {
        Map<Integer, Integer> estadisticas = new HashMap<>();
    
        List<OrdenDeTrabajo> ordenes = ordenDeTrabajoRepository.findByFechaCreacionBetween(fechaInicio, fechaFin);
    
        for (OrdenDeTrabajo orden : ordenes) {
            List<DetalleOrdenTrabajo> detalles = orden.getDetallesOrdenTrabajo();
            for (DetalleOrdenTrabajo detalle : detalles) {
                Servicio servicio = detalle.getServicio();
                int idServicio = servicio.getId(); // Obtener el ID del servicio
                estadisticas.put(idServicio, estadisticas.getOrDefault(idServicio, 0) + 1);
            }
        }
    
        return estadisticas;
    }
}
