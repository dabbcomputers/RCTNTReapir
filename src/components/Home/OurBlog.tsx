// ─── Content ─────────────────────────────────────────────────────────────────

const heading = {
  eyebrow: 'Our blog',
  title: 'Anywhere, anytime towing',
}

type BlogPost = {
  title: string
  excerpt: string
  date: string
  author: string
}

const posts: BlogPost[] = [
  {
    title: 'What You Should Know About Towing Capacity',
    excerpt:
      'What is stopping you from believing in the business of your dreams? Insecurity? Fear? Lack of confidence?',
    date: 'September 26, 2016',
    author: 'Admin',
  },
  {
    title: 'Towing Service - How to Choose a Quality Service',
    excerpt:
      'You can\u2019t truly plan for a road side break-down and road accidents. But in the midst of all the confusion\u2026',
    date: 'September 19, 2016',
    author: 'Admin',
  },
  {
    title: '4 Reasons You May Need Heavy Towing For Your Car',
    excerpt:
      'Your automobile is bound to run into issues, whether it be the brakes or the engine, cars simply are not meant\u2026',
    date: 'September 07, 2016',
    author: 'Admin',
  },
]

// ─── ASSET SLOT ──────────────────────────────────────────────────────────────
// Thumbnail for each post, in the same order as `posts` above.
// Put the files at: src/assets/images/blog-1.jpg  (and blog-2, blog-3)
// then uncomment the imports and list them below.
//
//   import blog1 from '../../assets/images/blog-1.jpg'
//   import blog2 from '../../assets/images/blog-2.jpg'
//   import blog3 from '../../assets/images/blog-3.jpg'
//   const blogImages = [blog1, blog2, blog3]
//
// Any post without an image keeps the placeholder box, so the 4:3 aspect ratio
// and the card height stay correct either way.
const blogImages: (string | undefined)[] = []

// ─── One card ────────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const image = blogImages[index]

  return (
    <li className="flex flex-col">
      <a href="#blog" className="group flex flex-col">
        {image ? (
          <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="bg-background-deep aspect-[4/3] w-full bg-[linear-gradient(135deg,#3c3c3c_0%,#1d1d1d_100%)]"
          />
        )}

        <h3 className="text-background-deep group-hover:text-primary mt-6 text-sm font-bold tracking-[0.04em] transition-colors">
          {post.title}
        </h3>
        <p className="text-background-deep/60 mt-3 text-sm leading-relaxed">{post.excerpt}</p>
        <p className="text-background-deep/45 mt-4 text-xs tracking-[0.14em] uppercase">
          {post.date} · by {post.author}
        </p>
      </a>
    </li>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

/** White section: heading plus a row of three post cards. */
export default function OurBlog() {
  return (
    <section id="blog" className="bg-white pt-10 pb-28 lg:pt-12 lg:pb-32">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-primary text-[11px] font-bold tracking-[0.32em] uppercase">
            {heading.eyebrow}
          </p>
          <h2 className="text-background-deep mt-3 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl">
            {heading.title}
          </h2>
        </div>

        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.title} post={post} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
