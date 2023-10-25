package com.ProgramacionAvanzada.AutoSA.entity;

//import java.util.List;

//import com.fasterxml.jackson.annotation.JsonBackReference;

//import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    //@OneToMany(fetch = FetchType.EAGER,mappedBy = "servicio", cascade = CascadeType.ALL)
    //@JsonBackReference
    //private List<DetalleOrdenTrabajo> detalleOrdenTrabajo;  

    private String nombre;
    private String descripcion;

    public Servicio(String nombre, String descripcion){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
