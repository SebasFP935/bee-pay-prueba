package com.beepay.reservas.service;

import com.beepay.reservas.model.Field;
import com.beepay.reservas.repository.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class FieldService {

    private final FieldRepository fieldRepository;

    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public Field getFieldById(Long id) {
        return fieldRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Cancha no encontrada con ID: " + id));
    }

    public List<Field> getFieldsBySport(String sport) {
        return fieldRepository.findBySport(sport);
    }

    public List<Field> getAvailableFields() {
        return fieldRepository.findByStatus(Field.FieldStatus.AVAILABLE);
    }
}