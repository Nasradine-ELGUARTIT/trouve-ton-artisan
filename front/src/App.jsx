import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Artisan from './pages/Artisan.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import SEO from './components/SEO.jsx'

export default function App() {
  return (
    <>
      <a href="#main" className="visually-hidden-focusable skip-link">Aller au contenu</a>
      <Header />
      <main id="main" className="container py-3">
        <SEO title="Trouve ton artisan — AURA" description="Plateforme pour trouver un artisan en Auvergne-Rhône-Alpes et le contacter." />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categorySlug" element={<List />} />
          <Route path="/artisans/:id" element={<Artisan />} />
          <Route path="/legal/:slug" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
