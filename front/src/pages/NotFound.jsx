import SEO from '../components/SEO.jsx'
export default function NotFound(){
  return (
    <div className="text-center py-5">
      <SEO title="404 — Page non trouvée" description="La page demandée n'existe pas." />
      <img src="https://http.cat/404" alt="" className="img-fluid mb-3" />
      <h1 className="h4">Page non trouvée</h1>
      <p>La page que vous avez demandée n’existe pas.</p>
    </div>
  )
}
