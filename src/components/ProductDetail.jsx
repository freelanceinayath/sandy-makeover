import React, { useState, useEffect } from 'react'
import { B2BDatabase } from '../lib/db'

export default function ProductDetail({ navigateTo, params, addToCart, wishlist, toggleWishlist }) {
  const productId = params?.id || 'p-1'
  const product = B2BDatabase.getProductById(productId)
  
  if (!product) {
    return (
      <div className="bg-white py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
        <button onClick={() => navigateTo('shop')} className="mt-4 b2b-btn-primary px-6">Back to Shop</button>
      </div>
    )
  }

  // Related products
  const relatedProducts = B2BDatabase.getProducts().filter(p => p.id !== product.id).slice(0, 3)

  // State
  const [activeImage, setActiveImage] = useState(product.image)
  const [qty, setQty] = useState(product.moq)
  const [pincode, setPincode] = useState('')
  const [deliveryEstimate, setDeliveryEstimate] = useState('')
  const [checkingPincode, setCheckingPincode] = useState(false)
  const [reviews, setReviews] = useState([])
  
  // Custom reviews submission state
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState(false)

  useEffect(() => {
    setActiveImage(product.image)
    setQty(product.moq)
    setReviews(B2BDatabase.getReviewsForProduct(product.id))
    setReviewSuccess(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId, product])

  // Get active price based on quantity selection
  const activePrice = useEffect(() => {}, [qty]) 
  
  const getUnitPriceForQty = (quantity) => {
    const tier = product.bulkPricing.find(t => quantity >= t.minQty && quantity <= t.maxQty)
    return tier ? tier.price : product.basePrice
  }

  const unitPrice = getUnitPriceForQty(qty)

  const handlePincodeSubmit = (e) => {
    e.preventDefault()
    if (!pincode || pincode.length !== 6) {
      setDeliveryEstimate('Please enter a valid 6-digit PIN code.')
      return
    }
    setCheckingPincode(true)
    setTimeout(() => {
      setCheckingPincode(false)
      const firstDigit = pincode[0]
      if (firstDigit === '1' || firstDigit === '2' || firstDigit === '4' || firstDigit === '3') {
        setDeliveryEstimate('🟢 Delivered in 2–4 working days via Express Freight.')
      } else {
        setDeliveryEstimate('🟢 Delivered in 5–7 working days via Standard Cargo.')
      }
    }, 800)
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!reviewName || !reviewComment) return

    const newReview = {
      id: `r-${Date.now()}`,
      productId: product.id,
      userName: reviewName,
      rating: Number(reviewRating),
      comment: reviewComment,
      date: new Date().toISOString(),
      verified: true,
      helpfulCount: 0
    }

    B2BDatabase.addReview(newReview)
    setReviews(prev => [newReview, ...prev])
    setReviewName('')
    setReviewComment('')
    setReviewSuccess(true)
  }

  // Thumbnails to simulate different angles
  const galleryImages = [
    { label: 'Front Angle', url: product.image },
    { label: 'Top Open', url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400' },
    { label: 'Stamping Line', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400' },
    { label: 'Design Specs', url: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=400' }
  ]

  const isWishlisted = wishlist.includes(product.id)
  const isBelowMoq = qty < product.moq

  return (
    <div className="bg-white min-h-screen pb-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="text-slate-400 text-xs font-semibold mb-6 uppercase tracking-wider">
          <button onClick={() => navigateTo('home')} className="hover:text-slate-900 transition-colors">Home</button>
          <span className="mx-2 font-mono-spec">/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-slate-900 transition-colors">Shop</button>
          <span className="mx-2 font-mono-spec">/</span>
          <span className="text-slate-950 font-bold">{product.category}</span>
        </nav>

        {/* Core Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-80 sm:h-96 w-full bg-[#F8F8F6] border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-6 relative">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 rounded font-mono-spec tracking-wider uppercase shadow-md">
                SKU: {product.sku}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img.url)}
                  className={`h-20 sm:h-24 bg-[#F8F8F6] border rounded-lg overflow-hidden flex items-center justify-center p-1 relative transition-colors ${activeImage === img.url ? 'border-[#2C5F8A] border-2 bg-[#2C5F8A]/5' : 'border-slate-200'}`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/60 text-[8px] text-white text-center py-0.5 truncate uppercase font-semibold">
                    {img.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical specifications, Pricing, and Cart Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block bg-[#2C5F8A]/10 text-[#2C5F8A] px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider font-mono-spec">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-brand leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400 font-mono-spec mt-1 uppercase tracking-widest">Model: {product.sku}</p>
            </div>

            {/* Live Pricing Tiers Block */}
            <div className="bg-[#F8F8F6] border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">B2B Volume Wholesale Tiers</h3>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                {product.bulkPricing.map((tier, idx) => {
                  const isActive = qty >= tier.minQty && qty <= tier.maxQty
                  return (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg border transition-all ${isActive ? 'bg-[#2C5F8A]/10 border-[#2C5F8A] ring-1 ring-[#2C5F8A]' : 'bg-white border-slate-200'}`}
                    >
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {tier.maxQty === 99999 ? `${tier.minQty}+ pcs` : `${tier.minQty}-${tier.maxQty} pcs`}
                      </p>
                      <p className="text-base sm:text-lg font-extrabold text-slate-900 font-mono-spec mt-1">₹{tier.price}</p>
                      <p className="text-[9px] text-slate-400">/pc ex-GST</p>
                    </div>
                  )
                })}
              </div>

              {/* Total Calculation Display */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-end text-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Estimated Cost (ex-GST)</span>
                  <p className="text-sm font-semibold font-mono-spec text-slate-900">
                    {qty} pcs × ₹{unitPrice}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Total (incl 18% GST)</span>
                  <p className="text-xl font-extrabold text-[#2C5F8A] font-mono-spec">
                    ₹{Math.round(qty * unitPrice * 1.18).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector + Add to Cart Action */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Quantity Selection</label>
                
                <div className="flex items-center space-x-3">
                  <div className="flex border border-slate-300 rounded-lg overflow-hidden h-12 shadow-sm bg-white">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 hover:bg-slate-50 text-slate-600 font-semibold active:scale-95 transition-transform"
                    >
                      －
                    </button>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                      className="w-16 text-center border-x border-slate-300 font-mono-spec font-bold text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="px-4 hover:bg-slate-50 text-slate-600 font-semibold active:scale-95 transition-transform"
                    >
                      ＋
                    </button>
                  </div>
                  
                  {/* MOQ Indicator Tag */}
                  <div className="text-xs bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg font-mono-spec text-slate-600">
                    Minimum Order Qty: <strong className="text-slate-900">{product.moq} pcs</strong>
                  </div>
                </div>
                
                {/* MOQ Warning Warning */}
                {isBelowMoq && (
                  <div className="mt-2 text-xs bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg flex items-center space-x-2">
                    <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>
                      Quantities below <strong>{product.moq} pcs</strong> do not satisfy wholesale manufacturing limits. Please adjust your quantity to checkout.
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons (Desktop) */}
              <div className="hidden sm:flex gap-4 pt-2">
                <button
                  onClick={() => {
                    if (isBelowMoq) {
                      setQty(product.moq)
                      addToCart(product, product.moq)
                    } else {
                      addToCart(product, qty)
                    }
                  }}
                  className="flex-1 b2b-btn-primary min-h-[48px] font-bold text-sm shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add Bulk Qty to Cart</span>
                </button>

                <button
                  onClick={() => navigateTo('quote')}
                  className="px-6 bg-white border border-slate-300 hover:border-[#2C5F8A] text-slate-800 font-bold rounded-lg transition-colors flex items-center justify-center text-sm"
                >
                  Request Custom Quote
                </button>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center transition-colors"
                  aria-label="Wishlist"
                >
                  <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-500'}`} fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pincode Estimator Block */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Delivery Estimator</h3>
              
              <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 400013)"
                  className="flex-1 b2b-input min-h-[40px] text-sm"
                />
                <button
                  type="submit"
                  disabled={checkingPincode}
                  className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors min-h-[40px]"
                >
                  {checkingPincode ? 'Checking...' : 'Check'}
                </button>
              </form>

              {deliveryEstimate && (
                <p className="text-xs text-slate-700 font-medium">{deliveryEstimate}</p>
              )}
            </div>

            {/* Technical Specifications Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technical Specifications</h3>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left border-collapse bg-white">
                  <tbody>
                    <tr className="border-b border-slate-100 bg-[#F8F8F6]">
                      <td className="p-3 font-bold text-slate-500 w-1/3">Material</td>
                      <td className="p-3 text-slate-800 font-mono-spec">{product.material}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-500">Dimensions</td>
                      <td className="p-3 text-slate-800 font-mono-spec">{product.dimensions}</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-[#F8F8F6]">
                      <td className="p-3 font-bold text-slate-500">Weight</td>
                      <td className="p-3 text-slate-800 font-mono-spec">{product.weight}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-500">Capacity</td>
                      <td className="p-3 text-slate-800 font-mono-spec">{product.capacity}</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-[#F8F8F6]">
                      <td className="p-3 font-bold text-slate-500">Finish</td>
                      <td className="p-3 text-slate-800 font-mono-spec">{product.finish}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-500">Compatible Ovens</td>
                      <td className="p-3 text-slate-800 font-mono-spec">{product.compatibleOvens}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Product Description */}
        <section className="border-t border-slate-200 pt-8 mb-16">
          <h2 className="text-xl font-bold text-slate-900 mb-4 font-brand">Product Overview & Care Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>Designed and fabricated specifically for high-throughput commercial bakers. Engineered with thick, rolled-in steel wires inside the rim margins to prevent heat warp and deformation during consecutive deck loading cycles.</p>
            </div>
            <div className="bg-[#F8F8F6] p-6 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Industrial Care Guidelines</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                <li>Pre-heat pans lightly and grease with bakery release oil prior to first rise.</li>
                <li>Avoid steel wire brushes or abrasives during cleanup. Use warm water and soft sponge.</li>
                <li>Do not leave baking pans soaked in water or expose to direct flame heat.</li>
                <li>Verify rack clearances in deck ovens before loading large Pullman moulds.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="border-t border-slate-200 pt-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Reviews Summary */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 font-brand">Customer Reviews</h2>
              
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-extrabold text-[#2C5F8A] font-mono-spec">4.7</span>
                <div>
                  <div className="flex text-amber-500 text-sm">★★★★★</div>
                  <p className="text-xs text-slate-500">Based on verified bakery purchases</p>
                </div>
              </div>

              {/* Submit a review */}
              <div className="bg-[#F8F8F6] p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Add Verified Review</h4>
                
                {reviewSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-xs font-medium">
                    Review submitted for approval!
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Company/Name</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Baker Chef"
                        className="w-full b2b-input min-h-[36px] px-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full b2b-input min-h-[36px] px-3 text-xs"
                      >
                        <option value="5">5 Stars (Excellent)</option>
                        <option value="4">4 Stars (Good)</option>
                        <option value="3">3 Stars (Average)</option>
                        <option value="2">2 Stars (Poor)</option>
                        <option value="1">1 Star (Very Bad)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Comment</label>
                      <textarea
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write feedback about durability, release quality..."
                        rows="3"
                        className="w-full b2b-input py-2 px-3 text-xs"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-8 space-y-6">
              {reviews.length === 0 ? (
                <p className="text-slate-400 text-xs italic">No reviews submitted yet for this product. Be the first to leave a feedback.</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-slate-100 pb-5 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{rev.userName}</span>
                        <span className="ml-2 bg-green-100 text-green-800 font-bold text-[9px] px-2 py-0.5 rounded font-mono-spec uppercase">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-slate-400 text-xs font-mono-spec">
                        {new Date(rev.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex text-amber-500 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 font-brand">Related Baking Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateTo('product', { id: rel.id })}
                className="bg-[#F8F8F6] border border-slate-200 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-white flex items-center justify-center p-2 rounded-lg mb-3">
                  <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-mono-spec uppercase font-bold">{rel.sku}</span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-[#2C5F8A]">{rel.name}</h4>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-extrabold text-[#2C5F8A] font-mono-spec">₹{rel.basePrice}</span>
                    <span className="text-[10px] text-slate-500 font-mono-spec">MOQ: {rel.moq}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 9. Mobile Sticky CTA Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 p-4 sm:hidden flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 font-mono-spec uppercase block leading-none">Unit Price</span>
          <span className="text-lg font-black text-[#2C5F8A] font-mono-spec leading-tight">₹{unitPrice}</span>
          <span className="text-[9px] text-slate-500">/pc</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="w-12 h-12 border border-slate-300 rounded-lg flex items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 active:scale-95"
            aria-label="Wishlist"
          >
            <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-500'}`} fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              if (isBelowMoq) {
                setQty(product.moq)
                addToCart(product, product.moq)
              } else {
                addToCart(product, qty)
              }
            }}
            className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white px-6 h-12 rounded-lg font-bold text-sm shadow-md active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  )
}
