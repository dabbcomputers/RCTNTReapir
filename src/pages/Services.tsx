import OurServices from '../components/Home/OurServices'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * Services page — the "SERVICES" title band on top of the same service grid
 * the homepage uses.
 */
export default function Services() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="Services" breadcrumb={['Home', 'Services']} />
        <OurServices />
      </main>

      <Footer showNewsletter={false} />
    </>
  )
}
