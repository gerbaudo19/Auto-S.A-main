package com.ProgramacionAvanzada.AutoSA.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.entity.Estado;
import com.ProgramacionAvanzada.AutoSA.repository.EstadoRepository;

import jakarta.annotation.PostConstruct;

@Service
@Transactional
public class EstadoService {
    @Autowired
    EstadoRepository estadoRepository;

    public Optional<Estado> findById(int id) {
        return estadoRepository.findById(id);
    }

    @PostConstruct
    public void cargarEstadosIniciales() {
        // Verificar si ya existen estados en la base de datos
        if (estadoRepository.count() == 0) {
            estadoRepository.save(new Estado("Pendiente"));
            estadoRepository.save(new Estado("Anulado"));
            estadoRepository.save(new Estado("Finalizado"));
        }
    }
}



