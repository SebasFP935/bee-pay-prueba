# BeePay — Gestión de Reservas Deportivas

Aplicación web full stack para la gestión de reservas de canchas deportivas.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite |
| Backend | Spring Boot 4.0.6 + Java 21 |
| Base de datos | PostgreSQL 17 |
| ORM | Hibernate / JPA | 
| Estilos | CSS puro con variables |

---

## Requisitos previos

- Java 21
- Node.js 18+
- PostgreSQL 17

---

## Configuración de base de datos

```sql
-- Ejecutar en pgAdmin
CREATE DATABASE beepay_reservas;
```

Si tu usuario/contraseña de PostgreSQL no son `postgres/postgres`, edita:
`beepay-backend/src/main/resources/application.properties`

```properties
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
```

Si desea puede insertar en postgresql este linea de código completa, si es que aparece un error, si aparecen las canchas sin necesidad de correr este comando sql entonces no lo corra.
```sql
INSERT INTO fields (name, sport, location, price_per_hour, status, description, available_schedule, image_url)
VALUES
  ('Cancha El Cóndor', 'Fútbol', 'Zona Sur, La Paz', 80.00, 'AVAILABLE',
   'Cancha de césped sintético de última generación con iluminación LED. Ideal para partidos nocturnos y entrenamientos.',
   'Lunes a Viernes: 7:00 - 22:00 | Sábados y Domingos: 8:00 - 23:00',
   'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800'),
 
  ('Pista Thunder', 'Básquetbol', 'Miraflores, La Paz', 60.00, 'AVAILABLE',
   'Pista de madera de alta calidad con tableros profesionales y marcadores electrónicos.',
   'Lunes a Domingo: 6:00 - 22:00',
   'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'),
 
  ('Court Pacífico', 'Tenis', 'Calacoto, La Paz', 100.00, 'AVAILABLE',
   'Cancha de tenis en superficie dura con iluminación profesional para partidos nocturnos.',
   'Martes a Domingo: 7:00 - 21:00',
   'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800'),
 
  ('Arena Altiplano', 'Vóley', 'San Miguel, La Paz', 50.00, 'UNAVAILABLE',
   'Cancha de vóley con red reglamentaria y piso de madera flotante. Capacidad para 50 espectadores.',
   'Lunes a Sábado: 8:00 - 20:00',
   'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800'),
 
  ('Centro Acuático Illimani', 'Natación', 'Obrajes, La Paz', 120.00, 'AVAILABLE',
   'Piscina olímpica semiolímpica temperada, con carriles reglamentarios y cronómetros automáticos.',
   'Lunes a Viernes: 6:00 - 20:00 | Sábados: 7:00 - 18:00',
   'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800')
 
ON CONFLICT DO NOTHING;
```
---

## Correr el backend

```bash
cd beepay-backend
./mvnw spring-boot:run
```

O correr desde Intellij BeepayApplication.java

> El servidor inicia en http://localhost:8082
> La base de datos se crea automáticamente y se pobla con 6 canchas de ejemplo.

---

## Correr el frontend

```bash
cd beepay-frontend
npm install
npm run dev
```

> La app inicia en http://localhost:5173

---

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/fields` | Listar todas las canchas |
| GET | `/api/fields?sport=Fútbol` | Filtrar por deporte |
| GET | `/api/fields?available=true` | Solo canchas disponibles |
| GET | `/api/fields/:id` | Detalle de una cancha |
| GET | `/api/reservations` | Listar todas las reservas |
| POST | `/api/reservations` | Crear una reserva |
| PATCH | `/api/reservations/:id/cancel` | Cancelar una reserva |

### Ejemplo POST /api/reservations

```json
{
  "clientName": "Juan Pérez",
  "phone": "75123456",
  "fieldId": 1,
  "date": "2025-06-20",
  "time": "10:00:00",
  "duration": 2,
  "observations": "Traer petos"
}
```

---

## Funcionalidades implementadas

- ✅ Listado de canchas con búsqueda y filtros (deporte, disponibilidad)
- ✅ Detalle de cancha con imagen, descripción y horarios
- ✅ Formulario de reserva con validaciones en frontend y backend
- ✅ Listado de reservas con estado visual
- ✅ Cancelación de reservas
- ✅ Cálculo de costo total según duración
- ✅ Diseño responsive y dark theme
- ✅ Manejo de errores centralizado con mensajes claros
- ✅ Datos semilla automáticos al iniciar

---


