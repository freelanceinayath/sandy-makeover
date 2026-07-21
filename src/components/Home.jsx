import { useEffect } from 'react'
import Hero          from './Hero'
import Editorial     from './Editorial'
import Ticker        from './Ticker'
import Transformation from './Transformation'
import Services      from './Services'
import Portfolio     from './Portfolio'
import Why           from './Why'
import Reviews       from './Reviews'
import Instagram     from './Instagram'
import Booking       from './Booking'
import FinalCTA      from './FinalCTA'
import BookingModal  from './BookingModal'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Home() {
  // Activate scroll-reveal for all [data-reveal] elements
  useScrollReveal()

  // Re-run scroll reveal after dynamic content mounts
  useEffect(() => {
    // Small delay lets DOM settle
    const t = setTimeout(() => {
      const evt = new Event('scroll')
      window.dispatchEvent(evt)
    }, 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full">
      {/* 1 — Cinematic Hero */}
      <Hero />

      {/* 2 — Luxury Ticker Strip */}
      <Ticker />

      {/* 3 — Editorial Intro */}
      <Editorial />

      {/* 4 — Services */}
      <Services />

      {/* 5 — Transformation Story */}
      <Transformation />

      {/* 6 — Portfolio Gallery */}
      <Portfolio />

      {/* 7 — Why Sandy Makeover */}
      <Why />

      {/* 8 — Client Reviews Carousel */}
      <Reviews />

      {/* 9 — Instagram Gallery */}
      <Instagram />

      {/* 10 — Booking Journey + FAQ */}
      <Booking />

      {/* 11 — Final CTA */}
      <FinalCTA />

      {/* 12 — Global Booking wizard */}
      <BookingModal />
    </div>
  )
}
