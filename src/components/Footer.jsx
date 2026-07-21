import { Phone, MessageCircle, Instagram } from 'lucide-react'

const WA = 'https://wa.me/917092368305'
const IG = 'https://instagram.com/sandymakeover'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0A0402] text-cream pt-20 pb-8 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-border">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-serif italic text-[30px] font-medium text-gold mb-5">Sandy Makeover</div>
            <p className="font-sans text-[13px] font-light text-cream/35 leading-[1.8] mb-8 max-w-[320px]">
              Luxury bridal makeup & hair artistry. Crafting timeless wedding looks since 2016.
              Available citywide with home service & travel options.
            </p>
            <div className="flex gap-3">
              {[
                { href:IG, label:'Instagram', icon: <img src="/instagram_logo.png" alt="Instagram" className="w-[18px] h-[18px] object-contain rounded-sm" /> },
                { href:WA, label:'WhatsApp', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 border border-border flex items-center justify-center text-cream/30 hover:border-gold hover:text-gold transition-all duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-gold mb-6">Services</h4>
            {['Bridal Makeup','Groom Makeup','Hair Styling','Reception Styling','Engagement Styling'].map(s => (
              <a key={s} href="#services" className="block font-sans text-[12px] font-light text-cream/30 mb-3 hover:text-gold transition-colors duration-300">{s}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-gold mb-6">Contact</h4>
            <a href="tel:+917092368305" className="flex items-center gap-2 font-sans text-[12px] font-light text-cream/70 mb-3 hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              <span>+91 70923 68305</span>
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-sans text-[12px] font-light text-cream/70 mb-3 hover:text-gold transition-colors">
              <MessageCircle className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              <span>WhatsApp Us</span>
            </a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-sans text-[12px] font-light text-cream/70 mb-6 hover:text-gold transition-colors">
              <Instagram className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              <span>@sandymakeover</span>
            </a>
            <div className="font-sans text-[11px] font-light text-cream/20 leading-[1.8]">
              <strong className="text-cream/30 block mb-1">Hours</strong>Mon – Sun: 7 AM – 8 PM
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] font-light text-cream/15">© {year} Sandy Makeover. All rights reserved.</p>
          <p className="font-sans text-[11px] font-light text-cream/15">Crafted with love for every bride.</p>
        </div>
      </div>
    </footer>
  )
}
