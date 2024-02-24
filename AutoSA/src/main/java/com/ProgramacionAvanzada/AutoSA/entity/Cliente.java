package com.ProgramacionAvanzada.AutoSA.entity;


//import java.time.LocalDate;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//Es una clase hija que hereda todos los atributos de la clase Persona y agrega uno para la revision de los clientes
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cliente extends Persona{   

    //@OneToMany(mappedBy = "cliente")
    //@JsonBackReference
    //private List<Vehiculo> vehiculo;
    //private LocalDate fecha;

    public Cliente(String nombre, String apellido, String dni, String telefono, String email, String domicilio/*LocalDate fecha*/){
        super(nombre, apellido, dni, telefono, email, domicilio);
        //this.fecha = fecha;
    }
}