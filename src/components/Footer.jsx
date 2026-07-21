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
                { href:WA, label:'WhatsApp', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.458 3.486 1.332 5.01L2 22l5.122-1.31a9.96 9.96 0 0 0 4.882 1.314c5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm0 18.008c-1.572 0-3.11-.418-4.464-1.212l-.32-.19-3.056.782.8-2.978-.21-.334a8.006 8.006 0 0 1-1.226-4.276c0-4.42 3.6-8.02 8.02-8.02 4.42 0 8.02 3.6 8.02 8.02 0 4.42-3.6 8.022-8.02 8.022z" fill="#25D366"/>
                    <path d="M16.035 14.072c-.22-.11-.1.3-.324.4-.1.3-.3.4-.6.3-.9-.2-1.9-.9-2.6-1.6s-1.4-1.7-1.6-2.6c-.1-.3 0-.5.3-.6.1-.22.5-.1.4-.324l-.6-1.5c-.2-.5-.5-.4-.7-.4h-.7c-.3 0-.6.1-.8.4-.7.7-.7 1.8 0 2.8 1.1 1.6 2.6 3.1 4.2 4.2 1 .7 2.1.7 2.8 0 .3-.2.4-.5.4-.8v-.7c0-.2-.1-.5-.4-.7l-1.5-.6z" fill="#25D366"/>
                  </svg>
                ) },
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.458 3.486 1.332 5.01L2 22l5.122-1.31a9.96 9.96 0 0 0 4.882 1.314c5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm0 18.008c-1.572 0-3.11-.418-4.464-1.212l-.32-.19-3.056.782.8-2.978-.21-.334a8.006 8.006 0 0 1-1.226-4.276c0-4.42 3.6-8.02 8.02-8.02 4.42 0 8.02 3.6 8.02 8.02 0 4.42-3.6 8.022-8.02 8.022z" fill="#25D366"/>
                <path d="M16.035 14.072c-.22-.11-.1.3-.324.4-.1.3-.3.4-.6.3-.9-.2-1.9-.9-2.6-1.6s-1.4-1.7-1.6-2.6c-.1-.3 0-.5.3-.6.1-.22.5-.1.4-.324l-.6-1.5c-.2-.5-.5-.4-.7-.4h-.7c-.3 0-.6.1-.8.4-.7.7-.7 1.8 0 2.8 1.1 1.6 2.6 3.1 4.2 4.2 1 .7 2.1.7 2.8 0 .3-.2.4-.5.4-.8v-.7c0-.2-.1-.5-.4-.7l-1.5-.6z" fill="#25D366"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
            <a href="mailto:sandymakeover@gmail.com" className="flex items-center gap-2.5 font-sans text-[12px] font-light text-cream/70 mb-3 hover:text-gold transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M20 18h-2V9.5l-6 4.5-6-4.5V18H4V6h2l6 4.5L18 6h2v12z" fill="#EA4335"/>
                <path d="M4 6v12h2V9.5L4 6z" fill="#4285F4"/>
                <path d="M20 6v12h-2V9.5l2-3.5z" fill="#34A853"/>
                <path d="M18 6l-6 4.5L6 6h12z" fill="#FBBC05"/>
              </svg>
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
