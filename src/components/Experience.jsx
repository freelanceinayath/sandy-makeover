import { useEffect, useRef } from 'react'
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react'

const EXPERIENCE = [
  {
    role: 'Email Marketing Specialist',
    company: 'Apsensys Media',
    location: 'Bengaluru, Karnataka',
    period: 'Mar 2026 – May 2026',
    type: 'Hybrid',
  },
  {
    role: 'Shopify Developer',
    company: 'PAPERO®',
    location: 'Chennai, Tamil Nadu',
    period: 'Aug 2025 – Oct 2025',
    type: 'Hybrid',
  },
  {
    role: 'Student Intern',
    company: 'Taxina Mobility Pvt Ltd',
    location: 'Coimbatore, Tamil Nadu',
    period: 'Jun 2025 – Jul 2025',
    type: 'Internship',
  },
  {
    role: 'Front-End Developer Intern',
    company: 'Skynet Bee (College Startup)',
    location: 'Erode, Tamil Nadu',
    period: 'Jul 2024 – Dec 2024',
    type: 'Internship',
    points: [
      'Built responsive websites using HTML, CSS, and JavaScript',
      'Worked on real-time college projects',
      'Improved UI/UX and website performance',
      'Used Shopify, Figma, Canva, Excel, and modern web technologies',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

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

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-[#0a0f1e] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 fade-in">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">My Journey</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
            Experience
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
            Professional journey, internships, and past roles
          </p>
        </div>

        {/* Stacked Timeline Layout */}
        <div className="relative pl-6 sm:pl-8 border-l border-gradient-to-b border-amber-500/30 space-y-10">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="fade-in relative group">
              {/* Glowing timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#0a0f1e] border-2 border-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              {/* Stacked card container */}
              <div className="bg-[#0d1426] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-amber-500/20 transition-all duration-300 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    {/* Role */}
                    <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-amber-400 transition-colors">
                      {exp.role}
                    </h3>

                    {/* Company */}
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-sm sm:text-base mt-1">
                      <Building2 size={14} className="text-amber-400/80" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="self-start sm:self-auto">
                    <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium border-b border-white/5 pb-4 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-slate-600" />
                    {exp.location}
                  </span>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-slate-600" />
                    {exp.period}
                  </span>
                </div>

                {/* Bullet Points */}
                {exp.points && (
                  <ul className="space-y-2.5">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
