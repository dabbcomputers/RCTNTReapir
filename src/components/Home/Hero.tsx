// ─── Content ─────────────────────────────────────────────────────────────────

const hero = {
  eyebrow: 'Truck & trailer mechanics',
  title: 'DPF, SCR & engine specialists',
  subtitle:
    '10+ years of expert service on DPF and SCR systems, engines, brakes and complete truck & trailer repairs.',
  scrollLabel: 'Scroll',
  leftHighlight: '10+ years of expert service',
  rightHighlight: 'DPF · SCR · Engines',
}

// Contact details as published on the business's Instagram bio
// (@rc_truckrepairs): phone 647-914-9423, located in the GTA.
const brand = {
  phone: '647-914-9423',
  phoneHref: 'tel:+16479149423',
}

// ─── Icon used only here ─────────────────────────────────────────────────────

function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 5.2 2 2 0 0 1 7 3z" />
    </svg>
  )
}

// Small downward chevron for the scroll cue under the hero headline.
function ChevronDownIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  )
}

// ─── ASSET SLOT ──────────────────────────────────────────────────────────────
// Background photo behind the headline.
// Put the file at: public/assets/images/hero.jpg
// then set heroImage to '/assets/images/hero.jpg'.
const heroImage = ''

/**
 * Full-bleed dark hero: split headline (light first line, accent second line),
 * a scroll cue, and a gold strip along the bottom holding the phone number in a
 * dark inset panel.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="bg-background-deep relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden pt-24 lg:min-h-[688px]"
    >
      {/* Background: the photo once supplied, a gradient until then. */}
      {heroImage ? (
        <img src={heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#2b2b2b_0%,#1d1d1d_38%,#111111_100%)]"
        />
      )}

      <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-1 flex-col items-center justify-center px-5 text-center sm:px-8">
        <h1 className="max-w-4xl">
          <span className="text-foreground block text-3xl leading-[1.1] font-extrabold tracking-[0.06em] uppercase sm:text-4xl lg:text-5xl">
            {hero.eyebrow}
          </span>
          <span className="text-primary mt-3 block text-3xl leading-[1.1] font-extrabold tracking-[0.06em] uppercase sm:text-4xl lg:text-5xl">
            {hero.title}
          </span>
        </h1>

        <p className="text-foreground/70 mt-8 max-w-xl text-base leading-relaxed">
          {hero.subtitle}
        </p>

        <a
          href="#services"
          className="text-foreground/60 hover:text-primary focus-visible:outline-primary mt-16 inline-flex flex-col items-center gap-3 text-[10px] font-semibold tracking-[0.34em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {hero.scrollLabel}
          <ChevronDownIcon className="text-primary animate-scroll-cue h-5 w-5" />
        </a>
      </div>

      {/* Gold highlight strip */}
      <div className="bg-primary mt-12">
        <div className="mx-auto grid w-full max-w-[var(--container-width)] grid-cols-1 sm:grid-cols-[1fr_auto_1fr]">
          <p className="text-background-deep flex items-center justify-center px-5 py-4 text-center text-[11px] font-bold tracking-[0.2em] uppercase sm:justify-start">
            {hero.leftHighlight}
          </p>

          <a
            href={brand.phoneHref}
            className="bg-background-deep text-foreground hover:text-primary focus-visible:outline-primary flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <PhoneIcon />
            {brand.phone}
          </a>

          <p className="text-background-deep flex items-center justify-center px-5 py-4 text-center text-[11px] font-bold tracking-[0.2em] uppercase sm:justify-end">
            {hero.rightHighlight}
          </p>
        </div>
      </div>
    </section>
  )
}
