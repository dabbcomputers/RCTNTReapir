import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Content ─────────────────────────────────────────────────────────────────

/**
 * Profile details taken from the business's Instagram (@rc_truckrepairs).
 * The bio is reproduced from there; the emoji that sit between the lines on
 * Instagram are left out to keep the header in the site's own type style.
 */
const profile = {
  name: 'RC truck & trailer repairs',
  handle: 'rc_truckrepairs',
  url: 'https://www.instagram.com/rc_truckrepairs/',
  /** The same logo the navbar uses, so the two always match. */
  avatar: '/assets/logo.png',
  stats: [
    { value: '56', label: 'followers' },
    { value: '69', label: 'following' },
    { value: '48', label: 'posts' },
  ],
  bio: [
    'Truck and trailer mechanic',
    '10+ years of expert service',
    'DPF/SCR systems, engines',
    'GTA \u00b7 647-914-9423',
  ],
}

type Clip = {
  src: string
  /** Square 480x480 centre-crop, generated with ffmpeg — grid tiles never touch the video itself. */
  poster: string
  /** Shown under the video in the lightbox. */
  duration: string
}

const clips: Clip[] = [
  { src: '/assets/videos/1.mp4', poster: '/assets/videos/posters/1.jpg', duration: '0:29' },
  { src: '/assets/videos/2.mp4', poster: '/assets/videos/posters/2.jpg', duration: '0:39' },
  { src: '/assets/videos/3.mp4', poster: '/assets/videos/posters/3.jpg', duration: '0:44' },
  { src: '/assets/videos/4.mp4', poster: '/assets/videos/posters/4.jpg', duration: '0:17' },
  { src: '/assets/videos/5.mp4', poster: '/assets/videos/posters/5.jpg', duration: '0:19' },
  { src: '/assets/videos/6.mp4', poster: '/assets/videos/posters/6.jpg', duration: '0:23' },
  { src: '/assets/videos/7.mp4', poster: '/assets/videos/posters/7.jpg', duration: '0:46' },
  { src: '/assets/videos/8.mp4', poster: '/assets/videos/posters/8.jpg', duration: '0:33' },
]

// ─── Icons used only here ────────────────────────────────────────────────────

const iconBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

function PlayIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg {...iconBase} className={className} fill="currentColor" stroke="none">
      <path d="M8 5.5l11 6.5-11 6.5z" />
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

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg {...iconBase} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Profile header ──────────────────────────────────────────────────────────

function ProfileHeader() {
  return (
    <header className="border-border flex flex-col gap-7 border-b pb-10 sm:flex-row sm:items-center sm:gap-10">
      {/* The logo artwork is dark, so it needs a LIGHT circle to sit on. On the
          previous dark chip it was dark-on-dark and effectively invisible. */}
      <span className="border-border flex h-24 w-24 shrink-0 items-center justify-center rounded-full border bg-white p-3 sm:h-32 sm:w-32">
        <img
          src={profile.avatar}
          alt={`${profile.name} logo`}
          width={1774}
          height={887}
          className="max-h-full max-w-full object-contain"
        />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {/* This section sits on white, so all header text is dark —
              text-foreground is white and was invisible here. */}
          <h2 className="text-background-deep text-lg font-bold tracking-wide">{profile.handle}</h2>

          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-background-deep hover:border-primary hover:text-primary focus-visible:outline-primary inline-flex items-center gap-2 border px-4 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <InstagramIcon />
            Follow
          </a>
        </div>

        <ul className="text-background-deep/70 mt-4 flex flex-wrap gap-x-7 gap-y-1 text-sm">
          {profile.stats.map((stat) => (
            <li key={stat.label}>
              <span className="text-background-deep font-bold">{stat.value}</span> {stat.label}
            </li>
          ))}
        </ul>

        <div className="text-background-deep/60 mt-4 text-sm leading-relaxed">
          <p className="text-background-deep font-semibold">{profile.name}</p>
          {profile.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </header>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

type LightboxProps = {
  clip: Clip
  onClose: () => void
  /** Focus returns here when the lightbox closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

function Lightbox({ clip, onClose, triggerRef }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      // Keep Tab inside the dialog while it is open.
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, video, a[href]')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      // Hand focus back to the tile that opened this.
      ;(previouslyFocused ?? triggerRef.current)?.focus()
    }
  }, [onClose, triggerRef])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Video"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="bg-background-deep/85 absolute inset-0 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="bg-surface border-border relative flex max-h-full w-full max-w-sm flex-col border"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="text-foreground hover:text-primary focus-visible:outline-primary absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center bg-black/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <CloseIcon />
        </button>

        {/* preload="none" — the file is only fetched now, because a video
            element that is never opened never downloads anything. */}
        <video
          src={clip.src}
          poster={clip.poster}
          controls
          autoPlay
          playsInline
          preload="none"
          className="block max-h-[70vh] w-full bg-black object-contain"
        />

        <p className="text-foreground/60 px-4 py-3 text-xs tracking-[0.14em] uppercase">
          {profile.handle} · {clip.duration}
        </p>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * Instagram-style gallery: profile header, then a 3-up grid of square tiles
 * showing static poster frames.
 *
 * Weight: the eight videos are 54MB in total, so the grid never loads them.
 * Each tile renders a ~20KB poster JPEG (lazy-loaded), and the video file is
 * attached to a <video preload="none"> only when a tile is opened.
 */
export default function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpenIndex(null), [])

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <ProfileHeader />

        <ul className="mt-8 grid grid-cols-3 gap-1 sm:gap-2">
          {clips.map((clip, index) => (
            <li key={clip.src}>
              <button
                ref={index === openIndex ? triggerRef : undefined}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Play video ${index + 1}`}
                className="group focus-visible:outline-primary relative block w-full focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <img
                  src={clip.poster}
                  alt=""
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />

                {/* Video marker, top-right, as Instagram does on reel tiles. */}
                <span
                  aria-hidden="true"
                  className="text-foreground absolute top-2 right-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                >
                  <PlayIcon />
                </span>

                <span
                  aria-hidden="true"
                  className="bg-background-deep/0 group-hover:bg-background-deep/25 absolute inset-0 transition-colors"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox clip={clips[openIndex]} onClose={close} triggerRef={triggerRef} />
      )}
    </section>
  )
}
