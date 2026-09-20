import NotFoundContent from '../components/NotFound/NotFoundContent'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * 404 page. Also reached from the router's catch-all, so any route that has no
 * page yet lands here.
 */
export default function NotFound() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="404" breadcrumb={['Home', 'Pages', '404']} />
        <NotFoundContent />
      </main>

      <Footer />
    </>
  )
}
