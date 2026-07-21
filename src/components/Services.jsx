const WA = 'https://wa.me/917092368305'

const SERVICES = [
  {
    id: 'bridal', name: 'Bridal Makeup',
    desc: 'Flawless, long-lasting bridal makeup with premium products. Custom looks crafted for your dream day.',
    img: '/service_bridal_real.png', tag: 'Most Popular',
  },
  {
    id: 'groom', name: 'Groom Makeup',
    desc: 'Natural, confident grooming that keeps you looking sharp and polished without looking overdone.',
    img: '/service_groom_real.png',
  },
  {
    id: 'hair', name: 'Hair Artistry',
    desc: 'From intricate traditional updos to modern waves — each strand placed with intention and elegance.',
    img: '/service_hair_real.png',
  },
]

function ServiceCard({ service, delay }) {
  return (
    <div
      className="group bg-dark-3 border border-border hover:border-border-light overflow-hidden transition-all duration-600 hover:shadow-luxury-lg hover:-translate-y-2 reveal"
      style={{ transitionDelay: `${delay}ms` }}
      data-reveal
    >
      <div className="relative h-[280px] overflow-hidden img-zoom">
        <img src={service.img} alt={service.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        {service.tag && (
          <div className="absolute top-4 left-4 bg-gold text-dark font-sans text-[9px] font-medium tracking-[0.2em] uppercase px-3 py-1.5">
            {service.tag}
          </div>
        )}
        {/* Hover book overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-dark/30">
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase px-7 py-3 border border-cream/60 text-cream hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Book Now
          </button>
        </div>
      </div>
      <div className="p-7">
        <h3 className="font-serif text-[22px] font-medium text-cream mb-3">{service.name}</h3>
        <p className="font-sans text-[14px] font-light text-cream/85 leading-[1.75] mb-6">{service.desc}</p>
        <div className="pt-5 border-t border-border">
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id={`${service.id}-book-btn`}
            className="block w-full text-center font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-gold border border-gold/45 py-2.5 hover:bg-gold hover:text-dark transition-all duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section className="bg-dark py-14 md:py-[72px]" id="services">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12 max-w-[600px] mx-auto px-4">
          <span className="section-label mb-3 block text-gold tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
            Featured Services
          </span>
          <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
            Crafted for Every
          </h2>
          <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight reveal delay-100" data-reveal>
            Wedding Moment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
