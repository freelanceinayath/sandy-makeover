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
    <div className={`fixed inset-0 z-[99999] bg-[#0A0402] flex items-center justify-center transition-opacity duration-700 ${
      phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className={`flex flex-col items-center gap-1 transition-all duration-600 ${
        phase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {/* Owner Photo Circle */}
        <div className="w-[100px] h-[100px] rounded-full border border-gold/30 overflow-hidden mb-6 shadow-luxury-md">
          <img src="/owner.jpg" alt="Sandy Makeover Owner" className="w-full h-full object-cover" />
        </div>
        <span className="font-sans text-[9px] font-medium tracking-[0.45em] uppercase text-cream/25">LUXURY BRIDAL STUDIO</span>
        <span className="font-serif italic text-[38px] font-medium text-gold mt-1">Sandy Makeover</span>
        <div className="mt-6 w-20 h-px bg-cream/10 overflow-hidden">
          <div className="h-full bg-gold transition-all duration-[1400ms] ease-out"
            style={{ width: phase === 'visible' ? '100%' : '0%' }} />
        </div>
      </div>
    </div>
  )
}
