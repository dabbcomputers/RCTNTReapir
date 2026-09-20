import ContactSection from '../components/Contact/ContactSection'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * Contact page — title band, then the map and contact form side by side.
 */
export default function Contact() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="Contact" breadcrumb={['Home', 'Contact']} />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
