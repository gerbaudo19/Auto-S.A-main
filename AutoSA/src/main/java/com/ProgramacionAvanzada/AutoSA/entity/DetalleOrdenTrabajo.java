package com.ProgramacionAvanzada.AutoSA.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private OrdenDeTrabajo ordenDeTrabajo;

    @ManyToOne
    private Servicio servicio;

    public DetalleOrdenTrabajo(OrdenDeTrabajo ordenDeTrabajo, Servicio servicio){
        this.ordenDeTrabajo = ordenDeTrabajo;
        this.servicio = servicio;
    }
}
