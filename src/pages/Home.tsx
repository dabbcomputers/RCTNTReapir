import Contact from '../components/Home/Contact'
import Faq from '../components/Home/Faq'
import Hero from '../components/Home/Hero'
import MapSection from '../components/Home/MapSection'
import OurServices from '../components/Home/OurServices'
import Stats from '../components/Home/Stats'
import Testimonials from '../components/Home/Testimonials'
import WhatWeOffer from '../components/Home/WhatWeOffer'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import ContactSection from '../components/Contact/ContactSection'
/**
 * Home page — just the section order.
 *
 * To add, remove or reorder a section, edit the list below and nothing else.
 * <Header overlay /> sits the nav on top of the hero, as in the reference.
 */
export default function Home() {
  return (
    <>
      <Header overlay />

      <main>
        <Hero />
        <OurServices />
        <Stats />
        <WhatWeOffer />
        <Testimonials />
        <Faq />
        <ContactSection />
        <MapSection />
      </main>

      <Footer />
    </>
  )
}
