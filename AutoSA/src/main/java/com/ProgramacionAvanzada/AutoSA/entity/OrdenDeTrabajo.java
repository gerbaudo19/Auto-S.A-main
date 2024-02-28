package com.ProgramacionAvanzada.AutoSA.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrdenDeTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String observacion;
    private LocalDate fechaCreacion;
    @Column(columnDefinition = "TIME")
    private LocalTime horaCreacion;

    @ManyToOne
    @JoinColumn(name = "vehiculo_id")
    private Vehiculo vehiculo;

    @ManyToOne
    @JoinColumn(name = "estadoOrden_id")
    private Estado estado;

    @OneToMany(mappedBy = "ordenDeTrabajo", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<DetalleOrdenTrabajo> detallesOrdenTrabajo;

    @OneToMany(mappedBy = "ordenDeTrabajo", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<PersonalDeTrabajo> personalDeTrabajo;

    public OrdenDeTrabajo(String observacion, LocalDate fechaCreacion, LocalTime horaCreacion, Estado estado, Vehiculo vehiculo){
        this.observacion = observacion;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.estado = estado;
        this.vehiculo = vehiculo;
    }

}