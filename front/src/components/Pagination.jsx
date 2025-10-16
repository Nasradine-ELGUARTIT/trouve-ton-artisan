import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Pagination({ page=1, limit=12, total=0 }) {
  const [sp, setSp] = useSearchParams()
  const pages = Math.max(1, Math.ceil(total / limit))

  const items = useMemo(() => {
    const arr = []
    const start = Math.max(1, page - 2)
    const end = Math.min(pages, page + 2)
    for (let i = start; i <= end; i++) arr.push(i)
    return arr
  }, [page, pages])

  if (pages <= 1) return null

  const goto = (p) => {
    sp.set('page', String(p))
    setSp(sp, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav aria-label="Pagination des résultats" className="d-flex justify-content-center my-4">
      <ul className="pagination">
        <li className={`page-item ${page<=1?'disabled':''}`}>
          <button className="page-link" onClick={()=>goto(page-1)} aria-label="Page précédente">«</button>
        </li>
        {items[0] > 1 && (
          <>
            <li className="page-item"><button className="page-link" onClick={()=>goto(1)}>1</button></li>
            {items[0] > 2 && <li className="page-item disabled"><span className="page-link">…</span></li>}
          </>
        )}
        {items.map(i => (
          <li key={i} className={`page-item ${i===page?'active':''}`}>
            <button className="page-link" onClick={()=>goto(i)} aria-current={i===page?'page':undefined}>{i}</button>
          </li>
        ))}
        {items.at(-1) < pages && (
          <>
            {items.at(-1) < pages-1 && <li className="page-item disabled"><span className="page-link">…</span></li>}
            <li className="page-item"><button className="page-link" onClick={()=>goto(pages)}>{pages}</button></li>
          </>
        )}
        <li className={`page-item ${page>=pages?'disabled':''}`}>
          <button className="page-link" onClick={()=>goto(page+1)} aria-label="Page suivante">»</button>
        </li>
      </ul>
    </nav>
  )
}
