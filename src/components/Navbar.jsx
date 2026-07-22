import { useState, useEffect, useRef } from 'react'

const WA_NUMBER = '917092368305'
const WA_LINK   = `https://wa.me/${WA_NUMBER}`

const NAV_LINKS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Videos',    href: '#instagram' },
  { label: 'Reviews',   href: '#reviews'   },
  { label: 'Book',      href: '#booking'   },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    let rafId
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 60
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  const scrollTo = (e, href) => {
    e.preventDefault(); close()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark/95 backdrop-blur-xl border-b border-border py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={e => scrollTo(e,'#home')}
            className="font-serif italic text-[24px] font-medium tracking-[0.02em] text-cream leading-none hover:text-gold transition-colors duration-300">
            Sandy Makeover
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} onClick={e => scrollTo(e, href)}
                className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-cream/90 hover:text-gold transition-colors duration-300">
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-2.5 border border-border text-cream hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300">
            Book your date
          </button>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation menu" aria-expanded={menuOpen} aria-controls="mobile-nav">
            <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8.5px]' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div id="mobile-nav" className={`fixed inset-0 z-[60] bg-dark flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!menuOpen}>
        <button className="absolute top-6 right-6 text-cream/50 hover:text-cream text-2xl p-2" onClick={close} aria-label="Close navigation menu">✕</button>
        <div className="flex flex-col items-center gap-10">
          <div className="font-serif italic text-[32px] font-medium text-gold mb-2">Sandy Makeover</div>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scrollTo(e, href)}
              className="font-sans text-[12px] font-semibold tracking-[0.24em] uppercase text-cream/85 hover:text-gold transition-colors">
              {label}
            </a>
          ))}
          <button onClick={() => { close(); window.dispatchEvent(new CustomEvent('open-booking-modal')) }}
            className="mt-2 btn-outline-gold">
            Book your date
          </button>
          <button onClick={() => { close(); window.dispatchEvent(new CustomEvent('open-admin-media-modal')) }}
            className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-gold/80 hover:text-gold border border-gold/30 px-5 py-2 mt-1">
            🔒 Admin Video Upload
          </button>
        </div>
      </div>
    </>
  )
}
