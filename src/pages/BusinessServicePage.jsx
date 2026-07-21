import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, CheckCircle2, Star, Zap, ArrowRight,
  Globe, Layout, Code2, Rocket, ShieldCheck, PenTool
} from 'lucide-react'

const WHATSAPP_NUM = '919345704295'

const OFFERINGS = [
  { icon: PenTool, title: 'Bespoke UI/UX Design', desc: 'No cookie-cutter templates. We design custom interfaces tailored specifically to your brand identity, target audience, and business goals.' },
  { icon: Code2, title: 'Custom Web Development', desc: 'Whether you need a simple landing page or a complex web application with custom logic, we build it precisely to your specifications.' },
  { icon: Globe, title: 'Corporate & Agency Sites', desc: 'Establish a powerful, trustworthy online presence with a professional website that highlights your services, team, and case studies.' },
  { icon: Layout, title: 'Dynamic & Interactive', desc: 'Engage visitors with smooth animations, dynamic content loading, and interactive elements that make your website stand out.' },
  { icon: Rocket, title: 'Performance Optimization', desc: 'We build blazing-fast websites optimized for Core Web Vitals, ensuring quick load times, better user experience, and higher SEO rankings.' },
  { icon: ShieldCheck, title: 'Secure & Scalable', desc: 'Built with modern, secure frameworks. As your business grows, your website scales with it, easily accommodating new features and higher traffic.' },
]

const FEATURES = [
  '100% Custom Tailored Design',
  'Fully responsive on all devices',
  'SEO-optimized architecture',
  'Fast-loading (90+ PageSpeed score)',
  'Lead generation forms & CTAs',
  'Analytics & tracking setup',
  'CMS integration for easy updates',
  'Ongoing maintenance options',
]

const PROCESS = [
  { step: '01', title: 'Consultation', desc: 'We discuss your specific business needs, goals, target audience, and any unique features you require.' },
  { step: '02', title: 'Custom Strategy', desc: 'We propose a tailored web strategy and create custom design mockups that align with your vision.' },
  { step: '03', title: 'Development', desc: 'We bring the design to life, coding your custom website and integrating any requested third-party tools.' },
  { step: '04', title: 'Launch & Support', desc: 'After rigorous testing, we launch your site and provide training and support to ensure ongoing success.' },
]

export default function BusinessServicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Custom Business Websites | Inayath Basha'
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100">

      {/* Back Nav */}
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/5 px-4 py-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-20 px-4 sm:px-6">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-fit shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-fade-in">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" /> Custom Web Solutions
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-white">
              Whatever Your Need,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">We Customize Your Website</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              We don't just build websites; we craft tailored digital experiences that perfectly align with your unique business requirements and drive measurable growth.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] relative group">
              <img 
                src="/business-hero.png" 
                alt="Business Solutions Showcase" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Floating Overlap Glass Panel */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 md:-mt-14 relative z-20">
        <div className="bg-[#0d1424]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-3 gap-4 text-center divide-x divide-white/5">
          {[{ value: '50+', label: 'Custom Sites' }, { value: '99%', label: 'Uptime' }, { value: '2x', label: 'Lead Increase' }].map(({ value, label }) => (
            <div key={label} className="first:pl-0 pl-2 group transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 drop-shadow-[0_2px_10px_rgba(34,211,238,0.25)]">{value}</div>
              <div className="text-[9px] sm:text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 md:space-y-24">

        {/* What We Do - Two Column Layout */}
        <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bespoke Solutions Built<br />For Your Scale
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Every business is unique, and your website should be too. Off-the-shelf themes often force you to compromise on your vision or functionality. We take a different approach. We start by understanding exactly what your business needs to succeed online, and then we build it from the ground up.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              <span className="text-white font-semibold">Whatever your requirement</span> — be it a complex booking system, a unique interactive design, a custom client portal, or just a truly distinctive brand presence — we have the expertise to customize your website to perfection. We ensure it's not just a digital brochure, but a powerful tool that works for your business.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1424] to-[#0a0f1e] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-[40px] group-hover:bg-cyan-500/15 transition-colors duration-500" />
            <h3 className="font-extrabold text-white text-base mb-6 border-b border-white/5 pb-3">Why Bespoke Development?</h3>
            <ul className="space-y-4">
              {[
                { title: 'Zero Limitations', desc: 'Custom tailored layouts and workflows built exactly as you imagine.' },
                { title: 'Optimized Conversions', desc: 'Layouts structured to turn traffic into paying leads.' },
                { title: 'Clean Architecture', desc: 'Scale-ready, hand-coded structures that prevent code bloat.' },
                { title: 'Maximum Speed', desc: 'Optimized performance resulting in Google PageSpeed scores of 90+.' }
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Offerings */}
        <section>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8 md:mb-10">Our Custom Web Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-[#0c1622] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon size={20} className="text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="hidden md:block bg-gradient-to-br from-cyan-950/30 to-sky-950/20 border border-cyan-500/15 rounded-3xl p-8 sm:p-12">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Everything Included</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8">Included in Every Custom Project</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="hidden md:block">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-10">Our 4-Step Customization Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step}>
                <div className="text-5xl font-black text-cyan-500/10 mb-3 leading-none">{step}</div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="hidden md:block bg-[#0d1424] border border-white/5 rounded-3xl p-8 sm:p-12">
          <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}</div>
          <blockquote className="text-slate-200 text-lg sm:text-xl font-medium leading-relaxed mb-6 italic">
            "We had very specific requirements for our corporate site that standard templates couldn't handle. Inayath's team listened carefully and delivered a fully customized solution that exceeded our expectations. The new site perfectly represents our brand and functions flawlessly."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white font-bold text-sm">VR</div>
            <div>
              <p className="text-white font-semibold text-sm">Vikram R.</p>
              <p className="text-slate-500 text-xs">CEO, TechNova Solutions</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Zap size={32} className="text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready for a Truly Custom Website?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Tell us what you need, and we'll build a custom digital experience tailored just for your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Inayath!%20I'm%20interested%20in%20a%20custom%20business%20website.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 text-sm">
              <Globe size={18} /> Discuss Your Custom Needs <ArrowRight size={16} />
            </a>
            <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-sm">
              View More Services
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
