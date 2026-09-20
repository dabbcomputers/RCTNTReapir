import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// ─── Brand + navigation ──────────────────────────────────────────────────────

const brand = {
  name: '24/7 Towy',
  tagline: 'Towing Services',
}

/**
 * Plain single-level links — no dropdowns.
 *
 * There is deliberately no "404" entry: that page is a fallback for routes that
 * do not exist, not a destination anyone should be able to navigate to.
 * Gallery has no design yet, so it currently falls through to that fallback.
 */
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contacts' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
]

// The reference centres the logo, so the links are split either side of it.
// The first three sit left, the last two right.
const leftNavItems = navItems.slice(0, 3)
const rightNavItems = navItems.slice(3)

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

function MenuIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

// ─── Logo ────────────────────────────────────────────────────────────────────
//
// Client-supplied logo, served straight from public/assets/.
//
// It is a wide lockup (artwork aspect 2.6:1), so it is sized by height and the
// width follows. The file's transparent padding means the visible artwork is
// only ~73% of the box, so the rendered box is set taller than the intended
// artwork height to compensate.
//
// NOTE: 62% of this logo's opaque pixels are dark (near-black / dark grey) and
// the rest gold. Against this dark header the dark portions drop away and the
// mark reads as gold only. A light-on-dark variant would show it in full.

function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} ${brand.tagline} — back to the homepage`}
      className={`block leading-none ${className}`}
    >
      <img
        src="/assets/logo.png"
        alt={`${brand.name} ${brand.tagline}`}
        width={1774}
        height={887}
        className="h-11 w-auto md:h-14 lg:h-16"
      />
    </Link>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────

const linkClass =
  'text-foreground/85 hover:text-primary focus-visible:outline-primary text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4'

type NavItem = { label: string; href: string }

/** One half of the split navigation. Hidden below lg, where MobileMenu takes over. */
function NavList({ items, className = '' }: { items: NavItem[]; className?: string }) {
  return (
    <ul className={`hidden items-center gap-8 lg:flex xl:gap-10 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <NavLink
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) => `${linkClass} ${isActive ? 'text-primary' : ''}`}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────

function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    // Stop the page behind the menu from scrolling while it is open.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="text-foreground hover:text-primary focus-visible:outline-primary lg:hidden"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="lg:hidden">
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="bg-background-deep/70 fixed inset-0 z-50 backdrop-blur-sm"
          />

          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="bg-surface border-border fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto border-l px-6 py-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-primary text-sm font-extrabold tracking-[0.16em] uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="text-foreground hover:text-primary focus-visible:outline-primary"
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="text-foreground border-border hover:text-primary block border-b py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

type HeaderProps = {
  /**
   * true  → sits on top of the hero (homepage)
   * false → a solid dark bar in normal flow (About, Services, FAQ, ...)
   */
  overlay?: boolean
}

/**
 * Split navigation with a centred logo.
 * On the homepage the reference overlays the header on the hero artwork, so it
 * is absolutely positioned; inner pages start with a solid header bar instead.
 */
export default function Header({ overlay = false }: HeaderProps) {
  return (
    <header
      className={overlay ? 'absolute inset-x-0 top-0 z-40' : 'bg-background-deep relative z-40'}
    >
      <div className="mx-auto flex w-full max-w-[var(--container-width)] items-center justify-between gap-6 px-5 py-7 sm:px-8 lg:py-8">
        <NavList items={leftNavItems} className="flex-1 justify-start" />
        <Logo className="shrink-0" />
        <NavList items={rightNavItems} className="flex-1 justify-end" />
        <MobileMenu />
      </div>
    </header>
  )
}
