package com.beepay.reservas.service;

import com.beepay.reservas.dto.ReservationRequestDTO;
import com.beepay.reservas.model.Field;
import com.beepay.reservas.model.Reservation;
import com.beepay.reservas.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final FieldService fieldService;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation createReservation(ReservationRequestDTO dto) {
        Field field = fieldService.getFieldById(dto.getFieldId());

        if (field.getStatus() == Field.FieldStatus.UNAVAILABLE) {
            throw new IllegalStateException("La cancha '" + field.getName() + "' no está disponible para reservas.");
        }

        boolean conflict = reservationRepository.existsByFieldIdAndDateAndTime(
                dto.getFieldId(), dto.getDate(), dto.getTime()
        );
        if (conflict) {
            throw new IllegalStateException("Ya existe una reserva para esa cancha en la fecha y hora seleccionadas.");
        }

        Reservation reservation = Reservation.builder()
                .clientName(dto.getClientName())
                .phone(dto.getPhone())
                .field(field)
                .date(dto.getDate())
                .time(dto.getTime())
                .duration(dto.getDuration())
                .observations(dto.getObservations())
                .status(Reservation.ReservationStatus.CONFIRMED)
                .build();

        return reservationRepository.save(reservation);
    }

    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reserva no encontrada con ID: " + id));

        if (reservation.getStatus() == Reservation.ReservationStatus.CANCELLED) {
            throw new IllegalStateException("La reserva ya está cancelada.");
        }

        reservation.setStatus(Reservation.ReservationStatus.CANCELLED);
        return reservationRepository.save(reservation);
    }
}