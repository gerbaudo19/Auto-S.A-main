package com.ProgramacionAvanzada.AutoSA.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ProgramacionAvanzada.AutoSA.repository.EstadoRepository;

@Service
@Transactional
public class EstadoService {
    @Autowired
    EstadoRepository estadoRepository;

}
