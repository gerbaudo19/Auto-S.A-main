package com.ProgramacionAvanzada.AutoSA.dto;

import com.ProgramacionAvanzada.AutoSA.entity.OrdenDeTrabajo;
import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PersonalDeTrabajoDto {
    @NotNull
    private Tecnico tecnico;
    @NotNull
    private OrdenDeTrabajo ordenDeTrabajo;

    public PersonalDeTrabajoDto(Tecnico tecnico, OrdenDeTrabajo ordenDeTrabajo){
        this.tecnico = tecnico;
        this.ordenDeTrabajo = ordenDeTrabajo;
    }
}
