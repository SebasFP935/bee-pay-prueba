import { NavLink, useNavigate } from 'react-router-dom'
import { List, CalendarPlus, Calendar } from 'lucide-react'

function BeePayLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="58" rx="22" ry="28" fill="#F5A800" />
      {/* Stripes */}
      <rect x="28" y="52" width="44" height="8" rx="2" fill="#2a2a2a" />
      <rect x="30" y="64" width="40" height="8" rx="2" fill="#2a2a2a" />
      {/* Head */}
      <ellipse cx="50" cy="30" rx="16" ry="14" fill="#2a2a2a" />
      {/* Antennae */}
      <line x1="43" y1="18" x2="36" y2="8" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="35" cy="7" r="3" fill="#F5A800" />
      <line x1="57" y1="18" x2="64" y2="8" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="65" cy="7" r="3" fill="#F5A800" />
      {/* Eyes */}
      <circle cx="43" cy="30" r="4" fill="white" />
      <circle cx="57" cy="30" r="4" fill="white" />
      <circle cx="44" cy="31" r="2" fill="#111" />
      <circle cx="58" cy="31" r="2" fill="#111" />
      {/* Wings */}
      <ellipse cx="22" cy="42" rx="16" ry="9" fill="rgba(200,241,53,0.85)" transform="rotate(-20 22 42)" />
      <ellipse cx="78" cy="42" rx="16" ry="9" fill="rgba(200,241,53,0.85)" transform="rotate(20 78 42)" />
      {/* Stinger */}
      <polygon points="50,84 45,94 55,94" fill="#2a2a2a" />
    </svg>
  )
}

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
          <BeePayLogo size={38} />
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