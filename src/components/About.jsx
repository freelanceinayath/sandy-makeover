import { useEffect, useRef } from 'react'
import { Heart, MapPin, Code, Globe, Sparkles } from 'lucide-react'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#080d1a] scroll-mt-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase shadow-[0_0_15px_rgba(59,130,246,0.08)] mb-3 select-none">
            <Sparkles size={12} className="animate-pulse" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Know Me <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Better</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
            <div className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>

        {/* Bento Grid (2 cols on mobile, 3 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
          
          {/* Tile 1: Main Bio (Spans full width on mobile, 2 cols on desktop) */}
          <div className="fade-in col-span-2 row-span-2 group relative overflow-hidden bg-[#0d1426]/80 backdrop-blur-md border border-white/5 rounded-[20px] sm:rounded-3xl p-6 sm:p-10 hover:border-blue-500/30 transition-colors duration-500 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 sm:mb-6">
                <Code className="text-blue-400" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">Who I Am</h3>
              <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-medium">
                Inayath Basha is passionate about turning ideas into engaging digital experiences. He enjoys creating solutions that are simple, intuitive, and purpose-driven, helping businesses connect with their audience in meaningful ways.
              </p>
              {/* Extra paragraph only visible on tablet/desktop to save vertical space on mobile */}
              <p className="hidden sm:block text-slate-400 text-base leading-relaxed mt-4">
                By combining creativity with technical expertise, he builds experiences that leave a lasting impression and support long-term growth.
              </p>
            </div>
          </div>

          {/* Tile 2: What Drives Me (1 col on mobile) */}
          <div className="fade-in col-span-1 group relative overflow-hidden bg-[#0d1426]/80 backdrop-blur-md border border-white/5 rounded-[20px] sm:rounded-3xl p-4 sm:p-8 hover:border-pink-500/30 transition-colors duration-500 flex flex-col items-center justify-center text-center shadow-2xl min-h-[130px] sm:min-h-[220px]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-500">
                <Heart className="text-pink-400 animate-pulse w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-white font-bold text-xs sm:text-lg mb-1 sm:mb-2">Passion</h3>
              <p className="hidden sm:block text-slate-400 text-sm">Building things that truly matter.</p>
            </div>
          </div>

          {/* Tile 3: Location (1 col on mobile) */}
          <div className="fade-in col-span-1 group relative overflow-hidden bg-[#0d1426]/80 backdrop-blur-md border border-white/5 rounded-[20px] sm:rounded-3xl p-4 sm:p-8 hover:border-emerald-500/30 transition-colors duration-500 flex flex-col items-center justify-center text-center shadow-2xl min-h-[130px] sm:min-h-[220px]">
             {/* Abstract Radar Background */}
             <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
               <div className="w-full h-full border border-emerald-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
               <div className="absolute w-3/4 h-3/4 border border-emerald-500/20 rounded-full" />
               <div className="absolute w-1/2 h-1/2 border border-emerald-500/10 rounded-full" />
             </div>
             <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2 sm:mb-4 group-hover:rotate-12 transition-transform duration-500">
                <Globe className="text-emerald-400 w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-white font-bold text-xs sm:text-lg sm:mb-1">Erode, IN</h3>
              <p className="hidden sm:flex text-slate-400 text-sm font-medium items-center justify-center gap-1.5">
                <MapPin size={12} className="text-emerald-500" />
                Global Reach
              </p>
             </div>
          </div>

          {/* Tile 4: Marquee Tags (Full width rectangle) */}
          <div className="fade-in col-span-2 md:col-span-3 relative overflow-hidden bg-gradient-to-r from-[#0d1426] via-blue-900/10 to-[#0d1426] border border-white/5 rounded-[20px] sm:rounded-3xl py-4 sm:py-6 flex items-center shadow-2xl group">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#080d1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#080d1a] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 sm:gap-8 px-3 sm:px-8">
                  {['Shopify Development', 'Brand Identity', 'Digital Solutions', 'Business Growth', 'UI/UX Design', 'E-Commerce'].map((tag, j) => (
                    <span
                      key={`${i}-${j}`}
                      className="text-xs sm:text-base font-bold text-slate-300 bg-white/5 border border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl whitespace-nowrap backdrop-blur-sm shadow-sm hover:bg-white/10 hover:-translate-y-1 transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
