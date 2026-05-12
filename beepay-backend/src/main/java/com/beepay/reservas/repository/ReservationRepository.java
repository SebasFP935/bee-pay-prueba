package com.beepay.reservas.repository;

import com.beepay.reservas.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByFieldId(Long fieldId);
    List<Reservation> findByDate(LocalDate date);
    boolean existsByFieldIdAndDateAndTime(Long fieldId, LocalDate date, java.time.LocalTime time);
}