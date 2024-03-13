package com.ProgramacionAvanzada.AutoSA.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProgramacionAvanzada.AutoSA.service.EstadoService;

@RestController
@RequestMapping("/api/estados")
@CrossOrigin("*")
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @PostMapping("/cargar-estados-iniciales")
    public void cargarEstadosIniciales() {
        estadoService.cargarEstadosIniciales();
    }
}

