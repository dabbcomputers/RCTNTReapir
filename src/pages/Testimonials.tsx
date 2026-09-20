import TestimonialGrid from '../components/Testimonials/TestimonialGrid'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * Testimonials page.
 *
 * Uses its own grid of six (components/Testimonials/TestimonialGrid) rather than
 * the homepage's single-quote section, because the reference designs them
 * differently.
 */
export default function Testimonials() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="Testimonials" breadcrumb={['Home', 'Pages', 'Testimonials']} />
        <TestimonialGrid />
      </main>

      <Footer />
    </>
  )
}
