import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 100)
    const t2 = setTimeout(() => setPhase('exit'),    1600)
    const t3 = setTimeout(() => setPhase('done'),    2400)
    return () => [t1,t2,t3].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  return (
    <div role="status" aria-label="Loading Sandy Makeover" aria-hidden={phase === 'exit'} className={`fixed inset-0 z-[99999] bg-[#0A0402] flex items-center justify-center transition-opacity duration-700 ${
      phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className={`flex flex-col items-center gap-1 transition-all duration-600 ${
        phase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {/* Animated Gold Ring & Owner Photo Container */}
        <div className="relative flex items-center justify-center mb-7">
          {/* Outer Rotating Dashed Gold Ring */}
          <div className="absolute w-[128px] h-[128px] rounded-full border-2 border-dashed border-gold/60 animate-spin-slow pointer-events-none" />
          
          {/* Inner Glowing Metallic Gold Gradient Ring */}
          <div className="w-[114px] h-[114px] rounded-full p-[3px] bg-gradient-to-tr from-[#EAD8B1] via-[#C3A359] to-[#A0823E] animate-gold-glow flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0402] border border-dark/60">
              <img src="/owner.jpg" alt="Sandy Makeover Owner" className="w-full h-full object-cover scale-105" />
            </div>
          </div>
        </div>

        <span className="font-sans text-[10px] font-semibold tracking-[0.48em] uppercase text-white">LUXURY BRIDAL STUDIO</span>
        <span className="font-serif italic text-[40px] font-medium text-gold mt-1 tracking-wide" style={{ textShadow: '0 4px 20px rgba(195,163,89,0.3)' }}>Sandy Makeover</span>
        
        {/* Glowing Gold Progress Line Track */}
        <div className="mt-6 w-24 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-gold">
          <div className="h-full bg-gradient-to-r from-[#EAD8B1] via-[#C3A359] to-[#A0823E] transition-all duration-[1400ms] ease-out shadow-[0_0_12px_#C3A359]"
            style={{ width: phase === 'visible' ? '100%' : '0%' }} />
        </div>
      </div>
    </div>
  )
}
