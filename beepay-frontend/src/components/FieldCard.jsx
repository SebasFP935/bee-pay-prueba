import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react'

const SPORT_EMOJI = {
  'Fútbol': '⚽',
  'Fútbol 7': '⚽',
  'Básquetbol': '🏀',
  'Tenis': '🎾',
  'Vóley': '🏐',
  'Natación': '🏊',
}

export default function FieldCard({ field, index }) {
  const navigate = useNavigate()
  const emoji = SPORT_EMOJI[field.sport] || '🏟️'
  const isAvailable = field.status === 'AVAILABLE'

  return (
    <div
      className="card fade-in-up"
      onClick={() => navigate(`/fields/${field.id}`)}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        {field.imageUrl ? (
          <img
            src={field.imageUrl}
            alt={field.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            height: '100%',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            {emoji}
          </div>
        )}
        {/* Status overlay */}
        {!isAvailable && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              background: 'rgba(248,113,113,0.2)',
              border: '1px solid rgba(248,113,113,0.4)',
              color: '#f87171',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 600,
            }}>
              No disponible
            </span>
          </div>
        )}
        {/* Sport tag */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px',
          padding: '4px 10px',
          fontSize: '12px',
          color: 'var(--text-primary)',
          fontWeight: 500,
        }}>
          {emoji} {field.sport}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '-0.01em',
          }}>
            {field.name}
          </h3>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <MapPin size={13} />
            <span>{field.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '14px', fontWeight: 600 }}>
            <DollarSign size={13} />
            <span>Bs. {field.pricePerHour} / hora</span>
          </div>
        </div>

        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span className={`badge badge-${isAvailable ? 'available' : 'unavailable'}`}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {isAvailable ? 'Disponible' : 'No disponible'}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ver detalle →</span>
        </div>
      </div>
    </div>
  )
}
