import { useEffect, useRef } from 'react'

/**
 * Custom luxury cursor — gold dot + following ring.
 * Only enabled on desktop (pointer: fine).
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafRef  = useRef(null)
  const hovered = useRef(false)

  useEffect(() => {
    // Only run on devices with a fine pointer (desktop/laptop)
    if (!window.matchMedia('(pointer:fine)').matches) return

    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    // Show cursors
    dot.style.opacity = '1'
    rng.style.opacity = '1'
    document.body.style.cursor = 'none'

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`
    }

    const onEnter = () => {
      hovered.current = true
      dot.style.transform += ' scale(2)'
      rng.style.transform = rng.style.transform?.replace(/scale\([^)]+\)/,'') + ' scale(1.5) translate(-50%,-50%)'
    }

    const onLeave = () => { hovered.current = false }

    // Lerp ring to follow dot
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      rng.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%) ${hovered.current ? 'scale(1.5)' : 'scale(1)'}`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const interactives = document.querySelectorAll('a, button, [role="button"], .service-card, .masonry-item')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      el.style.cursor = 'none'
    })

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.style.cursor = ''
      })
    }
  }, [])

  return (
    <>
      {/* Gold dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99998] w-2 h-2 rounded-full bg-gold pointer-events-none opacity-0 transition-transform duration-[80ms]"
        style={{ willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99997] w-9 h-9 rounded-full border border-gold/40 pointer-events-none opacity-0"
        style={{ willChange: 'transform', transition: 'border-color 0.3s, opacity 0.3s' }}
      />
    </>
  )
}
