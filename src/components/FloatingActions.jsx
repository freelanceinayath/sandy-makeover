import { useEffect, useState } from 'react'

const WA_LINK = 'https://wa.me/917092368305?text=Hi%20Sandy%20Makeover!%20I%20would%20like%20to%20book%20a%20bridal%20makeup%20appointment.'

export default function FloatingActions() {
  const [heroGone, setHeroGone] = useState(false)

  useEffect(() => {
    let rafId
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const isHeroGone = window.scrollY > (window.innerHeight - 100)
        setHeroGone((prev) => (prev !== isHeroGone ? isHeroGone : prev))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* ── Sticky WhatsApp button (desktop + mobile) ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sandy Makeover on WhatsApp"
        className={`fixed bottom-6 right-5 z-[690] w-14 h-14 rounded-full flex items-center justify-center shadow-luxury-lg transition-all duration-500 ${
          heroGone ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
        style={{ background: '#25D366' }}>
        {/* Official WhatsApp SVG icon */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16c0 2.44.644 4.73 1.77 6.71L2 30l7.47-1.74A13.938 13.938 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.84-1.6l-.42-.25-4.43 1.03 1.06-4.32-.27-.44A11.46 11.46 0 014.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5z"
            fill="white"/>
          <path
            d="M21.8 18.8c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.76.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35z"
            fill="white"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-wa-pulse" style={{ background: 'rgba(37,211,102,0.35)' }} aria-hidden="true" />
      </a>

      {/* ── Mobile sticky bottom bar (Book Your Date) — shown after hero ── */}
      <div className={`fixed bottom-0 inset-x-0 z-[700] md:hidden transition-all duration-500 ${
        heroGone ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="px-4 py-3 bg-dark/95 backdrop-blur-xl border-t border-border">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            id="sticky-book-btn"
            className="block w-full min-h-[48px] bg-transparent border border-border-light text-cream text-center font-sans text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300"
            aria-label="Book your bridal makeup date">
            Book Your Date
          </button>
        </div>
      </div>
    </>
  )
}
