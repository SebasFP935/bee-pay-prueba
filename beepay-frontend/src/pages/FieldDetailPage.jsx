import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, DollarSign, CalendarPlus, Dumbbell } from 'lucide-react'
import { getFieldById } from '../services/api'

const SPORT_EMOJI = {
  'Fútbol': '⚽', 'Fútbol 7': '⚽', 'Básquetbol': '🏀',
  'Tenis': '🎾', 'Vóley': '🏐', 'Natación': '🏊',
}

export default function FieldDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [field, setField] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getFieldById(id)
      .then(res => setField(res.data))
      .catch(() => setError('No se encontró la cancha.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  if (error) return (
    <div className="page-container">
      <div className="empty-state">
        <h3>{error}</h3>
        <button className="btn btn-outline" onClick={() => navigate('/')} style={{ marginTop: '16px' }}>
          Volver al inicio
        </button>
      </div>
    </div>
  )

  const isAvailable = field.status === 'AVAILABLE'
  const emoji = SPORT_EMOJI[field.sport] || '🏟️'

  return (
    <div className="page-container fade-in-up" style={{ maxWidth: '860px' }}>
      {/* Back */}
      <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ marginBottom: '20px', paddingLeft: 0 }}>
        <ArrowLeft size={16} /> Volver a canchas
      </button>

      {/* Image hero */}
      <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: '320px', marginBottom: '32px', position: 'relative' }}>
        {field.imageUrl ? (
          <img src={field.imageUrl} alt={field.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ height: '100%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
            {emoji}
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
          <span className={`badge badge-${isAvailable ? 'available' : 'unavailable'}`} style={{ marginBottom: '8px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {isAvailable ? 'Disponible' : 'No disponible'}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}>
            {field.name}
          </h1>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: <Dumbbell size={16} />, label: 'Deporte', value: `${emoji} ${field.sport}` },
          { icon: <MapPin size={16} />, label: 'Ubicación', value: field.location },
          { icon: <DollarSign size={16} />, label: 'Precio por hora', value: `Bs. ${field.pricePerHour}` },
          { icon: <Clock size={16} />, label: 'Horario disponible', value: field.availableSchedule || 'Consultar' },
        ].map(item => (
          <div key={item.label} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '6px', fontSize: '13px' }}>
              {item.icon}
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{item.label}</span>
            </div>
            <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      {field.description && (
        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '10px' }}>Descripción</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{field.description}</p>
        </div>
      )}

      {/* CTA */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {isAvailable && (
          <button
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '14px' }}
            onClick={() => navigate(`/reservations/new?fieldId=${field.id}`)}
          >
            <CalendarPlus size={18} />
            Reservar esta cancha
          </button>
        )}
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Ver otras canchas
        </button>
      </div>
    </div>
  )
}
