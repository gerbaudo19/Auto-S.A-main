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
public class PersonalDeTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Tecnico tecnico;

    @ManyToOne
    @JoinColumn(name = "orden_de_trabajo_id")
    @JsonBackReference
    private OrdenDeTrabajo ordenDeTrabajo;

    public PersonalDeTrabajo(Tecnico tecnico, OrdenDeTrabajo ordenDeTrabajo){
        this.tecnico = tecnico;
        this.ordenDeTrabajo = ordenDeTrabajo;
    }
}



