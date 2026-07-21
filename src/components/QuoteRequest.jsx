import React, { useState } from 'react'
import { B2BDatabase } from '../lib/db'

export default function QuoteRequest({ navigateTo, triggerToast }) {
  const user = B2BDatabase.getUser()

  // Form states
  const [businessName, setBusinessName] = useState(user.businessName || '')
  const [contactName, setContactName] = useState(user.contactName || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [email, setEmail] = useState(user.email || '')
  const [productCategory, setProductCategory] = useState('Loaf Molds')
  const [quantity, setQuantity] = useState(100)
  const [requirements, setRequirements] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!businessName || !contactName || !phone || !requirements) {
      triggerToast('Please fill in all required fields.', 'error')
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      const quoteId = `AG-Q-${Math.floor(10000 + Math.random() * 90000)}`
      
      const newQuote = {
        id: quoteId,
        date: new Date().toISOString(),
        productName: `Custom B2B ${productCategory}`,
        qty: Number(quantity),
        requirements,
        status: 'Pending',
        quotedPrice: null,
        adminReply: '',
        referenceImage: null
      }

      B2BDatabase.submitQuoteRequest(newQuote)
      setSubmitting(false)
      setSuccess(true)
      setRequirements('')
      triggerToast('Fabrication quote submitted successfully!')
    }, 1000)
  }

  return (
    <div className="bg-[#F8F8F6] min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-bold font-brand text-slate-900 tracking-tight">Request Custom Fabrication</h1>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Need customized dimensions, double-wired pan rims, rotary conveyor molds, or heavy-duty steel trolleys? Let our design lab construct details.
          </p>
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {success ? (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-brand">Quote Specification Logged</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our fabrication estimators have received your requirements. A custom quotation will be logged to your Account portal within <strong>2 business hours</strong>.
                </p>
              </div>

              <div className="flex justify-center space-x-4 pt-2">
                <button
                  onClick={() => navigateTo('account')}
                  className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  View My Quotations
                </button>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Business Coordinates
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company / Bakery Name *</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Raj Bakery"
                      className="w-full b2b-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Rajesh Patel"
                      className="w-full b2b-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mobile Contact *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 93457 04295"
                      className="w-full b2b-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Coordinates *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@rajbakery.com"
                      className="w-full b2b-input text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 mb-4">
                  Design Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Product Line *</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full b2b-input text-sm"
                    >
                      <option value="Loaf Molds">Loaf Pullman Pans & Covers</option>
                      <option value="Bread Trays">Bread Stamping Baking Trays</option>
                      <option value="Perforated Trays">Perforated Sheet Pans</option>
                      <option value="Baguette Molds">Baguette Channels</option>
                      <option value="Baking Trolleys">Rotary Rack Heavy Trolleys</option>
                      <option value="Custom Plate">Industrial Conveyor Molds</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Volume Quantity *</label>
                    <input
                      type="number"
                      required
                      min={5}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(5, Number(e.target.value)))}
                      placeholder="Minimum custom order: 5 pcs"
                      className="w-full b2b-input text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Dimensional & Material Specs *</label>
                  <textarea
                    required
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={5}
                    placeholder="Specify dimensions (L x W x H in cm), sheet thickness (e.g. 1.2mm Alusteel), coating request (silicone non-stick or uncoated), or conveyor machine model details..."
                    className="w-full b2b-input py-3 text-sm"
                  ></textarea>
                </div>

                {/* Reference upload simulation */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Upload Reference Diagram (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#2C5F8A] bg-[#F8F8F6] transition-colors">
                    <p className="text-xs text-slate-500">Drag and drop blueprint drawings or click to select image files.</p>
                    <span className="text-[10px] text-slate-400 font-mono-spec mt-1 block">Supported: PDF, JPG, PNG up to 10MB</span>
                  </div>
                </div>
              </div>

              {/* Form submit */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider font-mono-spec">
                  ★ Standard Response: &lt; 2 Hours
                </span>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="b2b-btn-primary px-8 text-sm shadow-md"
                >
                  {submitting ? 'Submitting Specifications...' : 'Submit Spec for Quote'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  )
}
