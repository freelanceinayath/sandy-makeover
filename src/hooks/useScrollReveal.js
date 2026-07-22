import { useEffect } from 'react'

/**
 * Robust scroll-reveal hook.
 * Guarantees all [data-reveal] elements transition to 'in-view' when visible.
 */
export function useScrollReveal() {
  useEffect(() => {
    const revealAllInViewport = () => {
      const els = document.querySelectorAll('[data-reveal]:not(.in-view)')
      const vh = window.innerHeight || document.documentElement.clientHeight
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= vh + 100 && rect.bottom >= -100) {
          el.classList.add('in-view')
        }
      })
    }

    // 1. Instant check on mount
    revealAllInViewport()

    // 2. IntersectionObserver with generous margins
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0, rootMargin: '100px 0px 100px 0px' }
    )

    els.forEach((el) => io.observe(el))

    // 3. Safety fallback timer to guarantee no stuck elements
    const t1 = setTimeout(revealAllInViewport, 200)
    const t2 = setTimeout(revealAllInViewport, 800)

    window.addEventListener('scroll', revealAllInViewport, { passive: true })
    window.addEventListener('resize', revealAllInViewport, { passive: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      io.disconnect()
      window.removeEventListener('scroll', revealAllInViewport)
      window.removeEventListener('resize', revealAllInViewport)
    }
  }, [])
}
