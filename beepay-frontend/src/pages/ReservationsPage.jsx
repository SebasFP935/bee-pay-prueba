import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarPlus, Calendar, Clock, User, Phone, MapPin, X, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { getReservations, cancelReservation } from '../services/api'

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(null)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    getReservations()
      .then(res => setReservations(res.data))
      .catch(() => toast.error('Error al cargar reservas'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleCancel = async (id) => {
    if (!confirm('¿Cancelar esta reserva?')) return
    setCancelling(id)
    try {
      await cancelReservation(id)
      toast.success('Reserva cancelada')
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al cancelar')
    } finally {
      setCancelling(null)
    }
  }

  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  const confirmed = reservations.filter(r => r.status === 'CONFIRMED')
  const cancelled = reservations.filter(r => r.status === 'CANCELLED')

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">Reservas</h1>
          <p className="page-subtitle">{confirmed.length} confirmadas · {cancelled.length} canceladas</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" onClick={load}>
            <RefreshCw size={15} />
            Actualizar
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/reservations/new')}>
            <CalendarPlus size={16} />
            Nueva reserva
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : reservations.length === 0 ? (
        <div className="empty-state">
          <Calendar size={48} />
          <h3>Sin reservas aún</h3>
          <p>Crea tu primera reserva para verla aquí.</p>
          <button className="btn btn-primary" onClick={() => navigate('/reservations/new')} style={{ marginTop: '16px' }}>
            <CalendarPlus size={15} /> Nueva reserva
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reservations.map((r, i) => {
            const isConfirmed = r.status === 'CONFIRMED'
            return (
              <div
                key={r.id}
                className="card fade-in-up"
                style={{
                  padding: '20px',
                  animationDelay: `${i * 0.04}s`,
                  opacity: isConfirmed ? 1 : 0.6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  {/* Left info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '16px',
                      }}>
                        {r.field?.name}
                      </span>
                      <span className={`badge badge-${isConfirmed ? 'confirmed' : 'cancelled'}`}>
                        {isConfirmed ? 'Confirmada' : 'Cancelada'}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>#{r.id}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <User size={13} /> {r.clientName}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <Phone size={13} /> {r.phone}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <MapPin size={13} /> {r.field?.location}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <Calendar size={13} /> {formatDate(r.date)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <Clock size={13} /> {r.time?.slice(0, 5)} · {r.duration}h
                      </span>
                      <span style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>
                        Bs. {(r.field?.pricePerHour || 0) * r.duration}
                      </span>
                    </div>

                    {r.observations && (
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                        "{r.observations}"
                      </p>
                    )}
                  </div>

                  {/* Cancel button */}
                  {isConfirmed && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(r.id)}
                      disabled={cancelling === r.id}
                      style={{ alignSelf: 'flex-start', fontSize: '13px', padding: '8px 14px' }}
                    >
                      <X size={14} />
                      {cancelling === r.id ? 'Cancelando...' : 'Cancelar'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
