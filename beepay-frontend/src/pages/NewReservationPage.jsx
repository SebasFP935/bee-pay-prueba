import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, User, Phone, Calendar, Clock, Timer, FileText, Layers } from 'lucide-react'
import toast from 'react-hot-toast'
import { getFields, createReservation } from '../services/api'

const HOURS = Array.from({ length: 15 }, (_, i) => {
  const h = i + 7
  return `${String(h).padStart(2, '0')}:00`
})

const today = new Date().toISOString().split('T')[0]

export default function NewReservationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedFieldId = searchParams.get('fieldId')

  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    clientName: '',
    phone: '',
    fieldId: preselectedFieldId || '',
    date: '',
    time: '',
    duration: '1',
    observations: '',
  })

  useEffect(() => {
    getFields({ available: true }).then(res => setFields(res.data)).catch(console.error)
  }, [])

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.clientName.trim() || form.clientName.trim().length < 2)
      e.clientName = 'El nombre debe tener al menos 2 caracteres'
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone))
      e.phone = 'Ingresa un teléfono válido (7-15 dígitos)'
    if (!form.fieldId) e.fieldId = 'Selecciona una cancha'
    if (!form.date) e.date = 'Selecciona una fecha'
    else if (form.date < today) e.date = 'La fecha no puede ser en el pasado'
    if (!form.time) e.time = 'Selecciona una hora'
    if (!form.duration || form.duration < 1 || form.duration > 8)
      e.duration = 'La duración debe ser entre 1 y 8 horas'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      toast.error('Revisa los campos del formulario')
      return
    }

    setLoading(true)
    try {
      await createReservation({
        clientName: form.clientName.trim(),
        phone: form.phone.trim(),
        fieldId: Number(form.fieldId),
        date: form.date,
        time: form.time + ':00',
        duration: Number(form.duration),
        observations: form.observations.trim() || null,
      })
      toast.success('¡Reserva creada exitosamente!')
      navigate('/reservations')
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear la reserva'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container fade-in-up" style={{ maxWidth: '620px' }}>
      <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: '20px', paddingLeft: 0 }}>
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="page-header">
        <h1 className="page-title">Nueva reserva</h1>
        <p className="page-subtitle">Completa el formulario para reservar una cancha.</p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Nombre */}
          <div className="form-group">
            <label className="form-label"><User size={12} style={{ display: 'inline', marginRight: 4 }} />Nombre del cliente *</label>
            <input
              className={`form-control ${errors.clientName ? 'error' : ''}`}
              placeholder="Ej: Juan Pérez"
              value={form.clientName}
              onChange={e => set('clientName', e.target.value)}
            />
            {errors.clientName && <span className="form-error">{errors.clientName}</span>}
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label className="form-label"><Phone size={12} style={{ display: 'inline', marginRight: 4 }} />Teléfono *</label>
            <input
              className={`form-control ${errors.phone ? 'error' : ''}`}
              placeholder="Ej: 75123456"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Cancha */}
          <div className="form-group">
            <label className="form-label"><Layers size={12} style={{ display: 'inline', marginRight: 4 }} />Cancha *</label>
            <select
              className={`form-control ${errors.fieldId ? 'error' : ''}`}
              value={form.fieldId}
              onChange={e => set('fieldId', e.target.value)}
            >
              <option value="">— Selecciona una cancha —</option>
              {fields.map(f => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.sport} (Bs. {f.pricePerHour}/hr)
                </option>
              ))}
            </select>
            {errors.fieldId && <span className="form-error">{errors.fieldId}</span>}
          </div>

          {/* Fecha y hora */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label"><Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />Fecha *</label>
              <input
                type="date"
                className={`form-control ${errors.date ? 'error' : ''}`}
                min={today}
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label className="form-label"><Clock size={12} style={{ display: 'inline', marginRight: 4 }} />Hora *</label>
              <select
                className={`form-control ${errors.time ? 'error' : ''}`}
                value={form.time}
                onChange={e => set('time', e.target.value)}
              >
                <option value="">— Hora —</option>
                {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              {errors.time && <span className="form-error">{errors.time}</span>}
            </div>
          </div>

          {/* Duración */}
          <div className="form-group">
            <label className="form-label">
              <Timer size={12} style={{ display: 'inline', marginRight: 4 }} />
              Duración: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{form.duration} hora{form.duration > 1 ? 's' : ''}</span>
            </label>
            <input
              type="range"
              min="1" max="8"
              value={form.duration}
              onChange={e => set('duration', e.target.value)}
              style={{ accentColor: 'var(--accent)', width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>1 hora</span><span>8 horas</span>
            </div>
            {form.fieldId && (
              <div style={{ marginTop: '6px', padding: '8px 12px', background: 'var(--accent-dim)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
                Total estimado: Bs. {(fields.find(f => String(f.id) === String(form.fieldId))?.pricePerHour || 0) * Number(form.duration)}
              </div>
            )}
          </div>

          {/* Observaciones */}
          <div className="form-group">
            <label className="form-label"><FileText size={12} style={{ display: 'inline', marginRight: 4 }} />Observaciones <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span></label>
            <textarea
              className="form-control"
              placeholder="Ej: necesitamos petos, venimos 10 personas..."
              value={form.observations}
              onChange={e => set('observations', e.target.value)}
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creando reserva...' : 'Confirmar reserva'}
          </button>
        </div>
      </div>
    </div>
  )
}
