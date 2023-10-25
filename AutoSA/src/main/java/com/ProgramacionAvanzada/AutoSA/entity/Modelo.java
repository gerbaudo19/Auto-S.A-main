package com.ProgramacionAvanzada.AutoSA.entity;

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
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String nombre;
    
    //@JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;

    //@OneToMany(mappedBy = "modelo")
    //@JsonBackReference
    //private List<Vehiculo> Vehiculo;

    public Modelo(String nombre, Marca marca){
        this.nombre = nombre;
        this.marca = marca;
    }
}
