package com.ProgramacionAvanzada.AutoSA.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.service.GananciaTotalService;

@RestController
@RequestMapping("/ganancia-total")
@CrossOrigin("*")
public class GananciaTotalController {

  @Autowired
  GananciaTotalService gananciaTotalService;

  @GetMapping("/calcular")
  public ResponseEntity<Integer> calcularGananciaTotal(
      @RequestParam(value = "fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaInicio,
      @RequestParam(value = "fechaFin") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaFin) {
    try {
      int gananciaTotal = gananciaTotalService.calcularGananciaTotal(fechaInicio, fechaFin);
      return new ResponseEntity<>(gananciaTotal, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
