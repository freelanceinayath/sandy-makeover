const WA = 'https://wa.me/917092368305'

const STEPS = [
  { num:'01', icon:'💬', title:'Choose Service',  desc:'Pick from bridal, groom, hair styling, reception, or engagement packages.' },
  { num:'02', icon:'📅', title:'Choose Date',     desc:'Share your wedding date and preferred time slot for availability.' },
  { num:'03', icon:'🌸', title:'Consultation',    desc:'A personal style consultation to curate your dream look together.' },
  { num:'04', icon:'💳', title:'Advance Payment', desc:'Secure your date with a small advance — simple and hassle-free.' },
  { num:'05', icon:'💍', title:'Wedding Day',     desc:'We arrive on time, fully prepared to make you look extraordinary.' },
  { num:'✦',  icon:'✨', title:"You're Ready",    desc:'Step into your wedding day feeling radiant, confident, and breathtakingly beautiful.', final:true },
]

const FAQ = [
  { q:'Do you provide home service?',          a:'Yes! We offer full home service across the city and can travel to your venue.' },
  { q:'How far in advance should I book?',      a:'We recommend booking 3–6 months in advance, especially for peak wedding season (Oct–Feb).' },
  { q:'Do you offer a bridal trial?',           a:'Absolutely. A pre-wedding trial session is available to finalise your perfect look.' },
  { q:'What products do you use?',              a:'We use only luxury brands — MAC, Charlotte Tilbury, Huda Beauty, and Kryolan for long-lasting results.' },
  { q:'Is a booking advance required?',         a:'A small advance payment is required to confirm your date. The remaining balance is settled on the day.' },
]

export default function Booking() {
  return (
    <section className="bg-dark-2 py-[100px]" id="booking">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <p className="section-label mb-5" data-reveal>How It Works</p>
          <h2 className="font-serif font-light text-cream mb-2 reveal"
            style={{ fontSize:'clamp(32px,5vw,60px)' }} data-reveal>Your Booking</h2>
          <h2 className="font-script text-gold reveal delay-100"
            style={{ fontSize:'clamp(38px,6vw,70px)' }} data-reveal>Journey</h2>
        </div>

        {/* Timeline */}
        <div className="max-w-[620px] mx-auto mb-16">
          {STEPS.map((step, i) => (
            <div key={step.num}>
              <div className={`flex gap-6 items-start reveal-left ${i%2!==0?'delay-100':''}`} data-reveal>
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-[20px] border-2 ${
                  step.final ? 'border-gold bg-gold-gradient' : 'border-border bg-dark-3'}`}>
                  {step.icon}
                </div>
                <div className="pb-10 flex-1">
                  <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-gold block mb-1">{step.num}</span>
                  <h3 className={`font-serif text-[22px] font-light mb-2 ${step.final ? 'text-gold' : 'text-cream'}`}>{step.title}</h3>
                  <p className="font-sans text-[13px] font-light text-cream/40 leading-[1.75]">{step.desc}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="ml-6 w-px h-8 bg-gradient-to-b from-gold/30 to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-24 reveal" data-reveal>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))} id="journey-book-btn" className="btn-outline-gold">
            Start Your Journey
          </button>
        </div>

        {/* FAQ */}
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif font-light text-cream mb-1 reveal" style={{ fontSize:'clamp(24px,4vw,40px)' }} data-reveal>Frequently Asked</h3>
            <h3 className="font-script text-gold reveal delay-100" style={{ fontSize:'clamp(30px,4.5vw,48px)' }} data-reveal>Questions</h3>
          </div>
          <div className="divide-y divide-border">
            {FAQ.map((faq, i) => (
              <details key={i} className="group py-6 reveal" data-reveal>
                <summary className="flex justify-between items-center cursor-pointer font-sans text-[14px] font-light text-cream/70 hover:text-gold transition-colors duration-300">
                  {faq.q}
                  <span className="flex-shrink-0 ml-4 text-gold text-lg group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p className="font-sans text-[13px] font-light text-cream/40 leading-[1.8] mt-4 pr-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
