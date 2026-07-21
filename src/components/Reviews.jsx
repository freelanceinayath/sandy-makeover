import { Star } from 'lucide-react'

const REVIEWS = [
  { name:'Priya Sharma',  role:'Bride, Dec 2024',  avatar:'P', text:'"Sandy transformed me into the most beautiful version of myself. Every guest was asking about my makeup. Best decision I made for my wedding!"' },
  { name:'Ananya Reddy',  role:'Bride, Jan 2025',  avatar:'A', text:'"From consultation to final look — Sandy\'s professionalism is unmatched. My hair stayed perfect through the entire reception. Worth every rupee!"' },
  { name:'Meera Krishnan',role:'Wedding, Mar 2025', avatar:'M', text:'"My husband\'s groom makeup was so natural and perfect. The photos turned out stunning. Sandy\'s attention to detail is extraordinary."' },
  { name:'Sowmya Iyer',   role:'Bride, Feb 2025',  avatar:'S', text:'"The makeup lasted 14 hours — through tears, hugs, everything. I was nervous but Sandy put me at ease. Absolutely magical."' },
  { name:'Riya Kapoor',   role:'Engagement, Apr 2025', avatar:'R', text:'"Booked for my engagement — the look was exactly what I dreamed. Sandy listened to every detail and created something truly personal."' },
  { name:'Divya Nair',    role:'Bride, May 2025',  avatar:'D', text:'"Sandy came on time, was completely professional, and the results were outstanding. My bridal photos look like they belong in a magazine."' },
]
const ALL = [...REVIEWS, ...REVIEWS]

function ReviewCard({ r }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] bg-dark-3 border border-border p-7 hover:border-border-light hover:-translate-y-1 hover:shadow-luxury-md transition-all duration-500">
      <div className="flex gap-1 mb-4 text-gold">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" strokeWidth={0} />
        ))}
      </div>
      <p className="font-serif text-[15px] italic text-cream/90 leading-[1.65] mb-6">{r.text}</p>
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center font-script text-[18px] text-dark flex-shrink-0">{r.avatar}</div>
        <div>
          <strong className="font-sans text-[12px] font-semibold text-cream block">{r.name}</strong>
          <small className="font-sans text-[10px] text-cream/60">{r.role}</small>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="bg-dark-2 py-[100px] overflow-hidden" id="reviews">
      <div className="max-w-[600px] mx-auto px-4 text-center mb-12">
        <span className="section-label mb-3 block text-gold tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
          Client Love
        </span>
        <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
          Words from
        </h2>
        <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight reveal delay-100" data-reveal>
          Our Brides
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-28 bg-gradient-to-r from-dark-2 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-28 bg-gradient-to-l from-dark-2 to-transparent z-10 pointer-events-none" />
        <div className="flex gap-5 w-max animate-ticker hover:[animation-play-state:paused] px-5" style={{ paddingBottom:'4px' }}>
          {ALL.map((r, i) => <ReviewCard key={`${r.name}-${i}`} r={r} />)}
        </div>
      </div>
    </section>
  )
}
