import { Gem, Award, Plane, Clock } from 'lucide-react'

const FEATURES = [
  { icon: Gem, title: 'Luxury Products',      desc: 'Charlotte Tilbury, MAC, Huda Beauty — only premium cosmetics.' },
  { icon: Award, title: 'Groom & Bride Certified', desc: 'Professional artistry for both brides and grooms.' },
  { icon: Plane, title: 'Home & Venue Service',   desc: 'We travel to your location for ultimate comfort and ease.' },
  { icon: Clock, title: '16-Hour Wear',           desc: 'Sweat-proof, camera-ready formulas that last all day.' },
]

export default function Why() {
  return (
    <section className="bg-dark py-12 md:py-[56px] overflow-hidden" id="why">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Title */}
        <div className="text-center mb-10 max-w-[600px] mx-auto px-4">
          <span className="section-label mb-3 block text-gold tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
            Why Choose Us
          </span>
          <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
            The Sandy Makeover
          </h2>
          <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight reveal delay-100" data-reveal>
            Difference
          </p>
        </div>

        {/* Swipeable Carousel for Mobile, Clean Grid for Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={f.title}
                className="snap-center w-[85vw] max-w-[320px] md:w-auto md:max-w-none flex-shrink-0 bg-[#32131A]/30 border border-gold/15 p-8 text-center transition-all duration-500 reveal shadow-luxury-sm"
                style={{ transitionDelay: `${i * 100}ms` }}
                data-reveal>
                <div className="flex justify-center text-gold mb-5">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[20px] font-medium text-gold mb-3">{f.title}</h3>
                <p className="font-sans text-[13px] font-light text-cream/80 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Swipe Indicator (Visible only on mobile) */}
        <div className="flex justify-center items-center gap-2 mt-2 md:hidden">
          {FEATURES.map((_, idx) => (
            <div key={idx} className="w-1.5 h-1.5 rounded-full bg-gold/30 first:bg-gold" />
          ))}
        </div>

      </div>
    </section>
  )
}
