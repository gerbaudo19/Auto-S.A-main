package com.ProgramacionAvanzada.AutoSA.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class Vehiculo {
    //Identifica al atributo id como un tipo de clave primaria Id.
    //Genera un valor automaticamente de tipo identity unico para cada objeto.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //Establece una relacion de muchos a uno con el Cliente.
    //Nombra a la columna en la tabla como cliente_id
    //@JsonManagedReference es la contraparte del JsonBackReference
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    //Establece una relacion de uno a  muchos con el Modelo.
    //Nombra a la columna en la tabla como modelo_id
    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;
    //Un vehiculo puede estar vinculado a muchas ordenes de trabajos
    //@JsonBackReferences se evita que se cree un ciclo infinito entre los vehiculos y la ordenes de trabajos
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "vehiculo", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<OrdenDeTrabajo> ordenDeTrabajo;  
    //Define las otras variables
    private int año;
    private int kilometraje;
    private String patente;
    //Constructor para instanciar objetos de la clase.
    public Vehiculo(Cliente cliente, Modelo modelo, int año, int kilometraje, String patente){
        this.cliente = cliente;
        this.modelo = modelo;
        this.año = año;
        this.kilometraje = kilometraje;
        this.patente = patente;
    }
}
