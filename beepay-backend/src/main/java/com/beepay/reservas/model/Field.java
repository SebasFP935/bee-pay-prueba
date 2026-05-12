package com.beepay.reservas.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fields")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String sport;

    @Column(nullable = false)
    private String location;

    @Column(name = "price_per_hour", nullable = false)
    private Double pricePerHour;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FieldStatus status;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "available_schedule")
    private String availableSchedule;

    @Column(name = "image_url")
    private String imageUrl;

    public enum FieldStatus {
        AVAILABLE, UNAVAILABLE
    }
}