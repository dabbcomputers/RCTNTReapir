const heading = {
  eyebrow: 'Our services',
  title: 'Truck & trailer repair specialists',
}

/**
 * ── ASSET SLOT ──────────────────────────────────────────────────────────────
 * Photo on the left of this section.
 * Put the file at: public/assets/images/we-offer-left.png (already supplied)
 */
const offerImage = '/assets/images/we-offer-left.png'

// ─── Icon used only here ─────────────────────────────────────────────────────

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
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
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────

const body =
  'Royal Canadian Truck & Trailer Repairs has spent 10+ years keeping trucks and trailers on the road. From DPF and SCR systems to full engine diagnostics, brakes and tyres, we work on all makes with honest, upfront pricing.'

const bullets = [
  '10+ years of expert truck & trailer service',
  'DPF and SCR system specialists',
  'Engine diagnostics & repairs',
  'On-site repair service',
  'Honest pricing — zero hidden fees',
]

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * White section: image on the left, heading + body + checklist on the right.
 *
 * The image is laid out at its natural aspect ratio (1605x980) rather than
 * forced into a box, so nothing in the supplied artwork gets cropped. The width
 * and height attributes let the browser reserve the right space before it loads.
 */
export default function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="bg-white pt-12 pb-24 lg:pt-14 lg:pb-28">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <img
            src={offerImage}
            alt=""
            width={1605}
            height={980}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />

          <div>
            <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
              {heading.eyebrow}
            </p>
            <h2 className="text-background-deep mt-3 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
              {heading.title}
            </h2>

            <p className="text-background-deep/60 mt-6 text-sm leading-relaxed">{body}</p>

            <ul className="mt-8 flex flex-col gap-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-background-deep/80 text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
