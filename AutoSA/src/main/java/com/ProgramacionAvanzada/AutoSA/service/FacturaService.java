package com.ProgramacionAvanzada.AutoSA.service;

import java.util.Optional;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.DetalleOrdenTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Factura;
//import com.ProgramacionAvanzada.AutoSA.entity.Marca;
//import com.ProgramacionAvanzada.AutoSA.entity.Modelo;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;
import com.ProgramacionAvanzada.AutoSA.repository.DetalleOrdenTrabajoRepository;
import com.ProgramacionAvanzada.AutoSA.repository.FacturaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Transactional  
public class FacturaService {
    @Autowired
    FacturaRepository facturaRepository;

    @Autowired
    DetalleOrdenTrabajoRepository detalleOrdenTrabajoRepository;

    private static final Logger logger = LoggerFactory.getLogger(FacturaService.class);

    @SuppressWarnings("null")
    public void save(Factura factura) {
        facturaRepository.save(factura);
    }

    public void deleteById(int id){
        facturaRepository.deleteById(id);
    }

    public Optional<Factura> findByOrdenDeTrabajoId(int ordenDeTrabajoId){
        return facturaRepository.findByOrdenDeTrabajoId(ordenDeTrabajoId);
    }

    public Optional<Factura> findById(int id){
        return facturaRepository.findById(id);
    }

    public int calcularSubTotal(OrdenDeTrabajo ordenDeTrabajo) {
        int subTotal = 0;
        List<DetalleOrdenTrabajo> detalles = detalleOrdenTrabajoRepository.findByOrdenDeTrabajoId(ordenDeTrabajo.getId());

        if (detalles != null && !detalles.isEmpty()) {
            for (DetalleOrdenTrabajo detalle : detalles) {
                Servicio servicio = detalle.getServicio();

                if (servicio != null && servicio.getPrecio() > 0) {
                    subTotal += servicio.getPrecio();
                    logger.info("Precio del servicio {} para la orden de trabajo {}: {}", servicio.getNombre(), ordenDeTrabajo.getId(), servicio.getPrecio());
                } else {
                    logger.warn("Detalle de orden de trabajo {} sin servicio asociado o precio inválido", detalle.getId());
                }
            }
        } else {
            logger.warn("La orden de trabajo {} no tiene detalles de orden de trabajo", ordenDeTrabajo.getId());
        }

        logger.info("Subtotal calculado para la orden de trabajo {}: {}", ordenDeTrabajo.getId(), subTotal);
        return subTotal;
    }
    
    public List<Factura> findAll() {
        return facturaRepository.findAll();
    }

    public List<Factura> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin) {
        return facturaRepository.findByFechaBetween(fechaInicio, fechaFin);
    }
    
}
