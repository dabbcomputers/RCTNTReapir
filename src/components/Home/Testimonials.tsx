// ─── Content ─────────────────────────────────────────────────────────────────

const testimonial = {
  quote:
    'Meatloaf laborum velit kielbasa. Drumstick sirloin lorem chicken swine biltong in short ribs duis bresaola. Veniam meatloaf cow incididunt in bacon kevin in pork belly ball tip duis ipsum. Ribeye et aliquip strip steak dolore in anim. officia tongue bacon mollit esse. Ipsum deserunt salami jowl short ribs veniam.',
  author: 'Curtis Harrington',
  role: 'Manager',
}

/** Background supplied by the client — see public/assets/images/. */
const backgroundImage = '/assets/images/testimonials-bg.png'

/**
 * ASSET SLOT — optional portrait of the person quoted.
 * Add the file to public/assets/images/ and set authorImage to it.
 */
const authorImage = ''

// ─── Section ─────────────────────────────────────────────────────────────────

/**
 * Dark section: a single centred testimonial over a full-bleed background image.
 *
 * The supplied image is already dark (dominant #272727, matching the reference
 * band), so no scrim is layered on top. The solid bg-surface is kept underneath
 * as a fallback if the image ever fails.
 */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-surface relative isolate overflow-hidden py-14 lg:py-16"
    >
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
        <figure className="mx-auto max-w-3xl text-center">
          {authorImage && (
            <img
              src={authorImage}
              alt=""
              className="mx-auto mb-8 h-16 w-16 rounded-full object-cover"
            />
          )}

          <blockquote className="text-foreground/75 text-base leading-loose lg:text-lg">
            {testimonial.quote}
          </blockquote>

          <figcaption className="mt-10">
            <p className="text-foreground text-sm font-bold tracking-[0.24em] uppercase">
              {testimonial.author}
            </p>
            <p className="text-primary mt-2 text-xs tracking-[0.2em] uppercase">
              {testimonial.role}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
