import { useState } from 'react'

// ─── Content ─────────────────────────────────────────────────────────────────

const heading = {
  eyebrow: 'Contact us',
  title: 'Send us a message',
}

/**
 * Location taken from the Google Maps link the client supplied:
 * https://maps.app.goo.gl/MgwERvr9Meknje3bA
 * → Royal Canadian Truck & Trailer Repairs Inc., 43.4510659, -80.4009931
 *
 * The plain `output=embed` endpoint is used rather than the /maps/place/ URL
 * because the place URL sends X-Frame-Options: SAMEORIGIN and refuses to render
 * inside an iframe without an API key.
 */
const mapEmbedUrl = 'https://www.google.com/maps?q=43.4510659,-80.4009931&z=16&output=embed'
const mapLink = 'https://maps.app.goo.gl/MgwERvr9Meknje3bA'

type ContactField = {
  name: string
  label: string
  /** One of the <input type> values, or 'textarea' for the multi-line field. */
  type: 'text' | 'tel' | 'email' | 'date' | 'textarea'
  required: boolean
  /** Set only where the value is a real HTML autocomplete token. */
  autoComplete?: string
  placeholder?: string
}

const form: { name: string; submitLabel: string; fields: ContactField[] } = {
  /** Must match the form name declared in public/__forms.html */
  name: 'contact',
  submitLabel: 'Send message',
  /**
   * Render order, and the order the fields arrive in the email Netlify sends.
   * `required` drives both the browser's own validation and the asterisk beside
   * the label, so the two can never drift apart.
   *
   * Every `name` here must also appear on the matching <form> in
   * public/__forms.html, or Netlify silently drops that field from the
   * submission. Keep the two lists in step.
   */
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'email', label: 'Email', type: 'email', required: false, autoComplete: 'email' },
    {
      name: 'vehicleType',
      label: 'Vehicle Type',
      type: 'text',
      required: true,
      placeholder: 'e.g. 2019 Peterbilt 579',
    },
    {
      name: 'serviceRequired',
      label: 'Service Required',
      type: 'text',
      required: true,
      placeholder: 'e.g. Brake service, DPF fault',
    },
    { name: 'preferredDate', label: 'Preferred Date', type: 'date', required: false },
    { name: 'message', label: 'Message', type: 'textarea', required: false },
  ],
}

// ─── Contact form ────────────────────────────────────────────────────────────

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Submits to Netlify Forms — no custom backend. Netlify only scans deployed
 * HTML and this form is rendered by React, so a static skeleton of the same
 * form lives in public/__forms.html. The POST is sent from here with fetch.
 */
function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const el = event.currentTarget
    const body = new URLSearchParams({ 'form-name': form.name })

    for (const field of form.fields) {
      const input = el.elements.namedItem(field.name) as HTMLInputElement | HTMLTextAreaElement
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
      <p role="status" tabIndex={-1} className="text-background-deep text-sm leading-relaxed outline-none">
        Thanks — your message is on its way. We will get back to you shortly.
      </p>
    )
  }

  const fieldClass =
    'text-background-deep border-background-deep/20 focus:border-primary w-full border-b bg-transparent pb-2 text-sm outline-none transition-colors placeholder:text-background-deep/35'

  return (
    <form
      name={form.name}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={form.name} />
      <p hidden>
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        {form.fields.map((field) => (
          <div
            key={field.name}
            className={`flex flex-col gap-2 ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}
          >
            <label htmlFor={`contact-${field.name}`} className="text-background-deep/70 text-xs tracking-wide">
              {field.label}
              {field.required && (
                <span aria-hidden="true" className="text-primary-strong ml-1">
                  *
                </span>
              )}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={`contact-${field.name}`}
                name={field.name}
                rows={5}
                required={field.required}
                placeholder={field.placeholder}
                className={`${fieldClass} resize-y`}
              />
            ) : (
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                className={fieldClass}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-primary text-background hover:bg-primary-strong focus-visible:outline-primary mt-9 inline-flex w-full items-center justify-center px-7 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : form.submitLabel}
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

/** Map on the left, contact form on the right. */
export default function ContactSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Map */}
          <div>
            <iframe
              title="Map showing our location"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="border-border h-[320px] w-full border sm:h-[420px] lg:h-[480px]"
            />

            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background-deep/60 hover:text-primary focus-visible:outline-primary mt-4 inline-block text-xs tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Open in Google Maps
            </a>
          </div>

          {/* Form */}
          <div>
            <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
              {heading.eyebrow}
            </p>
            <h2 className="text-background-deep mt-3 mb-8 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
              {heading.title}
            </h2>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
