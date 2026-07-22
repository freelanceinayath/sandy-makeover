import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

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
      {/* Mobile sticky bottom bar */}
      <div className={`fixed bottom-0 inset-x-0 z-[700] md:hidden transition-all duration-500 ${
        heroGone ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'}`}
        aria-hidden={!heroGone}>
        <div className="px-4 py-3 bg-dark/95 backdrop-blur-xl border-t border-border">
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id="sticky-book-btn"
            tabIndex={heroGone ? 0 : -1}
            aria-label="Book your date sticky button"
            className="w-full btn-gold-cta py-3.5 text-[11px] font-bold">
            <Sparkles className="w-4 h-4 text-dark fill-dark/30 flex-shrink-0" />
            <span>Book Your Date</span>
          </button>
        </div>
      </div>
    </>
  )
}
