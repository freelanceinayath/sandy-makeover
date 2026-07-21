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
                    <circle cx="12" cy="12" r="12" fill="#25D366" />
                    <path d="M12.0003 4.2C7.72834 4.2 4.25434 7.674 4.25434 11.946c0 1.572.468 3.036 1.278 4.284L4.20034 20l3.858-1.236c1.194.756 2.592 1.182 4.092 1.182 4.272 0 7.746-3.474 7.746-7.746-.006-4.272-3.48-7.746-7.746-7.746v5.96046e-08zm4.446 11.082c-.174.492-.888.894-1.248.954-.312.054-.702.096-2.07-.456-1.752-.702-2.856-2.484-2.946-2.604-.09-.12-.726-.966-.726-1.92 0-.954.504-1.422.684-1.614.18-.192.39-.24.522-.24.132 0 .264 0 .378.006.12 0 .276-.048.432.324.162.39.552 1.344.6 1.446.048.102.078.222.012.354-.066.132-.102.216-.204.336-.102.12-.216.27-.306.372-.102.102-.21.216-.09.426.12.21.534.876.144 1.512.276.45 1.134.738 1.488.948.354.21.558.18.768-.06.21-.24.9-1.05.14-1.182-.138-.03-.432.072-.564.12-.132.048-.258.102-.384.156-.126.054-.258.048-.384-.006a10.99 10.99 0 01-1.398-1.2c-.378-.36-.63-.804-.702-.918-.072-.114.156-.294.3-.438.114-.114.222-.276.33-.414.108-.138.144-.234.216-.39.072-.156.036-.294-.018-.39-.054-.096-.504-1.218-.69-1.668-.18-.438-.366-.378-.504-.384-.126-.006-.27-.006-.414-.006-.144 0-.378.054-.576.27-.198.216-.756.738-.756 1.8s.774 2.088.882 2.232c.108.144 1.524 2.328 3.69 3.258.516.222.918.354 1.23.456.516.162.99.138 1.362.084.414-.06 1.278-.522 1.458-1.026.18-.504.18-.936.126-1.026-.054-.09-.21-.144-.468-.27v-.006z" fill="white"/>
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
                <circle cx="12" cy="12" r="12" fill="#25D366" />
                <path d="M12.0003 4.2C7.72834 4.2 4.25434 7.674 4.25434 11.946c0 1.572.468 3.036 1.278 4.284L4.20034 20l3.858-1.236c1.194.756 2.592 1.182 4.092 1.182 4.272 0 7.746-3.474 7.746-7.746-.006-4.272-3.48-7.746-7.746-7.746v5.96046e-08zm4.446 11.082c-.174.492-.888.894-1.248.954-.312.054-.702.096-2.07-.456-1.752-.702-2.856-2.484-2.946-2.604-.09-.12-.726-.966-.726-1.92 0-.954.504-1.422.684-1.614.18-.192.39-.24.522-.24.132 0 .264 0 .378.006.12 0 .276-.048.432.324.162.39.552 1.344.6 1.446.048.102.078.222.012.354-.066.132-.102.216-.204.336-.102.12-.216.27-.306.372-.102.102-.21.216-.09.426.12.21.534.876.144 1.512.276.45 1.134.738 1.488.948.354.21.558.18.768-.06.21-.24.9-1.05.14-1.182-.138-.03-.432.072-.564.12-.132.048-.258.102-.384.156-.126.054-.258.048-.384-.006a10.99 10.99 0 01-1.398-1.2c-.378-.36-.63-.804-.702-.918-.072-.114.156-.294.3-.438.114-.114.222-.276.33-.414.108-.138.144-.234.216-.39.072-.156.036-.294-.018-.39-.054-.096-.504-1.218-.69-1.668-.18-.438-.366-.378-.504-.384-.126-.006-.27-.006-.414-.006-.144 0-.378.054-.576.27-.198.216-.756.738-.756 1.8s.774 2.088.882 2.232c.108.144 1.524 2.328 3.69 3.258.516.222.918.354 1.23.456.516.162.99.138 1.362.084.414-.06 1.278-.522 1.458-1.026.18-.504.18-.936.126-1.026-.054-.09-.21-.144-.468-.27v-.006z" fill="white"/>
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
