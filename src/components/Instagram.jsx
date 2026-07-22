import { Eye } from 'lucide-react'

const INSTA = [
  { src:'/insta_hair_1.jpg', alt:'Sandy Makeover half-up bridal curls with floral accessory', type: 'image' },
  { src:'/insta_hair_2.jpg', alt:'Sandy Makeover intricate braid with pearl detailing', type: 'image' },
  { src:'/insta_hair_3.jpg', alt:'Sandy Makeover textured high bun bridal updo', type: 'image' },
  { src:'/portfolio_1.png', alt:'Sandy Makeover luxury bridal HD makeup look', type: 'image' },
  { src:'/portfolio_2.png', alt:'Sandy Makeover bridal eye makeup artistry', type: 'image' },
  { src:'/portfolio_3.png', alt:'Sandy Makeover South Indian bridal styling', type: 'image' },
]

export default function Instagram() {
  return (
    <section className="bg-dark py-14 md:py-[72px]" id="instagram">
      <div className="max-w-[600px] mx-auto px-4 text-center mb-12">
        <span className="section-label mb-3 block text-gold tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
          @sandymakeover
        </span>
        <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
          Follow Our
        </h2>
        <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight reveal delay-100" data-reveal>
          Wedding Stories
        </p>
        <a href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
          id="instagram-follow-btn"
          className="inline-flex items-center gap-3 mt-7 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold border border-border-light px-7 py-3 hover:bg-gold hover:text-dark transition-all duration-300 reveal delay-200"
          data-reveal>
          <img src="/instagram_logo.png" alt="Instagram Logo" className="w-[18px] h-[18px] object-contain rounded-md" loading="lazy" decoding="async" />
          Follow on Instagram
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 px-3 md:px-5">
        {INSTA.map((post, i) => (
          <a key={post.src} href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
            className={`group relative aspect-square overflow-hidden border border-border hover:border-border-light transition-all duration-400 reveal-scale ${i%3===1?'delay-100':i%3===2?'delay-200':''}`}
            data-reveal>
            {post.type === 'video' ? (
              <video src={post.src} loop muted autoPlay playsInline
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]" />
            ) : (
              <img src={post.src} alt={post.alt} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]" />
            )}
            <div className="absolute inset-0 bg-gold/75 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <Eye className="w-5 h-5 text-dark" strokeWidth={2} />
              <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-dark">View Post</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
