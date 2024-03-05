package com.ProgramacionAvanzada.AutoSA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Estado;
import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.repository.OrdenDeTrabajoRepository;

import jakarta.validation.constraints.NotNull;
@Service
@Transactional
public class OrdenDeTrabajoService {
    @Autowired
    OrdenDeTrabajoRepository ordenDeTrabajoRepository;

    @Autowired
    EstadoService estadoService;

    @SuppressWarnings("null")
    public void save(@NotNull OrdenDeTrabajo ordenDeTrabajo){
        ordenDeTrabajoRepository.save(ordenDeTrabajo);
    }

    public void deleteById(int id){
        Optional<OrdenDeTrabajo> optionalOrden = ordenDeTrabajoRepository.findById(id);
        if (optionalOrden.isPresent()) {
            OrdenDeTrabajo ordenDeTrabajo = optionalOrden.get();
            
            // Log the estado before changing
            System.out.println("Estado antes del cambio: " + ordenDeTrabajo.getEstado().getNombre());
    
            // Obtener el estado "anulada"
            Estado estadoAnulada = estadoService.findById(2).orElseThrow(() -> new IllegalArgumentException("No se pudo encontrar el estado anulada."));
            
            // Cambiar el estado de la orden a "anulada"
            ordenDeTrabajo.setEstado(estadoAnulada);
            
            // Guardar los cambios
            ordenDeTrabajoRepository.save(ordenDeTrabajo);
    
            // Eliminar la orden de trabajo
            ordenDeTrabajoRepository.deleteById(id);
    
            // Log the estado after changing
            System.out.println("Estado después del cambio: " + ordenDeTrabajo.getEstado().getNombre());
        } else {
            throw new IllegalArgumentException("No se pudo encontrar la orden de trabajo con ID: " + id);
        }
    }
    
    public List<OrdenDeTrabajo> findAll(){
        return ordenDeTrabajoRepository.findAll();
    }
    
    public Optional<OrdenDeTrabajo> findById(int id){
        return ordenDeTrabajoRepository.findById(id);
    }

    public Optional<OrdenDeTrabajo> obtenerUltimaOrdenDeTrabajo(){
        return ordenDeTrabajoRepository.findFirstByOrderByIdDesc();
    }

    public boolean existsById(int id) {
        return ordenDeTrabajoRepository.existsById(id);
    }

    // Método para cambiar el estado de la orden a finalizado cuando se crea una factura
    public void cambiarEstadoOrdenCuandoFacturada(int ordenId) {
        Optional<OrdenDeTrabajo> optionalOrden = ordenDeTrabajoRepository.findById(ordenId);
        if (optionalOrden.isPresent()) {
            OrdenDeTrabajo ordenDeTrabajo = optionalOrden.get();
            Estado estadoFinalizado = estadoService.findById(3).orElseThrow(() -> new IllegalArgumentException("No se pudo encontrar el estado finalizado."));
            ordenDeTrabajo.setEstado(estadoFinalizado);
            ordenDeTrabajoRepository.save(ordenDeTrabajo);
        } else {
            throw new IllegalArgumentException("No se pudo encontrar la orden de trabajo con ID: " + ordenId);
        }
    }
}


