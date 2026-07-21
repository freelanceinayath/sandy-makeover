import { Gem, Award, Plane, Clock } from 'lucide-react'

const FEATURES = [
  { icon: Gem, title: 'Luxury Products',      desc: 'Charlotte Tilbury, MAC, Huda Beauty — only premium cosmetics.' },
  { icon: Award, title: 'Groom & Bride Certified', desc: 'Professional artistry for both brides and grooms.' },
  { icon: Plane, title: 'Home & Venue Service',   desc: 'We travel to your location for ultimate comfort and ease.' },
  { icon: Clock, title: '16-Hour Wear',           desc: 'Sweat-proof, camera-ready formulas that last all day.' },
]

export default function Why() {
  return (
    <section className="bg-dark py-[80px] overflow-hidden" id="why">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <p className="section-label mb-4" data-reveal>Why Choose Us</p>
          <h2 className="font-serif font-light text-cream mb-1 reveal"
            style={{ fontSize: 'clamp(28px,4.5vw,52px)' }} data-reveal>The Sandy Makeover</h2>
          <h2 className="font-script text-gold reveal delay-100"
            style={{ fontSize: 'clamp(34px,5.5vw,60px)' }} data-reveal>Difference</h2>
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
