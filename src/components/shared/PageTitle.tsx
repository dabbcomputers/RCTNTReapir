type PageTitleProps = {
  title: string
  /** Breadcrumb segments, e.g. ['Home', 'Pages', 'About'] */
  breadcrumb: string[]
}

/**
 * Gold page-title band.
 *
 * Every inner page (About, Services, Testimonials, FAQ, 404) opens with this:
 * the page name in uppercase, with a breadcrumb underneath, on a gold band.
 * The homepage does not use it — its hero is the title.
 */
export default function PageTitle({ title, breadcrumb }: PageTitleProps) {
  return (
    <section className="bg-primary">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 py-12 text-center sm:px-8 lg:py-14">
        <h1 className="text-background-deep text-4xl font-extrabold tracking-[0.06em] uppercase lg:text-5xl">
          {title}
        </h1>

        <p className="text-background-deep/70 mt-4 text-sm tracking-[0.1em]">
          {breadcrumb.map((crumb, index) => (
            <span key={crumb}>
              {index > 0 && <span className="mx-2 opacity-60">/</span>}
              {crumb}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
