package com.ProgramacionAvanzada.AutoSA.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private int precio;
    
    public ServicioDto(@NotBlank String nombre, @NotBlank String descripcion, @NotNull int precio){
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.precio = precio;
    }
}
