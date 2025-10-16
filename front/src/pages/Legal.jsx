import { useParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'

export default function Legal(){
  const { slug } = useParams()
  const title = slug.replace(/-/g,' ')
  return (
    <section className="py-5 text-center">
      <SEO title={`${title} — Légal`} description="Page en construction" />
      <h1 className="h4 text-capitalize">{title}</h1>
      <p>Page en construction.</p>
    </section>
  )
}
