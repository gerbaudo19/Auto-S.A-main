package com.ProgramacionAvanzada.AutoSA.dto;

import com.ProgramacionAvanzada.AutoSA.entity.Persona;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TecnicoDto extends Persona {

    public TecnicoDto(@NotBlank String nombre,@NotBlank String apellido,@NotBlank String dni,@NotBlank String telefono,@NotBlank String email,@NotBlank String domicilio) {
        super(nombre, apellido, dni, telefono, email, domicilio);
    }
}
