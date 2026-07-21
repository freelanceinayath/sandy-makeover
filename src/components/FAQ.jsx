import { useState } from 'react'
import { HelpCircle, Zap, Settings, Shield, Clock, MessageCircle, ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    icon: Zap,
    colorClass: 'text-yellow-400',
    bgClass: 'bg-yellow-500/5',
    borderClass: 'border-yellow-500/20',
    question: "How do you increase Shopify conversion rates?",
    answer: "I focus on reducing page load times, optimizing mobile checkout flows, implementing high-converting UI/UX layouts, and ensuring your product pages have clear calls-to-action that drive sales."
  },
  {
    icon: Settings,
    colorClass: 'text-blue-400',
    bgClass: 'bg-blue-500/5',
    borderClass: 'border-blue-500/20',
    question: "Do you build custom sections or modify existing themes?",
    answer: "Yes, both! I can take any existing OS 2.0 Shopify theme (like Dawn, Impulse, or Prestige) and customize it, or code fully custom drag-and-drop sections from scratch. This allows you to update your store content easily."
  },
  {
    icon: Shield,
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-500/5',
    borderClass: 'border-purple-500/20',
    question: "Can you set up subscriptions, bundles & app integrations?",
    answer: "Absolutely. I integrate powerful third-party apps like ReCharge for subscriptions, custom bundling solutions to increase Average Order Value (AOV), and any other ERP or marketing integrations you need."
  },
  {
    icon: Clock,
    colorClass: 'text-green-400',
    bgClass: 'bg-green-500/5',
    borderClass: 'border-green-500/20',
    question: "What's your workflow & turnaround time?",
    answer: "We start with a discovery phase, followed by UI/UX wireframes, custom coding, and finally a rigorous speed test. A custom section takes 3-5 days, while a complete custom Shopify store typically takes 2-3 weeks."
  },
  {
    icon: MessageCircle,
    colorClass: 'text-rose-400',
    bgClass: 'bg-rose-500/5',
    borderClass: 'border-rose-500/20',
    question: "Do you offer support after the store goes live?",
    answer: "Yes, I provide a standard 30-day post-launch support period to ensure everything runs smoothly. I also offer ongoing retainer packages for continuous optimization, app updates, and new feature development."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden bg-[#0a0f1e] border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <HelpCircle size={12} />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Got Questions? <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">I've Got Answers</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Find answers to common questions about working with a freelance Shopify developer, pricing, timelines, and SEO optimizations.
          </p>
        </div>

        {/* 
          ========================================
          MOBILE LAYOUT: Ultra-Minimalist Glowing Pills 
          ========================================
        */}
        <div className="md:hidden space-y-3 max-w-md mx-auto">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className="flex flex-col">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className={`w-full px-5 py-3.5 rounded-full flex items-center justify-between transition-all duration-300 ${
                    isOpen 
                      ? 'bg-blue-500/10 border border-blue-500/30 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                      : 'bg-[#0d1426]/80 border border-white/5 text-slate-300 hover:border-white/10'
                  }`}
                >
                  <span className="font-semibold text-xs sm:text-sm text-left pr-4">
                    {item.question}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'
                    }`} 
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="px-5 pb-2 text-xs sm:text-sm text-slate-400 leading-relaxed border-l-2 border-blue-500/20 ml-5">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>


        {/* 
          ========================================
          DESKTOP LAYOUT: Standard Accordion 
          ========================================
        */}
        <div className="hidden md:block space-y-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            const Icon = item.icon
            return (
              <div
                key={idx}
                className={`group border rounded-[20px] transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#0d1426] border-white/10 shadow-lg' 
                    : 'bg-[#0d1426]/60 border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center gap-4 sm:gap-5 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Left Colored Icon */}
                  <div className={`w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl flex items-center justify-center flex-shrink-0 border transition-colors ${item.bgClass} ${item.colorClass} ${item.borderClass}`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>

                  {/* Middle Question Text */}
                  <div className="flex-1 pr-4">
                    <span className={`font-bold text-sm sm:text-[17px] leading-snug transition-colors duration-200 ${
                      isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {item.question}
                    </span>
                  </div>

                  {/* Right Chevron Down Button */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-800/40 border border-white/5 group-hover:bg-slate-800/60 transition-colors">
                    <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-4 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 sm:ml-[72px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
