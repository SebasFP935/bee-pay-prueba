package com.beepay.reservas.repository;

import com.beepay.reservas.model.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
    List<Field> findBySport(String sport);
    List<Field> findByStatus(Field.FieldStatus status);
}