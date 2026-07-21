const WA = 'https://wa.me/917092368305'

export default function FinalCTA() {
  return (
    <section className="relative min-h-[580px] md:min-h-[660px] flex items-center justify-center overflow-hidden" id="contact">
      {/* Dark background image */}
      <div className="absolute inset-0">
        <img src="/cta_background.png" alt="Sandy Makeover wedding" loading="lazy"
          className="w-full h-full object-cover object-center" style={{ filter:'brightness(0.25) saturate(0.6)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/80 to-dark-2/90" />
      </div>

      {/* Faint gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-gold/8 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[680px]">
        <p className="section-label light mb-6" data-reveal>Begin Your Story</p>
        <h2 className="font-serif font-light text-cream mb-2 leading-[1.1] reveal"
          style={{ fontSize:'clamp(34px,5.5vw,72px)' }} data-reveal>
          Let's Create Your
        </h2>
        <h2 className="font-script text-gold mb-8 reveal delay-100"
          style={{ fontSize:'clamp(40px,6.5vw,84px)' }} data-reveal>
          Dream Wedding Look.
        </h2>
        <p className="font-sans text-[13px] font-light text-cream/80 mb-10 max-w-[360px] mx-auto leading-[1.8] reveal delay-200" data-reveal>
          Every detail, every brushstroke, every strand — crafted for you alone.
        </p>
        <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center" data-reveal>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id="final-cta-btn" className="btn-outline-gold">
            Reserve Your Date Today
          </button>
        </div>
        <p className="font-sans text-[12px] text-cream/60 mt-6 reveal delay-400" data-reveal>
          📞 Call or WhatsApp:{' '}
          <a href="tel:+917092368305" className="text-gold hover:text-gold-light transition-colors border-b border-gold/20">
            +91 70923 68305
          </a>
        </p>
      </div>
    </section>
  )
}
