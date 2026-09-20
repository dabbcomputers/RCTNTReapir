import { Link } from 'react-router-dom'

// ─── Content ─────────────────────────────────────────────────────────────────

const brand = {
  name: 'Royal Canadian Truck & Trailer Repairs Inc.',
  tagline: 'Truck & Trailer Mechanics',
  about:
    'Truck and trailer mechanics with 10+ years of expert service. DPF/SCR systems, engines, brakes, tires and on-site repairs across the GTA.',
}

const cta = {
  eyebrow: 'Available 24/7',
  title: 'Need a truck or trailer repaired?',
  body: 'Call any time — day or night, all week. 10+ years of expert truck and trailer repairs across the GTA.',
}

// Contact details: phone and location from the business's Instagram bio, email
// supplied by the client. Hours set to 24/7 at the client's request.
const contact = {
  phone: '647-914-9423',
  phoneHref: 'tel:+16479149423',
  email: 'Royalcanadianrepairs@gmail.com',
  hours: 'Open 24 hours, 7 days a week',
  location: 'Greater Toronto Area, Ontario',
  instagramHandle: '@rc_truckrepairs',
  instagram: 'https://www.instagram.com/rc_truckrepairs/',
}

const quickLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contacts' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Gallery', href: '/gallery' },
]

const services = 'DPF/SCR systems · Engines · Brakes · Tires'

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

function PhoneIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M7 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 5.2 2 2 0 0 1 7 3z" />
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

function ClockIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2" />
    </svg>
  )
}

function MapPinIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    </svg>
  )
}

function InstagramIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Row helper ──────────────────────────────────────────────────────────────

function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary mt-0.5 shrink-0">{icon}</span>
      <span>{children}</span>
    </li>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

/**
 * CTA-first footer: a 24/7 call band, then a short contact block and a handful
 * of links.
 *
 * Replaces the previous four-column template footer (newsletter signup, two
 * columns of eight links, a "Latest Tweets" block and fake Brooklyn contact
 * details). The newsletter Netlify form and the `showNewsletter` prop it needed
 * were removed with it, at the client's request.
 */
export default function Footer() {
  return (
    <footer className="bg-surface">
      {/* 24/7 call band — the primary action of this footer. */}
      <div className="bg-primary">
        <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-col items-center gap-7 px-5 py-12 text-center sm:px-8 lg:flex-row lg:justify-between lg:gap-12 lg:py-14 lg:text-left">
          <div className="max-w-2xl">
            <p className="text-background-deep/70 text-[11px] font-bold tracking-[0.32em] uppercase">
              {cta.eyebrow}
            </p>
            <h2 className="text-background-deep mt-3 text-2xl font-extrabold tracking-[0.05em] uppercase sm:text-3xl">
              {cta.title}
            </h2>
            <p className="text-background-deep/75 mt-4 text-sm leading-relaxed">{cta.body}</p>
          </div>

          <a
            href={contact.phoneHref}
            className="bg-background-deep text-foreground hover:bg-surface-raised focus-visible:outline-background-deep inline-flex w-full shrink-0 items-center justify-center gap-3 px-8 py-5 text-lg font-extrabold tracking-[0.06em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:text-xl"
          >
            <PhoneIcon className="h-5 w-5 shrink-0" />
            {contact.phone}
          </a>
        </div>
      </div>

      {/* Brand, contact, links */}
      <div className="mx-auto grid w-full max-w-[var(--container-width)] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        <div>
          <Link
            to="/"
            aria-label={`${brand.name} — back to the homepage`}
            className="block leading-none"
          >
            <img
              src="/assets/logo.png"
              alt={`${brand.name} ${brand.tagline}`}
              width={1774}
              height={887}
              className="h-11 w-auto md:h-12"
            />
          </Link>

          <p className="text-foreground/60 mt-6 text-sm leading-relaxed">{brand.about}</p>
        </div>

        <div>
          <h3 className="text-foreground text-xs font-bold tracking-[0.26em] uppercase">
            Get in touch
          </h3>
          <ul className="text-foreground/60 mt-6 flex flex-col gap-4 text-sm">
            <ContactRow icon={<PhoneIcon />}>
              <a href={contact.phoneHref} className="hover:text-primary transition-colors">
                {contact.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<MailIcon />}>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-primary transition-colors"
              >
                {contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={<ClockIcon />}>{contact.hours}</ContactRow>
            <ContactRow icon={<MapPinIcon />}>{contact.location}</ContactRow>
            <ContactRow icon={<InstagramIcon />}>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {contact.instagramHandle}
              </a>
            </ContactRow>
          </ul>
        </div>

        <div>
          <h3 className="text-foreground text-xs font-bold tracking-[0.26em] uppercase">
            Quick links
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-1">
            {quickLinks.map((link) => (
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-border border-t">
        <div className="mx-auto flex w-full max-w-[var(--container-width)] flex-col items-center justify-between gap-3 px-5 py-5 text-xs sm:px-8 md:flex-row">
          <p className="text-foreground/50">
            © {new Date().getFullYear()} {brand.name}
          </p>
          <p className="text-foreground/50 tracking-wide">{services}</p>
        </div>
      </div>
    </footer>
  )
}
