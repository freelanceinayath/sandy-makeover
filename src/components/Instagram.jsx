import { Eye } from 'lucide-react'

const INSTA = [
  { src:'/portfolio_1.png', alt:'Bridal look', type: 'image' },
  { src:'/portfolio_2.png', alt:'Eye makeup', type: 'image' },
  { src:'/bridal_makeup.png', alt:'Bridal beauty', type: 'image' },
  { src:'/portfolio_3.png', alt:'Hair styling', type: 'image' },
  { src:'/portfolio_4.png', alt:'Full bridal', type: 'image' },
  { src:'/hair_styling.png',  alt:'Hair artistry', type: 'image' },
]

export default function Instagram() {
  return (
    <section className="bg-dark py-[100px]" id="instagram">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center mb-12">
        <p className="section-label mb-5" data-reveal>@sandymakeover</p>
        <h2 className="font-serif font-light text-cream mb-2 reveal"
          style={{ fontSize:'clamp(32px,5vw,60px)' }} data-reveal>Follow Our</h2>
        <h2 className="font-script text-gold reveal delay-100"
          style={{ fontSize:'clamp(38px,6vw,70px)' }} data-reveal>Wedding Stories</h2>
        <a href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
          id="instagram-follow-btn"
          className="inline-flex items-center gap-3 mt-7 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold border border-border-light px-7 py-3 hover:bg-gold hover:text-dark transition-all duration-300 reveal delay-200"
          data-reveal>
          <img src="/instagram_logo.png" alt="Instagram Logo" className="w-[18px] h-[18px] object-contain rounded-md" />
          Follow on Instagram
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 px-3 md:px-5">
        {INSTA.map((post, i) => (
          <a key={post.src} href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
            className={`group relative aspect-square overflow-hidden border border-border hover:border-border-light transition-all duration-400 reveal-scale ${i%3===1?'delay-100':i%3===2?'delay-200':''}`}
            data-reveal>
            {post.type === 'video' ? (
              <video src={post.src} loop muted autoPlay playsInline
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]" />
            ) : (
              <img src={post.src} alt={post.alt} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]" />
            )}
            <div className="absolute inset-0 bg-gold/75 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <Eye className="w-5 h-5 text-dark" strokeWidth={2} />
              <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-dark">View Post</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
