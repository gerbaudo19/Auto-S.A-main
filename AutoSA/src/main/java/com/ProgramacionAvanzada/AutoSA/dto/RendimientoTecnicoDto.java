package com.ProgramacionAvanzada.AutoSA.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RendimientoTecnicoDto {
    private TecnicoDto tecnico;
    private int cantidadOrdenes;

    public RendimientoTecnicoDto(TecnicoDto tecnico, int cantidadOrdenes) {
        this.tecnico = tecnico;
        this.cantidadOrdenes = cantidadOrdenes;
    }
}