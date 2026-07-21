import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, CheckCircle2, Star, Zap, ArrowRight,
  BarChart2, Users, Package, DollarSign, ClipboardList, HeartHandshake
} from 'lucide-react'

const WHATSAPP_NUM = '919345704295'

const OFFERINGS = [
  { icon: Package, title: 'Inventory Management', desc: 'Real-time stock tracking, low stock alerts, warehouse management, and automated purchase order generation.' },
  { icon: Users, title: 'HR & Payroll Module', desc: 'Employee records, attendance tracking, leave management, payroll processing, and compliance reporting in one system.' },
  { icon: DollarSign, title: 'Accounting & Finance', desc: 'General ledger, accounts payable/receivable, invoicing, expense tracking, GST/tax reports, and financial dashboards.' },
  { icon: ClipboardList, title: 'Sales & CRM', desc: 'Manage leads, quotations, sales orders, customer relationships, and after-sales follow-ups from a single platform.' },
  { icon: BarChart2, title: 'Analytics & Reports', desc: 'Real-time business intelligence dashboards with KPIs, trends, and exportable reports for data-driven decision making.' },
  { icon: HeartHandshake, title: 'Custom Workflows', desc: 'We model your exact business processes into the ERP — approval chains, notifications, and role-based access control.' },
]

const FEATURES = [
  'Role-based user access control',
  'Mobile app access (iOS & Android)',
  'Multi-branch / multi-location support',
  'GST / VAT compliance reporting',
  'Email & SMS notification triggers',
  'Third-party API integrations',
  'Data migration from existing systems',
  'Staff training & onboarding support',
]

const PROCESS = [
  { step: '01', title: 'Business Analysis', desc: 'We study your operations, pain points, and workflows to design the right ERP architecture for your business.' },
  { step: '02', title: 'System Design', desc: 'We create module maps, user roles, and data flow diagrams and get sign-off before building anything.' },
  { step: '03', title: 'Development & Setup', desc: 'We build, configure, and customize the ERP with all your modules, workflows, and business logic.' },
  { step: '04', title: 'Training & Go-Live', desc: 'We train your team, migrate your data, and support you through the go-live phase until everything runs smoothly.' },
]

export default function ERPServicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'ERP Solutions | Inayath Basha'
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100">

      {/* Back Nav */}
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/5 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>
      </div>      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-20 px-4 sm:px-6">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-fit shadow-[0_0_15px_rgba(249,115,22,0.15)] animate-fade-in">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              ERP System
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-white">
              Streamline Your Business with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300">
                Custom ERP
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              We implement, customize, and deploy Enterprise Resource Planning systems that automate your operations, eliminate manual errors, and give you complete business visibility.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] relative group">
              <img 
                src="/erp-hero.png" 
                alt="ERP Showcase" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Floating Overlap Glass Panel */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 md:-mt-14 relative z-20">
        <div className="bg-[#0d1424]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-3 gap-4 text-center divide-x divide-white/5">
          {[
            { value: '10+', label: 'ERP Deployments' },
            { value: '5.0★', label: 'Client Rating' },
            { value: '30%', label: 'Avg Cost Saved' },
          ].map(({ value, label }) => (
            <div key={label} className="first:pl-0 pl-2 group transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 drop-shadow-[0_2px_10px_rgba(251,146,60,0.25)]">{value}</div>
              <div className="text-[9px] sm:text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 md:space-y-24">

        {/* What We Do - Two Column Layout */}
        <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              End-to-End ERP<br />Implementation
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Managing a growing business with spreadsheets and disconnected tools is a recipe for chaos. An ERP system connects all your business functions — inventory, finance, HR, sales, and operations — into one intelligent platform that gives you real control.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              We specialize in <span className="text-white font-semibold">Odoo ERP</span> implementation and customization for small and medium businesses. We don't just install software — we study your business, model your workflows, and configure a system that feels built exactly for you.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1424] to-[#0a0f1e] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange-500/10 blur-[40px] group-hover:bg-orange-500/15 transition-colors duration-500" />
            <h3 className="font-extrabold text-white text-base mb-6 border-b border-white/5 pb-3">Why Work With Us?</h3>
            <ul className="space-y-4">
              {[
                { title: 'Workflow Analysis', desc: 'Thorough mapping of your actual business pipelines before implementation.' },
                { title: 'Odoo Customization', desc: 'Custom built Odoo dynamic dashboard components, reports, and models.' },
                { title: 'System Migrations', desc: 'Secure database migrations from spreadsheets or older legacy softwares.' },
                { title: 'Continuous Support', desc: 'Post-launch training sessions and software updates support.' }
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-orange-400 shrink-0 mt-0.5" />
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
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8 md:mb-10">
            ERP Modules We Implement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-orange-500/30 hover:bg-[#1a1205] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={20} className="text-orange-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Checklist */}
        <section className="hidden md:block bg-gradient-to-br from-orange-950/30 to-amber-950/20 border border-orange-500/15 rounded-3xl p-8 sm:p-12">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Everything Included</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8">
            Standard in Every ERP Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-orange-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Our Process */}
        <section className="hidden md:block">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-10">
            Our 4-Phase ERP Implementation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-5xl font-black text-orange-500/10 mb-3 leading-none">{step}</div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="hidden md:block bg-[#0d1424] border border-white/5 rounded-3xl p-8 sm:p-12">
          <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
          </div>
          <blockquote className="text-slate-200 text-lg sm:text-xl font-medium leading-relaxed mb-6 italic">
            "Before the ERP, we were managing inventory in 3 different Excel sheets and constantly making mistakes. Now everything is centralized. Our team saves 15+ hours every week. Best investment we've made."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
              SH
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Syed H.</p>
              <p className="text-slate-500 text-xs">Operations Head, Zara Traders</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Zap size={32} className="text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Transform Your Business Operations?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Let's schedule a free demo and show you exactly how an ERP system can eliminate chaos and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Inayath!%20I'm%20interested%20in%20ERP%20implementation%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 text-sm"
            >
              <BarChart2 size={18} />
              Get a Free ERP Demo
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-sm"
            >
              View More Services
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}
