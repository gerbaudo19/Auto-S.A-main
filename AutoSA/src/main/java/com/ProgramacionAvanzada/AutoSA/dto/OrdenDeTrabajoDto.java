package com.ProgramacionAvanzada.AutoSA.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ProgramacionAvanzada.AutoSA.entity.Estado;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;

//import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrdenDeTrabajoDto{
    @NotBlank
    private String observacion;
    @NotNull
    private LocalDate fechaCreacion;
    //@Column(columnDefinition = "TIME")
    @NotNull
    private LocalTime horaCreacion;
    @NotNull
    private Estado estado;
    @NotNull
    private Vehiculo vehiculo;

    public OrdenDeTrabajoDto(@NotBlank String observacion,@NotNull LocalDate fechaCreacion,@NotNull LocalTime horaCreacion,@NotNull Estado estado,@NotNull Vehiculo vehiculo){
        this.observacion = observacion;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.estado = estado;
        this.vehiculo = vehiculo;
    }
}
