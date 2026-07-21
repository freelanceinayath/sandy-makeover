import React, { useState } from 'react'
import { B2BDatabase } from '../lib/db'

export default function Checkout({ navigateTo, cart, clearCart, triggerToast }) {
  const user = B2BDatabase.getUser()

  // Steps: 1 = Details, 2 = Payment, 3 = Confirmation
  const [step, setStep] = useState(1)

  // Form State
  const [businessName, setBusinessName] = useState(user.businessName || '')
  const [gstin, setGstin] = useState(user.gstin || '')
  const [contactName, setContactName] = useState(user.contactName || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [email, setEmail] = useState(user.email || '')
  const [address, setAddress] = useState(user.addresses?.[0]?.address || '')
  const [shippingMode, setShippingMode] = useState('Standard') // Standard or Express

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('Razorpay') // Razorpay, Credit, Bank
  const [processingPayment, setProcessingPayment] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  // Calculations
  const getUnitPriceForProduct = (product, quantity) => {
    const tier = product.bulkPricing.find(t => quantity >= t.minQty && quantity <= t.maxQty)
    return tier ? tier.price : product.basePrice
  }

  const subtotal = cart.reduce((acc, item) => {
    const price = getUnitPriceForProduct(item.product, item.qty)
    return acc + (price * item.qty)
  }, 0)

  const gst = Math.round(subtotal * 0.18)
  const shippingFee = subtotal > 15000 || subtotal === 0 ? 0 : (shippingMode === 'Express' ? 1000 : 500)
  const grandTotal = subtotal + gst + shippingFee

  const handleStep1Submit = (e) => {
    e.preventDefault()
    if (!businessName || !contactName || !phone || !address) {
      triggerToast('Please fill out all required fields.', 'error')
      return
    }
    setStep(2)
  }

  const handlePlaceOrder = () => {
    setProcessingPayment(true)
    
    setTimeout(() => {
      const orderId = `AG-${Math.floor(10000 + Math.random() * 90000)}`
      
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        status: 'Processing',
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          sku: item.product.sku,
          qty: item.qty,
          priceAtPurchase: getUnitPriceForProduct(item.product, item.qty)
        })),
        subtotal,
        gst,
        shipping: shippingFee,
        total: grandTotal,
        paymentMethod: paymentMethod === 'Razorpay' ? 'UPI / Cards (Razorpay)' : (paymentMethod === 'Credit' ? 'B2B Pay Later / Credit Terms' : 'Bank Transfer Wire'),
        paymentStatus: paymentMethod === 'Razorpay' ? 'Paid' : 'Pending',
        billingDetails: {
          businessName,
          gstin,
          contactName,
          phone,
          address
        }
      }

      B2BDatabase.placeOrder(newOrder)
      setPlacedOrder(newOrder)
      clearCart()
      setStep(3)
      setProcessingPayment(false)
      triggerToast('Order placed successfully! Proforma Invoice ready.')
    }, 1500)
  }

  const handleDownloadInvoice = () => {
    if (!placedOrder) return

    // Build printable proforma invoice window
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Proforma Invoice - ${placedOrder.id}</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #1A1A1A; margin: 40px; line-height: 1.5; }
            .header { border-bottom: 2px solid #2C5F8A; padding-bottom: 20px; margin-bottom: 20px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #2C5F8A; color: white; padding: 10px; text-align: left; font-size: 14px; }
            td { padding: 10px; border-bottom: 1px solid #E5E7EB; font-size: 13px; }
            .totals { text-align: right; width: 40%; margin-left: auto; }
            .totals div { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
            .grand-total { font-weight: bold; border-top: 1px solid #1A1A1A; font-size: 16px; padding-top: 10px; }
            .footer { border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center; font-size: 11px; color: #6B7280; margin-top: 50px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="color: #2C5F8A; margin: 0;">PROFORMA INVOICE</h1>
            <p style="margin: 5px 0 0 0; font-weight: bold;">ANTI GRAVITY BAKEWARE MANUFACTURING</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #6B7280;">Vapi Plant: Plot 54, Sector 4, GIDC Industrial Estate, Vapi, Gujarat - 396191</p>
          </div>
          
          <div class="grid">
            <div>
              <h3 style="margin: 0 0 5px 0; color: #2C5F8A;">Supplier Details:</h3>
              <p style="margin: 2px 0; font-size: 13px;">Anti Gravity Industrial Inc.</p>
              <p style="margin: 2px 0; font-size: 13px;">GSTIN: 24AAACA5487B1Z8</p>
              <p style="margin: 2px 0; font-size: 13px;">Phone: +91 93457 04295</p>
            </div>
            <div style="text-align: right;">
              <h3 style="margin: 0 0 5px 0; color: #2C5F8A;">Invoice details:</h3>
              <p style="margin: 2px 0; font-size: 13px;"><strong>Order ID:</strong> ${placedOrder.id}</p>
              <p style="margin: 2px 0; font-size: 13px;"><strong>Date:</strong> ${new Date(placedOrder.date).toLocaleDateString()}</p>
              <p style="margin: 2px 0; font-size: 13px;"><strong>Payment Mode:</strong> ${placedOrder.paymentMethod}</p>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 5px 0; color: #2C5F8A;">Bill To / Ship To:</h3>
            <p style="margin: 2px 0; font-size: 13px;"><strong>Business Name:</strong> ${placedOrder.billingDetails.businessName}</p>
            <p style="margin: 2px 0; font-size: 13px;"><strong>GSTIN:</strong> ${placedOrder.billingDetails.gstin || 'N/A'}</p>
            <p style="margin: 2px 0; font-size: 13px;"><strong>Contact Person:</strong> ${placedOrder.billingDetails.contactName} (${placedOrder.billingDetails.phone})</p>
            <p style="margin: 2px 0; font-size: 13px;"><strong>Delivery Location:</strong> ${placedOrder.billingDetails.address}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Description</th>
                <th>Qty</th>
                <th>Unit Price (ex-GST)</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${placedOrder.items.map(item => `
                <tr>
                  <td>${item.sku}</td>
                  <td>${item.name}</td>
                  <td>${item.qty} pcs</td>
                  <td>₹${item.priceAtPurchase}</td>
                  <td>₹${(item.qty * item.priceAtPurchase).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <div>
              <span>Items Subtotal:</span>
              <span>₹${placedOrder.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span>GST Tax (18%):</span>
              <span>₹${placedOrder.gst.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span>Shipping Freight:</span>
              <span>₹${placedOrder.shipping.toLocaleString('en-IN')}</span>
            </div>
            <div class="grand-total">
              <span>Grand Total:</span>
              <span>₹${placedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for your business. This is an auto-generated B2B Proforma Receipt.</p>
            <p>All items are supplied subject to our terms of manufacturing. Dispatch will occur from our Vapi Factory.</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="bg-[#F8F8F6] min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Checkout Header & Steps Indicator */}
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl font-bold font-brand text-slate-900 tracking-tight">Order Checkout</h1>
          
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 text-xs sm:text-sm font-bold ${step >= 1 ? 'text-[#2C5F8A]' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center font-mono-spec">1</span>
              <span>Delivery details</span>
            </div>
            <span className="h-0.5 w-8 bg-slate-300"></span>
            <div className={`flex items-center space-x-2 text-xs sm:text-sm font-bold ${step >= 2 ? 'text-[#2C5F8A]' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center font-mono-spec">2</span>
              <span>Payment mode</span>
            </div>
            <span className="h-0.5 w-8 bg-slate-300"></span>
            <div className={`flex items-center space-x-2 text-xs sm:text-sm font-bold ${step >= 3 ? 'text-green-600' : 'text-slate-400'}`}>
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center font-mono-spec">3</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* STEP 1: Delivery Details Form */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">1. Shipping & Invoice Details</h2>
            
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Business Name (Billing Name) *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Raj Bakery & Confectionery"
                    className="w-full b2b-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company GSTIN (Optional for Tax Credit)</label>
                  <input
                    type="text"
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="e.g. 27AAAAA1111A1Z1"
                    className="w-full b2b-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Rajesh Patel"
                    className="w-full b2b-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 93457 04295"
                    className="w-full b2b-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rajesh@rajbakery.com"
                    className="w-full b2b-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Shipping Address *</label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot / Street / Area / Landmark / City / State / Pincode"
                  className="w-full b2b-input py-3"
                ></textarea>
              </div>

              {/* Delivery Speed Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Freight Shipping Option</label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setShippingMode('Standard')}
                    className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-all ${shippingMode === 'Standard' ? 'border-[#2C5F8A] bg-[#2C5F8A]/5' : 'border-slate-200'}`}
                  >
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Standard Cargo Transport</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">3–5 business days</p>
                    </div>
                    <span className="font-bold text-xs text-slate-800 font-mono-spec">
                      {subtotal > 15000 ? 'FREE' : '₹500'}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMode('Express')}
                    className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-all ${shippingMode === 'Express' ? 'border-[#2C5F8A] bg-[#2C5F8A]/5' : 'border-slate-200'}`}
                  >
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Express Cargo Courier</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">1–3 business days</p>
                    </div>
                    <span className="font-bold text-xs text-slate-800 font-mono-spec">
                      ₹1,000
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigateTo('cart')}
                  className="text-sm font-semibold text-[#2C5F8A] hover:underline"
                >
                  ← Return to Cart
                </button>
                <button
                  type="submit"
                  className="b2b-btn-primary px-8 text-sm shadow-md"
                >
                  Continue to Payment
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 2: Payment Selector */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">2. Select B2B Payment Mode</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Razorpay Gateway option */}
              <div
                onClick={() => setPaymentMethod('Razorpay')}
                className={`p-5 border rounded-xl cursor-pointer flex flex-col justify-between space-y-3 transition-all ${paymentMethod === 'Razorpay' ? 'border-[#2C5F8A] bg-[#2C5F8A]/5 ring-1 ring-[#2C5F8A]' : 'border-slate-200'}`}
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">UPI / Cards / Gateway</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Pay instantly using Razorpay gateway. (UPI QR, Credit/Debit cards, Net Banking).</p>
                </div>
                <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-mono-spec font-bold uppercase w-fit">Instant Dispatch</span>
              </div>

              {/* Pay Later credit option */}
              <div
                onClick={() => setPaymentMethod('Credit')}
                className={`p-5 border rounded-xl cursor-pointer flex flex-col justify-between space-y-3 transition-all ${paymentMethod === 'Credit' ? 'border-[#2C5F8A] bg-[#2C5F8A]/5 ring-1 ring-[#2C5F8A]' : 'border-slate-200'}`}
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">B2B Net-30 Credit</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Deferred billing available for verified commercial bakery partners. Invoice due in 30 days.</p>
                </div>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-mono-spec font-bold uppercase w-fit">Verification Req</span>
              </div>

              {/* Bank transfer option */}
              <div
                onClick={() => setPaymentMethod('Bank')}
                className={`p-5 border rounded-xl cursor-pointer flex flex-col justify-between space-y-3 transition-all ${paymentMethod === 'Bank' ? 'border-[#2C5F8A] bg-[#2C5F8A]/5 ring-1 ring-[#2C5F8A]' : 'border-slate-200'}`}
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Direct Bank Transfer</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Offline RTGS / NEFT / IMPS wire transfer. Production starts upon receipt of funds.</p>
                </div>
                <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono-spec font-bold uppercase w-fit">Manual Slip</span>
              </div>

            </div>

            {/* Sub-panels based on selected method */}
            {paymentMethod === 'Razorpay' && (
              <div className="bg-[#F8F8F6] border border-slate-200 p-5 rounded-lg space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Merchant Name:</span>
                  <span className="font-bold text-slate-800">Anti Gravity Industrial</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-2">
                  <span className="text-slate-600">Checkout Payable (incl. GST):</span>
                  <span className="font-extrabold text-[#2C5F8A] font-mono-spec text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-slate-400">Tapping 'Place Order' will launch the simulated Razorpay UPI overlay to complete payment.</p>
              </div>
            )}

            {paymentMethod === 'Credit' && (
              <div className="bg-[#F8F8F6] border border-slate-200 p-5 rounded-lg space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Net-30 Credit Agreement</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your business account <strong>Raj Bakery & Confectionery</strong> will be billed ₹{grandTotal.toLocaleString('en-IN')} on invoice due date. Dispatch is subject to credit approval by factory administration.
                </p>
                <div className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 p-2.5 rounded font-medium">
                  Note: A purchase order (PO) reference will be required from your procurement manager upon callback.
                </div>
              </div>
            )}

            {paymentMethod === 'Bank' && (
              <div className="bg-[#F8F8F6] border border-slate-200 p-5 rounded-lg space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Factory Wire Coordinates</h4>
                <div className="text-xs text-slate-700 font-mono-spec space-y-1">
                  <div><strong>Beneficiary:</strong> Anti Gravity Industrial Bakeware</div>
                  <div><strong>Bank Name:</strong> State Bank of India (SBI)</div>
                  <div><strong>Account Number:</strong> 40982547021</div>
                  <div><strong>IFSC Code:</strong> SBIN0001850</div>
                  <div><strong>Branch:</strong> GIDC Estate Vapi, Gujarat</div>
                </div>
                <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  Please transfer ₹{grandTotal.toLocaleString('en-IN')} and share the receipt reference or transaction slip with our sales desk on WhatsApp.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-[#2C5F8A] hover:underline"
                disabled={processingPayment}
              >
                ← Back to Details
              </button>
              
              <button
                onClick={handlePlaceOrder}
                disabled={processingPayment}
                className="b2b-btn-primary px-8 text-sm shadow-md flex items-center justify-center"
              >
                {processingPayment ? 'Processing...' : `Pay & Place Order (₹${grandTotal.toLocaleString('en-IN')})`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 3 && placedOrder && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6">
            
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-brand">Order Received & Confirmed!</h2>
              <p className="text-sm text-slate-500">
                Your order <strong className="text-slate-800 font-mono-spec">{placedOrder.id}</strong> has been logged in the manufacturing queue.
              </p>
            </div>

            {/* Order Brief Summary Card */}
            <div className="bg-[#F8F8F6] border border-slate-200 p-5 rounded-xl text-left max-w-md mx-auto space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest pb-2 border-b border-slate-200">Receipt Overview</h4>
              
              <div className="text-xs text-slate-600 space-y-1 font-medium">
                <div className="flex justify-between">
                  <span>Grand Total (incl Tax):</span>
                  <span className="font-mono-spec font-bold text-slate-900">₹{placedOrder.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="font-bold text-green-700">{placedOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-bold text-slate-900">
                    {shippingMode === 'Express' ? '18-20 Jun 2026' : '20-22 Jun 2026'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleDownloadInvoice}
                className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Proforma Receipt</span>
              </button>

              <a
                href={`https://wa.me/919345704295?text=Hello%20Anti%20Gravity,%20I%20just%20placed%20order%20${placedOrder.id}.%20Please%20verify.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.25 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.727-1.458L0 24zm6.59-3.859c1.654.982 3.511 1.5 5.409 1.5 5.887 0 10.682-4.793 10.686-10.68.002-2.853-1.108-5.533-3.127-7.553C17.598 1.388 14.92 .277 12.01.277c-5.89 0-10.685 4.793-10.689 10.68-.002 2.155.562 4.258 1.637 6.109L2.016 20.8l3.876-1.017c1.478.808 3.122 1.341 4.755 1.358z" />
                </svg>
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => navigateTo('account')}
                className="bg-white border border-slate-300 hover:border-[#2C5F8A] text-slate-800 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Go to My Orders
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
