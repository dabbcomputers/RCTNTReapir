import { useState } from 'react'

// ─── Content ─────────────────────────────────────────────────────────────────
//
// The world-map panel that used to sit beside these questions has been removed:
// it plotted offices in nine countries, which does not describe a single-shop
// business in the GTA. The questions were also still the template's towing FAQs
// ("Why did you tow my car?"), so they are rewritten for truck & trailer repairs.

const heading = {
  eyebrow: 'General FAQs',
  title: 'Truck & trailer repairs, answered',
  intro:
    'DPF and SCR faults, engine work, brakes and tires — these are the questions we get asked most. If yours is not here, give us a call.',
}

type FaqEntry = {
  question: string
  answer: string
}

const items: FaqEntry[] = [
  {
    question: 'Do you repair DPF and SCR systems?',
    answer:
      'Yes — these are our specialty. We diagnose, clean and repair diesel particulate filters and selective catalytic reduction systems, including sensor and dosing faults, and we explain what we found before any work starts.',
  },
  {
    question: 'What trucks and trailers do you work on?',
    answer:
      'Light and heavy trucks, box trucks, flatbeds and trailers of all sizes. If it needs engine, brake, tire or general repair work, bring it in.',
  },
  {
    question: 'Do you offer on-site repairs?',
    answer:
      'Yes. Where a job does not need the workshop we come to you, which keeps downtime to a minimum for vehicles that cannot easily be moved.',
  },
  {
    question: 'How long will my repair take?',
    answer:
      'Most routine repairs are turned around the same day. Diagnostics and larger engine or DPF work depend on parts, and we will give you a realistic timeframe before we begin.',
  },
  {
    question: 'Do you work on all makes?',
    answer:
      'Yes. We service all common truck and trailer makes and are not tied to a single manufacturer, so you get an honest recommendation rather than a parts upsell.',
  },
  {
    question: 'How do I book a repair or get a quote?',
    answer:
      'Call 647-914-9423 or send us a message through the contact form. Tell us the vehicle and what it is doing, and we will give you a straight answer on cost and timing.',
  },
]

// ─── One question ────────────────────────────────────────────────────────────

type FaqItemProps = {
  item: FaqEntry
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FaqItem({ item, index, isOpen, onToggle }: FaqItemProps) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-trigger-${index}`

  return (
    <li className="border-border border-b first:border-t">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group focus-visible:outline-primary flex w-full items-start gap-5 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {/* Number badge — mirrors the gold accent used across the site. */}
          <span
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border text-[11px] font-bold tracking-wider transition-colors ${
              isOpen
                ? 'border-primary bg-primary text-background'
                : 'border-primary/35 text-primary group-hover:border-primary'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span
            className={`flex-1 pt-1 text-sm font-semibold tracking-wide transition-colors sm:text-base ${
              isOpen ? 'text-primary' : 'text-background-deep group-hover:text-primary'
            }`}
          >
            {item.question}
          </span>

          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-colors ${
              isOpen
                ? 'border-primary bg-primary text-background'
                : 'border-border text-primary group-hover:border-primary'
            }`}
          >
            {isOpen ? '\u2212' : '+'}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="text-background-deep/60 pb-7 pl-14 text-sm leading-relaxed"
      >
        {item.answer}
      </div>
    </li>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * Centred FAQ. Narrow single column rather than the old two-column
 * map-plus-questions split, so the questions read as the section's whole subject.
 * White background keeps the section alternating as it does elsewhere.
 */
export default function Faq() {
  // The first question starts open.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
            {heading.eyebrow}
          </p>
          <h2 className="text-background-deep mt-3 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
            {heading.title}
          </h2>
          <p className="text-background-deep/55 mx-auto mt-5 max-w-xl text-sm leading-relaxed">
            {heading.intro}
          </p>
          <span aria-hidden="true" className="bg-primary mx-auto mt-8 block h-px w-16" />
        </div>

        <ul className="mt-12">
          {items.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              index={index}
              isOpen={index === openIndex}
              onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
