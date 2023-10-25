package com.ProgramacionAvanzada.AutoSA.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ServicioDto {

    @NotBlank
    private String nombre;

    @NotBlank
    private String descripcion;
    
    public ServicioDto(@NotBlank String nombre, @NotBlank String descripcion){
        this.descripcion = descripcion;
        this.nombre = nombre;
    }
}
