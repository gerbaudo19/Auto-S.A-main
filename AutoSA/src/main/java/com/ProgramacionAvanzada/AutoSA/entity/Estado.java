package com.ProgramacionAvanzada.AutoSA.entity;

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
public class Estado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String nombre;

    //OneToMany(fetch = FetchType.EAGER,mappedBy = "estadoOrden", cascade = CascadeType.ALL)
    //@JsonBackReference
    //private List<OrdenDeTrabajo> ordenDeTrabajo;  

    public Estado(String nombre){
        this.nombre = nombre;
    }
}
