import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FieldsPage from './pages/FieldsPage'
import FieldDetailPage from './pages/FieldDetailPage'
import ReservationsPage from './pages/ReservationsPage'
import NewReservationPage from './pages/NewReservationPage'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '24px', paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<FieldsPage />} />
          <Route path="/fields/:id" element={<FieldDetailPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/reservations/new" element={<NewReservationPage />} />
        </Routes>
      </main>
    </div>
  )
}
