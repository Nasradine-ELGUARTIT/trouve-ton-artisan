import { Link } from 'react-router-dom'

export default function ArtisanCard({ a }) {
  const stars = '★★★★★☆☆☆☆☆'.slice(5 - Math.round(a.rating), 10)
  return (
    <Link to={`/artisans/${a.id}`} className="card h-100 shadow-sm p-3 text-reset">
      <h3 className="h5 mb-1">{a.name}</h3>
      <div aria-label={`Note ${a.rating}/5`} className="text-warning">{stars}</div>
      <div className="text-muted small">{a.specialty?.name} — {a.city}</div>
    </Link>
  )
}
