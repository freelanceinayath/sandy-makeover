import { Phone, MessageCircle, Instagram, Mail } from 'lucide-react'

const WA = 'https://wa.me/917092368305'
const IG = 'https://instagram.com/sandymakeover'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="hidden md:block bg-[#0A0402] text-cream pt-20 pb-8 border-t border-border">
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
                { href:WA, label:'WhatsApp', icon: <img src="/whatsapp_logo_new.png" alt="WhatsApp" className="w-[18px] h-[18px] object-contain rounded-sm" /> },
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
            <a href="tel:+917092368305" className="flex items-center gap-2.5 font-sans text-[12px] font-light text-cream/70 mb-3 hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              <span>+91 70923 68305</span>
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-sans text-[12px] font-light text-cream/70 mb-3 hover:text-gold transition-colors">
              <img src="/whatsapp_logo_new.png" alt="WhatsApp" className="w-[14px] h-[14px] object-contain rounded-sm" />
              <span>WhatsApp Us</span>
            </a>
            <a href="mailto:sandymakeover@gmail.com" className="flex items-center gap-2.5 font-sans text-[12px] font-light text-cream/70 mb-3 hover:text-gold transition-colors">
              <img src="/gmail_logo.jpg" alt="Gmail" className="w-[14px] h-[14px] object-contain rounded-sm" />
              <span>sandymakeover@gmail.com</span>
            </a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-sans text-[12px] font-light text-cream/70 mb-6 hover:text-gold transition-colors">
              <img src="/instagram_logo.png" alt="Instagram" className="w-[14px] h-[14px] object-contain rounded-sm" />
              <span>@sandymakeover</span>
            </a>
            <div className="font-sans text-[11px] font-light text-cream/20 leading-[1.8]">
              <strong className="text-cream/30 block mb-1">Hours</strong>Mon – Sun: 7 AM – 8 PM
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] font-light text-cream/15">
            © {year} Sandy Makeover. All rights reserved. •{' '}
            <a href="https://inayathbasha.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-gold text-cream/25 hover:underline transition-colors duration-300">
              Developed by inayathbasha.vercel.app
            </a>
          </p>
          <p className="font-sans text-[11px] font-light text-cream/15">Crafted with love for every bride.</p>
        </div>
      </div>
    </footer>
  )
}
