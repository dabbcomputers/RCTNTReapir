import { useState } from 'react'

// ─── Content ─────────────────────────────────────────────────────────────────

const panel = {
  eyebrow: 'Join our team',
  title: 'Fast and courteous specialists',
  body:
    'Doner hamburger elit magna fatback salami. Picanha ad reprehenderit anim pancetta alcatra ham tempor meatloaf shankle do sunt drumstick. Venison bresaola laboris, jowl do labore pastrami magna voluptate fatback sed cow. In beef ribs shankle hamburger beef, ea turkey cupim venison. Jowl pig ut biltong sint do capicola ham.',
  ctaLabel: 'Apply today',
}

const quoteForm = {
  /** Must match the form name declared in public/__forms.html */
  name: 'quote-request',
  eyebrow: 'Get a quote',
  title: 'Delivers the best',
  submitLabel: 'Submit now',
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'towFrom', label: 'Tow From', type: 'text' },
    { name: 'towTo', label: 'Tow To', type: 'text' },
    { name: 'vehicleType', label: 'Vehicle Type', type: 'text' },
    { name: 'date', label: 'Date', type: 'text' },
  ],
}

// ─── Quote form ──────────────────────────────────────────────────────────────

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Submits to Netlify Forms — there is no custom backend anywhere. Netlify only
 * sees deployed HTML, and this form is rendered by React, so a static skeleton
 * of the same form lives in public/__forms.html for build-time detection.
 * The actual POST is sent from here with fetch.
 */
function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const body = new URLSearchParams({ 'form-name': quoteForm.name })

    for (const field of quoteForm.fields) {
      const input = form.elements.namedItem(field.name) as HTMLInputElement | null
      body.append(field.name, input?.value ?? '')
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(`Submission failed with status ${response.status}`)
      setStatus('success')
    } catch (error) {
      // Fields keep their values, so nothing the user typed is lost.
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <p role="status" tabIndex={-1} className="text-primary text-sm leading-relaxed outline-none">
        Thanks — your quote request is on its way. We will get back to you shortly.
      </p>
    )
  }

  return (
    <form
      name={quoteForm.name}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={quoteForm.name} />
      <p hidden>
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        {quoteForm.fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={`quote-${field.name}`} className="text-foreground/80 text-xs tracking-wide">
              {field.label}
            </label>
            <input
              id={`quote-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete="off"
              className="text-foreground border-white/15 focus:border-primary w-full border-b bg-transparent pb-2 text-sm outline-none transition-colors"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-primary text-background hover:bg-primary-strong focus-visible:outline-primary mt-9 inline-flex w-full items-center justify-center px-7 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : quoteForm.submitLabel}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-primary-strong mt-4 text-xs">
          {errorMessage}{' '}
          <button type="button" onClick={() => setStatus('idle')} className="underline">
            Try again
          </button>
        </p>
      )}
    </form>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * Full-bleed split section: gold recruitment panel on the left, dark quote form
 * on the right. The inner padding is asymmetric so both columns line up with the
 * same container width used by every other section.
 */
export default function Contact() {
  return (
    <section id="contacts" className="grid lg:grid-cols-[52fr_48fr]">
      <div className="bg-primary px-5 py-12 sm:px-8 lg:py-14 lg:pr-16 lg:pl-[max(2rem,calc((100vw-var(--container-width))/2+2rem))]">
        <p className="text-background-deep/70 text-[11px] font-bold tracking-[0.32em] uppercase">
          {panel.eyebrow}
        </p>
        <h2 className="text-background-deep mt-3 max-w-md text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
          {panel.title}
        </h2>
        <p className="text-background-deep/75 mt-6 max-w-lg text-sm leading-loose">{panel.body}</p>

        <a
          href="#apply"
          className="bg-background-deep text-foreground hover:bg-surface-raised focus-visible:outline-background-deep mt-9 inline-flex items-center justify-center px-7 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {panel.ctaLabel}
        </a>
      </div>

      <div className="bg-[#2e2e2e] px-5 py-12 sm:px-8 lg:py-14 lg:pr-[max(2rem,calc((100vw-var(--container-width))/2+2rem))] lg:pl-16">
        <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
          {quoteForm.eyebrow}
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
          {quoteForm.title}
        </h2>

        <div className="mt-9">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
