import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ShoppingBag, CheckCircle2, Star, Zap,
  Palette, Globe, CreditCard, BarChart2, Headphones, ArrowRight
} from 'lucide-react'

const WHATSAPP_NUM = '919345704295'

const OFFERINGS = [
  { icon: ShoppingBag, title: 'Full Store Setup', desc: 'From scratch to launch — domain, hosting config, Shopify plan selection, and complete store initialization.' },
  { icon: Palette, title: 'Premium Theme Customization', desc: 'We design and customize stunning themes with unique sections, brand colors, and custom typography that convert.' },
  { icon: Globe, title: 'Custom Sections & Pages', desc: 'Hand-coded Liquid sections for homepage, collection pages, product pages, and landing pages tailored to your brand.' },
  { icon: CreditCard, title: 'Payment Gateway Setup', desc: 'Integrate Razorpay, Stripe, PayPal, COD, and all local payment methods so customers can buy without friction.' },
  { icon: BarChart2, title: 'SEO & Speed Optimization', desc: 'Optimize your store for Google rankings, fast page loads, and structured data so you get organic traffic from day one.' },
  { icon: Headphones, title: 'Post-Launch Support', desc: 'We don\'t disappear after launch. Get dedicated support for bug fixes, updates, and feature additions after going live.' },
]

const FEATURES = [
  'Mobile-first responsive design',
  'Multi-currency & multi-language ready',
  'Abandoned cart recovery setup',
  'WhatsApp & email marketing integration',
  'Inventory management configuration',
  'Custom domain & SSL setup',
  'Product import & catalog setup',
  'Analytics (GA4 + Facebook Pixel)',
]

const PROCESS = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your products, target audience, brand vision, and business goals.' },
  { step: '02', title: 'Design & Plan', desc: 'We create a store structure plan and design mockups for your approval before touching code.' },
  { step: '03', title: 'Build & Customize', desc: 'Our team builds your complete Shopify store with all customizations, pages, and integrations.' },
  { step: '04', title: 'Review & Launch', desc: 'You review, we refine. Then we launch your store and hand you full ownership with a walkthrough.' },
]

export default function ShopifyServicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Shopify Store Development | Inayath Basha'
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
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-20 px-4 sm:px-6">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-green-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-left">
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-fit shadow-[0_0_15px_rgba(34,197,94,0.15)] animate-fade-in">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Shopify Expert
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-white">
              Launch a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300">
                High-Converting
              </span>
              <br />Shopify Store
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              From setup to launch — we build Shopify stores that look stunning, load fast, and drive real sales for your business.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] relative group">
              <img 
                src="/shopify-hero.png" 
                alt="Shopify Showcase" 
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
            { value: '20+', label: 'Stores Launched' },
            { value: '4.9★', label: 'Client Rating' },
            { value: '100%', label: 'On-Time Delivery' },
          ].map(({ value, label }) => (
            <div key={label} className="first:pl-0 pl-2 group transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 drop-shadow-[0_2px_10px_rgba(52,211,153,0.25)]">{value}</div>
              <div className="text-[9px] sm:text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 md:space-y-24">

        {/* What We Do - Two Column Layout */}
        <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              End-to-End Shopify<br />Development
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              We build complete, production-ready Shopify stores from the ground up. Whether you're a first-time entrepreneur launching your first product or an established brand looking to migrate and scale — we handle everything so you can focus on your business.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Our approach is simple: <span className="text-white font-semibold">your brand first</span>. We don't use cookie-cutter templates. Every store we build is crafted around your products, your customers, and your growth goals.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1424] to-[#0a0f1e] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-green-500/10 blur-[40px] group-hover:bg-green-500/15 transition-colors duration-500" />
            <h3 className="font-extrabold text-white text-base mb-6 border-b border-white/5 pb-3">Why Work With Us?</h3>
            <ul className="space-y-4">
              {[
                { title: 'Shopify Expert Status', desc: 'Deep expertise in custom Liquid templates and store initialization.' },
                { title: 'Tailored Branding', desc: 'Custom storefront designs crafted specifically to elevate your brand.' },
                { title: 'Payment Gateways', desc: 'Secure configurations for credit cards, local gateways, and checkout flows.' },
                { title: 'Blazing Fast Speed', desc: 'Google PageSpeed score optimization for search rankings.' }
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
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
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8 md:mb-10">
            Our Shopify Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-green-500/30 hover:bg-[#0f1a2e] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <Icon size={20} className="text-green-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Checklist */}
        <section className="hidden md:block bg-gradient-to-br from-green-950/30 to-emerald-950/20 border border-green-500/15 rounded-3xl p-8 sm:p-12">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Everything Included</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8">
            What's Included in Every Store
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Our Process */}
        <section className="hidden md:block">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-10">
            Our Simple 4-Step Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-5xl font-black text-green-500/10 mb-3 leading-none">{step}</div>
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
            "Inayath built our Shopify store from scratch in just 10 days. The design is stunning, it loads super fast, and our conversion rate went up by 40% in the first month. Absolutely recommended!"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              RA
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Rahul A.</p>
              <p className="text-slate-500 text-xs">Founder, FreshMart Online</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Zap size={32} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Launch Your Shopify Store?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Let's talk about your products and build a store that converts visitors into loyal customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Inayath!%20I'm%20interested%20in%20Shopify%20store%20development.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 text-sm"
            >
              <ShoppingBag size={18} />
              Start My Shopify Store
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
