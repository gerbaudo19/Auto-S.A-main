package com.ProgramacionAvanzada.AutoSA.dto;

//import java.time.LocalDate;

import com.ProgramacionAvanzada.AutoSA.entity.Persona;

//import java.util.List;
//import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;
import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClienteDto extends Persona{   
    //@NotNull
    //private LocalDate fecha;
    public ClienteDto(@NotBlank String nombre,@NotBlank String apellido,@NotBlank String dni,@NotBlank String telefono,@NotBlank String email,@NotBlank String domicilio /*LocalDate fecha*/) {
        super(nombre, apellido, dni, telefono, email, domicilio);
        //this.fecha = fecha;
    }
}
