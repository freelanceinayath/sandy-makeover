export default function Editorial() {
  return (
    <section className="bg-dark py-[80px]" id="about">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        
        {/* ── Beautifully styled stats panel (Luxury Clean UI/UX) ── */}
        <div className="border border-border/15 bg-[#32131A]/30 py-12 px-6 md:px-8 rounded-none shadow-luxury-md reveal" data-reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-2 divide-x-0 md:divide-x divide-border/15 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-serif font-light text-[38px] md:text-[46px] text-gold leading-none tracking-tight">
                3+
              </span>
              <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/85 mt-3.5 max-w-[130px] leading-relaxed">
                Years Experience
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-serif italic font-light text-[24px] md:text-[30px] text-gold leading-none h-[38px] md:h-[46px] flex items-center justify-center">
                Certified
              </span>
              <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/85 mt-3.5 max-w-[130px] leading-relaxed">
                Groom Makeup Artist
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-serif font-light text-[38px] md:text-[46px] text-gold leading-none tracking-tight">
                500+
              </span>
              <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/85 mt-3.5 max-w-[130px] leading-relaxed">
                Client Transformations
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-serif font-light text-[38px] md:text-[46px] text-gold leading-none tracking-tight">
                100%
              </span>
              <span className="font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/85 mt-3.5 max-w-[130px] leading-relaxed">
                Client Satisfied
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
