package com.ProgramacionAvanzada.AutoSA.entity;



import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class DetalleOrdenTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Servicio servicio;

    @ManyToOne
    @JoinColumn(name = "orden_de_trabajo_id")
    @JsonBackReference
    private OrdenDeTrabajo ordenDeTrabajo;

    public DetalleOrdenTrabajo(OrdenDeTrabajo ordenDeTrabajo, Servicio servicio){
        this.ordenDeTrabajo = ordenDeTrabajo;
        this.servicio = servicio;
    }
}

