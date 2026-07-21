import { useEffect, useState, useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'

const WA_LINK = 'https://wa.me/917092368305'

/* ── Polaroid data ── */
const POLAROIDS = [
  {
    src: '/hero_makeup_real.png',
    caption: 'the makeup',
    alt: 'Sandy Makeover – professional bridal makeup application',
    // initial off-screen position for entrance
    from: { x: -180, y: -60, rotate: -28, scale: 0.5 },
    // resting position on screen
    to:   { x: -105, y:  14, rotate: -12, scale: 1, zIndex: 5 },
    float: { y: [-6, 6], dur: 5.2 },
  },
  {
    src: '/hero_bride_real.png',
    caption: 'the bride',
    alt: 'Sandy Makeover – radiant bridal look',
    from: { x: 0, y: 200, rotate: 0, scale: 0.4 },
    to:   { x: 0, y: 50, rotate: 2, scale: 1.08, zIndex: 20 },
    float: { y: [-8, 8], dur: 6.5 },
    isCenter: true,
  },
  {
    src: '/hero_groom_real.png',
    caption: 'the groom',
    alt: 'Sandy Makeover – groom styling',
    from: { x: 180, y: -60, rotate: 28, scale: 0.5 },
    to:   { x: 105, y: 10, rotate: 11, scale: 1, zIndex: 5 },
    float: { y: [-5, 9], dur: 4.8 },
  },
]

/* ── Sparkle positions (relative %) ── */
const SPARKLES = [
  { id: 1, top: '8%',  left: '12%', size: 10, delay: 0.2, dur: 2.4 },
  { id: 2, top: '18%', left: '82%', size: 7,  delay: 0.8, dur: 3.1 },
  { id: 3, top: '72%', left: '6%',  size: 8,  delay: 1.5, dur: 2.8 },
  { id: 4, top: '80%', left: '88%', size: 6,  delay: 0.5, dur: 3.5 },
  { id: 5, top: '40%', left: '3%',  size: 5,  delay: 1.1, dur: 2.1 },
  { id: 6, top: '55%', left: '94%', size: 9,  delay: 0.3, dur: 2.9 },
  { id: 7, top: '90%', left: '45%', size: 6,  delay: 1.8, dur: 3.2 },
]

/* ── Sparkle SVG ── */
function Sparkle({ top, left, size, delay, dur }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90, 180] }}
      transition={{ delay, duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <path
          d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
          fill="#C3A359"
          fillOpacity="0.85"
        />
      </svg>
    </motion.div>
  )
}

/* ── Single animated polaroid card ── */
function PolaroidCard({ p, index, mouseX, mouseY, containerRef }) {
  const cardRef = useRef(null)

  // Per-card spring tilt: reads global mouse position relative to section centre
  const rotateXSpring = useSpring(0, { stiffness: 80, damping: 20 })
  const rotateYSpring = useSpring(0, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const unsub1 = mouseX.on('change', (mx) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const pct = (mx - cx) / (rect.width / 2)
      // side cards tilt more, center card less
      const factor = p.isCenter ? 4 : 7
      rotateYSpring.set(pct * factor)
    })
    const unsub2 = mouseY.on('change', (my) => {
      const rect = el.getBoundingClientRect()
      const cy = rect.top + rect.height / 2
      const pct = (my - cy) / (rect.height / 2)
      const factor = p.isCenter ? 3 : 5
      rotateXSpring.set(-pct * factor)
    })
    return () => { unsub1(); unsub2() }
  }, [mouseX, mouseY, containerRef, p.isCenter, rotateXSpring, rotateYSpring])

  return (
    <motion.div
      ref={cardRef}
      className="absolute"
      style={{
        width: p.isCenter ? '44%' : '38%',
        zIndex: p.to.zIndex,
        // Start position
        x: p.from.x,
        y: p.from.y,
        rotate: p.from.rotate,
        scale: p.from.scale,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
        // Final resting horizontal offset
        left: p.isCenter ? '50%' : index === 0 ? '6%' : 'auto',
        right: index === 2 ? '4%' : 'auto',
        marginLeft: p.isCenter ? '-22%' : 0,
        top: p.isCenter ? '28%' : '5%',
      }}
      animate={{
        x: p.to.x,
        y: p.to.y,
        rotate: p.to.rotate,
        scale: p.to.scale,
      }}
      transition={{
        delay: 0.3 + index * 0.22,
        type: 'spring',
        stiffness: 55,
        damping: 14,
        mass: 0.9,
      }}
      whileHover={{
        scale: p.to.scale * 1.07,
        zIndex: 50,
        transition: { type: 'spring', stiffness: 200, damping: 18 },
      }}
    >
      {/* Floating bob — using motion keyframes via custom CSS animation layered on top */}
      <motion.div
        animate={{ y: p.float.y }}
        transition={{
          duration: p.float.dur,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: index * 0.7,
        }}
      >
        {/* Polaroid frame */}
        <div
          className="polaroid"
          style={{
            boxShadow: p.isCenter
              ? '0 24px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(195,163,89,0.15), 0 0 32px rgba(195,163,89,0.12)'
              : '0 16px 36px rgba(0,0,0,0.55)',
          }}
        >
          <img
            src={p.src}
            alt={p.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="w-full object-cover"
            style={{ aspectRatio: '1', display: 'block' }}
          />
          {/* Gold shimmer overlay on center card */}
          {p.isCenter && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, transparent 30%, rgba(195,163,89,0.12) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          )}
          <div className="polaroid-caption">{p.caption}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   Main Hero Component
═══════════════════════════════════════════ */
export default function Hero() {
  const [step, setStep] = useState(0)
  const heroRef = useRef(null)
  const cardsContainerRef = useRef(null)

  // Smooth mouse tracking for entire section
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const mouseX = useSpring(rawMouseX, { stiffness: 40, damping: 20 })
  const mouseY = useSpring(rawMouseY, { stiffness: 40, damping: 20 })

  // Step-based text entrance
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1250),
      setTimeout(() => setStep(4), 1500),
      setTimeout(() => setStep(5), 1700),
      setTimeout(() => setStep(6), 1900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Mouse tracking
  const onMouseMove = useCallback((e) => {
    rawMouseX.set(e.clientX)
    rawMouseY.set(e.clientY)
  }, [rawMouseX, rawMouseY])

  // Parallax scroll on text
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
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('scroll', onScroll) }
  }, [])

  const cls = (show, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen bg-dark flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 md:pt-28 md:pb-20 px-6"
    >
      {/* ── Cinematic background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2 to-dark pointer-events-none" />
      {/* Radial gold bloom */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(195,163,89,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Sparkles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SPARKLES.map((s) => <Sparkle key={s.id} {...s} />)}
      </div>

      {/* ── Cards Container ── */}
      <div
        ref={cardsContainerRef}
        className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto mb-8"
        style={{ height: 270, perspective: 900 }}
      >
        {POLAROIDS.map((p, i) => (
          <PolaroidCard
            key={p.caption}
            p={p}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            containerRef={cardsContainerRef}
          />
        ))}
      </div>

      {/* ── Text Content ── */}
      <div className="hero-text relative z-20 text-center max-w-[480px] mx-auto">

        {/* Eyebrow */}
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 16, letterSpacing: '0.1em' }}
          animate={step >= 2 ? { opacity: 1, y: 0, letterSpacing: '0.3em' } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          The Art of Bridal Beauty
        </motion.p>

        {/* Title */}
        <h1 className="mb-2 leading-[1.05]">
          <motion.span
            className="block font-serif font-light text-cream italic text-[42px] sm:text-[58px] md:text-[72px] tracking-tight"
            style={{ textShadow: '0 4px 24px rgba(10,4,2,0.7)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 16, delay: 0 }}
          >
            Radiance,
          </motion.span>
          <motion.span
            className="block font-script text-gold text-[38px] sm:text-[52px] md:text-[66px]"
            style={{ textShadow: '0 4px 24px rgba(10,4,2,0.5)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 16, delay: 0.12 }}
          >
            unforgettable.
          </motion.span>
        </h1>

        {/* Animated gold divider / crest */}
        <motion.div
          className="flex justify-center my-5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={step >= 4 ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.1 }}
        >
          <motion.svg
            width="56" height="56" viewBox="0 0 64 64" fill="none"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="32" cy="32" r="22" stroke="#C3A359" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
            <path d="M24 48 L35.2 25.6" stroke="#E2A4A9" strokeWidth="2" strokeLinecap="round"/>
            <path d="M34.4 27.2 L36.8 22.4" stroke="#C3A359" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M36 24 C37.8 20.4, 43 14.4, 46 17 C49 19.6, 43 25.6, 39.4 25.6" stroke="#6B4E3D" strokeWidth="1.2" strokeLinecap="round" fill="#D2BA82" fillOpacity="0.85"/>
            <path d="M40 48 L28.8 25.6" stroke="#E2A4A9" strokeWidth="1.5" strokeLinecap="round" opacity="0.95"/>
            <path d="M29.6 27.2 L27.2 22.4" stroke="#C3A359" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M28 24 C26.8 21.2, 22.8 16.4, 20.8 18.8 C18.8 21.2, 22.8 25.6, 24.6 25.6" stroke="#6B4E3D" strokeWidth="1" strokeLinecap="round" fill="#DECCA4" fillOpacity="0.75"/>
          </motion.svg>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center items-center mb-8"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={step >= 5 ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            id="hero-book-btn"
            className="btn-outline-gold text-[10px] tracking-[0.2em] font-semibold py-3.5 px-8"
            aria-label="Reserve your bridal makeup date"
            whileHover={{
              backgroundColor: '#C3A359',
              color: '#1E0B10',
              borderColor: '#C3A359',
              boxShadow: '0 0 30px rgba(195,163,89,0.45), 0 8px 24px rgba(0,0,0,0.3)',
              scale: 1.04,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            Reserve Your Date
          </motion.button>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-sans text-[16px] font-light text-cream/90 leading-[1.8] max-w-[360px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={step >= 6 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Luxury bridal makeup designed around your personality, traditions, and wedding story.
        </motion.p>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={step >= 6 ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-cream/25">Scroll</span>
      </motion.div>
    </section>
  )
}
