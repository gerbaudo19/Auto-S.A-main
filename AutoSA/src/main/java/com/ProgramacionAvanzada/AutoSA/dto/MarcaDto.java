package com.ProgramacionAvanzada.AutoSA.dto;

//import java.util.List;

//import com.ProgramacionAvanzada.AutoSA.entity.Modelo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MarcaDto {
    @NotBlank
    private String nombre;

    @NotNull
    private int impuesto;
    public MarcaDto(@NotBlank String nombre, @NotNull int impuesto){
        this.nombre = nombre;
        this.impuesto = impuesto;
    }
}

