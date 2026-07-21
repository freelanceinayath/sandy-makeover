import { useEffect } from 'react'
import { ArrowLeft, ExternalLink, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function SmartCropProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SmartCrop AI | Agritech & Machine Learning Project by Inayath Basha",
    "description": "An AI-powered Agritech platform providing smart crop recommendations based on soil nutrients and weather conditions. Designed and developed by Inayath Basha.",
    "url": "https://inayathbasha.vercel.app/projects/smartcrop-ai",
    "publisher": {
      "@id": "https://inayathbasha.vercel.app/#person"
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 selection:bg-emerald-500/30 selection:text-white">
      <SEO 
        title="SmartCrop AI Project | Machine Learning & Agritech"
        description="An AI-powered Agritech platform providing smart crop recommendations based on soil nutrients and weather conditions. Designed and developed by Inayath Basha."
        canonical="/projects/smartcrop-ai"
        schema={pageSchema}
      />
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Massive Viewport Image */}
          <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.1)] mb-12 bg-[#0d1426] relative group">
             <div className="bg-[#0e172e] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#080d1a] rounded-md px-4 py-1.5 text-xs text-slate-500 flex items-center gap-2 max-w-md w-full border border-white/5">
                    smartcrop-ai.vercel.app
                  </div>
                </div>
              </div>
            <img 
              src="/smartcrop_mockup.png" 
              alt="SmartCrop AI Project Screenshot" 
              className="w-full h-auto"
            />
          </div>

          {/* Hero Section */}
          <div className="mb-10 sm:mb-16 text-center flex flex-col items-center">
            <div className="flex items-center gap-3.5 mb-5">
              <span className="px-3.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-wider">
                Machine Learning
              </span>
              <span className="px-3.5 py-1 bg-blue-500/10 text-blue-400 text-[10px] sm:text-xs font-bold rounded-full border border-blue-500/20 uppercase tracking-wider">
                Full-Stack
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight px-2">
              SmartCrop AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                Agritech Intelligence
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed px-4">
              An AI-powered Agritech platform providing smart crop recommendations based on soil nutrients and weather conditions.
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
                Students and researchers needed an easy, interactive way to test soil metrics (Nitrogen, Phosphorus, Potassium, pH, etc.) and run predictions. The goal was to build a full-stack ML tool with an intuitive frontend and a fast backend capable of parsing PDF/CSV data and running classification algorithms.
              </p>
            </div>

            {/* Card 2: The Solution */}
            <div className="bg-[#111623]/40 border border-emerald-500/10 hover:border-emerald-500/20 rounded-2xl p-5 sm:p-7 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-500/20">2</span>
                The Solution
              </h2>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Engineered a complete React frontend stacked with interactive metric sliders and drag-and-drop report uploads. Built a Python + FastAPI backend to host the machine learning models (trained on agritech datasets) to return real-time crop suggestions based on input characteristics.
              </p>
            </div>
          </div>

          {/* Impact Banner */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#111623]/80 to-[#0a0f1e]/80 border border-emerald-500/20 p-6 sm:p-8 md:p-12 mb-16 overflow-hidden backdrop-blur-md shadow-2xl shadow-black/40 group hover:border-emerald-500/30 transition-all duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
            
            {/* Floating Quote Icon */}
            <Quote className="absolute top-6 right-8 text-emerald-500/5 w-20 h-20 sm:w-24 sm:h-24 rotate-180 pointer-events-none" />
            
            <h2 className="text-xs font-bold text-emerald-400 mb-4 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
              The Impact
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 leading-relaxed italic relative z-10">
              "Successfully delivered a fully functional ML Agritech project for students. It simplifies farm analysis by allowing automated report uploads, processing complex soil data into visual, accurate crop suggestions."
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center">
            <a
              href="https://smartcrop-ai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)] text-sm sm:text-base group"
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
