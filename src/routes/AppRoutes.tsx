import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Faq from '../pages/Faq'
import Gallery from '../pages/Gallery'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Services from '../pages/Services'
import Testimonials from '../pages/Testimonials'

/**
 * Every route in the site.
 *
 * There is no explicit /404 route — the 404 page is a fallback for paths that
 * do not exist, not a destination in its own right. Anything unmatched,
 * including /gallery while it has no design, lands there.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
