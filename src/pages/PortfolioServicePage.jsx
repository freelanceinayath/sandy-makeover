import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Star, ArrowRight, Zap, Monitor, Smartphone, Search, Palette, Award, Share2 } from 'lucide-react'

const WHATSAPP_NUM = '919345704295'

const OFFERINGS = [
  { icon: Monitor, title: 'Personal Portfolio', desc: 'A stunning personal website showcasing your skills, projects, experience, and contact info — built to impress recruiters and clients.' },
  { icon: Award, title: 'Student Portfolio', desc: 'Perfect for students and freshers. Highlight your academic projects, certifications, internships, and achievements in a professional layout.' },
  { icon: Palette, title: 'Creative Designer Portfolio', desc: 'Showcase UI/UX projects, graphic designs, brand identities, and illustrations with beautiful full-screen galleries and case studies.' },
  { icon: Smartphone, title: 'Fully Responsive Design', desc: 'Your portfolio looks stunning on every device — mobile, tablet, laptop, and desktop — with smooth animations and fast loading.' },
  { icon: Search, title: 'SEO & Visibility', desc: 'We optimize your portfolio for Google so potential employers or clients can find you when they search your name or skills.' },
  { icon: Share2, title: 'Social & Resume Integration', desc: 'Link your GitHub, LinkedIn, Behance, and resume PDF directly from your portfolio for a seamless professional presence.' },
]

const FEATURES = [
  'Custom domain setup (yourname.com)',
  'Interactive project showcase section',
  'Animated skill bars & tech stack display',
  'Timeline for education & experience',
  'Contact form with email integration',
  'Downloadable resume / CV section',
  'Dark mode & light mode options',
  'Fast-loading (90+ PageSpeed score)',
]

const PROCESS = [
  { step: '01', title: 'Info Collection', desc: 'Share your bio, skills, projects, education, and any design preferences or references you like.' },
  { step: '02', title: 'Design Concept', desc: 'We create a design mockup for your approval — choosing colors, layout, and typography that match your personality.' },
  { step: '03', title: 'Build & Animate', desc: 'We build your full portfolio with smooth animations, responsive layout, and all your content.' },
  { step: '04', title: 'Launch & Hand Over', desc: 'We deploy to your domain, run final checks, and hand you full access with a walkthrough.' },
]

export default function PortfolioServicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Portfolio Website Design | Inayath Basha'
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
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-left">
            <div className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-fit shadow-[0_0_15px_rgba(168,85,247,0.15)] animate-fade-in">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" /> Portfolio Design
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-white">
              A Portfolio That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300">Gets You Hired</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              We build premium, interactive portfolio websites for students, developers, designers, and freelancers — crafted to make a lasting first impression on anyone who visits.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] relative group">
              <img 
                src="/portfolio-hero.png" 
                alt="Portfolio Showcase" 
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
          {[{ value: '30+', label: 'Portfolios Built' }, { value: '5 Days', label: 'Avg Delivery' }, { value: '100%', label: 'Satisfaction' }].map(({ value, label }) => (
            <div key={label} className="first:pl-0 pl-2 group transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 drop-shadow-[0_2px_10px_rgba(168,85,247,0.25)]">{value}</div>
              <div className="text-[9px] sm:text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 md:space-y-24">

        {/* What We Do - Two Column Layout */}
        <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your Personal Brand,<br />Online
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              In today's world, your portfolio is your first impression. Before a recruiter reads your resume or a client hears your pitch — they Google you. We build portfolio websites that make that search result <span className="text-white font-semibold">unforgettable</span>.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Whether you're a computer science student looking for your first job, a designer showcasing your Behance work, or a freelancer attracting new clients — we craft a portfolio that tells your story beautifully.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1424] to-[#0a0f1e] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-[40px] group-hover:bg-purple-500/15 transition-colors duration-500" />
            <h3 className="font-extrabold text-white text-base mb-6 border-b border-white/5 pb-3">Why Build a Portfolio?</h3>
            <ul className="space-y-4">
              {[
                { title: 'Interactive Resumes', desc: 'Allow visitors to download PDFs, scroll timelines, or expand tabs.' },
                { title: 'Stunning Animation Transitions', desc: 'Utilizing smooth hardware-accelerated animations for clean layouts.' },
                { title: 'Showcase Live Mockups', desc: 'Interactive before/after comparative panels for visual outputs.' },
                { title: 'SEO Optimized Names', desc: 'Engineered search keywords so your name ranks on the first page.' }
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8 md:mb-10">Portfolio Services We Provide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 hover:bg-[#0f0d1e] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Icon size={20} className="text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="hidden md:block bg-gradient-to-br from-purple-950/30 to-indigo-950/20 border border-purple-500/15 rounded-3xl p-8 sm:p-12">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Everything Included</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8">What's in Every Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="hidden md:block">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-10">Our 4-Step Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step}>
                <div className="text-5xl font-black text-purple-500/10 mb-3 leading-none">{step}</div>
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
            "I got my portfolio built by Inayath before my campus placements. Three interviewers specifically mentioned my website during interviews. I got placed at my dream company. This portfolio was the difference."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">AK</div>
            <div>
              <p className="text-white font-semibold text-sm">Arjun K.</p>
              <p className="text-slate-500 text-xs">Software Engineer, TCS</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Zap size={32} className="text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Build Your Portfolio?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Let's create a portfolio that showcases the real you and opens the doors you've been waiting for.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Inayath!%20I'm%20interested%20in%20a%20portfolio%20website.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 text-sm">
              <Award size={18} /> Build My Portfolio <ArrowRight size={16} />
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
