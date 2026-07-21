import { useEffect, useState } from 'react'

export default function FloatingActions() {
  const [heroGone, setHeroGone] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('home')
      if (!hero) return
      setHeroGone(hero.getBoundingClientRect().bottom < 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
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
