package com.ProgramacionAvanzada.AutoSA.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProgramacionAvanzada.AutoSA.repository.OrdenDeTrabajoRepository;

@Service
public class EstadisticaEstadoService {
    @Autowired
    OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    public Map<String, Integer> obtenerCantidadEstados() {
        Map<String, Integer> cantidadEstados = new HashMap<>();

        // Contar la cantidad de órdenes de trabajo en cada estado
        int pendientes = ordenDeTrabajoRepository.countByEstadoId(1); // Suponiendo que el ID de pendiente es 1
        int anulados = ordenDeTrabajoRepository.countByEstadoId(2); // Suponiendo que el ID de anulado es 2
        int finalizados = ordenDeTrabajoRepository.countByEstadoId(3); // Suponiendo que el ID de finalizado es 3

        // Agregar los resultados al mapa
        cantidadEstados.put("Pendiente", pendientes);
        cantidadEstados.put("Anulado", anulados);
        cantidadEstados.put("Finalizado", finalizados);

        return cantidadEstados;
    }
}
