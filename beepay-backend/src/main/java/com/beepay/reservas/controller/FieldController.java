package com.beepay.reservas.controller;

import com.beepay.reservas.model.Field;
import com.beepay.reservas.service.FieldService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fields")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FieldController {

    private final FieldService fieldService;

    @GetMapping
    public ResponseEntity<List<Field>> getAllFields(
            @RequestParam(required = false) String sport,
            @RequestParam(required = false) Boolean available
    ) {
        if (sport != null && !sport.isEmpty()) {
            return ResponseEntity.ok(fieldService.getFieldsBySport(sport));
        }
        if (Boolean.TRUE.equals(available)) {
            return ResponseEntity.ok(fieldService.getAvailableFields());
        }
        return ResponseEntity.ok(fieldService.getAllFields());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Field> getFieldById(@PathVariable Long id) {
        return ResponseEntity.ok(fieldService.getFieldById(id));
    }
}