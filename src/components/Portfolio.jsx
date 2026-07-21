import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const CATEGORIES = ['All', 'Bridal', 'Groom', 'Hairstyling', 'Details']

const IMAGES = [
  { src: '/portfolio_bride_front.png',        alt: 'Royal Heritage South Indian Bridal Look', category: 'Bridal' },
  { src: '/portfolio_groom_blue_front.jpg',   alt: 'Royal Groom Styling - Navy Patterned Sherwani', category: 'Groom' },
  { src: '/portfolio_2.png',                  alt: 'Intricate Kohl Eyes & Flawless Glam Details', category: 'Details' },
  { src: '/portfolio_bride_profile.png',       alt: 'Traditional Temple Jewelry & Muhurtham Glow', category: 'Bridal' },
  { src: '/portfolio_groom_suit_front.jpg',   alt: 'Modern Red Carpet Groom Look - Black Satin Lapel', category: 'Groom' },
  { src: '/portfolio_3.png',                  alt: 'Elegant Floral Gajra & Braided Artistry', category: 'Hairstyling' },
  { src: '/portfolio_4.png',                  alt: 'Bespoke Reception Glam with Delicate Veil', category: 'Bridal' },
  { src: '/portfolio_groom_gold_pearl.jpg',   alt: 'Classic Gold Sherwani paired with Royal Pearls', category: 'Groom' },
  { src: '/portfolio_6.png',                  alt: 'Editorial Veil Portrait & Soft Dewy Finish', category: 'Details' },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  // Filter logic
  const filteredImages = activeCategory === 'All'
    ? IMAGES
    : IMAGES.filter(img => img.category === activeCategory)

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape')     setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % filteredImages.length)
      if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + filteredImages.length) % filteredImages.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, filteredImages])

  const next = useCallback(() => {
    if (lightbox === null) return
    setLightbox(i => (i + 1) % filteredImages.length)
  }, [lightbox, filteredImages.length])

  const prev = useCallback(() => {
    if (lightbox === null) return
    setLightbox(i => (i - 1 + filteredImages.length) % filteredImages.length)
  }, [lightbox, filteredImages.length])

  return (
    <section className="bg-dark-2 py-[100px] overflow-hidden" id="portfolio">
      {/* Section Headers */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 mb-10 text-center">
        <p className="section-label mb-5" data-reveal>Our Portfolio</p>
        <h2 className="font-serif font-light text-cream mb-2 reveal"
          style={{ fontSize: 'clamp(32px,5vw,60px)' }} data-reveal>
          Every Look,
        </h2>
        <h2 className="font-script text-gold reveal delay-100"
          style={{ fontSize: 'clamp(38px,6vw,70px)' }} data-reveal>
          A Masterpiece
        </h2>
      </div>

      {/* Categories Filter Tabs (Desktop view optimized) */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 px-6 max-w-[800px] mx-auto reveal" data-reveal>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat)
              setLightbox(null)
            }}
            className={`font-sans text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase px-4 py-2.5 transition-all duration-300 relative rounded-sm ${
              activeCategory === cat 
                ? 'text-gold border border-gold/30 bg-gold/5' 
                : 'text-cream/50 border border-transparent hover:text-cream hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Staggered Responsive Portfolio Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pb-8">
        {filteredImages.map((img, i) => (
          <div
            key={img.src}
            className={`group relative overflow-hidden cursor-pointer border border-border/80 hover:border-gold/40 transition-all duration-500 rounded-sm reveal-scale ${
              i % 3 === 1 ? 'md:translate-y-6' : ''
            }`}
            data-reveal
            onClick={() => setLightbox(i)}
          >
            {/* Image Container */}
            <div className={`overflow-hidden transition-all duration-700 aspect-[3/4]`}>
              <img 
                src={img.src} 
                alt={img.alt} 
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-[1.06]" 
              />
            </div>

            {/* Luxury Gold Border Overlay on Hover (Desktop only highlight) */}
            <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 pointer-events-none z-10" />

            {/* Cinematic Gradient Details Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 z-20">
              <span className="font-serif italic text-gold text-[13px] tracking-wider mb-1.5">
                {img.category} Styling
              </span>
              <p className="font-sans text-[10px] text-cream/80 tracking-[0.12em] uppercase leading-relaxed font-light">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Cinematic Lightbox */}
      {lightbox !== null && (
        <div 
          className="fixed inset-0 z-[9999] bg-dark/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Blurred background image mirror */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-20 transition-all duration-500 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${filteredImages[lightbox].src})` }}
          />

          {/* Close Button */}
          <button 
            className="absolute top-5 right-6 w-10 h-10 border border-border/50 text-cream/60 hover:text-cream hover:border-cream/80 flex items-center justify-center rounded-full transition-all duration-300 z-50 bg-dark/50" 
            onClick={() => setLightbox(null)}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Navigation - Left */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-border/40 text-cream/50 hover:border-gold hover:text-gold flex items-center justify-center rounded-full transition-all duration-300 z-50 bg-dark/40 backdrop-blur-sm"
            onClick={e => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Core Image Display Frame */}
          <div 
            className="relative border border-border/60 max-w-[88vw] max-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-dark-3/60 backdrop-blur-md rounded-sm"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={filteredImages[lightbox].src} 
              alt={filteredImages[lightbox].alt}
              className="max-w-full max-h-[70vh] object-contain w-auto h-auto transition-transform duration-500" 
            />
            {/* Sliding text information bar at bottom */}
            <div className="w-full bg-dark-2/90 border-t border-border/40 p-5 text-center">
              <span className="font-serif italic text-gold text-[14px] tracking-wide block mb-1">
                {filteredImages[lightbox].category} Look
              </span>
              <p className="font-sans text-[10px] tracking-[0.14em] uppercase text-cream/70 font-light max-w-[500px] mx-auto">
                {filteredImages[lightbox].alt}
              </p>
            </div>
          </div>

          {/* Navigation - Right */}
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-border/40 text-cream/50 hover:border-gold hover:text-gold flex items-center justify-center rounded-full transition-all duration-300 z-50 bg-dark/40 backdrop-blur-sm"
            onClick={e => { e.stopPropagation(); next() }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Look Number Indicator */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.2em] text-cream/30">
            {lightbox + 1} / {filteredImages.length}
          </span>
        </div>
      )}
    </section>
  )
}
