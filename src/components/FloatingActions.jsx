import { useEffect, useState } from 'react'

const WA = 'https://wa.me/917092368305'

export default function FloatingActions() {
  const [heroGone,   setHeroGone]   = useState(false)
  const [waVisible,  setWaVisible]  = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWaVisible(true), 2000)
    const onScroll = () => {
      const hero = document.getElementById('home')
      if (!hero) return
      setHeroGone(hero.getBoundingClientRect().bottom < 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <>
      {/* WhatsApp float */}
      <a href={WA} target="_blank" rel="noopener noreferrer" id="wa-float" aria-label="Chat on WhatsApp"
        className={`fixed right-5 z-[800] w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-400 ${
          waVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        } ${heroGone ? 'bottom-[82px] md:bottom-5' : 'bottom-5'}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-wa-pulse pointer-events-none" />
      </a>

      {/* Mobile sticky bottom bar */}
      <div className={`fixed bottom-0 inset-x-0 z-[700] md:hidden transition-all duration-500 ${
        heroGone ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="px-4 py-3 bg-dark/95 backdrop-blur-xl border-t border-border">
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id="sticky-book-btn"
            className="block w-full py-4 bg-transparent border border-border-light text-cream text-center font-sans text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300">
            Reserve Your Date
          </button>
        </div>
      </div>
    </>
  )
}
