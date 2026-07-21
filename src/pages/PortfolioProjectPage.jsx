import { useEffect } from 'react'
import { ArrowLeft, ExternalLink, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function PortfolioProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Personal Portfolio | React & Tailwind CSS Project by Inayath Basha",
    "description": "A premium developer portfolio with high-performance animations, collapsible timeline cards, and single-card team display. Built with React and Tailwind CSS by Inayath Basha.",
    "url": "https://inayathbasha.vercel.app/projects/portfolio",
    "publisher": {
      "@id": "https://inayathbasha.vercel.app/#person"
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 selection:bg-blue-500/30 selection:text-white">
      <SEO 
        title="Personal Portfolio Project | React & Tailwind CSS"
        description="A premium developer portfolio with high-performance animations, collapsible timeline cards, and single-card team display. Built with React and Tailwind CSS by Inayath Basha."
        canonical="/projects/portfolio"
        schema={pageSchema}
      />
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Massive Viewport Image */}
          <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] mb-12 bg-[#0d1426] relative group">
             <div className="bg-[#0e172e] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#080d1a] rounded-md px-4 py-1.5 text-xs text-slate-500 flex items-center gap-2 max-w-md w-full border border-white/5">
                    inayathbasha.vercel.app
                  </div>
                </div>
              </div>
            <img 
              src="/portfolio_new.png" 
              alt="Portfolio Project" 
              className="w-full h-auto"
            />
          </div>

          {/* Hero Section */}
          <div className="mb-10 sm:mb-16 text-center flex flex-col items-center">
            <div className="flex items-center gap-3.5 mb-5">
              <span className="px-3.5 py-1 bg-blue-500/10 text-blue-400 text-[10px] sm:text-xs font-bold rounded-full border border-blue-500/20 uppercase tracking-wider">
                React
              </span>
              <span className="px-3.5 py-1 bg-purple-500/10 text-purple-400 text-[10px] sm:text-xs font-bold rounded-full border border-purple-500/20 uppercase tracking-wider">
                Tailwind CSS
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight px-2">
              Personal Portfolio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                Premium Web Experience
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed px-4">
              A premium developer portfolio with high-performance animations, collapsible timeline cards, and single-card team display.
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16 px-2 sm:px-0">
            {/* Card 1: The Challenge */}
            <div className="bg-[#111623]/40 border border-red-500/10 hover:border-red-500/20 rounded-2xl p-5 sm:p-7 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-red-500/5 blur-2xl pointer-events-none" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 border border-red-500/20">1</span>
                The Challenge
              </h2>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Needed a premium, accessible, and fast developer portfolio that displays skills, projects, and services dynamically without feeling like a generic template. Performance and smooth animations were absolute must-haves.
              </p>
            </div>

            {/* Card 2: The Solution */}
            <div className="bg-[#111623]/40 border border-blue-500/10 hover:border-blue-500/20 rounded-2xl p-5 sm:p-7 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/20">2</span>
                The Solution
              </h2>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Created a React + Vite single-page application built entirely on Tailwind CSS. I styled it with fluid Framer Motion animations to guide the user's eye and create an incredibly immersive, app-like experience.
              </p>
            </div>
          </div>

          {/* Impact Banner */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#111623]/80 to-[#0a0f1e]/80 border border-blue-500/20 p-6 sm:p-8 md:p-12 mb-16 overflow-hidden backdrop-blur-md shadow-2xl shadow-black/40 group hover:border-blue-500/30 transition-all duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
            
            {/* Floating Quote Icon */}
            <Quote className="absolute top-6 right-8 text-blue-500/5 w-20 h-20 sm:w-24 sm:h-24 rotate-180 pointer-events-none" />
            
            <h2 className="text-xs font-bold text-blue-400 mb-4 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              The Impact
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 leading-relaxed italic relative z-10">
              "Achieved near-perfect 100/100 Lighthouse performance, accessibility, and SEO audit scores on all devices, leading to significantly higher engagement."
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center">
            <a
              href="https://inayathbasha.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.4)] text-sm sm:text-base group"
            >
              Visit Live Project 
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
