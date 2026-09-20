import FaqList from '../components/Faq/FaqList'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * FAQ page.
 *
 * Uses its own two-column question list (components/Faq/FaqList): the reference
 * gives this page a longer set of questions than the homepage FAQ section.
 */
export default function Faq() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="FAQ" breadcrumb={['Home', 'Pages', 'Faq']} />
        <FaqList />
      </main>

      <Footer />
    </>
  )
}
