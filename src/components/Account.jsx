import React, { useState, useEffect } from 'react'
import { B2BDatabase } from '../lib/db'

export default function Account({ navigateTo, addToCart, triggerToast }) {
  // Load data from B2BDatabase on mount/render to ensure live updates
  const [user, setUser] = useState(() => B2BDatabase.getUser())
  const [orders, setOrders] = useState(() => B2BDatabase.getOrders())
  const [quotes, setQuotes] = useState(() => B2BDatabase.getQuotes())
  const [allProducts, setAllProducts] = useState(() => B2BDatabase.getProducts())
  
  // Refresh data whenever view updates
  useEffect(() => {
    setUser(B2BDatabase.getUser())
    setOrders(B2BDatabase.getOrders())
    setQuotes(B2BDatabase.getQuotes())
    setAllProducts(B2BDatabase.getProducts())
  }, [])

  // Local state
  const [searchQuery, setSearchQuery] = useState('')
  const [addressTitle, setAddressTitle] = useState('')
  const [addressContent, setAddressContent] = useState('')
  const [gstToggle, setGstToggle] = useState(true) // true = show price incl GST, false = show price ex GST
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' or 'quotes' or 'addresses'

  // Calculations: Find products this client has purchased previously
  const previouslyPurchasedProducts = React.useMemo(() => {
    const purchasedIds = new Set()
    orders.forEach(o => {
      o.items.forEach(item => {
        if (item.productId && item.productId !== 'custom-fab') {
          purchasedIds.add(item.productId)
        }
      })
    })
    
    // In case user hasn't made orders, fallback to seeding some default ones
    if (purchasedIds.size === 0) {
      purchasedIds.add('p-1')
      purchasedIds.add('p-2')
      purchasedIds.add('p-3')
    }

    return allProducts.filter(p => purchasedIds.has(p.id))
  }, [orders, allProducts])

  // Filter client products by search
  const filteredClientProducts = previouslyPurchasedProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Find active delivery orders (status is processing, shipped, or out for delivery)
  const activeDelivery = orders.find(o => 
    o.status === 'Processing' || o.status === 'Shipped' || o.status === 'Out for Delivery'
  )

  // Top 3 most frequently ordered products
  const quickReorderProducts = previouslyPurchasedProducts.slice(0, 3)

  const handleOneTapReorder = (product) => {
    // Add product to cart with its MOQ and go directly to checkout
    addToCart(product, product.moq)
    triggerToast(`Added ${product.name} (MOQ: ${product.moq} pcs) to checkout.`)
    navigateTo('checkout')
  }

  const handleReorderOrder = (order) => {
    // Add all items in the order to the cart and go to cart page
    order.items.forEach(item => {
      const p = allProducts.find(prod => prod.id === item.productId)
      if (p) {
        addToCart(p, item.qty)
      }
    })
    triggerToast(`Added items from order ${order.id} to cart.`)
    navigateTo('cart')
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!addressTitle || !addressContent) return

    const newAddress = {
      id: `addr-${Date.now()}`,
      title: addressTitle,
      address: addressContent
    }

    const updatedUser = {
      ...user,
      addresses: [...(user.addresses || []), newAddress]
    }

    B2BDatabase.saveUser(updatedUser)
    setUser(updatedUser)
    setAddressTitle('')
    setAddressContent('')
    triggerToast('Delivery address saved successfully!')
  }

  const handleDeleteAddress = (id) => {
    const updatedUser = {
      ...user,
      addresses: user.addresses.filter(a => a.id !== id)
    }
    B2BDatabase.saveUser(updatedUser)
    setUser(updatedUser)
    triggerToast('Address deleted.')
  }

  const handleAcceptQuote = (quoteId) => {
    const mainAddress = user.addresses?.[0]?.address || '14, Industrial Area Phase 2, Mumbai'
    const orderId = B2BDatabase.convertQuoteToOrder(quoteId, mainAddress)
    if (orderId) {
      triggerToast(`Quote converted to Order ${orderId}!`)
      // Refresh local lists
      setOrders(B2BDatabase.getOrders())
      setQuotes(B2BDatabase.getQuotes())
    }
  }

  // Generate and Download PDF Pricelist
  const handleDownloadPricelist = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Contract Price List - ${user.businessName}</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #1A1A1A; margin: 40px; }
            .header { border-bottom: 2px solid #2C5F8A; padding-bottom: 15px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #2C5F8A; color: white; padding: 10px; text-align: left; font-size: 13px; }
            td { padding: 10px; border-bottom: 1px solid #E5E7EB; font-size: 12px; }
            .price { font-family: monospace; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="color: #2C5F8A; margin: 0; font-size: 24px;">WHOLESALE CONTRACT PRICE LIST</h1>
            <p style="margin: 5px 0 0 0; font-weight: bold; font-size: 14px;">Client: ${user.businessName}</p>
            <p style="margin: 2px 0; font-size: 12px; color: #6B7280;">GSTIN: ${user.gstin || 'N/A'} | Date Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          <p style="font-size: 12px; color: #6B7280;">This lists products purchased or verified for Raj Bakery. Prices are updated in real-time ex-factory.</p>
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Item Description</th>
                <th>Category</th>
                <th>MOQ Limit</th>
                <th>Contract Price (ex-GST)</th>
                <th>Price (incl 18% GST)</th>
              </tr>
            </thead>
            <tbody>
              ${previouslyPurchasedProducts.map(p => `
                <tr>
                  <td>${p.sku}</td>
                  <td>${p.name}</td>
                  <td>${p.category}</td>
                  <td>${p.moq} pcs</td>
                  <td class="price">₹${p.basePrice} / pc</td>
                  <td class="price">₹${Math.round(p.basePrice * 1.18)} / pc</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #6B7280;">
            <p>Generated via Anti Gravity B2B Portal. Subject to standard industrial terms.</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  // Get status steps for shipping progress
  const getProgressWidth = (status) => {
    if (status === 'Processing') return '25%'
    if (status === 'Shipped') return '50%'
    if (status === 'Out for Delivery') return '75%'
    if (status === 'Delivered') return '100%'
    return '0%'
  }

  return (
    <div className="bg-[#F8F8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sticky Dashboard Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono-spec">Client Portal</p>
            <h1 className="text-2xl font-bold font-brand text-slate-900 mt-1">Welcome, {user.contactName}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{user.businessName} (GSTIN: {user.gstin})</p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadPricelist}
              className="flex-1 md:flex-initial bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Pricelist</span>
            </button>
            <button
              onClick={() => {
                triggerToast('Session reset. Please log in again.')
                navigateTo('home')
              }}
              className="flex-1 md:flex-initial bg-white border border-slate-300 hover:border-red-500 hover:text-red-500 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Sections Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Orders, Delivery Tracker, Live Prices */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Section 3: Active Delivery Tracker (Only visible if shipping) */}
            {activeDelivery && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 text-slate-900">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <h3 className="font-bold text-base leading-tight">Your order is on the way!</h3>
                    <p className="text-xs text-slate-400">Order ID: <span className="font-mono-spec font-bold text-slate-700">{activeDelivery.id}</span> · {activeDelivery.items.reduce((sum, i) => sum + i.qty, 0)} items</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative pt-4 pb-2">
                  <div className="h-1 bg-slate-100 rounded-full w-full">
                    <div 
                      className="h-1 bg-[#2C5F8A] rounded-full transition-all duration-500" 
                      style={{ width: getProgressWidth(activeDelivery.status) }}
                    />
                  </div>
                  
                  {/* Status Steps */}
                  <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 font-bold pt-3 uppercase tracking-wider">
                    <span className={activeDelivery.status === 'Processing' ? 'text-[#2C5F8A]' : 'text-slate-800'}>Placed</span>
                    <span className={activeDelivery.status === 'Shipped' ? 'text-[#2C5F8A]' : 'text-slate-800'}>Packed</span>
                    <span className={activeDelivery.status === 'Out for Delivery' ? 'text-[#2C5F8A]' : 'text-slate-800'}>Shipped</span>
                    <span className={activeDelivery.status === 'Delivered' ? 'text-[#2C5F8A]' : 'text-slate-800'}>Delivered</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-slate-100 text-xs text-slate-600 gap-4">
                  <div>
                    <p>Expected Delivery: <strong>Today by 5:00 PM</strong></p>
                    {activeDelivery.driverName && (
                      <p className="mt-0.5">Driver: <strong>{activeDelivery.driverName}</strong></p>
                    )}
                  </div>
                  
                  {activeDelivery.driverPhone && (
                    <a
                      href={`tel:${activeDelivery.driverPhone}`}
                      className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                    >
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call Driver</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Section 1: My Recent Orders */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-lg">My Recent Orders</h3>
                <span className="text-xs text-slate-400 font-mono-spec font-bold">SHOWING LAST {orders.slice(0, 5).length} ORDERS</span>
              </div>

              {/* Scrollable order strip */}
              <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white border border-slate-200 rounded-xl p-5 shadow-sm snap-start flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-slate-400 font-mono-spec font-semibold">Order ID</p>
                          <p className="font-mono-spec font-bold text-slate-900">{order.id}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded font-mono-spec uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                        <div className="truncate"><strong>Product:</strong> {order.items[0]?.name}</div>
                        <div><strong>Quantity:</strong> {order.items[0]?.qty} pcs</div>
                        <div><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <p className="font-mono-spec font-extrabold text-[#2C5F8A] text-sm leading-none">
                        ₹{order.total.toLocaleString('en-IN')}
                      </p>
                      
                      <button
                        onClick={() => handleReorderOrder(order)}
                        className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors"
                      >
                        Reorder Pan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: My Products & Live Prices (LIVE comparison) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">My Contract Products & Live Prices</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time ex-factory prices updated. GST invoice active.</p>
                </div>
                
                {/* GST Toggle and Search */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-slate-500 select-none">
                    <span>ex-GST</span>
                    <button 
                      type="button"
                      onClick={() => setGstToggle(!gstToggle)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${gstToggle ? 'bg-[#2C5F8A]' : 'bg-slate-300'}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${gstToggle ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                    <span>incl 18% GST</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Search my items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="b2b-input min-h-[36px] py-1 text-xs max-w-[150px]"
                  />
                </div>
              </div>

              {/* Products List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClientProducts.map((p) => {
                  // Price changes calculations
                  const lastSeen = user.lastSeenPrices?.[p.id] || p.basePrice
                  const currentPrice = p.basePrice
                  const priceDiff = currentPrice - lastSeen

                  const displayPrice = gstToggle ? Math.round(currentPrice * 1.18) : currentPrice
                  const displayBulk = gstToggle ? Math.round(p.bulkPricing[2].price * 1.18) : p.bulkPricing[2].price

                  return (
                    <div 
                      key={p.id}
                      className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between bg-[#F8F8F6] space-y-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-white rounded border border-slate-200 p-1 flex items-center justify-center shrink-0">
                          <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-400 font-mono-spec font-bold uppercase tracking-wider">{p.sku}</span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono-spec uppercase ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {p.inStock ? 'In Stock' : 'Made to Order'}
                          </span>
                        </div>
                      </div>

                      {/* Prices and Comparison Tag */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <div>
                            <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none">Your Price</span>
                            <span className="text-base font-extrabold text-[#2C5F8A] font-mono-spec">₹{displayPrice}</span>
                            <span className="text-[10px] text-slate-500 font-normal">/pc</span>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none">Bulk Price (50+)</span>
                            <span className="text-xs font-bold text-slate-700 font-mono-spec">₹{displayBulk}/pc</span>
                          </div>
                        </div>

                        {/* Price Change Indicators */}
                        {priceDiff !== 0 && (
                          <div className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono-spec uppercase w-fit ${priceDiff < 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {priceDiff < 0 
                              ? `▼ ₹${Math.abs(priceDiff)} lower than last order` 
                              : `▲ ₹${priceDiff} higher than last order`}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleOneTapReorder(p)}
                        className="w-full b2b-btn-primary min-h-[40px] text-xs font-bold"
                      >
                        Order Now
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-white border-2 border-slate-300 hover:border-[#2C5F8A] text-slate-800 font-bold px-6 py-2 rounded-lg text-xs transition-colors"
                >
                  Browse Full Catalogue
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Reorder, Pending Quotes, Address Management */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Section 4: Quick Reorder Widget */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
                ⚡ Quick Reorder
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {quickReorderProducts.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => handleOneTapReorder(p)}
                    className="border border-slate-200 rounded-lg p-2 bg-[#F8F8F6] text-center space-y-1.5 cursor-pointer hover:shadow-sm transition-shadow"
                  >
                    <div className="h-10 bg-white flex items-center justify-center p-1 rounded">
                      <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <p className="text-[9px] font-bold text-slate-700 truncate">{p.name.split(' | ')[0]}</p>
                    <p className="text-[10px] font-bold text-[#2C5F8A] font-mono-spec leading-none">₹{p.basePrice}/pc</p>
                    <span className="inline-block bg-[#2C5F8A] text-white text-[8px] font-bold px-2 py-0.5 rounded font-mono-spec uppercase mt-1">
                      Reorder
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: My Quotations */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
                📋 Custom Fabrication Quotes
              </h3>

              {quotes.length === 0 ? (
                <p className="text-slate-400 text-xs italic">No quotations submitted yet.</p>
              ) : (
                <div className="space-y-4">
                  {quotes.map((q) => (
                    <div key={q.id} className="border border-slate-200 rounded-lg p-4 bg-[#F8F8F6] text-xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-mono-spec font-bold text-slate-800">{q.id}</p>
                          <p className="text-slate-400 text-[10px]">{new Date(q.date).toLocaleDateString()}</p>
                        </div>
                        
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded font-mono-spec uppercase ${q.status === 'Responded' ? 'bg-green-100 text-green-800' : (q.status === 'Converted' ? 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-800')}`}>
                          {q.status}
                        </span>
                      </div>

                      <div className="font-medium space-y-1">
                        <div className="font-bold text-slate-900">{q.productName}</div>
                        <div>Req Qty: {q.qty} pcs</div>
                        <div>Specs: "{q.requirements.slice(0, 50)}..."</div>
                      </div>

                      {q.status === 'Responded' && (
                        <div className="border-t border-slate-200 pt-3 space-y-2">
                          <div className="text-[10px] text-green-800 bg-green-50 border border-green-200 p-2 rounded">
                            <strong>Fabrication Quote:</strong> ₹{q.quotedPrice}/pc ex-GST.<br />
                            <em>"{q.adminReply}"</em>
                          </div>
                          
                          <button
                            onClick={() => handleAcceptQuote(q.id)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-1.5 rounded transition-colors text-center"
                          >
                            Accept & Place Order
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Management Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
                📍 Saved Delivery Addresses
              </h3>

              <div className="space-y-3">
                {user.addresses?.map((addr) => (
                  <div key={addr.id} className="border border-slate-200 rounded-lg p-3 bg-[#F8F8F6] text-xs space-y-2 relative">
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                      title="Delete address"
                    >
                      ×
                    </button>
                    <p className="font-bold text-slate-800">{addr.title}</p>
                    <p className="text-slate-500 leading-relaxed">{addr.address}</p>
                  </div>
                ))}
              </div>

              {/* Add address form */}
              <form onSubmit={handleAddAddress} className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <input
                  type="text"
                  required
                  value={addressTitle}
                  onChange={(e) => setAddressTitle(e.target.value)}
                  placeholder="Address Title (e.g. Warehouse 3)"
                  className="w-full b2b-input min-h-[36px] px-3 text-xs"
                />
                <textarea
                  required
                  value={addressContent}
                  onChange={(e) => setAddressContent(e.target.value)}
                  placeholder="Full coordinates address..."
                  rows={2}
                  className="w-full b2b-input py-2 px-3 text-xs"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  Save Address Coordinate
                </button>
              </form>
            </div>

            {/* Section 6: Raise Complaint / Support Contact */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
                💬 Bakery Support
              </h3>
              
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <a
                  href="https://wa.me/919345704295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg block transition-colors shadow-sm"
                >
                  WhatsApp Chat
                </a>
                <a
                  href="tel:+919345704295"
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold p-3 rounded-lg block transition-colors shadow-sm"
                >
                  Call Factory Desk
                </a>
              </div>

              <button
                onClick={() => {
                  triggerToast('Support ticket raised. Administrative officer will call you in 10 minutes.')
                }}
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-bold border border-red-200 py-2.5 rounded-lg text-xs transition-colors"
              >
                ⚠️ Report Delivery Issue or Damaged Pans
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
