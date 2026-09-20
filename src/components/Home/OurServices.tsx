// ─── Content ─────────────────────────────────────────────────────────────────

const heading = {
  eyebrow: 'Our services',
  title: 'Truck & trailer repair specialists',
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
//   file                      canvas    ink box (x,y,w,h)      pad L/R/T/B
//   on-site-repairs           526x409   3, 85, 508, 305         3/15/85/19
//   engine-diagnostic         470x377   22, 70, 415, 286        22/33/70/21
//   brake-service             427x398   18, 37, 385, 340        18/24/37/21
//   tire-repair               433x428   31, 59, 378, 357        31/24/59/12
//   preventive-maintenance    503x417   16, 98, 469, 290        16/18/98/29
//   miscellaneous             431x392   14, 38, 402, 330        14/15/38/24

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
    title: 'On-Site Repairs',
    icon: {
      src: '/assets/icons/on-site-repairs.png',
      canvas: [526, 409],
      ink: [3, 85, 508, 305],
    },
    description:
      'Duis laboris ball tip jowl sed. Drumstick leberkas tenderloin swine laborum cupim bacon ipsum jowl meatball t-bone.',
  },
  {
    title: 'Engine Diagnostic',
    icon: {
      src: '/assets/icons/engine-diagnostic.png',
      canvas: [470, 377],
      ink: [22, 70, 415, 286],
    },
    description:
      'Bresaola pork consequat exercitation, voluptate pork loin brisket capicola officia incididunt ground round cupim.',
  },
  {
    title: 'Brake Service',
    icon: {
      src: '/assets/icons/brake-service.png',
      canvas: [427, 398],
      ink: [18, 37, 385, 340],
    },
    description:
      'Turkey turducken nulla pork chop shankle biltong ipsum mollit brisket non boudin. Frankfurter porchetta cow aliquip.',
  },
  {
    title: 'Tire Repair and Replacement',
    icon: {
      src: '/assets/icons/tire-repair.png',
      canvas: [433, 428],
      ink: [31, 59, 378, 357],
    },
    description:
      'Shankle pastrami jerky spare ribs pancetta hamburger aute occaecat andouille corned beef quis capicola fugiat ea flank.',
  },
  {
    title: 'Preventive Maintenance',
    icon: {
      src: '/assets/icons/preventive-maintenance.png',
      canvas: [503, 417],
      ink: [16, 98, 469, 290],
    },
    description:
      'T-bone laborum esse tongue, consequat elit short ribs cow cupidatat sed fugiat fatback. Velit dolor frankfurter pork loin.',
  },
  {
    title: 'Miscellaneous',
    icon: {
      src: '/assets/icons/miscellaneous.png',
      canvas: [431, 392],
      ink: [14, 38, 402, 330],
    },
    description:
      'Strip steak turkey prosciutto exercitation cillum elit. Enim ham velit aute jerky ras. Anim landjaeger andouille.',
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
