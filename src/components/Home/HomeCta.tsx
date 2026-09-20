// ─── Content ─────────────────────────────────────────────────────────────────

const cta = {
  eyebrow: 'Need a repair?',
  title: 'Truck down? Let us get you moving.',
  body: 'Call now for a straight answer and an honest quote. 10+ years of expert truck and trailer repairs across the GTA — DPF/SCR systems, engines, brakes and tires.',
  support: 'On-site repairs available across the GTA',
  instagramLabel: 'Prefer to message? @rc_truckrepairs on Instagram',
}

// Contact details as published on the business's Instagram bio (@rc_truckrepairs).
// NOTE: this is the third copy of the phone number in the codebase (Hero.tsx and
// Footer.tsx hold the others) — components here are deliberately self-contained,
// so changing the number means updating all three.
const brand = {
  phone: '647-914-9423',
  phoneHref: 'tel:+16479149423',
  instagram: 'https://www.instagram.com/rc_truckrepairs/',
}

// ─── Icon used only here ─────────────────────────────────────────────────────

function PhoneIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 5.2 2 2 0 0 1 7 3z" />
    </svg>
  )
}

// ─── Background ──────────────────────────────────────────────────────────────
// A gradient, not a photo — this band needs no image to look finished. To add
// one: drop it at public/assets/images/cta-bg.jpg and render an <img
// src="/assets/images/cta-bg.jpg" alt="" className="absolute inset-0 -z-10
// h-full w-full object-cover" /> in place of the gradient div.

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * Click-to-call band sitting between the contact section and the footer.
 *
 * This file used to be MapSection.tsx and render the Google map; it was
 * converted to a call-to-action and renamed to HomeCta at the client's request.
 *
 * Deliberately dark rather than gold: the contact band directly above ends in a
 * gold panel, so a gold band here would merge with it. Dark also keeps the
 * single gold call button as the only thing the eye lands on.
 */
export default function HomeCta() {
  return (
    <section id="call-us" className="bg-background-deep relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#2b2b2b_0%,#1d1d1d_45%,#111111_100%)]"
      />

      {/* Gold hairlines top and bottom frame the band against its neighbours. */}
      <div aria-hidden="true" className="bg-primary/60 absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-col items-center gap-10 px-5 py-16 text-center sm:px-8 lg:flex-row lg:justify-between lg:gap-16 lg:py-20 lg:text-left">
        <div className="max-w-2xl">
          <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
            {cta.eyebrow}
          </p>

          <h2 className="text-foreground mt-3 text-2xl font-extrabold tracking-[0.05em] uppercase sm:text-3xl lg:text-4xl">
            {cta.title}
          </h2>

          <p className="text-foreground/70 mt-5 text-sm leading-relaxed sm:text-base">{cta.body}</p>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center lg:w-auto lg:items-end">
          <a
            href={brand.phoneHref}
            className="bg-primary text-background hover:bg-primary-strong focus-visible:outline-primary inline-flex w-full items-center justify-center gap-3 px-8 py-5 text-xl font-extrabold tracking-[0.06em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:text-2xl"
          >
            <PhoneIcon className="h-6 w-6 shrink-0" />
            {brand.phone}
          </a>

          <p className="text-foreground/60 mt-4 text-xs tracking-[0.14em] uppercase">
            {cta.support}
          </p>

          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 hover:text-primary focus-visible:outline-primary mt-3 text-xs tracking-wide underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {cta.instagramLabel}
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="bg-primary/60 absolute inset-x-0 bottom-0 h-px" />
    </section>
  )
}
