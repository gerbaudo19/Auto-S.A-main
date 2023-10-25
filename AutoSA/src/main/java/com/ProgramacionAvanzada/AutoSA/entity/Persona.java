package com.ProgramacionAvanzada.AutoSA.entity;

//import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.InheritanceType;
//import jakarta.persistence.Inheritance;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//@Inheritance(strategy = InheritanceType.JOINED)
//@Entity
//@MappedSuperClass Identifica a la clase como una clase padre que se va a usar como plantilla y no se mapea en la base de datos
@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String email;
    private String domicilio;

    public Persona(String nombre, String apellido, String dni, String telefono, String email, String domicilio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
        this.domicilio = domicilio;
    }
}

