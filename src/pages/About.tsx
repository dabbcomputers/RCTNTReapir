import Faq from '../components/Home/Faq'
import Testimonials from '../components/Home/Testimonials'
import WhatWeOffer from '../components/Home/WhatWeOffer'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * About page — the "ABOUT" title band followed by three sections reused from
 * the Home page, which is exactly what the reference does.
 */
export default function About() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="About" breadcrumb={['Home', 'About']} />
        <WhatWeOffer />
        <Testimonials />
        <Faq />
      </main>

      <Footer showNewsletter={false} />
    </>
  )
}
