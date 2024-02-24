package com.ProgramacionAvanzada.AutoSA.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private int subTotal;
    private LocalDate fecha;
    @Column(columnDefinition = "TIME")
    private LocalTime hora;

    @OneToOne
    @JoinColumn(name = "OrdenDeTrabajo_id")
    private OrdenDeTrabajo ordenDeTrabajo;

    public Factura(int subTotal, LocalDate fecha, LocalTime hora, OrdenDeTrabajo ordenDeTrabajo){
        this.subTotal = subTotal;
        this.fecha = fecha;
        this.hora = hora;
        this.ordenDeTrabajo = ordenDeTrabajo;
    }
}
