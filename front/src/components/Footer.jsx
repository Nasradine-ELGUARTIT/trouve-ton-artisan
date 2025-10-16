import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-light mt-5 py-4 border-top">
      <div className="container small">
        <address className="mb-2">
          101 cours Charlemagne, CS 20033, 69269 LYON CEDEX 02, France — +33 (0)4 26 73 40 00
        </address>
        <nav className="d-flex flex-wrap gap-3" aria-label="Pages légales">
          <Link to="/legal/mentions-legales">Mentions légales</Link>
          <Link to="/legal/donnees-personnelles">Données personnelles</Link>
          <Link to="/legal/accessibilite">Accessibilité</Link>
          <Link to="/legal/cookies">Cookies</Link>
        </nav>
      </div>
    </footer>
  )
}
