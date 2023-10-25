package com.ProgramacionAvanzada.AutoSA.dto;

import com.ProgramacionAvanzada.AutoSA.entity.Marca;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ModeloDto {
    @NotBlank
    private String nombre;
    
    @NotNull
    private Marca marca;

    public ModeloDto(@NotBlank String nombre,@NotNull Marca marca) {
        this.nombre = nombre;
        this.marca = marca;
    }    
}
