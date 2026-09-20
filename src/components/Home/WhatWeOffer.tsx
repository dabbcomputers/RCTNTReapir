// ─── Content ─────────────────────────────────────────────────────────────────
//
// Note: the reference says "New York" here but "San Diego" in the hero. That
// wording is kept exactly as designed rather than quietly corrected.

const heading = {
  eyebrow: 'What we offer',
  title: 'Effective flatbed transportation',
}

const body =
  'We provide fast, courteous and inexpensive towing services in New York. We are fully insured and been in business since 1986. We are ready to respond to all your vehicle emergency needs 24 hours a day, seven days a week.'

const bullets = [
  'More than 30 years of experience',
  'Short arrival time of 30 minutes or less',
  'Honest competitive prices - zero hidden fees',
  'Friendly and professional service',
  'Available 24 hours a day, 7 days a week',
]

/** Image supplied by the client — see public/assets/images/. */
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
