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
import SEO           from './SEO'
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

  const salonSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Sandy Makeover",
    "description": "Premium luxury bridal makeup, groom styling, and hair artistry. Custom timeless beauty designs for weddings, engagements, and receptions.",
    "url": "https://sandymakeover.vercel.app",
    "telephone": "+91 70923 68305",
    "priceRange": "₹₹₹",
    "image": "https://sandymakeover.vercel.app/owner.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "07:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://instagram.com/sandymakeover",
      "https://wa.me/917092368305"
    ]
  }

  return (
    <div className="w-full">
      {/* Dynamic SEO Meta + Structured JSON-LD Schema */}
      <SEO 
        title="Sandy Makeover"
        description="Sandy Makeover offers luxury bridal makeup, groom styling, engagement & reception makeup, and wedding hair artistry. Available citywide in Chennai."
        canonical="/"
        schema={salonSchema}
      />

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
