import { useState } from 'react'

// ─── Content ─────────────────────────────────────────────────────────────────

const heading = {
  eyebrow: 'General FAQ\u2019s',
  title: 'Relocation of any vehicle type',
  mapCaption: 'Number of our offices',
}

type FaqEntry = {
  question: string
  /** Only the first question has its answer shown in the reference. */
  answer: string
}

const items: FaqEntry[] = [
  {
    question: 'How do I get my car back?',
    answer:
      'If your car was towed at the request of an agency, you must first be sure that you don\u2019t need the agency\u2019s permission to pick up the car.',
  },
  { question: 'How long do I have to get my stuff?', answer: '' },
  { question: 'Why did you tow my car?', answer: '' },
  { question: 'What is a courtesy tow / tow by the hour?', answer: '' },
  { question: 'Why is there a lien on my vehicle?', answer: '' },
]

/** Office markers plotted on the map, positioned in % of the map box. */
const officeLocations = [
  { name: 'Canada', top: '18%', left: '16%' },
  { name: 'USA', top: '33%', left: '20%' },
  { name: 'Brazil', top: '64%', left: '30%' },
  { name: 'Denmark', top: '19%', left: '51%' },
  { name: 'Poland', top: '27%', left: '55%' },
  { name: 'Algeria', top: '44%', left: '48%' },
  { name: 'Russia', top: '18%', left: '68%' },
  { name: 'China', top: '34%', left: '78%' },
  { name: 'Australia', top: '74%', left: '86%' },
]

// ─── ASSET SLOT ──────────────────────────────────────────────────────────────
// World map artwork shown beside the questions.
// Put the file at: src/assets/images/world-map.png
// then uncomment the import and set mapImage to it.
//
// Until then the markers above are plotted on an empty box, so the layout and
// the office positions are already correct — only the map art is missing.
//
//   import mapImage from '../../assets/images/world-map.png'
const mapImage = ''

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
    <li className="border-border border-b">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="text-background-deep hover:text-primary focus-visible:outline-primary flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span>{item.question}</span>
          <span aria-hidden="true" className="text-primary text-lg leading-none">
            {isOpen ? '\u2212' : '+'}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="text-background-deep/70 pb-5 text-sm leading-relaxed"
      >
        {item.answer || 'Details for this question were not present in the design reference.'}
      </div>
    </li>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

/** White section: office map on the left, FAQ accordion on the right. */
export default function Faq() {
  // The reference has the first question open.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-white py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="border-background-deep/10 relative aspect-[4/3] w-full border">
              {mapImage ? <img src={mapImage} alt="" className="h-full w-full object-contain" /> : null}

              {officeLocations.map((office) => (
                <span
                  key={office.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: office.top, left: office.left }}
                >
                  <span className="bg-primary block h-2.5 w-2.5 rounded-full" />
                  <span className="text-background-deep/70 mt-1.5 block text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase">
                    {office.name}
                  </span>
                </span>
              ))}
            </div>

            <p className="text-background-deep/50 mt-5 flex items-center gap-2 text-xs">
              <span className="bg-primary inline-block h-2.5 w-2.5 rounded-full" />
              {heading.mapCaption}
            </p>
          </div>

          <div>
            <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
              {heading.eyebrow}
            </p>
            <h2 className="text-background-deep mt-3 mb-8 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
              {heading.title}
            </h2>

            <ul>
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
        </div>
      </div>
    </section>
  )
}
