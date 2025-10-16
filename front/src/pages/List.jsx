import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { searchArtisans } from '../lib/api'
import ArtisanCard from '../components/ArtisanCard.jsx'
import SEO from '../components/SEO.jsx'
import Pagination from '../components/Pagination.jsx'

export default function List() {
  const { categorySlug } = useParams()
  const [sp, setSp] = useSearchParams()
  const [result, setResult] = useState({ items: [], total: 0, limit: 12, page: 1 })
  const [loading, setLoading] = useState(false)
  const q = sp.get('q') || ''
  const page = Number(sp.get('page') || 1)
  const limit = Number(sp.get('limit') || 12)
  const sort = sp.get('sort') || 'rating' // 'rating' | 'name'

  const title = useMemo(() =>
    `Artisans — ${categorySlug}${q ? ` (${q})` : ''}`, [categorySlug, q])

  useEffect(() => {
    setLoading(true)
    searchArtisans({ q, categorySlug, page, limit, sort })
      .then(data => setResult({ ...data, page, limit }))
      .finally(() => setLoading(false))
  }, [categorySlug, q, page, limit, sort])

  const update = (key, value) => {
    if (value) sp.set(key, value); else sp.delete(key)
    // reset page si filtre change
    if (key !== 'page') sp.set('page', '1')
    setSp(sp, { replace: true })
  }

  return (
    <>
      <SEO title={title} description={`Résultats pour la catégorie ${categorySlug}${q ? ` et la recherche "${q}"` : ''}.`} />
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h1 className="h4 text-capitalize my-2">{categorySlug}</h1>
        <div className="d-flex gap-2">
          <select className="form-select" value={sort} onChange={e=>update('sort', e.target.value)} aria-label="Trier par">
            <option value="rating">Trier: note</option>
            <option value="name">Trier: nom</option>
          </select>
          <select className="form-select" value={String(limit)} onChange={e=>update('limit', e.target.value)} aria-label="Résultats par page">
            <option value="6">6 / page</option>
            <option value="12">12 / page</option>
            <option value="24">24 / page</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-muted my-3">Chargement des résultats…</p>}

      {!loading && result.total === 0 && (
        <p className="my-4">
          Aucun artisan trouvé{q ? <> pour « <strong>{q}</strong> »</> : ''}.
          Essayez un autre terme ou une autre catégorie.
        </p>
      )}

      <p className="text-muted">Résultats : {result.total}</p>

      <div className="row g-3">
        {result.items.map(a => (
          <div key={a.id} className="col-12 col-sm-6 col-lg-4">
            <ArtisanCard a={a} />
          </div>
        ))}
      </div>

      <Pagination page={result.page} limit={result.limit} total={result.total} />
    </>
  )
}
