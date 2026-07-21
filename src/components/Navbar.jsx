import { useState, useEffect } from 'react'

const WA_NUMBER = '917092368305'

const NAV_LINKS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Portfolio', href: '#portfolio' },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setMenuOpen(false)

  const scrollTo = (e, href) => {
    e.preventDefault()
    close()
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
    }, 300) // wait for menu close animation
  }

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark/95 backdrop-blur-xl border-b border-border py-3' : 'bg-transparent py-5'
      }`} role="navigation" aria-label="Main navigation">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={e => scrollTo(e,'#home')}
            className="font-serif italic text-[24px] font-medium tracking-[0.02em] text-cream leading-none hover:text-gold transition-colors duration-300"
            aria-label="Sandy Makeover – go to top">
            Sandy Makeover
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} onClick={e => scrollTo(e, href)}
                className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-cream/90 hover:text-gold transition-colors duration-300 min-h-[44px] flex items-center">
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — min 44×44px */}
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-3 border border-border text-cream hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300 min-h-[44px]"
            aria-label="Book your makeup date">
            Book your date
          </button>

          {/* Hamburger — 44×44px tap target */}
          <button
            className="md:hidden w-11 h-11 flex flex-col gap-[5px] items-center justify-center rounded-md"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu">
            <span className={`block w-6 h-px bg-cream transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[59] bg-dark/60 backdrop-blur-sm transition-opacity duration-400 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 bottom-0 z-[60] w-[80vw] max-w-[320px] bg-dark-2 border-l border-border flex flex-col justify-between transition-transform duration-400 ease-out md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="font-serif italic text-[20px] text-gold">Sandy Makeover</span>
          <button onClick={close}
            className="w-11 h-11 flex items-center justify-center text-cream/60 hover:text-cream transition-colors rounded-md"
            aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links with staggered fade-in */}
        <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a key={href} href={href} onClick={e => scrollTo(e, href)}
              className="min-h-[52px] flex items-center font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-cream/80 hover:text-gold border-b border-border/40 transition-colors duration-200"
              style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : '0ms' }}>
              {label}
            </a>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-8 pt-4 border-t border-border">
          <button
            onClick={() => { close(); window.dispatchEvent(new CustomEvent('open-booking-modal')) }}
            className="w-full min-h-[52px] bg-gold text-dark font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-300"
            aria-label="Book your bridal makeup date">
            Book Your Date
          </button>
          <p className="text-center font-sans text-[10px] text-cream/40 mt-4 tracking-wider">
            +91 70923 68305
          </p>
        </div>
      </div>
    </>
  )
}
