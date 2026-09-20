import { useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Content ─────────────────────────────────────────────────────────────────

const brand = {
  name: '24/7 Towy',
  tagline: 'Towing Services',
  about:
    'Shank duis pancetta kevin ullamco tempor short loin pig lorem officia ut ham hock incididunt irure drumstick sage ball tip tri-tip',
}

const newsletter = {
  /** Must match the form name declared in public/__forms.html */
  formName: 'newsletter',
  emailField: 'email',
  eyebrow: 'Register for our newsletter',
  title: 'Get latest company news',
  placeholder: 'Enter e-mail address',
  submitLabel: 'Subscribe',
}

const socials = [
  { label: 'Facebook', href: '#facebook', icon: 'facebook' as const },
  { label: 'Twitter', href: '#twitter', icon: 'twitter' as const },
  { label: 'Google Plus', href: '#google-plus', icon: 'google-plus' as const },
]

const usefulLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Typography', href: '/typography' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contacts' },
]

const contactDetails = {
  address: '2551 Alfred Drive Brooklyn, NY',
  email: 'support@towy.com',
  phone: '718-250-4467',
  hours: '24 hours a day, 7 days a week',
}

const tweets = [
  { text: 'Shank duis pancetta kevin ullamco tempor short loin pig lorem.', time: '5 hours ago' },
  {
    text: 'Ham hock sunt minim drumstick, alcatra deserunt ball tip boudin filet.',
    time: '10 hours ago',
  },
]

const copyright = {
  name: '24/7 Towy - Towing Services',
  text: 'All Rights Reserved \u00a9 2016',
}

// ─── Icons used only here ────────────────────────────────────────────────────

const iconBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

type IconProps = { className?: string }

function MapPinIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    </svg>
  )
}

function MailIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M3.5 6.5h17v11h-17v-11zM3.5 7l8.5 6 8.5-6" />
    </svg>
  )
}

function PhoneIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M7 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 5.2 2 2 0 0 1 7 3z" />
    </svg>
  )
}

function ClockIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2" />
    </svg>
  )
}

function FacebookIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M14 8.5h2.5V5.5H14a3.5 3.5 0 0 0-3.5 3.5v2H8.5v3h2v6.5h3V14h2.2l.3-3h-2.5V9.4a.9.9 0 0 1 .9-.9z" />
    </svg>
  )
}

function TwitterIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M20 6.6a6.3 6.3 0 0 1-1.9.6 3.2 3.2 0 0 0 1.4-1.8 6.4 6.4 0 0 1-2 .8 3.2 3.2 0 0 0-5.5 2.9A9.1 9.1 0 0 1 4.6 5.4a3.2 3.2 0 0 0 1 4.3 3.2 3.2 0 0 1-1.5-.4 3.2 3.2 0 0 0 2.6 3.2 3.2 3.2 0 0 1-1.4.1 3.2 3.2 0 0 0 3 2.2A6.4 6.4 0 0 1 4 16.3a9 9 0 0 0 4.9 1.4c5.9 0 9.1-4.9 9.1-9.1v-.4A6.5 6.5 0 0 0 20 6.6z" />
    </svg>
  )
}

function GooglePlusIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M8.5 9.8v2.5h3.6a3.1 3.1 0 0 1-3.6 2.6 4 4 0 0 1 0-8 3.9 3.9 0 0 1 2.8 1.1l1.9-1.9A6.6 6.6 0 0 0 8.5 4a6.7 6.7 0 1 0 0 13.4c3.9 0 6.4-2.7 6.4-6.5a5 5 0 0 0-.1-1.1H8.5zM18 9v2h-2v1.5h2V15h1.5v-2.5H22V11h-2.5V9H18z" />
    </svg>
  )
}

const socialIcons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  'google-plus': GooglePlusIcon,
}

// ─── Newsletter form ─────────────────────────────────────────────────────────

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Submits to Netlify Forms from JS (no custom backend) and mirrors the skeleton
 * declared in public/__forms.html for build-time detection.
 */
function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const email = (form.elements.namedItem(newsletter.emailField) as HTMLInputElement)?.value ?? ''

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': newsletter.formName,
          [newsletter.emailField]: email,
        }).toString(),
      })
      if (!response.ok) throw new Error(`Submission failed with status ${response.status}`)
      setStatus('success')
    } catch (error) {
      // The typed address is left in place so it is not lost.
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <p role="status" tabIndex={-1} className="text-primary text-sm tracking-wide outline-none">
        Thanks — you are on the list.
      </p>
    )
  }

  return (
    <form
      name={newsletter.formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="w-full max-w-sm"
    >
      <input type="hidden" name="form-name" value={newsletter.formName} />
      <p hidden>
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>

      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="border-primary flex items-stretch border-b">
        <input
          id="newsletter-email"
          name={newsletter.emailField}
          type="email"
          required
          placeholder={newsletter.placeholder}
          aria-invalid={status === 'error'}
          className="text-foreground placeholder:text-foreground/40 focus-visible:outline-primary min-w-0 flex-1 bg-transparent px-1 py-3 text-xs tracking-[0.14em] uppercase outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="text-primary hover:text-primary-strong focus-visible:outline-primary px-3 text-xs font-semibold tracking-[0.18em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : newsletter.submitLabel}
        </button>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-primary-strong mt-3 text-xs">
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

type FooterProps = {
  /**
   * The homepage footer opens with the newsletter band; the inner pages
   * (About, Services, Testimonials, FAQ, 404) do not have it in the reference.
   */
  showNewsletter?: boolean
}

/** Newsletter band (homepage only), then four columns, then the copyright bar. */
export default function Footer({ showNewsletter = true }: FooterProps) {
  // "Useful links" is drawn as two narrow columns in the reference.
  const linkColumns = [usefulLinks.slice(0, 4), usefulLinks.slice(4)]

  return (
    <footer className="bg-surface">
      {showNewsletter && (
        <div className="border-border border-b">
          <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-col gap-6 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div>
              <p className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
                {newsletter.eyebrow}
              </p>
              <p className="text-foreground mt-2 text-sm font-semibold tracking-[0.22em] uppercase">
                {newsletter.title}
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      )}

      <div
        className={`mx-auto grid w-full max-w-[var(--container-width)] gap-10 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 ${
          showNewsletter ? 'py-8' : 'py-16 lg:py-20'
        }`}
      >
        <div>
          <Link
            to="/"
            aria-label={`${brand.name} ${brand.tagline} — back to the homepage`}
            className="mb-6 block leading-none"
          >
            <img
              src="/assets/logo.png"
              alt={`${brand.name} ${brand.tagline}`}
              width={1774}
              height={887}
              className="h-10 w-auto md:h-12 lg:h-14"
            />
          </Link>

          <p className="text-foreground/60 text-sm leading-relaxed">{brand.about}</p>

          <ul className="mt-6 flex items-center gap-3">
            {socials.map((social) => {
              const SocialIcon = socialIcons[social.icon]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="bg-background-deep text-foreground/70 hover:bg-primary hover:text-background focus-visible:outline-primary flex h-9 w-9 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <SocialIcon />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-foreground mb-6 text-xs font-bold tracking-[0.26em] uppercase">
            Useful Links
          </h2>
          <div className="grid grid-cols-2 gap-x-6">
            {linkColumns.map((column, index) => (
              <ul key={index} className="flex flex-col gap-3">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-foreground/60 hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-foreground mb-6 text-xs font-bold tracking-[0.26em] uppercase">
            Get in Touch
          </h2>
          <ul className="text-foreground/60 flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPinIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <span>{contactDetails.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <a
                href={`mailto:${contactDetails.email}`}
                className="hover:text-primary transition-colors"
              >
                {contactDetails.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <a
                href={`tel:${contactDetails.phone.replace(/\D/g, '')}`}
                className="hover:text-primary transition-colors"
              >
                {contactDetails.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <ClockIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <span>{contactDetails.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-foreground mb-6 text-xs font-bold tracking-[0.26em] uppercase">
            Latest Tweets
          </h2>
          <ul className="flex flex-col gap-5">
            {tweets.map((tweet) => (
              <li key={tweet.time}>
                <p className="text-foreground/60 text-sm leading-relaxed">{tweet.text}</p>
                <p className="text-primary mt-2 text-xs tracking-wide">— {tweet.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-col items-center justify-between gap-3 px-5 py-3 text-xs sm:px-8 md:flex-row">
          <p className="text-foreground/50">{copyright.name}</p>
          <p className="text-foreground/50">{copyright.text}</p>
        </div>
      </div>
    </footer>
  )
}
