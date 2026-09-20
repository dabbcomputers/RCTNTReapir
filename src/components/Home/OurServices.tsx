// ─── Content ─────────────────────────────────────────────────────────────────

const heading = {
  eyebrow: 'Our services',
  title: 'Emergency roadside assistance',
}

// ─── Icon sizing ─────────────────────────────────────────────────────────────
//
// The supplied PNGs are gold + black line art on transparency, so they sit
// straight on the white card — no coloured tile behind them.
//
// Each file carries a DIFFERENT amount of transparent padding, so dropping them
// all into one fixed box would render the artwork itself at noticeably
// different sizes (the padded canvas gets fitted, not the drawing). These are
// the measured ink boxes — the bounding box of actually-visible pixels — and the
// render derives the display size from them so every icon's artwork ends up the
// same width and optically centred.
//
//   file                canvas    ink box (x,y,w,h)      pad L/R/T/B
//   car-towing          370x370   11, 70, 340, 280        11/19/70/20
//   accident-insurance  388x362   22, 22, 324, 309        22/42/22/31
//   hail-damage         400x370   21, 20, 358, 332        21/21/20/18
//   fire-insurance      378x371   10, 22, 354, 331        10/14/22/18
//   flood-insurance     370x363   19, 60, 316, 279        19/35/60/24
//   motorcycle-towing   434x349   10, 68, 405, 265        10/19/68/16

/** Width the visible artwork is normalised to, in px. */
const ICON_INK_WIDTH = 64
/** Height of the centring frame. The artwork always fits inside it. */
const ICON_FRAME_HEIGHT = 64

type IconSpec = {
  src: string
  /** Full canvas size of the file. */
  canvas: [number, number]
  /** Visible artwork inside that canvas: [x, y, width, height]. */
  ink: [number, number, number, number]
}

type Service = {
  title: string
  icon: IconSpec
  description: string
}

const services: Service[] = [
  {
    title: 'Car Towing',
    icon: { src: '/assets/icons/car-towing.png', canvas: [370, 370], ink: [11, 70, 340, 280] },
    description:
      'Duis laboris ball tip jowl sed. Drumstick leberkas tenderloin swine laborum cupim bacon ipsum jowl meatball t-bone.',
  },
  {
    title: 'Accident Insurance',
    icon: { src: '/assets/icons/accident-insurance.png', canvas: [388, 362], ink: [22, 22, 324, 309] },
    description:
      'T-bone laborum esse tongue, consequat elit short ribs cow cupidatat sed fugiat fatback. Velit dolor frankfurter pork loin.',
  },
  {
    title: 'Hail Damage',
    icon: { src: '/assets/icons/hail-damage.png', canvas: [400, 370], ink: [21, 20, 358, 332] },
    description:
      'Strip steak turkey prosciutto exercitation cillum elit. Enim ham velit aute jerky ras. Anim landjaeger andouille.',
  },
  {
    title: 'Fire Insurance',
    icon: { src: '/assets/icons/fire-insurance.png', canvas: [378, 371], ink: [10, 22, 354, 331] },
    description:
      'Turkey turducken nulla pork chop shankle biltong ipsum mollit brisket non boudin. Frankfurter porchetta cow aliquip.',
  },
  {
    title: 'Flood Insurance Coverage',
    icon: { src: '/assets/icons/flood-insurance.png', canvas: [370, 363], ink: [19, 60, 316, 279] },
    description:
      'Shankle pastrami jerky spare ribs pancetta hamburger aute occaecat andouille corned beef quis capicola fugiat ea flank.',
  },
  {
    title: 'Motorcycle Towing',
    icon: { src: '/assets/icons/motorcycle-towing.png', canvas: [434, 349], ink: [10, 68, 405, 265] },
    description:
      'Bresaola pork consequat exercitation, voluptate pork loin brisket capicola officia incididunt ground round cupim.',
  },
]

// ─── Card ────────────────────────────────────────────────────────────────────

/** Renders one icon at a size that makes its visible artwork match the others. */
function ServiceIcon({ icon }: { icon: IconSpec }) {
  const [canvasW, canvasH] = icon.canvas
  const [inkX, inkY, inkW, inkH] = icon.ink

  // Scale the whole canvas so the artwork's longest edge hits the target.
  const scale = ICON_INK_WIDTH / Math.max(inkW, inkH)
  const width = canvasW * scale
  const height = canvasH * scale

  // The padded canvas is what gets laid out, so nudge it until the artwork —
  // not the canvas — sits in the middle of the frame.
  const offsetX = (inkX + inkW / 2 - canvasW / 2) * scale
  const offsetY = (inkY + inkH / 2 - canvasH / 2) * scale

  return (
    <span
      className="flex items-center justify-center"
      style={{ height: `${ICON_FRAME_HEIGHT}px` }}
    >
      <img
        src={icon.src}
        alt=""
        width={Math.round(width)}
        height={Math.round(height)}
        loading="lazy"
        decoding="async"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${-offsetX}px, ${-offsetY}px)`,
        }}
      />
    </span>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <li className="text-center">
      <ServiceIcon icon={service.icon} />

      <h3 className="text-background-deep mt-6 text-sm font-bold tracking-[0.16em] uppercase">
        {service.title}
      </h3>
      <p className="text-background-deep/60 mt-4 text-sm leading-relaxed">{service.description}</p>
    </li>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

/** White section: heading plus a 3x2 grid of service cards. */
export default function OurServices() {
  return (
    <section id="services" className="bg-white py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
            {heading.eyebrow}
          </p>
          <h2 className="text-background-deep mt-3 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
            {heading.title}
          </h2>
        </div>

        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </ul>
      </div>
    </section>
  )
}
