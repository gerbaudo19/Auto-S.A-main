package com.ProgramacionAvanzada.AutoSA.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FacturaDto {
    @NotNull
    private int subTotal;

    @NotNull
    private OrdenDeTrabajo ordenDeTrabajo;
    
    @NotNull
    private LocalDate fecha;
    @NotNull
    private LocalTime hora;

    public FacturaDto(@NotNull int subTotal,@NotNull LocalDate fecha,@NotNull LocalTime hora,@NotNull OrdenDeTrabajo ordenDeTrabajo){
        this.subTotal = subTotal;
        this.fecha = fecha;
        this.hora = hora;
        this.ordenDeTrabajo = ordenDeTrabajo;
    }

}
