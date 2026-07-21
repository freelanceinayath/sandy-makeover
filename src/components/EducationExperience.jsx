import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Briefcase, ChevronDown, Sparkles } from 'lucide-react'

const EDUCATION = [
  {
    degree: 'B.Sc. Information Technology',
    school: 'RD National College of Arts and Science',
    location: 'Erode',
    year: '2022 – 2025',
    result: 'CGPA: 8.0',
    type: 'degree',
  },
  {
    degree: 'Higher Secondary Certificate',
    school: 'Government Higher Secondary School',
    location: 'Erode',
    year: '2020 – 2022',
    result: '79%',
    type: 'hsc',
  },
]

const EXPERIENCE = [
  {
    role: 'Email Marketing Specialist',
    company: 'Apsensys Media',
    location: 'Bengaluru, Karnataka (Hybrid)',
    period: 'Mar 2026 – May 2026',
    type: 'Hybrid',
  },
  {
    role: 'Shopify Developer',
    company: 'PAPERO®',
    location: 'Chennai, Tamil Nadu (Hybrid)',
    period: 'Aug 2025 – Oct 2025',
    type: 'Hybrid',
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

export default function EducationExperience() {
  const sectionRef = useRef(null)
  const [expandedEduIndex, setExpandedEduIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('education')

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
    <section id="education-experience" ref={sectionRef} className="py-20 bg-[#0a0f1e] scroll-mt-16 relative overflow-hidden">
      {/* Inline styles for tab switch slider and view transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-16px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes slideFromRight {
          0% {
            opacity: 0;
            transform: translateX(16px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .tab-panel-left {
          animation: slideFromLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .tab-panel-right {
          animation: slideFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase shadow-[0_0_15px_rgba(59,130,246,0.08)] mb-3 select-none">
            <Sparkles size={12} className="animate-pulse" />
            <span>My Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-gradient">Journey</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
            <div className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>

        {/* Sliding Toggle Switch (Visible on all screens) */}
        <div className="flex bg-[#0d1426] p-1 rounded-2xl mb-12 border border-white/5 mx-auto max-w-[340px] relative fade-in shadow-inner">
          {/* Sliding active indicator background */}
          <div
            className="absolute top-1 bottom-1 rounded-xl transition-all duration-500"
            style={{
              left: activeTab === 'education' ? '4px' : 'calc(50% + 2px)',
              width: 'calc(50% - 6px)',
              background: activeTab === 'education' 
                ? 'linear-gradient(135deg, #2563eb, #3b82f6)' 
                : 'linear-gradient(135deg, #d97706, #f59e0b)',
              boxShadow: activeTab === 'education' 
                ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' 
                : '0 4px 14px 0 rgba(245, 158, 11, 0.3)'
            }}
          />
          
          <button
            onClick={() => setActiveTab('education')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'education' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap size={16} className="transition-transform duration-300" />
            Education
          </button>
          
          <button
            onClick={() => setActiveTab('experience')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'experience' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase size={16} className="transition-transform duration-300" />
            Experience
          </button>
        </div>

        {/* Content Timelines (with smooth slide/fade animations) */}
        <div className="max-w-2xl mx-auto min-h-[300px]">
          
          {/* Education Timeline */}
          {activeTab === 'education' && (
            <div className="tab-panel-left">
              <div className="flex items-center gap-2.5 mb-6 pl-2">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <GraduationCap size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-xl">Education</h3>
              </div>

              <div className="relative pl-6 ml-2">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-blue-400 to-transparent" />
                <div className="space-y-6">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a0f1e] shadow-lg shadow-blue-500/50" />
                      <div
                        onClick={() => setExpandedEduIndex(expandedEduIndex === idx ? null : idx)}
                        className="bg-[#0d1426]/60 border border-white/5 rounded-2xl p-5 cursor-pointer hover:border-blue-500/20 transition-all duration-300 select-none shadow-lg hover:shadow-blue-500/5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-white font-bold text-sm sm:text-base">{edu.degree}</h4>
                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            <span className="text-blue-400 font-bold text-xs bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                              {edu.result}
                            </span>
                            <ChevronDown
                              size={18}
                              className={`text-slate-400 transition-transform duration-300 ${
                                expandedEduIndex === idx ? 'rotate-180 text-blue-400' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Collapsible Details */}
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            expandedEduIndex === idx ? 'max-h-32 opacity-100 mt-4 pt-3.5 border-t border-white/5' : 'max-h-0 opacity-0 pointer-events-none'
                          }`}
                        >
                          <p className="text-slate-300 text-xs sm:text-sm mb-1.5">
                            <span className="text-slate-500 font-medium mr-1.5">School/College:</span> {edu.school}
                          </p>
                          <p className="text-slate-300 text-xs sm:text-sm">
                            <span className="text-slate-500 font-medium mr-1.5">Location & Year:</span> {edu.location} · {edu.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Timeline */}
          {activeTab === 'experience' && (
            <div className="tab-panel-right">
              <div className="flex items-center gap-2.5 mb-6 pl-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Briefcase size={20} className="text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-xl">Experience</h3>
              </div>

              <div className="relative pl-6 ml-2">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-amber-500 via-amber-400 to-transparent" />
                <div className="space-y-6">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-[#0a0f1e] shadow-lg shadow-amber-500/50" />
                      <div
                        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                        className="bg-[#0d1426]/60 border border-white/5 rounded-2xl p-5 cursor-pointer hover:border-amber-500/20 transition-all duration-300 select-none shadow-lg hover:shadow-amber-500/5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-col">
                            <h4 className="text-white font-bold text-sm sm:text-base">{exp.role}</h4>
                            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            <span className="text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                              {exp.type}
                            </span>
                            <ChevronDown
                              size={18}
                              className={`text-slate-400 transition-transform duration-300 ${
                                expandedIndex === idx ? 'rotate-180 text-amber-400' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Collapsible Details */}
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            expandedIndex === idx ? 'max-h-64 opacity-100 mt-4 pt-3.5 border-t border-white/5' : 'max-h-0 opacity-0 pointer-events-none'
                          }`}
                        >
                          <p className="text-slate-300 text-xs sm:text-sm mb-1.5">
                            <span className="text-slate-500 font-medium mr-1.5">Location:</span> {exp.location}
                          </p>
                          <p className="text-slate-300 text-xs sm:text-sm mb-3">
                            <span className="text-slate-500 font-medium mr-1.5">Period:</span> {exp.period}
                          </p>
                          {exp.points && (
                            <ul className="space-y-2 mt-3.5 border-t border-white/5 pt-3">
                              {exp.points.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
