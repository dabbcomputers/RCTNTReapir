// ─── Content ─────────────────────────────────────────────────────────────────

const stats = [
  { value: '30', label: 'Years of Experience' },
  { value: '74', label: 'Offices Worldwide' },
  { value: '3720', label: 'Vehicles Towed' },
  { value: '874', label: 'Workers in Team' },
]

/** Background supplied by the client — see public/assets/images/. */
const backgroundImage = '/assets/images/stats-bg.png'

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * Dark band: four figures over a full-bleed background image.
 *
 * The supplied image is already dark (dominant #111111), so no scrim is layered
 * on top of it — the figures stay legible against it as-is. The solid
 * bg-surface-raised is kept underneath as a fallback if the image ever fails.
 */
export default function Stats() {
  return (
    <section id="stats" className="bg-surface-raised relative isolate overflow-hidden py-28 lg:py-32">
      <img
        src={backgroundImage}
        alt=""
        width={2172}
        height={724}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="text-primary text-4xl font-extrabold tracking-[0.04em] lg:text-5xl">
                {stat.value}
              </p>
              <p className="text-foreground/75 mt-3 text-xs font-semibold tracking-[0.16em] uppercase">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
