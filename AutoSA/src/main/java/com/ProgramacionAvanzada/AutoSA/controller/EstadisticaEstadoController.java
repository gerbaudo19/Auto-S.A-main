package com.ProgramacionAvanzada.AutoSA.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.service.EstadisticaEstadoService;

@RestController
@RequestMapping("/estadisticas")
@CrossOrigin("*")
public class EstadisticaEstadoController {
    @Autowired
    EstadisticaEstadoService estadisticaEstadoService;

    @GetMapping("/cantidadEstados")
    public ResponseEntity<Map<String, Integer>> obtenerCantidadEstados() {
        Map<String, Integer> cantidadEstados = estadisticaEstadoService.obtenerCantidadEstados();
        return new ResponseEntity<>(cantidadEstados, HttpStatus.OK);
    }
}
