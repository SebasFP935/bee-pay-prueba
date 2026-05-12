import { NavLink, useNavigate } from 'react-router-dom'
import { Zap, List, CalendarPlus, Calendar } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav style={{
      background: 'rgba(10,10,10,0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="page-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div style={{
            width: 32, height: 32,
            background: 'var(--accent)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '-0.02em',
          }}>
            BeePay<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <NavLink to="/" end style={navStyle}>
            {({ isActive }) => (
              <span style={linkInner(isActive)}>
                <List size={16} /> Canchas
              </span>
            )}
          </NavLink>

          <NavLink to="/reservations" style={navStyle}>
            {({ isActive }) => (
              <span style={linkInner(isActive)}>
                <Calendar size={16} /> Reservas
              </span>
            )}
          </NavLink>

          <NavLink to="/reservations/new">
            <button className="btn btn-primary" style={{ marginLeft: '8px', fontSize: '13px', padding: '8px 16px' }}>
              <CalendarPlus size={15} />
              Nueva reserva
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

const navStyle = { textDecoration: 'none' }

const linkInner = (isActive) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
  background: isActive ? 'var(--accent-dim)' : 'transparent',
  transition: 'all 0.2s ease',
})
