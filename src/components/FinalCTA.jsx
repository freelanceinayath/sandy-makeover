import { Phone, Sparkles } from 'lucide-react'

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
        <span className="section-label light mb-3 block text-gold-light tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
          Begin Your Story
        </span>
        <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
          Let's Create Your
        </h2>
        <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight mb-8 reveal delay-100" data-reveal>
          Dream Wedding Look.
        </p>
        <p className="font-sans text-[14px] font-light text-cream/90 mb-10 max-w-[360px] mx-auto leading-[1.8] reveal delay-200" data-reveal>
          Every detail, every brushstroke, every strand — crafted for you alone.
        </p>
        <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center" data-reveal>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id="final-cta-btn" className="btn-gold-cta py-4 px-9 text-[11px] font-bold" aria-label="Reserve your bridal makeup date today">
            Book Your Date Today
          </button>
        </div>
        <p className="font-sans text-[13px] text-cream/75 mt-6 reveal delay-400 flex items-center justify-center gap-1.5" data-reveal>
          <Phone className="w-3.5 h-3.5 text-gold" strokeWidth={2} aria-hidden="true" />
          <span>Call or WhatsApp:</span>
          <a href="tel:+917092368305" className="text-gold hover:text-gold-light transition-colors border-b border-gold/20 ml-1"
            aria-label="Call Sandy Makeover at +91 70923 68305">
            +91 70923 68305
          </a>
        </p>
        <p className="font-sans text-[11px] font-light text-cream/70 mt-5 reveal delay-500" data-reveal>
          Developed by{' '}
          <a
            href="https://inayathbasha.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-medium hover:text-gold-light hover:underline transition-colors duration-300 border-b border-gold/30 pb-0.5"
          >
            inayathbasha.vercel.app
          </a>
        </p>
      </div>
    </section>
  )
}
