package com.ProgramacionAvanzada.AutoSA.dto;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Servicio;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DetalleOrdenTrabajoDto {
    @NotNull
    private Servicio servicio;
    @NotNull
    private OrdenDeTrabajo ordenDeTrabajo;

    public DetalleOrdenTrabajoDto(OrdenDeTrabajo ordenDeTrabajo, Servicio servicio){
        this.ordenDeTrabajo = ordenDeTrabajo;
        this.servicio = servicio;
    }
}
