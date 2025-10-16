import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getCategories } from '../lib/api'

export default function Header() {
  const [cats, setCats] = useState([])
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => { getCategories().then(setCats).catch(console.error) }, [])

  const onSearch = (e) => {
    e.preventDefault()
    const def = cats[0]?.slug || 'batiment'
    const cur = cats.find(c => pathname.startsWith('/'+c.slug))?.slug
    navigate(`/${cur || def}?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="bg-light border-bottom">
      <nav className="navbar container navbar-expand-lg" role="navigation" aria-label="Navigation principale">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="/branding/Logo.png"
            alt=""
            width="36"
            height="36"
            style={{ objectFit: 'contain' }}
          />
          <span className="visually-hidden">Trouve ton artisan — Accueil</span>
          <span aria-hidden="true" className="fw-bold text-primary">Trouve ton artisan</span>
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Ouvrir le menu">☰</button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {cats.map(c => (
              <li key={c.id} className="nav-item">
                <Link className="nav-link text-capitalize" to={`/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
          <form className="d-flex" onSubmit={onSearch} role="search" aria-label="Recherche d’artisans">
            <input className="form-control me-2" placeholder="Rechercher un artisan…" value={q} onChange={e=>setQ(e.target.value)} />
            <button className="btn btn-primary">Rechercher</button>
          </form>
        </div>
      </nav>
    </header>
  )
}
