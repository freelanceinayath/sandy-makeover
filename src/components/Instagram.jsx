import { useState, useEffect } from 'react'
import { Eye, Edit3 } from 'lucide-react'

const DEFAULT_INSTA = [
  { src: '/portfolio_1.png', alt: 'Bridal look' },
  { src: '/portfolio_2.png', alt: 'Eye makeup' },
  { src: '/bridal_makeup.png', alt: 'Bridal beauty' },
  { src: '/portfolio_3.png', alt: 'Hair styling' },
  { src: '/portfolio_4.png', alt: 'Full bridal' },
  { src: '/hair_styling.png', alt: 'Hair artistry' },
]

export default function Instagram() {
  const [posts, setPosts] = useState(DEFAULT_INSTA)

  const loadPosts = () => {
    try {
      const saved = localStorage.getItem('sandy_insta_images')
      if (saved) {
        setPosts(JSON.parse(saved))
      } else {
        setPosts(DEFAULT_INSTA)
      }
    } catch (e) {
      setPosts(DEFAULT_INSTA)
    }
  }

  useEffect(() => {
    loadPosts()
    window.addEventListener('sandy-images-updated', loadPosts)
    return () => window.removeEventListener('sandy-images-updated', loadPosts)
  }, [])

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

        <div className="flex justify-center items-center gap-3 mt-7 reveal delay-200" data-reveal>
          <a href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
            id="instagram-follow-btn"
            className="inline-flex items-center gap-3 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold border border-border-light px-7 py-3 hover:bg-gold hover:text-dark transition-all duration-300">
            <img src="/instagram_logo.png" alt="Instagram Logo" className="w-[18px] h-[18px] object-contain rounded-md" loading="lazy" decoding="async" />
            Follow on Instagram
          </a>

          {/* Quick Admin Edit Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-admin-modal'))}
            title="Upload/Edit Gallery Images (Admin)"
            className="inline-flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-cream/70 border border-border px-4 py-3 hover:border-gold hover:text-gold transition-all duration-300"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manage Photos</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 px-3 md:px-5">
        {posts.map((post, i) => (
          <a key={`${post.src}-${i}`} href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
            className={`group relative aspect-square overflow-hidden border border-border hover:border-border-light transition-all duration-400 reveal-scale ${i%3===1?'delay-100':i%3===2?'delay-200':''}`}
            data-reveal>
            <img src={post.src} alt={post.alt || 'Sandy Makeover bridal'} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]" />
            
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
