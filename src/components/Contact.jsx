import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Instagram, Github, MessageSquare, Check, Sparkles } from 'lucide-react'
const WHATSAPP_NUM = '919345704295'
const EMAIL = 'inayathbasha434@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/inayath-basha-a-53051824a/'

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, sending, success

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate API submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      // Reset success status after a delay
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#080d1a] scroll-mt-16 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-14 fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase shadow-[0_0_15px_rgba(59,130,246,0.08)] mb-3 select-none">
            <Sparkles size={12} className="animate-pulse" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let's <span className="text-gradient">Talk</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4 mb-4">
            <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
            <div className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
          <p className="text-slate-400 max-w-sm mx-auto text-sm sm:text-base">
            Have a project in mind? I'd love to hear about it and help you build it.
          </p>
        </div>

        {/* Form + Direct Channels Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Form Card (Left) */}
          <div className="md:col-span-7 bg-[#0d1426]/70 border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden fade-in">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-4 animate-bounce">
                  <Check size={32} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Inayath Basha"
                    className="w-full bg-[#080d1a] border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="w-full bg-[#080d1a] border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#080d1a] border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full shine min-h-[48px] bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Socials / Direct Channels (Right) */}
          <div className="md:col-span-5 flex flex-col gap-6 text-left fade-in">
            <div className="bg-[#0d1426]/70 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
              <h3 className="text-white font-bold text-base">Direct Channels</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Prefer direct communication? Click any of the channels below to reach me instantly.
              </p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-7 items-center mt-5 w-full">
                {/* LinkedIn */}
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on LinkedIn"
                  className="transition-all duration-300 transform hover:scale-115 active:scale-90 hover:filter hover:drop-shadow-[0_0_15px_rgba(10,102,194,0.6)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0a66c2" className="w-9 h-9 sm:w-10 sm:h-10">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/inayathbasha"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on GitHub"
                  className="transition-all duration-300 transform hover:scale-115 active:scale-90 hover:filter hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10">
                    <circle cx="12" cy="12" r="11.5" fill="#ffffff" />
                    <path fill="#000000" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>

                {/* Email (Gmail) */}
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Send an Email"
                  className="transition-all duration-300 transform hover:scale-115 active:scale-90 hover:filter hover:drop-shadow-[0_0_15px_rgba(234,67,53,0.5)]"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[58%] h-[58%]">
                      <path fill="#EA4335" d="M22 5.455v13.091c0 .909-.727 1.636-1.636 1.636h-3.273v-9.818L12 14.545 6.91 10.364v9.818H3.636A1.636 1.636 0 0 1 2 18.545V5.455c0-1.636 1.855-2.545 3.091-1.573L12 9.145l6.909-5.263C20.145 2.91 22 3.818 22 5.455z"/>
                    </svg>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact on WhatsApp"
                  className="transition-all duration-300 transform hover:scale-115 active:scale-90 hover:filter hover:drop-shadow-[0_0_15px_rgba(37,211,102,0.6)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10">
                    <path fill="#25D366" d="M12.004 2c-5.517 0-9.993 4.476-9.993 9.993 0 1.763.459 3.486 1.33 5.003L2 22l5.161-1.355a9.948 9.948 0 004.843 1.258c5.518 0 9.993-4.476 9.993-9.993 0-5.517-4.475-9.993-9.993-9.993zm5.828 14.156c-.249.702-1.442 1.344-2.02 1.43-.518.077-1.196.11-3.693-.889-3.193-1.278-5.234-4.526-5.393-4.739-.16-.213-1.277-1.702-1.277-3.247 0-1.545.807-2.302 1.093-2.607.286-.305.623-.381.831-.381.208 0 .416.002.597.01.19.008.444-.073.694.53.256.618.874 2.128.95 2.279.076.15.127.325.026.529-.101.204-.152.33-.304.505-.152.176-.32.393-.456.526-.151.147-.31.309-.133.613.176.304.784 1.291 1.684 2.092.709.63 1.312.983 1.615 1.135.304.152.481.127.66-.076.179-.204.783-.911.993-1.22.21-.309.42-.259.709-.153.289.106 1.834.865 2.148 1.022.314.157.523.235.598.363.076.128.076.732-.173 1.434z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/inayathbasha_a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on Instagram"
                  className="transition-all duration-300 transform hover:scale-115 active:scale-90 hover:filter hover:drop-shadow-[0_0_15px_rgba(225,48,108,0.6)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9 sm:w-10 sm:h-10">
                    <defs>
                      <radialGradient id="instagram-grad-contact" cx="30%" cy="100%" r="150%" fx="30%" fy="100%">
                        <stop offset="0%" stop-color="#fdf497" />
                        <stop offset="5%" stop-color="#fdf497" />
                        <stop offset="45%" stop-color="#fd5949" />
                        <stop offset="60%" stop-color="#d6249f" />
                        <stop offset="90%" stop-color="#285AEB" />
                      </radialGradient>
                    </defs>
                    <path fill="url(#instagram-grad-contact)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
        </div>

      </div>

      {/* Professional Service Contact Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Inayath Basha A",
            "image": "https://inayathbasha.vercel.app/ChatGPT_Image_Jun_16,_2026,_03_11_34_PM.png",
            "url": "https://inayathbasha.vercel.app",
            "telephone": "+919345704295",
            "email": "inayathbasha434@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Erode",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "priceRange": "$$",
            "areaServed": "Worldwide"
          })
        }}
      />
    </section>
  )
}
