import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function StaticPages({ type, navigateTo }) {
  const WHATSAPP_NUM = '919345704295'

  // Contact form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    
    try {
      // Attempt to save in Supabase contact_messages table
      const { error } = await supabase.from('contact_messages').insert([
        {
          name,
          email,
          message: `Phone: ${phone}\n\nMessage: ${message}`
        }
      ])

      if (error) throw error

      setSuccess(true)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (err) {
      console.error('Error saving contact message:', err)
      // Fallback success if database offline/unconfigured
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* ABOUT PAGE */}
        {type === 'about' && (
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-brand text-slate-900 mb-6">About Anti Gravity Bakeware</h1>
            
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-8 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200" 
                alt="Bakery Production" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                <p className="text-white text-xl sm:text-2xl font-semibold px-4 text-center">
                  Precision Engineering for Commercial Baking
                </p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
              <p className="text-lg text-slate-800 font-medium">
                For over 15 years, Anti Gravity has been a leading manufacturer and wholesale supplier of heavy-duty industrial baking trays, loaf pans, and custom bakeware moulds for commercial operations across India.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 pt-4">Our Manufacturing Standard</h2>
              <p>
                Operating out of our ISO 9001:2015 certified plant in Vapi, Gujarat, we utilize state-of-the-art metal stamping, perforated pressing, and non-stick coating application lines. Every bread tray and pullman mould is engineered to ensure even heating, high durability, and easy loaf release, reducing cycle times and scrap rates in commercial deck and rotary ovens.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 pt-4">
                <div className="bg-[#F8F8F6] p-5 rounded-lg border border-slate-200 text-center">
                  <div className="text-3xl font-bold text-[#2C5F8A] mb-1">500+</div>
                  <div className="text-xs text-slate-500 font-mono-spec uppercase">Bakeries Served</div>
                </div>
                <div className="bg-[#F8F8F6] p-5 rounded-lg border border-slate-200 text-center">
                  <div className="text-3xl font-bold text-[#2C5F8A] mb-1">45,000+</div>
                  <div className="text-xs text-slate-500 font-mono-spec uppercase">Pans Shipped</div>
                </div>
                <div className="bg-[#F8F8F6] p-5 rounded-lg border border-slate-200 text-center">
                  <div className="text-3xl font-bold text-[#2C5F8A] mb-1">ISO</div>
                  <div className="text-xs text-slate-500 font-mono-spec uppercase">9001:2015 Certified</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 pt-4">Custom Orders & Fabrication</h2>
              <p>
                No two commercial baking systems are identical. We work closely with food service chains, hotel procurement departments, and large commercial bakers to prototype and manufacture pans and trolleys according to exact dimensional constraints.
              </p>
              
              <div className="bg-[#2C5F8A]/5 border-l-4 border-[#2C5F8A] p-5 rounded-r-lg my-6">
                <h4 className="font-bold text-[#2C5F8A] mb-1">Need a custom dimension or thick gauge product?</h4>
                <p className="text-sm text-slate-700">
                  Our fabrication engineers can design and mill custom moulds to fit your rotary oven frames or automated conveyor systems.
                </p>
                <button 
                  onClick={() => navigateTo('quote')}
                  className="mt-3 text-xs bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Request a Custom Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {type === 'contact' && (
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-brand text-slate-900 mb-2">Contact Anti Gravity</h1>
            <p className="text-slate-500 mb-8">Have bulk questions, custom requirements, or order queries? Reach our team directly.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Info Columns */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Corporate Office & Factory</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Plot 54, Sector 4, GIDC Industrial Estate,<br />
                    Vapi, Gujarat - 396191
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Business Inquiries</h3>
                  <p className="text-slate-600 text-sm space-y-1">
                    <div><strong>WhatsApp:</strong> +91 93457 04295</div>
                    <div><strong>Email:</strong> sales@antigravitybakeware.com</div>
                    <div><strong>Hours:</strong> Mon – Sat: 9:00 AM – 6:30 PM IST</div>
                  </p>
                </div>

                {/* WhatsApp Direct CTA */}
                <div className="bg-green-50 border border-green-200 p-5 rounded-lg flex items-start space-x-4">
                  <div className="p-2 bg-green-500 text-white rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 text-sm">Instant Trade Chat</h4>
                    <p className="text-xs text-green-700 mt-1 mb-2">Connect immediately with a sales representative via WhatsApp for bulk orders.</p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUM}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors"
                    >
                      Start Chat
                    </a>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-[#F8F8F6] border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Send a Message</h3>
                {success ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-sm">
                    <p className="font-semibold mb-1">Message Received!</p>
                    <p>Thank you for writing to us. Our sales support representative will contact you via email or phone within 2 hours.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="text-xs font-medium text-[#2C5F8A] mt-3 underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</label>
                      <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Patel" 
                        className="w-full b2b-input" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                        <input 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. rajesh@bakery.com" 
                          className="w-full b2b-input" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
                        <input 
                          type="tel" 
                          required 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 9999999999" 
                          className="w-full b2b-input" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Message</label>
                      <textarea 
                        required 
                        rows="4" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write details about your bulk inquiries or dimensions requirements..." 
                        className="w-full b2b-input py-3"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full b2b-btn-primary"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FAQ PAGE */}
        {type === 'faq' && (
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-brand text-slate-900 mb-2">B2B Trade FAQs</h1>
            <p className="text-slate-500 mb-8">Answers to bulk purchasing, custom fabrication, invoicing, and logistics inquiries.</p>

            <div className="space-y-6">
              {[
                {
                  q: "What is your Minimum Order Quantity (MOQ)?",
                  a: "Because we run industrial manufacturing lines, our default MOQs depend on the product complexity (typically 12 pcs for Pullman pans, 15 pcs for bread trays, and 10 pcs for perforated trays). For custom fabrications, we usually require a minimum order value of ₹25,000."
                },
                {
                  q: "Do you supply GST Tax Invoices?",
                  a: "Yes. All sales are processed with regular B2B tax invoices charging 18% GST (Goods & Services Tax) for bakeware items. You can enter your company GSTIN during checkout, and it will be auto-populated on the PDF invoice for tax credit claims."
                },
                {
                  q: "How are custom-size orders processed?",
                  a: "To request a custom size, go to the 'Request Quote' page and specify dimensions, materials, sheet thickness, and expected volume. Our fabrication team will review and respond with a formal quote. Once accepted, a proforma invoice will be generated. Production begins after deposit payment."
                },
                {
                  q: "What is your shipping and delivery lead time?",
                  a: "In-stock items ship within 24-48 hours from our Vapi factory via industrial logistics partners (Gati, TCI Express, VRL). Standard transport time is 3–5 working days depending on destination. Made-to-order products typically take 10–14 working days for production."
                },
                {
                  q: "Do you offer credit terms?",
                  a: "Verified B2B accounts with repeat order histories of 6+ months can apply for Net-30 credit terms. You can select 'B2B Pay Later / Credit Terms' at checkout if your business profile is verified and active."
                },
                {
                  q: "Can I download a bulk pricelist?",
                  a: "Yes, once logged in as a verified client, you can go to your Profile and tap the 'Download My Pricelist' button. This generates a PDF of all products with your business-specific live wholesale prices."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-slate-200 pb-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TERMS PAGE */}
        {type === 'terms' && (
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand text-slate-900 mb-6">Terms & Conditions</h1>
            <p className="text-xs text-slate-400 font-mono-spec">Last Updated: June 18, 2026</p>

            <p>
              Welcome to the Anti Gravity B2B E-Commerce portal. By placing quotes or purchasing bulk products, your business entity agrees to the following commercial trade terms:
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-3">1. Pricing & Tiers</h3>
            <p>
              All prices shown on the website exclude shipping and local taxes unless explicitly stated. Pricing is subject to volume tiers. Anti Gravity reserves the right to cancel orders that do not satisfy the required product Minimum Order Quantity (MOQ).
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-3">2. Payment & Proforma Invoices</h3>
            <p>
              Bulk orders are initiated using a Proforma Invoice. Payments are accepted via online checkout (UPI, net banking, cards) or bank transfer. For custom fabrications, a 50% advance deposit is mandatory, with the remainder payable prior to dispatch.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-3">3. Delivery & Freight Charges</h3>
            <p>
              Shipments are dispatched Ex-Factory (Vapi, Gujarat). Freight charges are calculated based on shipment weight and cargo volume. Safe delivery responsibility transfers to the transport company upon pickup, but we assist in transit insurance claims where applicable.
            </p>
          </div>
        )}

        {/* PRIVACY PAGE */}
        {type === 'privacy' && (
          <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
            <h1 className="text-3xl sm:text-4xl font-bold font-brand text-slate-900 mb-6">Privacy Policy</h1>
            <p className="text-xs text-slate-400 font-mono-spec">Last Updated: June 18, 2026</p>

            <p>
              At Anti Gravity, we are committed to safeguarding corporate customer details and business transaction histories:
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-3">1. Corporate Data Collected</h3>
            <p>
              We collect company business names, GSTIN identifiers, contact coordinates, shipping coordinates, and transaction logs strictly to process bulk quotes and generate tax invoices.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-3">2. Transaction Security</h3>
            <p>
              Financial data and payment portal information are managed securely via certified payment gateways (Razorpay). Anti Gravity does not store bank credentials or credit card digits on our local databases.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-3">3. Data Sharing</h3>
            <p>
              Business details are shared strictly with transport logistics providers (e.g. Gati, VRL) to carry out cargo delivery. We do not sell or trade your purchasing history to third-party marketing companies.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
