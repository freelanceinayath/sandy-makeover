import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

const TEAM = [
  {
    name: 'Roshan',
    role: 'Tech Lead',
    initials: 'R',
    image: '/roshan.jpg',
    emoji: '⚡',
    color: 'from-blue-500 to-indigo-600',
    shadowColor: 'rgba(59,130,246,0.5)',
    bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    name: 'Nishanth',
    role: 'Video Editor',
    initials: 'N',
    image: '/nishanth.jpg',
    emoji: '🎬',
    color: 'from-purple-500 to-pink-600',
    shadowColor: 'rgba(168,85,247,0.5)',
    bg: 'bg-gradient-to-br from-purple-500 to-pink-600',
  },
  {
    name: 'Azmeer',
    role: 'Graphic Designer',
    initials: 'A',
    image: '/azmeer.jpg',
    emoji: '🎨',
    color: 'from-pink-500 to-rose-600',
    shadowColor: 'rgba(244,63,94,0.5)',
    bg: 'bg-gradient-to-br from-pink-500 to-rose-600',
  },
  {
    name: 'Giridharan',
    role: 'QA',
    initials: 'G',
    emoji: '🛡',
    color: 'from-teal-500 to-emerald-600',
    shadowColor: 'rgba(20,184,166,0.5)',
    bg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
  },
  {
    name: 'Varun',
    role: 'Testing Specialist',
    initials: 'V',
    image: '/varun.jpg',
    emoji: '📋',
    color: 'from-amber-500 to-orange-600',
    shadowColor: 'rgba(245,158,11,0.5)',
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
  },
  {
    name: 'S.Aswak',
    role: 'Marketing Specialist',
    initials: 'S',
    image: '/aswak.jpg',
    emoji: '📈',
    color: 'from-fuchsia-500 to-purple-600',
    shadowColor: 'rgba(192,38,211,0.5)',
    bg: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
  },
  {
    name: 'Issac',
    role: 'Developer',
    initials: 'I',
    emoji: '💻',
    color: 'from-cyan-500 to-blue-600',
    shadowColor: 'rgba(6,182,212,0.5)',
    bg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
]

export default function Team() {
  const sectionRef = useRef(null)
  const [activeMember, setActiveMember] = useState('Roshan')

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
    <section id="team" ref={sectionRef} className="py-20 bg-[#080d1a] scroll-mt-16 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Embedded shimmer animations */}
      <style>{`
        @keyframes shimmer-move {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer-move 4s linear infinite;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-8 fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase shadow-[0_0_15px_rgba(59,130,246,0.08)] mb-3 select-none">
            <Sparkles size={12} className="animate-pulse" />
            <span>Dream Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            We Work <span className="text-gradient">Together</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
            <div className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>

        {/* Single Unified Team Card */}
        <div className="fade-in relative max-w-3xl mx-auto">
          
          {/* Card Container */}
          <div className="relative bg-[#0d1426]/70 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">

            {/* Shimmer top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] shimmer-line" />

            {/* Inner glow blobs */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-10">

              {/* Top row: Core Team badge + success ratio */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="Core Team">👥</span>
                  <div>
                    <p className="text-white font-bold text-base">Core Team</p>
                    <p className="text-slate-500 text-xs">5 specialists · 1 mission</p>
                  </div>
                </div>

                {/* Success badge */}
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="text-orange-400" role="img" aria-label="Success">🔥</span>
                  100% Success Ratio
                </div>
              </div>

              {/* 3D Flip Avatars Grid */}
              <div className="flex flex-col items-center gap-6 sm:gap-8 mb-12 mt-6">
                {/* Top Row (4 members) */}
                <div className="flex justify-center gap-3 sm:gap-6">
                  {TEAM.slice(0, 4).map((member) => (
                    <FlipCoin 
                      key={member.name} 
                      member={member} 
                      isActive={activeMember === member.name} 
                      onClick={() => setActiveMember(activeMember === member.name ? null : member.name)}
                    />
                  ))}
                </div>

                {/* Bottom Row (3 members) */}
                <div className="flex justify-center gap-3 sm:gap-6">
                  {TEAM.slice(4).map((member) => (
                    <FlipCoin 
                      key={member.name} 
                      member={member} 
                      isActive={activeMember === member.name} 
                      onClick={() => setActiveMember(activeMember === member.name ? null : member.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom stats strip */}
              <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                {[
                  { value: '5+', label: 'Members' },
                  { value: '100%', label: 'Success' },
                  { value: '∞', label: 'Together' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-[#0d1426]/80 flex flex-col items-center justify-center py-4 gap-1">
                    <span
                      className="text-2xl font-extrabold"
                      style={{
                        background: 'linear-gradient(135deg, #60a5fa, #93c5fd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {value}
                    </span>
                    <span className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Shimmer bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] shimmer-line" />
          </div>
        </div>

      </div>
    </section>
  )
}

function FlipCoin({ member, isActive, onClick }) {
  // Extract a solid color for the glowing ring from the gradient classes
  let glowColor = '#3b82f6' // fallback blue
  if (member.color.includes('purple')) glowColor = '#a855f7'
  if (member.color.includes('pink')) glowColor = '#ec4899'
  if (member.color.includes('teal')) glowColor = '#14b8a6'
  if (member.color.includes('amber')) glowColor = '#f59e0b'
  if (member.color.includes('fuchsia')) glowColor = '#d946ef'
  if (member.color.includes('cyan')) glowColor = '#06b6d4'

  return (
    <div 
      className="group relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer [perspective:1000px]"
      onClick={onClick}
    >
      <div 
        className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isActive ? '[transform:rotateY(180deg)]' : 'group-hover:scale-105'}`}
      >
        
        {/* Front of coin: Initials or Image */}
        <div 
          className={`absolute inset-0 [backface-visibility:hidden] rounded-full ${member.image ? 'bg-[#0d1426]' : member.bg} border-2 border-[#0d1426] flex items-center justify-center text-white font-black text-2xl sm:text-3xl overflow-hidden`}
          style={{ boxShadow: `0 4px 15px ${member.shadowColor}` }}
        >
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            member.initials
          )}
        </div>

        {/* Back of coin: Name & Circular Graph */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full bg-[#0d1426] flex flex-col items-center justify-center shadow-inner overflow-hidden"
          style={{ boxShadow: isActive ? `0 0 20px ${member.shadowColor}` : 'none' }}
        >
          {/* Subtle background glow */}
          <div className={`absolute inset-0 opacity-20 ${member.bg}`} />

          {/* Activity Ring Graph */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
             {/* Background track */}
             <circle cx="50%" cy="50%" r="44%" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
             {/* Animated fill track */}
             <circle 
               cx="50%" cy="50%" r="44%" 
               stroke={glowColor}
               strokeWidth="3" 
               fill="none" 
               strokeDasharray="100" 
               strokeDashoffset={isActive ? "0" : "100"} 
               className="transition-all duration-[1500ms] ease-out" 
             />
          </svg>
          
          <span className="text-white font-bold text-[9px] sm:text-[11px] leading-tight z-10">{member.name}</span>
          <span className="text-slate-300 font-medium text-[6px] sm:text-[7px] uppercase tracking-widest mt-0.5 z-10 text-center px-1 leading-tight">{member.role}</span>
        </div>

      </div>
    </div>
  )
}
