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
    "@graph": [
      {
        "@type": "BeautySalon",
        "@id": "https://sandymakeover.vercel.app/#salon",
        "name": "Sandy Makeover",
        "alternateName": ["Sandy Makeover Chennai", "Sandy Makeover Bridal Studio", "Sandy Makeover Hair Artistry"],
        "description": "Sandy Makeover is Chennai's premier luxury bridal makeup artist studio, groom styling specialist, and hair artistry expert. Delivering HD waterproof 16-hour wear bridal makeup for weddings, engagements, and receptions.",
        "url": "https://sandymakeover.vercel.app",
        "telephone": "+91 70923 68305",
        "email": "sandymakeover@gmail.com",
        "priceRange": "₹₹₹",
        "logo": "https://sandymakeover.vercel.app/owner.jpg",
        "image": "https://sandymakeover.vercel.app/hero_bride_real.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chennai Citywide & Destination Travel",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 13.0827,
          "longitude": 80.2707
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "520",
          "bestRating": "5",
          "worstRating": "1"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "07:00",
          "closes": "20:00"
        },
        "sameAs": [
          "https://instagram.com/sandymakeover",
          "https://wa.me/917092368305"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://sandymakeover.vercel.app/#website",
        "url": "https://sandymakeover.vercel.app",
        "name": "Sandy Makeover",
        "publisher": {
          "@id": "https://sandymakeover.vercel.app/#salon"
        }
      },
      {
        "@type": "Person",
        "@id": "https://sandymakeover.vercel.app/#artist",
        "name": "Sandy",
        "jobTitle": "Lead Luxury Bridal Makeup Artist & Stylist",
        "worksFor": {
          "@id": "https://sandymakeover.vercel.app/#salon"
        },
        "image": "https://sandymakeover.vercel.app/owner.jpg",
        "sameAs": [
          "https://instagram.com/sandymakeover"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Sandy Makeover Home",
            "item": "https://sandymakeover.vercel.app/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does Sandy Makeover offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sandy Makeover offers luxury bridal makeup, groom grooming, reception styling, engagement makeup, and South Indian wedding hair artistry with home service available across Chennai."
            }
          },
          {
            "@type": "Question",
            "name": "How to book Sandy Makeover for a wedding date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can book Sandy Makeover directly via WhatsApp or phone at +91 70923 68305 or use the online booking modal on https://sandymakeover.vercel.app."
            }
          }
        ]
      }
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
