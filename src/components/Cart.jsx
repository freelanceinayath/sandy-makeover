import React, { useState } from 'react'
import { B2BDatabase } from '../lib/db'

export default function Cart({ navigateTo, cart, updateCartQty, removeFromCart, clearCart, triggerToast }) {
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Get pricing dynamically based on current quantity for each cart item
  const getUnitPriceForProduct = (product, quantity) => {
    const tier = product.bulkPricing.find(t => quantity >= t.minQty && quantity <= t.maxQty)
    return tier ? tier.price : product.basePrice
  }

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = getUnitPriceForProduct(item.product, item.qty)
    return acc + (unitPrice * item.qty)
  }, 0)

  const gst = Math.round(subtotal * 0.18)
  const shippingFee = subtotal > 15000 || subtotal === 0 ? 0 : 500
  const finalDiscount = couponApplied ? Math.round(subtotal * 0.05) : 0 // 5% B2B coupon discount
  const grandTotal = subtotal + gst + shippingFee - finalDiscount

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (couponCode.toUpperCase() === 'B2B5') {
      setCouponApplied(true)
      triggerToast('5% B2B coupon applied successfully!')
    } else {
      triggerToast('Invalid coupon code. Try "B2B5"', 'error')
    }
  }

  // Check if any items are violating MOQ requirements
  const hasMoqViolation = cart.some(item => item.qty < item.product.moq)

  const handleSaveAsQuotation = () => {
    if (cart.length === 0) return
    
    // Save cart contents as a B2B quotation
    const quoteId = `AG-Q-${Math.floor(10000 + Math.random() * 90000)}`
    const itemsDescription = cart.map(i => `${i.qty}x ${i.product.name} (SKU: ${i.product.sku})`).join(', ')
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0)
    
    const newQuote = {
      id: quoteId,
      date: new Date().toISOString(),
      productName: `Proforma Quote: ${itemsDescription}`,
      qty: totalQty,
      requirements: `Cart conversion quotation. Value: ₹${grandTotal}. (Saved for internal approval)`,
      status: 'Responded', // Auto-approving the quote with current prices!
      quotedPrice: Math.round(subtotal / totalQty), // Average price per unit
      adminReply: 'Proforma quote generated automatically based on current wholesale pricing tiers. 18% GST and shipping included.'
    }

    B2BDatabase.submitQuoteRequest(newQuote)
    clearCart()
    triggerToast('Cart successfully saved as a B2B Proforma Quote! Go to Account to view.')
    navigateTo('account')
  }

  return (
    <div className="bg-[#F8F8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold font-brand text-slate-900 tracking-tight mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">Select commercial loaf pans or baking trays from our catalog to get bulk quotes.</p>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* MOQ Alert banner */}
              {hasMoqViolation && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs sm:text-sm space-y-1">
                  <div className="flex items-center space-x-2 font-bold">
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Minimum Order Quantity Warning</span>
                  </div>
                  <p>Some items in your cart do not satisfy our manufacturing minimum runs. Please adjust items highlighted in red to proceed to checkout.</p>
                </div>
              )}

              {cart.map((item) => {
                const product = item.product
                const quantity = item.qty
                const unitPrice = getUnitPriceForProduct(product, quantity)
                const itemTotal = unitPrice * quantity
                const isViolated = quantity < product.moq

                return (
                  <div 
                    key={product.id}
                    className={`bg-white rounded-xl border p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${isViolated ? 'border-red-300 bg-red-50/10' : 'border-slate-200'}`}
                  >
                    
                    {/* Item details */}
                    <div className="flex items-center space-x-4">
                      <div 
                        onClick={() => navigateTo('product', { id: product.id })}
                        className="w-16 h-16 bg-[#F8F8F6] border border-slate-200 rounded-lg p-1 flex items-center justify-center cursor-pointer shrink-0"
                      >
                        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono-spec font-bold uppercase tracking-wider">{product.sku}</span>
                        <h4 
                          onClick={() => navigateTo('product', { id: product.id })}
                          className="text-sm font-bold text-slate-900 hover:text-[#2C5F8A] cursor-pointer line-clamp-1 leading-tight"
                        >
                          {product.name}
                        </h4>
                        
                        <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono-spec">
                            Moq: {product.moq} pcs
                          </span>
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono-spec">
                            Tier Price: ₹{unitPrice}/pc
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity editor and prices */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                      
                      {/* Quantity Input */}
                      <div className="flex items-center space-x-2">
                        <div className="flex border border-slate-300 rounded-lg overflow-hidden h-9 shadow-sm bg-white">
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, Math.max(1, quantity - 1))}
                            className="px-2.5 hover:bg-slate-50 text-slate-600 font-semibold"
                          >
                            －
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => updateCartQty(product.id, Math.max(1, Number(e.target.value)))}
                            className="w-12 text-center border-x border-slate-300 font-mono-spec font-semibold text-slate-800 text-sm focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, quantity + 1)}
                            className="px-2.5 hover:bg-slate-50 text-slate-600 font-semibold"
                          >
                            ＋
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Total cost */}
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-mono-spec">Subtotal</span>
                        <span className="text-sm font-bold text-slate-900 font-mono-spec">
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                    </div>

                  </div>
                )
              })}

              {/* Cart operations */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-xs font-semibold text-[#2C5F8A] hover:underline"
                >
                  ← Continue Shopping
                </button>
                
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Clear Cart
                </button>
              </div>

            </div>

            {/* Order Summary Checkout Card */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">Order Summary</h3>

              {/* Promo code field */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo Code (B2B5)"
                  className="flex-1 b2b-input min-h-[40px] text-xs uppercase"
                  disabled={couponApplied}
                />
                <button
                  type="submit"
                  disabled={couponApplied || !couponCode}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors min-h-[40px] disabled:opacity-50"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {/* Fee Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm font-medium text-slate-600 border-b border-slate-100 pb-4">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-mono-spec text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>GST Invoice Tax (18%)</span>
                  <span className="font-mono-spec text-slate-800">₹{gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Freight Transport</span>
                  <span className="font-mono-spec text-slate-800">
                    {shippingFee === 0 ? 'FREE (Orders > ₹15k)' : `₹${shippingFee}`}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-green-700">
                    <span>B2B Member Discount (5%)</span>
                    <span className="font-mono-spec">-₹{finalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-base">Grand Total</span>
                <span className="text-2xl font-black text-[#2C5F8A] font-mono-spec">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                Tax breakdown active. Net prices include 18% CGST + SGST. Proforma generated matches local pricing lists.
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigateTo('checkout')}
                  disabled={hasMoqViolation}
                  className="w-full b2b-btn-primary min-h-[48px] font-bold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={handleSaveAsQuotation}
                  className="w-full bg-white border-2 border-slate-300 hover:border-[#2C5F8A] text-slate-800 font-bold min-h-[48px] rounded-lg text-sm flex items-center justify-center transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Save as Proforma Quotation</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}
