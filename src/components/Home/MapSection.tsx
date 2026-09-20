/**
 * Full-width map strip, sitting between the contact band and the footer.
 *
 * Location taken from the Google Maps link the client supplied:
 * https://maps.app.goo.gl/MgwERvr9Meknje3bA
 * → Royal Canadian Truck & Trailer Repairs Inc., 43.4510659, -80.4009931
 *
 * The plain `output=embed` endpoint is used rather than the /maps/place/ URL
 * because the place URL sends X-Frame-Options: SAMEORIGIN and refuses to render
 * inside an iframe without an API key.
 *
 * Note: the same embed URL also lives in components/Contact/ContactSection.tsx,
 * which pairs the map with the contact form. Components here are deliberately
 * self-contained, so moving the business to a new location means updating the
 * coordinates in both files.
 */
const mapEmbedUrl = 'https://www.google.com/maps?q=43.4510659,-80.4009931&z=16&output=embed'

/** Edge-to-edge map, no container or gutters, so it reads as a full-width band. */
export default function MapSection() {
  return (
    <section aria-label="Our location" className="w-full">
      <iframe
        title="Map showing our location"
        src={mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-[320px] w-full border-0 sm:h-[400px] lg:h-[460px]"
      />
    </section>
  )
}
