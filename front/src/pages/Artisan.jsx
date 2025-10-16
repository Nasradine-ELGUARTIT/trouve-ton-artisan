import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArtisan, sendContact } from '../lib/api'
import SEO from '../components/SEO.jsx'

const Stars = ({ value }) => {
  const rounded = Math.round(Number(value) || 0)
  return <span aria-label={`Note ${rounded}/5`} className="text-warning">{"★★★★★☆☆☆☆☆".slice(5 - rounded, 10)}</span>
}

const Avatar = ({ name, src }) => {
  if (src) return <img src={src} alt="" className="rounded" style={{maxWidth: 160}} />
  const initials = name?.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className="bg-secondary text-white rounded d-inline-flex align-items-center justify-content-center"
         style={{width:160, height:160, fontSize:48}}>
      {initials || '?'}
    </div>
  )
}

export default function Artisan() {
  const { id } = useParams()
  const [a, setA] = useState(null)
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({ name:'', email:'', subject:'', message:'', artisanId:Number(id), hpt:'' })

  useEffect(() => { getArtisan(id).then(setA).catch(console.error) }, [id])

  const submit = async (e) => {
    e.preventDefault()
    await sendContact(f)
    setSent(true)
  }

  if (!a) return <p>Chargement…</p>

  return (
    <>
      <SEO title={`${a.name} — Artisan`} description={`${a.specialty?.name} à ${a.city}`} />
      <div className="row g-4">
        <div className="col-12 col-md-auto">
          <Avatar name={a.name} src={a.image || a.logo} />
        </div>
        <div className="col">
          <h1 className="h4">{a.name}</h1>
          <div className="mb-1"><Stars value={a.rating} /></div>
          <div className="text-muted mb-2">{a.specialty?.name} — {a.city}</div>
          <section className="mb-3">
            <h2 className="h6">À propos</h2>
            <p className="mb-0">{a.about || 'Information à venir.'}</p>
          </section>
          {a.website && <p><a href={a.website} target="_blank" rel="noreferrer">Site web</a></p>}
        </div>
      </div>

      <hr className="my-4" />

      <h2 className="h5 mt-3">Contacter</h2>
      {sent ? (
        <div className="alert alert-success" role="status" aria-live="polite">Message envoyé ✔</div>
      ) : (
        <form className="row g-2" onSubmit={submit}>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="cname">Nom</label>
            <input id="cname" className="form-control" required
              value={f.name} onChange={e=>setF({...f, name:e.target.value})}/>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="cemail">Email</label>
            <input id="cemail" type="email" className="form-control" required
              value={f.email} onChange={e=>setF({...f, email:e.target.value})}/>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="csubject">Objet</label>
            <input id="csubject" className="form-control" required
              value={f.subject} onChange={e=>setF({...f, subject:e.target.value})}/>
          </div>
            <div className="col-12">
            <label className="form-label" htmlFor="cmessage">Message</label>
            <textarea id="cmessage" className="form-control" rows="5" required
              value={f.message} onChange={e=>setF({...f, message:e.target.value})}/>
          </div>
          {/* honeypot anti-bot */}
          <input className="d-none" tabIndex="-1" autoComplete="off"
                 value={f.hpt} onChange={e=>setF({...f, hpt:e.target.value})}/>
          <div className="col-12">
            <button className="btn btn-primary">Envoyer</button>
          </div>
        </form>
      )}
    </>
  )
}
