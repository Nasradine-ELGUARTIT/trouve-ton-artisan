import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopOfMonth } from '../lib/api'
import SEO from '../components/SEO.jsx'

const Stars = ({ value }) => {
  const rounded = Math.round(Number(value) || 0)
  return <span aria-label={`Note ${rounded}/5`} className="text-warning">{"★★★★★☆☆☆☆☆".slice(5 - rounded, 10)}</span>
}

export default function Home() {
  const [items, setItems] = useState([])

  useEffect(() => { getTopOfMonth().then(setItems).catch(console.error) }, [])

  return (
    <>
      <SEO
        title="Accueil — Trouve ton artisan"
        description="Choisissez une catégorie, trouvez un artisan, contactez-le : réponse sous 48h."
      />

      {/* Comment trouver mon artisan ? */}
      <section className="my-4">
        <h1 className="h4 mb-3">Comment trouver mon artisan ?</h1>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item">Choisir la catégorie d’artisanat dans le menu.</li>
          <li className="list-group-item">Choisir un artisan.</li>
          <li className="list-group-item">Le contacter via le formulaire de contact.</li>
          <li className="list-group-item">Une réponse sera apportée sous 48h.</li>
        </ol>
      </section>

      {/* Les 3 artisans du mois */}
      <section className="my-5">
        <h2 className="h4 mb-3">Artisans du mois</h2>
        <div className="row g-3">
          {items.slice(0, 3).map((a) => (
            <div key={a.id} className="col-12 col-md-4">
              <article className="card h-100 shadow-sm p-3">
                <h3 className="h5 mb-1">
                  <Link className="text-reset" to={`/artisans/${a.id}`}>{a.name}</Link>
                </h3>
                <div className="mb-1"><Stars value={a.rating} /></div>
                <div className="text-muted small mb-2">
                  {a.specialty?.name} — {a.city}
                </div>
                <Link className="btn btn-outline-primary btn-sm align-self-start" to={`/artisans/${a.id}`}>
                  Voir la fiche
                </Link>
              </article>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-muted">Aucun artisan ce mois-ci pour le moment.</p>
          )}
        </div>
      </section>
    </>
  )
}
