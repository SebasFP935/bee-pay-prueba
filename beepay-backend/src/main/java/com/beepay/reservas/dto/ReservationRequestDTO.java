package com.beepay.reservas.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequestDTO {

    @NotBlank(message = "El nombre del cliente es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String clientName;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^[0-9+\\-\\s]{7,15}$", message = "Formato de teléfono inválido")
    private String phone;

    @NotNull(message = "La cancha es obligatoria")
    private Long fieldId;

    @NotNull(message = "La fecha es obligatoria")
    @FutureOrPresent(message = "La fecha no puede ser en el pasado")
    private LocalDate date;

    @NotNull(message = "La hora es obligatoria")
    private LocalTime time;

    @NotNull(message = "La duración es obligatoria")
    @Min(value = 1, message = "La duración mínima es 1 hora")
    @Max(value = 8, message = "La duración máxima es 8 horas")
    private Integer duration;

    private String observations;
}