package com.beepay.reservas.config;

import com.beepay.reservas.model.Field;
import com.beepay.reservas.repository.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final FieldRepository fieldRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (fieldRepository.count() > 0) return; // ya hay datos, no insertar

        fieldRepository.saveAll(List.of(
                Field.builder()
                        .name("Cancha El Cóndor")
                        .sport("Fútbol")
                        .location("Zona Sur, La Paz")
                        .pricePerHour(80.00)
                        .status(Field.FieldStatus.AVAILABLE)
                        .description("Cancha de césped sintético de última generación con iluminación LED. Ideal para partidos nocturnos y entrenamientos.")
                        .availableSchedule("Lunes a Viernes: 7:00 - 22:00 | Sábados y Domingos: 8:00 - 23:00")
                        .imageUrl("https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800")
                        .build(),

                Field.builder()
                        .name("Pista Thunder")
                        .sport("Básquetbol")
                        .location("Miraflores, La Paz")
                        .pricePerHour(60.00)
                        .status(Field.FieldStatus.AVAILABLE)
                        .description("Pista de madera de alta calidad con tableros profesionales y marcadores electrónicos.")
                        .availableSchedule("Lunes a Domingo: 6:00 - 22:00")
                        .imageUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800")
                        .build(),

                Field.builder()
                        .name("Court Pacífico")
                        .sport("Tenis")
                        .location("Calacoto, La Paz")
                        .pricePerHour(100.00)
                        .status(Field.FieldStatus.AVAILABLE)
                        .description("Cancha de tenis en superficie dura con iluminación profesional para partidos nocturnos.")
                        .availableSchedule("Martes a Domingo: 7:00 - 21:00")
                        .imageUrl("https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800")
                        .build(),

                Field.builder()
                        .name("Arena Altiplano")
                        .sport("Vóley")
                        .location("San Miguel, La Paz")
                        .pricePerHour(50.00)
                        .status(Field.FieldStatus.UNAVAILABLE)
                        .description("Cancha de vóley con red reglamentaria y piso de madera flotante. Capacidad para 50 espectadores.")
                        .availableSchedule("Lunes a Sábado: 8:00 - 20:00")
                        .imageUrl("https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800")
                        .build(),

                Field.builder()
                        .name("Centro Acuático Illimani")
                        .sport("Natación")
                        .location("Obrajes, La Paz")
                        .pricePerHour(120.00)
                        .status(Field.FieldStatus.AVAILABLE)
                        .description("Piscina olímpica semiolímpica temperada, con carriles reglamentarios y cronómetros automáticos.")
                        .availableSchedule("Lunes a Viernes: 6:00 - 20:00 | Sábados: 7:00 - 18:00")
                        .imageUrl("https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800")
                        .build()
        ));

        System.out.println("✅ Canchas de ejemplo cargadas correctamente.");
    }
}