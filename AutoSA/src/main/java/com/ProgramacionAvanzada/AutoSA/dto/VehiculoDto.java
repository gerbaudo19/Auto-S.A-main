package com.ProgramacionAvanzada.AutoSA.dto;

import com.ProgramacionAvanzada.AutoSA.entity.Cliente;
import com.ProgramacionAvanzada.AutoSA.entity.Modelo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VehiculoDto {
    //@NotBlank se utiliza para validar que una cadena de caracteres (String) no esté en blanco
    @NotBlank
    private String patente;

    @NotNull
    private int año;

    @NotNull
    private int kilometraje;

    //@NotNull se utiliza para validar que un valor no sea nulo. Puede aplicarse a campos, parámetros de métodos o elementos en una colección o array.
    @NotNull
    private Modelo modelo;

    @NotNull
    private Cliente cliente;

    public VehiculoDto(@NotBlank String patente, @NotNull Modelo modelo, @NotNull Cliente cliente,@NotNull int año, @NotNull int kilometraje) {
        this.patente = patente;
        this.modelo = modelo;
        this.cliente = cliente;
        this.año = año;
        this.kilometraje = kilometraje;
    }    
}
