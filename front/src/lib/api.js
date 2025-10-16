import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
})

export const getCategories   = async () => (await api.get('/api/categories')).data
export const getSpecialties  = async (categorySlug) => (await api.get('/api/specialties', { params: { categorySlug } })).data
export const searchArtisans  = async (params) => (await api.get('/api/artisans', { params })).data
export const getArtisan      = async (id) => (await api.get(`/api/artisans/${id}`)).data
export const getTopOfMonth   = async () => (await api.get('/api/featured/month')).data
export const sendContact     = async (payload) => (await api.post('/api/contact', payload)).data
