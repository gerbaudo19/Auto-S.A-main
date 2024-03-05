package com.ProgramacionAvanzada.AutoSA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.repository.ServicioRepository;
import com.ProgramacionAvanzada.AutoSA.service.EstadisticasServiciosService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/estadisticas")
@CrossOrigin("*")
public class EstadisticasServiciosController {

    @Autowired
    private EstadisticasServiciosService estadisticasServiciosService;

    @Autowired
    private ServicioRepository servicioRepository;

    @GetMapping("/servicios-mas-solicitados")
    public ResponseEntity<?> obtenerEstadisticasServiciosMasSolicitadosEnPeriodo(
            @RequestParam("fechaInicio") LocalDate fechaInicio,
            @RequestParam("fechaFin") LocalDate fechaFin) {
        try {
            Map<String, Integer> estadisticas = new HashMap<>();
            Map<Integer, Integer> estadisticasId = estadisticasServiciosService.obtenerServiciosMasSolicitadosEnPeriodo(fechaInicio, fechaFin);
            for (Map.Entry<Integer, Integer> entry : estadisticasId.entrySet()) {
                int servicioId = entry.getKey();
                int cantidad = entry.getValue();
                Servicio servicio = servicioRepository.findById(servicioId).orElse(null);
                if (servicio != null) {
                    estadisticas.put(servicio.getNombre(), cantidad);
                }
            }
            return ResponseEntity.ok(estadisticas);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Los parámetros de fecha son inválidos");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Se produjo un error interno");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
