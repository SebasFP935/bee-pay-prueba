import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, CalendarPlus } from 'lucide-react'
import { getFields } from '../services/api'
import FieldCard from '../components/FieldCard'

const SPORTS = ['Todos', 'Fútbol', 'Fútbol 7', 'Básquetbol', 'Tenis', 'Vóley', 'Natación']

export default function FieldsPage() {
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('Todos')
  const [availableOnly, setAvailableOnly] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getFields()
      .then(res => setFields(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = fields.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase())
    const matchSport = sportFilter === 'Todos' || f.sport === sportFilter
    const matchAvail = !availableOnly || f.status === 'AVAILABLE'
    return matchSearch && matchSport && matchAvail
  })

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">Canchas disponibles</h1>
            <p className="page-subtitle">{fields.length} canchas registradas en el sistema</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/reservations/new')}>
            <CalendarPlus size={16} />
            Nueva reserva
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="form-control"
            placeholder="Buscar por nombre o ubicación..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Sport filter pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {SPORTS.map(s => (
            <button
              key={s}
              onClick={() => setSportFilter(s)}
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 500,
                border: '1px solid',
                borderColor: sportFilter === s ? 'var(--accent)' : 'var(--border)',
                background: sportFilter === s ? 'var(--accent-dim)' : 'transparent',
                color: sportFilter === s ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Available toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <div
            onClick={() => setAvailableOnly(!availableOnly)}
            style={{
              width: '36px', height: '20px',
              borderRadius: '100px',
              background: availableOnly ? 'var(--accent)' : 'var(--bg-elevated)',
              border: '1px solid',
              borderColor: availableOnly ? 'var(--accent)' : 'var(--border)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: availableOnly ? '17px' : '2px',
              width: '14px', height: '14px',
              borderRadius: '50%',
              background: availableOnly ? '#0a0a0a' : 'var(--text-muted)',
              transition: 'left 0.2s',
            }} />
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Solo disponibles</span>
        </label>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Filter size={48} />
          <h3>Sin resultados</h3>
          <p>Intenta con otros filtros de búsqueda.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map((field, i) => (
            <FieldCard key={field.id} field={field} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
