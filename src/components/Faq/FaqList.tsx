import { useState } from 'react'

// ─── Content ─────────────────────────────────────────────────────────────────
//
// This is NOT the same list as the homepage FAQ (components/Home/Faq.tsx) — the
// reference gives this page its own longer set, split over two columns.

type FaqEntry = {
  question: string
  /** Only the first entry has its answer shown in the reference. */
  answer: string
}

const items: FaqEntry[] = [
  {
    question: 'Fatback biltong ground round prosciutto cupim jowl?',
    answer:
      'Doner hamburger frankfurter venison. Hamburger turducken leberkas jowl pancetta jerky corned beef strip steak burgdoggen pork loin pork tenderloin alcatra capicola meatball.',
  },
  { question: 'Sausage tenderloin ball tip picanha salami brisket?', answer: '' },
  { question: 'Tenderloin porchetta pork chop beef ribs bacon?', answer: '' },
  { question: 'Biltong tail short ribs t-bone salami?', answer: '' },
  { question: 'Pancetta cow kevin landjaeger t-bone tenderloin?', answer: '' },
  { question: 'Spare ribs cow cupim flank ham tail strip steak?', answer: '' },
  { question: 'Filet mignon spare ribs pork loin ham?', answer: '' },
  { question: 'Hamburger fatback chuck alcatra biltong?', answer: '' },
  { question: 'Boudin strip steak jerky alcatra swine jowl brisket?', answer: '' },
  { question: 'Pig alcatra ham filet mignon bacon?', answer: '' },
  { question: 'Beef bresaola flank leberkas jerky pastrami short?', answer: '' },
]

// ─── One question ────────────────────────────────────────────────────────────

type FaqRowProps = {
  item: FaqEntry
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FaqRow({ item, index, isOpen, onToggle }: FaqRowProps) {
  const panelId = `faq-page-panel-${index}`
  const buttonId = `faq-page-trigger-${index}`

  return (
    <li className="border-border border-b py-1">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="text-background-deep hover:text-primary focus-visible:outline-primary flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
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
        className="text-background-deep/70 pb-4 text-sm leading-relaxed"
      >
        {item.answer || 'Details for this question were not present in the design reference.'}
      </div>
    </li>
  )
}

/** Two columns of expandable questions, matching the reference layout. */
export default function FaqList() {
  // The reference has the first question open.
  const [openIndex, setOpenIndex] = useState(0)

  const halfway = Math.ceil(items.length / 2)
  const columns = [items.slice(0, halfway), items.slice(halfway)]

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <div className="grid gap-x-16 gap-y-2 lg:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <ul key={columnIndex}>
              {column.map((item, rowIndex) => {
                const index = columnIndex === 0 ? rowIndex : halfway + rowIndex
                return (
                  <FaqRow
                    key={item.question}
                    item={item}
                    index={index}
                    isOpen={index === openIndex}
                    onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                  />
                )
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
