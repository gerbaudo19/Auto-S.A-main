package com.ProgramacionAvanzada.AutoSA.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.dto.RendimientoTecnicoDto;
import com.ProgramacionAvanzada.AutoSA.dto.TecnicoDto;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;
import com.ProgramacionAvanzada.AutoSA.service.EstadisticasService;

@RestController
@RequestMapping("/estadisticas")
@CrossOrigin("*")
public class EstadisticasController {
    @Autowired
    private EstadisticasService estadisticasService;

    @GetMapping("/rendimiento-tecnicos")
    public ResponseEntity<List<RendimientoTecnicoDto>> obtenerRendimientoTecnicosEnPeriodo(@RequestParam("fechaInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
                                                                                            @RequestParam("fechaFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        Map<Tecnico, Integer> rendimientoTecnicos = estadisticasService.obtenerRendimientoTecnicosEnPeriodo(fechaInicio, fechaFin);
        List<RendimientoTecnicoDto> rendimientoTecnicoDtos = new ArrayList<>();

        for (Map.Entry<Tecnico, Integer> entry : rendimientoTecnicos.entrySet()) {
            Tecnico tecnico = entry.getKey();
            int cantidadOrdenes = entry.getValue();
            TecnicoDto tecnicoDto = new TecnicoDto(tecnico.getNombre(), tecnico.getApellido(), tecnico.getDni(), tecnico.getTelefono(), tecnico.getEmail(), tecnico.getDomicilio());
            rendimientoTecnicoDtos.add(new RendimientoTecnicoDto(tecnicoDto, cantidadOrdenes));
        }

        return ResponseEntity.ok(rendimientoTecnicoDtos);
    }
}
