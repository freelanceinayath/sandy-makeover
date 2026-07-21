import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Globe, CheckCircle2, Star, Zap,
  Layout, Gauge, ShoppingCart, Search, Settings, ArrowRight, Code2
} from 'lucide-react'

const WHATSAPP_NUM = '919345704295'

const OFFERINGS = [
  { icon: Layout, title: 'Custom Theme Development', desc: 'We build WordPress themes from scratch or customize premium themes to perfectly match your brand identity and vision.' },
  { icon: Globe, title: 'Business Website Design', desc: 'Modern, professional websites for companies, agencies, startups, and service providers that make a powerful first impression.' },
  { icon: ShoppingCart, title: 'WooCommerce Integration', desc: 'Turn your WordPress site into a powerful online store with WooCommerce — products, payments, orders, and inventory all managed in one place.' },
  { icon: Gauge, title: 'Speed & Performance Tuning', desc: 'We optimize images, enable caching, use CDN, and apply Core Web Vitals best practices for blazing-fast page loads.' },
  { icon: Search, title: 'On-Page SEO Setup', desc: 'Proper heading structure, meta tags, sitemap, schema markup, and Yoast/RankMath configuration for strong search engine visibility.' },
  { icon: Settings, title: 'Plugin Customization', desc: 'Configure and customize essential plugins for contact forms, booking systems, membership, multilingual support, and more.' },
]

const FEATURES = [
  'Fully responsive & mobile-optimized',
  'WordPress admin training included',
  'Contact forms & lead capture',
  'Google Maps & social media integration',
  'Blog / news section setup',
  'Maintenance mode & backup setup',
  'Custom post types & taxonomies',
  'Security hardening & SSL setup',
]

const PROCESS = [
  { step: '01', title: 'Requirements', desc: 'We map out your business, your audience, and the pages and features your website needs.' },
  { step: '02', title: 'Wireframe & Design', desc: 'We design page mockups in Figma and get your approval before any development starts.' },
  { step: '03', title: 'Development', desc: 'We build your site in WordPress, customize the theme, and integrate all required plugins and features.' },
  { step: '04', title: 'Testing & Launch', desc: 'We test across all devices and browsers, then push your site live with proper domain and hosting configuration.' },
]

export default function WordPressServicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'WordPress Development | Inayath Basha'
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
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-fit shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-fade-in">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              WordPress Developer
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-white">
              Build a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">
                Powerful WordPress
              </span>
              <br />Business Website
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              We build fast, modern, and SEO-optimized WordPress websites that establish your brand online and generate real leads for your business.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] relative group">
              <img 
                src="/wordpress-hero.png" 
                alt="WordPress Showcase" 
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
            { value: '15+', label: 'Sites Built' },
            { value: '4.8★', label: 'Client Rating' },
            { value: '7 Days', label: 'Avg Delivery' },
          ].map(({ value, label }) => (
            <div key={label} className="first:pl-0 pl-2 group transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-[0_2px_10px_rgba(96,165,250,0.25)]">{value}</div>
              <div className="text-[9px] sm:text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16 md:space-y-24">

        {/* What We Do - Two Column Layout */}
        <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              WordPress Experts Who<br />Deliver Results
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              WordPress powers over 43% of the internet — and for good reason. It's flexible, powerful, and when built right, it becomes the core engine of your online presence. We specialize in building custom WordPress websites that go far beyond basic templates.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Whether you need a <span className="text-white font-semibold">corporate business site</span>, a <span className="text-white font-semibold">WooCommerce store</span>, a <span className="text-white font-semibold">portfolio</span>, or a <span className="text-white font-semibold">content blog</span> — we deliver clean, professional WordPress websites that are fast, secure, and easy for you to manage.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#0d1424] to-[#0a0f1e] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-[40px] group-hover:bg-blue-500/15 transition-colors duration-500" />
            <h3 className="font-extrabold text-white text-base mb-6 border-b border-white/5 pb-3">Why Custom WP?</h3>
            <ul className="space-y-4">
              {[
                { title: 'Tailored Elementor & Gutenberg', desc: 'Custom built block sections that do not rely on bloated plugins.' },
                { title: 'Responsive Flow', desc: 'Optimized user experiences that fit and adapt on mobile screens.' },
                { title: 'WooCommerce Ready', desc: 'Secure payment gateway configurations, catalog flows, and shipping rules.' },
                { title: 'SEO Optimized', desc: 'Structured markup and meta fields to improve Google rankings.' }
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
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
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8 md:mb-10">
            Our WordPress Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-[#0f1a2e] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Checklist */}
        <section className="hidden md:block bg-gradient-to-br from-blue-950/30 to-indigo-950/20 border border-blue-500/15 rounded-3xl p-8 sm:p-12">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Everything Included</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8">
            What's in Every WordPress Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Our Process */}
        <section className="hidden md:block">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-10">
            Our 4-Step Development Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-5xl font-black text-blue-500/10 mb-3 leading-none">{step}</div>
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
            "Our business website was completely rebuilt by Inayath. The new site is lightning fast, ranks higher on Google, and we've seen a 60% increase in enquiries since launch. Top quality work!"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              MK
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Mohammed K.</p>
              <p className="text-slate-500 text-xs">Director, Al-Noor Trading Co.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Code2 size={32} className="text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Build Your WordPress Site?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Let's discuss your project and create a WordPress website that represents your brand perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Inayath!%20I'm%20interested%20in%20WordPress%20website%20development.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-sm"
            >
              <Globe size={18} />
              Start My WordPress Site
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
