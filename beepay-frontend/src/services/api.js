import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Fields
export const getFields = (params) => api.get('/fields', { params })
export const getFieldById = (id) => api.get(`/fields/${id}`)

// Reservations
export const getReservations = () => api.get('/reservations')
export const createReservation = (data) => api.post('/reservations', data)
export const cancelReservation = (id) => api.patch(`/reservations/${id}/cancel`)

export default api
