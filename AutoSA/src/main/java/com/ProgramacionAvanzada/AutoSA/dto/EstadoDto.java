package com.ProgramacionAvanzada.AutoSA.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EstadoDto {
    @NotBlank
    private String nombre;
    public EstadoDto(String nombre){
        this.nombre = nombre;
    }
}
