package com.ProgramacionAvanzada.AutoSA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


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

    @GetMapping("/servicios-mas-solicitados")
    public ResponseEntity<?> obtenerEstadisticasServiciosMasSolicitadosEnPeriodo(
            @RequestParam("fechaInicio") LocalDate fechaInicio,
            @RequestParam("fechaFin") LocalDate fechaFin) {
        try {
            Map<Integer, Integer> estadisticas = estadisticasServiciosService.obtenerServiciosMasSolicitadosEnPeriodo(fechaInicio, fechaFin);
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
