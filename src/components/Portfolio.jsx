import { useState, useEffect, useCallback } from 'react'

const DEFAULT_PORTFOLIO = [
  { src: '/portfolio_groom_blue_front.jpg',   alt: 'Groom Styling - Navy Patterned Sherwani' },
  { src: '/portfolio_groom_suit_front.jpg',   alt: 'Groom Styling - Gold Sequined Tuxedo' },
  { src: '/portfolio_groom_suit.jpg',         alt: 'Groom Styling - Gold Tuxedo Profile' },
  { src: '/portfolio_groom_blue_cuff.jpg',    alt: 'Groom Styling - Navy Sherwani Cuff Adjust' },
  { src: '/portfolio_groom_gold_pearl.jpg',   alt: 'Groom Styling - Gold Sherwani & Pearls' },
  { src: '/portfolio_groom_casual.jpg',       alt: 'Pre-wedding Groom Grooming Prep' },
]

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null)
  const [images, setImages] = useState(DEFAULT_PORTFOLIO)

  const loadImages = () => {
    try {
      const saved = localStorage.getItem('sandy_portfolio_images')
      if (saved) {
        setImages(JSON.parse(saved))
      } else {
        setImages(DEFAULT_PORTFOLIO)
      }
    } catch (e) {
      setImages(DEFAULT_PORTFOLIO)
    }
  }

  useEffect(() => {
    loadImages()
    window.addEventListener('sandy-images-updated', loadImages)
    return () => window.removeEventListener('sandy-images-updated', loadImages)
  }, [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape')     setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, images.length])

  const next = useCallback(() => setLightbox(i => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setLightbox(i => (i - 1 + images.length) % images.length), [images.length])

  return (
    <section className="bg-dark-2 py-14 md:py-[72px]" id="portfolio">
      <div className="max-w-[600px] mx-auto px-4 mb-12 text-center">
        <span className="section-label mb-3 block text-gold tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
          Our Portfolio
        </span>
        <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
          Every Look,
        </h2>
        <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight reveal delay-100" data-reveal>
          A Masterpiece
        </p>
      </div>

      {/* Masonry grid */}
      <div className="px-3 md:px-6 columns-2 md:columns-3 gap-3">
        {images.map((img, i) => (
          <div key={`${img.src}-${i}`}
            className={`group relative overflow-hidden cursor-pointer mb-3 break-inside-avoid border border-border hover:border-border-light transition-all duration-500 reveal-scale ${i % 3 === 1 ? 'delay-100' : i % 3 === 2 ? 'delay-200' : ''}`}
            data-reveal onClick={() => setLightbox(i)}>
            <div className={`overflow-hidden img-zoom ${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-square'}`}>
              <img src={img.src} alt={img.alt || 'Portfolio masterpiece'} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-400">
              <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream border border-cream/40 px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] bg-[rgba(12,5,2,0.97)] flex items-center justify-center"
          role="dialog" aria-modal="true" aria-label="Image gallery lightbox"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-6 text-cream/60 hover:text-cream text-2xl p-2" aria-label="Close image lightbox" onClick={() => setLightbox(null)}>✕</button>
          <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-border text-cream/70 hover:border-gold hover:text-gold flex items-center justify-center text-2xl transition-all"
            aria-label="Previous image"
            onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <img src={images[lightbox].src} alt={images[lightbox].alt}
            className="max-w-[88vw] max-h-[88vh] object-contain w-auto h-auto"
            style={{ display:'block' }} onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-border text-cream/70 hover:border-gold hover:text-gold flex items-center justify-center text-2xl transition-all"
            aria-label="Next image"
            onClick={e => { e.stopPropagation(); next() }}>›</button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.2em] text-cream/70">
            {lightbox + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  )
}
