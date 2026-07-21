import { useEffect, useRef } from 'react'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'

const EDUCATION = [
  {
    degree: 'B.Sc. Information Technology',
    school: 'RD National College of Arts and Science',
    location: 'Erode, Tamil Nadu',
    year: '2022 – 2025',
    result: 'CGPA: 8.0',
    type: 'degree',
  },
  {
    degree: 'Higher Secondary Certificate',
    school: 'Government Higher Secondary School',
    location: 'Erode, Tamil Nadu',
    year: '2020 – 2022',
    result: '79%',
    type: 'hsc',
  },
]

export default function Education() {
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
    <section id="education" ref={sectionRef} className="py-20 bg-[#080d1a] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 fade-in">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">My Academics</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
            Education
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
            Academic qualifications and achievements
          </p>
        </div>

        {/* Stacked Cards Layout */}
        <div className="space-y-6">
          {EDUCATION.map((edu, idx) => {
            const isDegree = edu.type === 'degree'
            return (
              <div
                key={idx}
                className="fade-in relative bg-[#0d1426] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/20 transition-all duration-300 shadow-lg group overflow-hidden"
              >
                {/* Background glow for Degree */}
                {isDegree && (
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl ${isDegree ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-slate-500/10 border border-slate-500/20 text-slate-400'} flex-shrink-0 mt-1`}>
                    <GraduationCap size={24} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-blue-400 transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-300 font-medium text-sm sm:text-base">
                      {edu.school}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-600" />
                        {edu.location}
                      </span>
                      <span className="hidden sm:inline text-slate-700">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-600" />
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CGPA / Marks Badge */}
                <div className="flex-shrink-0 self-start md:self-auto mt-2 md:mt-0">
                  <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border font-bold text-sm tracking-wide ${
                    isDegree 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-md shadow-blue-500/5' 
                      : 'bg-slate-500/10 border-slate-500/20 text-slate-300'
                  }`}>
                    {isDegree && <Award size={14} className="text-blue-400" />}
                    <span>{edu.result}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
