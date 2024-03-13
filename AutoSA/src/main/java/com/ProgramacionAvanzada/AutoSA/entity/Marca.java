package com.ProgramacionAvanzada.AutoSA.entity;

//import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private int impuesto = 15; // Establecer impuesto en 15%

    // Constructor con nombre e impuesto
    public Marca(String nombre, int impuesto) {
        this.nombre = nombre;
        this.impuesto = impuesto;
    }
}
