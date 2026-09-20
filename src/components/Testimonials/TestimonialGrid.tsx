// ─── Content ─────────────────────────────────────────────────────────────────
//
// The reference lays these out 2 / 1 / 3: two across, then one wide, then three.
// `span` drives that on the grid (6 columns total at md and up).

type Testimonial = {
  quote: string
  author: string
  role: string
  span: 2 | 3 | 6
  /** Key into the avatar map below. */
  avatarKey: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Shank porchetta swine beef pork belly. T-bone sausage andouille burgdoggen biltong pork. Pastrami venison picanha pork chop t-bone pork loin spare ribs landjaeger.',
    author: 'Lulu Russell',
    role: 'Director',
    span: 3,
    avatarKey: 'lulu',
  },
  {
    quote:
      'Beef ribs filet mignon leberkas, flank jowl chicken kielbasa strip steak turducken. Spare ribs fatback porchetta pancetta andouille biltong. Pastrami sirloin short loin.',
    author: 'Rachel Jensen',
    role: 'Administrator',
    span: 3,
    avatarKey: 'rachel',
  },
  {
    quote:
      'Short loin frankfurter filet mignon, turkey tongue pastrami ribeye prosciutto ground round salami boudin. Meatloaf sirloin pig, sausage swine hamburger pork ground round chicken ribeye biltong meatball. Bacon prosciutto shankle, rump beef meatloaf jerky chuck hamburger picanha.',
    author: 'Curtis Harrington',
    role: 'Manager',
    span: 6,
    avatarKey: 'curtis',
  },
  {
    quote:
      'Cupim fatback sausage ground round venison bacon tail drumstick brisket pork chop andouille.',
    author: 'Verna Daniel',
    role: 'Sales manager',
    span: 2,
    avatarKey: 'verna',
  },
  {
    quote:
      'Prosciutto t-bone jerky, sirloin filet mignon jowl pork chop beef ribs bacon. Pork loin pig tenderloin meatball.',
    author: 'Rosetta Alvarez',
    role: 'CEO',
    span: 2,
    avatarKey: 'rosetta',
  },
  {
    quote:
      'Strip steak boudin pork chop, picanha pork loin corned beef beef ribs porchetta filet mignon.',
    author: 'Esther Bates',
    role: 'Comercial director',
    span: 2,
    avatarKey: 'esther',
  },
]

// ─── ASSET SLOT ──────────────────────────────────────────────────────────────
// Portrait for each person, keyed by `avatarKey` above.
// Put the files at src/assets/images/ then uncomment the imports and fill the map.
//
//   import lulu from '../../../assets/images/lulu.jpg'
//   const avatars = { lulu }
//
// Anyone without an image keeps a neutral placeholder circle, so the card
// height and alignment stay identical either way.
const avatars: Record<string, string | undefined> = {}

// Tailwind needs the full class name present in the source, so the spans are
// written out rather than built from a template string.
const spanClass: Record<Testimonial['span'], string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  6: 'md:col-span-6',
}

/** Grid of quotes with a centred portrait per card, on a white background. */
export default function TestimonialGrid() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <ul className="grid gap-x-10 gap-y-20 md:grid-cols-6 lg:gap-x-14">
          {testimonials.map((item) => {
            const avatar = avatars[item.avatarKey]

            return (
              <li key={item.author} className={`${spanClass[item.span]} text-center`}>
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="bg-border mx-auto block h-20 w-20 rounded-full"
                  />
                )}

                <figure className="mt-8">
                  <blockquote className="text-background-deep/70 mx-auto max-w-xl text-sm leading-loose">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-background-deep text-xs font-bold tracking-[0.24em] uppercase">
                      {item.author}
                    </p>
                    <p className="text-primary mt-1.5 text-[11px] tracking-[0.2em] uppercase">
                      {item.role}
                    </p>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
