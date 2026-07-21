const STEPS = [
  { num:'01', title:'Natural Look',          desc:'Your authentic beauty — the perfect canvas.',         img:'/portfolio_6.png', alt:'Natural look' },
  { num:'02', title:'Professional Makeup',   desc:'Expert artistry that enhances every feature.',         img:'/portfolio_5.png', alt:'Makeup art'  },
  { num:'03', title:'Hair Artistry',         desc:'Luxurious hairstyling crafted for your wedding look.', img:'/hair_styling.png', alt:'Hair style', final:true },
]

export default function Transformation() {
  return (
    <section className="bg-dark-3 py-[100px]" id="transformation">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <p className="section-label mb-5" data-reveal>The Journey</p>
          <h2 className="font-serif font-light text-cream mb-2 reveal"
            style={{ fontSize:'clamp(32px,5vw,60px)' }} data-reveal>Your Wedding</h2>
          <h2 className="font-script text-gold reveal delay-100"
            style={{ fontSize:'clamp(38px,6vw,70px)' }} data-reveal>Transformation Story</h2>
        </div>

        <div className="relative max-w-[640px] mx-auto">
          <div className="absolute left-[44px] top-8 bottom-8 w-px bg-gradient-to-b from-gold/30 via-gold/15 to-transparent hidden md:block" />
          <div className="flex flex-col gap-2">
            {STEPS.map((step, i) => (
              <div key={step.num}>
                <div className={`grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-center py-10 reveal ${i%2!==0?'delay-100':''}`} data-reveal>
                  <div className={`relative h-[190px] overflow-hidden img-zoom border border-border ${i%2===0?'md:order-1':'md:order-2'}`}>
                    <img src={step.img} alt={step.alt} loading="lazy" className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 flex items-start justify-end p-4 ${step.final ? 'bg-gradient-to-br from-gold/20 to-transparent' : 'bg-gradient-to-br from-dark/40 to-transparent'}`}>
                      <span className="font-serif text-[36px] font-light text-cream/30 leading-none">{step.num}</span>
                    </div>
                  </div>
                  <div className={`${i%2===0?'md:order-2':'md:order-1 md:text-right'}`}>
                    <h3 className={`font-serif text-[24px] font-light mb-3 ${step.final?'text-gold':'text-cream'}`}>{step.title}</h3>
                    <p className="font-sans text-[13px] font-light text-cream/40 leading-[1.7]">{step.desc}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="text-center text-gold/30 text-[20px] my-1 select-none">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
