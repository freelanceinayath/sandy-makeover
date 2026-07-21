import { useEffect, useState } from 'react'
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { PROJECTS } from '../components/Projects'

export default function AllProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [mobileSliderPositions, setMobileSliderPositions] = useState({})
  const [activeFilter, setActiveFilter] = useState('All')

  const FILTERS = ['All', 'React & Node.js', 'Shopify & WordPress', 'Generative AI & ML']

  const filteredProjects = PROJECTS.filter(proj => {
    if (activeFilter === 'All') return true
    const tagsLower = proj.tags.map(t => t.toLowerCase())
    const platformLower = proj.platform.toLowerCase()
    
    if (activeFilter === 'React & Node.js') {
      return tagsLower.includes('react') || tagsLower.includes('react.js') || tagsLower.includes('node.js') || platformLower.includes('react')
    }
    if (activeFilter === 'Shopify & WordPress') {
      return tagsLower.includes('wordpress') || tagsLower.includes('shopify') || platformLower.includes('wordpress') || platformLower.includes('shopify')
    }
    if (activeFilter === 'Generative AI & ML') {
      return tagsLower.includes('generative ai') || tagsLower.includes('machine learning') || tagsLower.includes('stable diffusion') || tagsLower.includes('midjourney')
    }
    return true
  })

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Projects Gallery | Inayath Basha Portfolio",
    "description": "Browse all frontend, backend, Shopify, WordPress, and Machine Learning projects delivered by Inayath Basha.",
    "url": "https://inayathbasha.vercel.app/projects",
    "publisher": {
      "@id": "https://inayathbasha.vercel.app/#person"
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 selection:bg-blue-500/30 selection:text-white relative overflow-hidden">
      {/* Decorative background glow orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <SEO 
        title="Projects Gallery | Web Developer & Shopify Expert"
        description="Browse all frontend, backend, Shopify, WordPress, and Machine Learning projects delivered by Inayath Basha."
        canonical="/projects"
        schema={pageSchema}
      />
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="text-blue-400 animate-pulse" />
              Gallery Catalog
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              All <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
              Explore the complete catalog of projects, web applications, and agritech integrations designed and built for global clients.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto p-1.5 bg-[#111623]/60 border border-white/5 rounded-2xl backdrop-blur-md">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_15px_rgba(59,130,246,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          {/* Grid Layout of All Projects */}
          <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in">
            {filteredProjects.map((proj, index) => {
              return (
                <div 
                  key={proj.title}
                  className="bg-[#111623] border border-white/5 rounded-2xl flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:border-white/10 group shadow-lg hover:shadow-2xl hover:shadow-blue-500/5"
                >
                  {/* Numbered Badge */}
                  <div className={`absolute -top-3.5 -right-2 w-9 h-9 rounded-full bg-gradient-to-br ${proj.accent} flex items-center justify-center text-white font-black text-sm shadow-[0_4px_15px_rgba(0,0,0,0.5)] z-30`}>
                    {parseInt(proj.number)}
                  </div>

                  {/* Top Image Area */}
                  <div className="relative aspect-[16/10] w-full rounded-t-2xl overflow-hidden bg-[#0a0d14]">
                    {proj.beforeImage && proj.afterImage ? (
                      <div className="relative w-full h-full select-none">
                        <img src={proj.beforeImage} alt="Before AI" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 animate-fade-in" style={{ clipPath: `polygon(0 0, ${mobileSliderPositions[index] ?? 50}% 0, ${mobileSliderPositions[index] ?? 50}% 100%, 0 100%)` }}>
                          <img src={proj.afterImage} alt="After AI" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-y-0 w-[3px] bg-white cursor-ew-resize flex items-center justify-center pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ left: `${mobileSliderPositions[index] ?? 50}%` }}>
                          <div className="w-6 h-6 bg-slate-900 rounded-full shadow-lg border-2 border-white flex items-center justify-center -ml-[12px] pointer-events-auto">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
                            </svg>
                          </div>
                        </div>
                        <input type="range" min="0" max="100" value={mobileSliderPositions[index] ?? 50} onChange={(e) => setMobileSliderPositions(prev => ({ ...prev, [index]: Number(e.target.value) }))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={proj.image} alt={`${proj.title} Preview`} loading="lazy" decoding="async" className="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-white mb-1.5">{proj.title}</h3>
                    <p className="text-[13px] text-slate-400 mb-4 leading-relaxed flex-grow">
                      {proj.description}
                    </p>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {proj.tags.slice(0, 3).map((tag, i) => (
                        <span key={tag} className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${proj.tagColors[i] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 mt-auto">
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r ${proj.accent} text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 hover:shadow-lg transition-all whitespace-nowrap order-1 sm:order-2`}
                      >
                        Live Project
                        <ExternalLink size={13} className="opacity-90 shrink-0" />
                      </a>
                      
                      <Link
                        to={proj.detailPage}
                        className="w-full sm:flex-1 py-2.5 px-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-white font-bold text-xs flex items-center justify-center gap-1.5 group whitespace-nowrap order-2 sm:order-1"
                      >
                        Project Overview
                        <span className="group-hover:translate-x-1 transition-transform text-sm leading-none">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-[#111623]/20 border border-white/5 rounded-3xl backdrop-blur-sm">
              <p className="text-slate-400 text-base font-semibold">No projects found in this category.</p>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
