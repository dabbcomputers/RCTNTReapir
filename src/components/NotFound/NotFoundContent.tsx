import { Link } from 'react-router-dom'

// ─── ASSET SLOT ──────────────────────────────────────────────────────────────
// The reference band has a dark photograph behind the "404".
// Put the file at: src/assets/images/not-found.jpg
// then uncomment the import and set notFoundImage to it.
//
//   import notFoundImage from '../../../assets/images/not-found.jpg'
const notFoundImage = ''

/** Dark band: oversized accent "404", message, and a way back home. */
export default function NotFoundContent() {
  return (
    <section className="bg-surface relative isolate overflow-hidden">
      {notFoundImage ? (
        <img
          src={notFoundImage}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="bg-background-deep/40 absolute inset-0 -z-10 bg-[linear-gradient(120deg,#2b2b2b_0%,#1d1d1d_55%,#111111_100%)]"
        />
      )}

      <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-col items-center px-5 py-28 text-center sm:px-8 lg:py-40">
        <p className="text-primary text-[7rem] leading-none font-extrabold tracking-[0.04em] sm:text-[10rem] lg:text-[13rem]">
          404
        </p>

        <p className="text-foreground mt-6 text-sm font-bold tracking-[0.3em] uppercase sm:text-base">
          Sorry page not found!
        </p>

        <Link
          to="/"
          className="bg-primary text-background hover:bg-primary-strong focus-visible:outline-primary mt-10 inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
