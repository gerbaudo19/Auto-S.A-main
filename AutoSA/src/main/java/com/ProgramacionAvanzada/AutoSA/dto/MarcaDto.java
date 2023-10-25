package com.ProgramacionAvanzada.AutoSA.dto;

//import java.util.List;

//import com.ProgramacionAvanzada.AutoSA.entity.Modelo;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MarcaDto {
    @NotBlank
    private String nombre;

    public MarcaDto(@NotBlank String nombre){
        this.nombre = nombre;
    }
}

