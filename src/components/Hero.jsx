import { useEffect, useState, useRef } from 'react'

const WA_LINK = 'https://wa.me/917092368305'

const POLAROIDS = [
  { src: '/hero_makeup_real.png', caption: 'the makeup', alt: 'Sandy Makeover – professional bridal makeup application', rotate: '-10deg', delay: 0.1 },
  { src: '/hero_bride_real.png',  caption: 'the bride',  alt: 'Sandy Makeover – radiant bridal look',  rotate: '2deg',   delay: 0.3, isCenter: true },
  { src: '/hero_groom_real.png',  caption: 'the groom',  alt: 'Sandy Makeover – groom styling',  rotate: '8deg',   delay: 0.5 },
]

export default function Hero() {
  const [step, setStep] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 500),
      setTimeout(() => setStep(3), 850),
      setTimeout(() => setStep(4), 1100),
      setTimeout(() => setStep(5), 1300),
      setTimeout(() => setStep(6), 1500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Parallax on scroll for the text content using requestAnimationFrame and translate3d
  useEffect(() => {
    const content = heroRef.current?.querySelector('.hero-text')
    if (!content) return

    let rafId
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const s = window.scrollY
        if (s <= 600) {
          content.style.opacity = String(Math.max(0, 1 - s / 600))
          content.style.transform = `translate3d(0, ${s * 0.12}px, 0)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const cls = (show, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <section id="home" ref={heroRef}
      className="relative min-h-[85vh] md:min-h-screen bg-dark flex flex-col items-center justify-center overflow-hidden pt-16 pb-10 md:pt-24 md:pb-16 px-6">
      
      {/* Cinematic dark vignette background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2 to-dark pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[130px] pointer-events-none" />

      {/* ── Polaroid Stack (Responsive and perfectly bounded) ── */}
      <div className={`relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[380px] aspect-[4/3] mx-auto mb-6 transition-all duration-1000 ${
        step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        {POLAROIDS.map((p, i) => (
          <div
            key={p.caption}
            className="polaroid absolute"
            style={{
              width: i === 1 ? '32%' : '30%',
              left: i === 0 ? '4%' : i === 1 ? '34%' : '66%',
              top: i === 0 ? '12%' : i === 1 ? '32%' : '6%',
              rotate: p.rotate,
              zIndex: p.isCenter ? 10 : 1,
              animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <img src={p.src} alt={p.alt} loading={i === 0 ? 'eager' : 'lazy'} className="w-full aspect-square object-cover" />
            <div className="polaroid-caption">{p.caption}</div>
          </div>
        ))}
      </div>

      {/* ── Text Content ── */}
      <div className="hero-text relative z-20 text-center max-w-[460px] mx-auto">
        {/* Eyebrow */}
        <p className={cls(step >= 2, 'section-label mb-4')}>
          The Art of Bridal Beauty
        </p>

        {/* Title */}
        <h1 className="mb-2 leading-[1.1]">
          <span className={`block font-serif font-light text-cream italic transition-all duration-700 ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } text-[42px] sm:text-[60px] md:text-[76px] tracking-tight`}
          style={{ textShadow: '0 4px 18px rgba(10,4,2,0.65)' }}>
            Radiance,
          </span>
          <span className={`block font-script text-gold mt-1 transition-all duration-700 delay-150 ${
            step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } text-[38px] sm:text-[54px] md:text-[68px] mt-1`}
          style={{ textShadow: '0 4px 18px rgba(10,4,2,0.5)' }}>
            unforgettable.
          </span>
        </h1>

        {/* Decorative Makeup Kit Crest (With exact cosmetic colors: blush pink, gold, and brown) */}
        <div className={`flex justify-center my-3 transition-all duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Gold dotted background circle */}
            <circle cx="32" cy="32" r="22" stroke="#C3A359" strokeWidth="0.8" strokeDasharray="3 4" className="opacity-30" />

            {/* Brush 1: Powder Brush (leaning left) */}
            {/* Pink Handle */}
            <path d="M24 48 L35.2 25.6" stroke="#E2A4A9" strokeWidth="2" strokeLinecap="round"/>
            {/* Gold Ferrule */}
            <path d="M34.4 27.2 L36.8 22.4" stroke="#C3A359" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Shaded Bristles (Brown-Gold) */}
            <path d="M36 24 C37.8 20.4, 43 14.4, 46 17 C49 19.6, 43 25.6, 39.4 25.6" stroke="#6B4E3D" strokeWidth="1.2" strokeLinecap="round" fill="#D2BA82" fillOpacity="0.85"/>

            {/* Brush 2: Eyeshadow Brush (leaning right, crossed behind) */}
            {/* Pink Handle */}
            <path d="M40 48 L28.8 25.6" stroke="#E2A4A9" strokeWidth="1.5" strokeLinecap="round" className="opacity-95"/>
            {/* Gold Ferrule */}
            <path d="M29.6 27.2 L27.2 22.4" stroke="#C3A359" strokeWidth="2.2" strokeLinecap="round"/>
            {/* Shaded Bristles */}
            <path d="M28 24 C26.8 21.2, 22.8 16.4, 20.8 18.8 C18.8 21.2, 22.8 25.6, 24.6 25.6" stroke="#6B4E3D" strokeWidth="1" strokeLinecap="round" fill="#DECCA4" fillOpacity="0.75"/>
          </svg>
        </div>

        {/* Call to actions (Now placed above the subtitle) */}
        <div className={cls(step >= 5, 'flex justify-center items-center mb-8')}>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id="hero-book-btn"
            className="btn-outline-gold text-[10px] tracking-[0.2em] font-semibold py-3.5 px-8 hover:bg-gold hover:text-dark transition-all duration-300"
            aria-label="Book your bridal makeup date">
            Book Your Date
          </button>
        </div>

        {/* Subtitle (Now placed below the buttons) */}
        <p className={cls(step >= 6, 'font-sans text-[16px] font-light text-cream/90 leading-[1.8] max-w-[360px] mx-auto')}>
          Luxury bridal makeup designed around your personality, traditions, and wedding story.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-all duration-700 ${
        step >= 6 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent animate-scroll-line" />
        <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-cream/20">Scroll</span>
      </div>
    </section>
  )
}
