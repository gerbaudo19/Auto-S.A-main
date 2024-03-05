package com.ProgramacionAvanzada.AutoSA.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProgramacionAvanzada.AutoSA.entity.Factura;

@Service
public class GananciaTotalService {

    @Autowired
    FacturaService facturaService;

    public int calcularGananciaTotal(LocalDate fechaInicio, LocalDate fechaFin) {
        List<Factura> facturas = facturaService.findByFechaBetween(fechaInicio, fechaFin);
        int gananciaTotal = 0;

        for (Factura factura : facturas) {
            gananciaTotal += factura.getSubTotal();
        }

        return gananciaTotal;
    }
}

