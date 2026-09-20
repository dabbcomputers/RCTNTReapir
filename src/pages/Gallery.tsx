import GalleryGrid from '../components/Gallery/GalleryGrid'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import PageTitle from '../components/shared/PageTitle'

/**
 * Gallery page — the Instagram-style video grid.
 */
export default function Gallery() {
  return (
    <>
      <Header />

      <main>
        <PageTitle title="Gallery" breadcrumb={['Home', 'Gallery']} />
        <GalleryGrid />
      </main>

      <Footer />
    </>
  )
}
