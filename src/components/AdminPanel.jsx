import React, { useState, useEffect } from 'react'
import { B2BDatabase } from '../lib/db'

export default function AdminPanel({ navigateTo, triggerToast }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('anti_gravity_admin_logged_in') === 'true'
  })
  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Local database lists
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [quotes, setQuotes] = useState([])
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('analytics') // 'analytics', 'products', 'orders', 'quotes'
  
  // Product Add / Edit States
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProductId, setEditingProductId] = useState(null)
  
  // Form State for Adding / Editing Product
  const [prodForm, setProdForm] = useState({
    name: '',
    sku: '',
    category: 'Loaf Molds',
    material: 'Aluminium',
    dimensions: '',
    weight: '',
    capacity: '',
    finish: '',
    compatibleOvens: 'Deck, Rotary, Convection',
    basePrice: '',
    moq: '12',
    inStock: true,
    image: '',
    description: ''
  })

  // Dispatch states for orders
  const [selectedOrderId, setSelectedOrderId] = useState('')
  const [dispatchStatus, setDispatchStatus] = useState('Processing')
  const [driverName, setDriverName] = useState('')
  const [driverPhone, setDriverPhone] = useState('')

  // Reply states for quotes
  const [selectedQuoteId, setSelectedQuoteId] = useState('')
  const [quotedPrice, setQuotedPrice] = useState('')
  const [adminReplyMsg, setAdminReplyMsg] = useState('')

  // Refresh data on mount or authentication
  useEffect(() => {
    if (isAuthenticated) {
      refreshData()
    }
  }, [isAuthenticated])

  const refreshData = () => {
    setProducts(B2BDatabase.getProducts())
    setOrders(B2BDatabase.getOrders())
    setQuotes(B2BDatabase.getQuotes())
  }

  // Handle Admin Authentication
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoginError('')

    if (loginId === 'basha' && loginPassword === 'basha786') {
      setIsAuthenticated(true)
      localStorage.setItem('anti_gravity_admin_logged_in', 'true')
      triggerToast('Welcome back, Administrator!')
    } else {
      setLoginError('Invalid Owner ID or Password. Access denied.')
    }
  }

  const handleAdminLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('anti_gravity_admin_logged_in')
    triggerToast('Logged out of Admin Session.')
  }

  // Handle Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault()
    if (!prodForm.name || !prodForm.sku || !prodForm.basePrice || !prodForm.moq) {
      triggerToast('Please fill out all required fields.', 'error')
      return
    }

    const newProduct = {
      id: `p-${Date.now()}`,
      ...prodForm,
      basePrice: Number(prodForm.basePrice),
      moq: Number(prodForm.moq),
      image: prodForm.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
    }

    const success = B2BDatabase.addProduct(newProduct)
    if (success) {
      triggerToast('Product added successfully!')
      setIsAddingProduct(false)
      resetProductForm()
      refreshData()
    }
  }

  // Handle Edit Product Submit
  const handleEditProductSubmit = (e, productId) => {
    e.preventDefault()
    if (!prodForm.name || !prodForm.sku || !prodForm.basePrice || !prodForm.moq) {
      triggerToast('Please fill out all required fields.', 'error')
      return
    }

    const updatedFields = {
      ...prodForm,
      basePrice: Number(prodForm.basePrice),
      moq: Number(prodForm.moq)
    }

    const success = B2BDatabase.updateProduct(productId, updatedFields)
    if (success) {
      triggerToast('Product details updated successfully!')
      setEditingProductId(null)
      resetProductForm()
      refreshData()
    }
  }

  // Delete Product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to permanently delete this product from catalog?')) {
      const success = B2BDatabase.deleteProduct(productId)
      if (success) {
        triggerToast('Product removed from catalogue.')
        refreshData()
      }
    }
  }

  // Populate Edit Form
  const startEditingProduct = (product) => {
    setEditingProductId(product.id)
    setIsAddingProduct(false)
    setProdForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      material: product.material,
      dimensions: product.dimensions,
      weight: product.weight,
      capacity: product.capacity,
      finish: product.finish,
      compatibleOvens: product.compatibleOvens,
      basePrice: product.basePrice.toString(),
      moq: product.moq.toString(),
      inStock: product.inStock,
      image: product.image,
      description: product.description
    })
  }

  const resetProductForm = () => {
    setProdForm({
      name: '',
      sku: '',
      category: 'Loaf Molds',
      material: 'Aluminium',
      dimensions: '',
      weight: '',
      capacity: '',
      finish: '',
      compatibleOvens: 'Deck, Rotary, Convection',
      basePrice: '',
      moq: '12',
      inStock: true,
      image: '',
      description: ''
    })
  }

  // Toggle Stock status quick action
  const handleToggleStock = (productId, currentStock) => {
    const success = B2BDatabase.updateProductStock(productId, !currentStock)
    if (success) {
      triggerToast(`Product stock status updated.`)
      refreshData()
    }
  }

  // Dispatch / Update order status
  const handleUpdateOrderDispatch = (e) => {
    e.preventDefault()
    if (!selectedOrderId) return

    const success = B2BDatabase.updateOrderStatus(
      selectedOrderId,
      dispatchStatus,
      driverName,
      driverPhone
    )

    if (success) {
      triggerToast(`Order ${selectedOrderId} updated to: ${dispatchStatus}`)
      setSelectedOrderId('')
      setDriverName('')
      setDriverPhone('')
      refreshData()
    }
  }

  // Reply to quotation
  const handleReplyToQuoteSubmit = (e) => {
    e.preventDefault()
    if (!selectedQuoteId || !quotedPrice || !adminReplyMsg) {
      triggerToast('Please fill out all quote reply fields.', 'error')
      return
    }

    const success = B2BDatabase.replyToQuote(
      selectedQuoteId,
      quotedPrice,
      adminReplyMsg
    )

    if (success) {
      triggerToast(`Quotation response dispatched to client!`)
      setSelectedQuoteId('')
      setQuotedPrice('')
      setAdminReplyMsg('')
      refreshData()
    }
  }

  // Reset database state to defaults
  const handleResetDatabase = () => {
    if (window.confirm('Reset database back to initial seed defaults? This deletes all custom changes.')) {
      B2BDatabase.resetDB()
      refreshData()
      triggerToast('Database reset to seeds.')
    }
  }

  // Calculations for Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const pendingQuotesCount = quotes.filter(q => q.status === 'Pending').length
  const repeatClientRate = '100%'

  // RENDER ADMIN AUTHENTICATION GATE IF NOT LOGGED IN
  if (!isAuthenticated) {
    return (
      <div className="bg-[#111] min-h-screen text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="text-center">
            <span className="bg-[#2C5F8A]/20 text-[#2C5F8A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono-spec">
              Security Authorization
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white font-brand">Owner Console</h2>
            <p className="mt-2 text-xs text-slate-400">Please enter administrator credentials to gain database control access.</p>
          </div>

          {loginError && (
            <div className="bg-red-950/40 border border-red-800 text-red-400 p-3 rounded-lg text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Owner ID</label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. basha"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-3 focus:outline-none focus:border-[#2C5F8A]"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="e.g. basha786"
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-3 focus:outline-none focus:border-[#2C5F8A]"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white font-bold rounded-lg transition-colors text-sm shadow-md flex items-center justify-center"
            >
              Authorize Login
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-slate-500 hover:text-slate-300 underline"
            >
              ← Cancel and return to Shop
            </button>
          </div>
        </div>
      </div>
    )
  }

  // RENDER ADMIN PANEL IF AUTHENTICATED
  return (
    <div className="bg-[#1A1A1A] min-h-screen text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <span className="bg-[#2C5F8A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded font-mono-spec uppercase tracking-widest">
              Control Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-brand">
              Bakeware Operations Console
            </h1>
            <p className="text-xs text-slate-400 font-mono-spec uppercase mt-0.5">Welcome, Owner (Basha)</p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={handleResetDatabase}
              className="bg-red-900/40 hover:bg-red-800 border border-red-700 text-red-100 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex-1 md:flex-initial"
            >
              🔄 Reset DB to Seeds
            </button>

            <button
              onClick={handleAdminLogout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex-1 md:flex-initial"
            >
              Log Out
            </button>
            
            <button
              onClick={() => navigateTo('account')}
              className="bg-white hover:bg-slate-200 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex-1 md:flex-initial"
            >
              ← Enter Client View
            </button>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto hide-scrollbar text-sm font-semibold tracking-wide uppercase text-slate-400">
          {[
            { id: 'analytics', label: 'Dashboard Stats' },
            { id: 'products', label: 'Product Control (CRUD)' },
            { id: 'orders', label: 'Dispatch Orders' },
            { id: 'quotes', label: 'Respond to Quotes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-6 border-b-2 transition-colors shrink-0 ${activeTab === tab.id ? 'border-[#2C5F8A] text-white' : 'border-transparent hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl">
                <p className="text-3xl font-black text-[#2C5F8A] font-mono-spec">₹{totalRevenue.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Total Sales Revenue</p>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl">
                <p className="text-3xl font-black text-white font-mono-spec">{totalOrders}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Fulfilled Orders</p>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl">
                <p className="text-3xl font-black text-amber-500 font-mono-spec">{pendingQuotesCount}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Pending Quote Requests</p>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl">
                <p className="text-3xl font-black text-[#4CAF7D] font-mono-spec">{repeatClientRate}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">B2B Repeat Orders Ratio</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Top Bestsellers list */}
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-base text-white pb-3 border-b border-slate-800">
                  Top Performing SKUs (B2B Volume)
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { sku: 'AG-BT-600', name: 'Aluminium Bread Tray 600g', orders: '45 orders', volume: '2,250 pcs' },
                    { sku: 'AG-LP-450', name: 'Aluminium Pullman Loaf Pan 450g', orders: '38 orders', volume: '1,500 pcs' },
                    { sku: 'AG-PT-18', name: 'Perforated Aluminium Baking Tray', orders: '29 orders', volume: '870 pcs' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-850 p-3 rounded border border-slate-800">
                      <div>
                        <span className="font-mono-spec font-bold text-[#2C5F8A] block">{item.sku}</span>
                        <span className="text-slate-400">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-mono-spec font-bold">{item.volume}</p>
                        <p className="text-[10px] text-slate-500">{item.orders}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manufacturing logs/Queue */}
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-base text-white pb-3 border-b border-slate-800">
                  Recent Activity Log
                </h3>
                <div className="space-y-2.5 text-xs text-slate-400 font-medium">
                  <div className="flex space-x-2">
                    <span className="text-[#2C5F8A]">●</span>
                    <p>Order update logged: <em>AG-20481 status adjusted.</em></p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-[#2C5F8A]">●</span>
                    <p>Price modifications updated on local memory sheets.</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-green-500">●</span>
                    <p>Custom fabrication quote request converted to order.</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-green-500">●</span>
                    <p>Active session authenticated for Owner ID: <strong>basha</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Product Control CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex justify-between items-center bg-slate-900 border border-slate-850 p-4 rounded-xl">
              <p className="text-xs text-slate-400">Total cataloged items: <strong className="text-white font-mono-spec">{products.length}</strong></p>
              
              <button
                onClick={() => {
                  if (isAddingProduct) {
                    setIsAddingProduct(false)
                  } else {
                    setEditingProductId(null)
                    setIsAddingProduct(true)
                    resetProductForm()
                  }
                }}
                className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                {isAddingProduct ? 'Cancel Add Form' : '＋ Add New Product'}
              </button>
            </div>

            {/* ADD PRODUCT FORM PANEL */}
            {isAddingProduct && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6 animate-pulse">
                <h3 className="text-base font-bold text-white pb-2 border-b border-slate-800">Add New Product Details</h3>
                
                <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Product Title *</label>
                      <input
                        type="text"
                        required
                        value={prodForm.name}
                        onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                        placeholder="e.g. Aluminium Pullman Loaf Pan 450g"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">SKU Code *</label>
                      <input
                        type="text"
                        required
                        value={prodForm.sku}
                        onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                        placeholder="e.g. AG-LP-450"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Category *</label>
                      <select
                        value={prodForm.category}
                        onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      >
                        <option value="Loaf Molds">Loaf Molds</option>
                        <option value="Bread Trays">Bread Trays</option>
                        <option value="Perforated Trays">Perforated Trays</option>
                        <option value="Baguette Molds">Baguette Molds</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Material Details *</label>
                      <input
                        type="text"
                        required
                        value={prodForm.material}
                        onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                        placeholder="e.g. Anodized Aluminium"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Dimensions (L×W×H) *</label>
                      <input
                        type="text"
                        required
                        value={prodForm.dimensions}
                        onChange={(e) => setProdForm({ ...prodForm, dimensions: e.target.value })}
                        placeholder="e.g. 30 × 13 × 13 cm"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Capacity / Volume</label>
                      <input
                        type="text"
                        value={prodForm.capacity}
                        onChange={(e) => setProdForm({ ...prodForm, capacity: e.target.value })}
                        placeholder="e.g. 450g Dough"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Finish Type</label>
                      <input
                        type="text"
                        value={prodForm.finish}
                        onChange={(e) => setProdForm({ ...prodForm, finish: e.target.value })}
                        placeholder="e.g. Brushed Aluminium / Silicone"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Oven Compatibility</label>
                      <input
                        type="text"
                        value={prodForm.compatibleOvens}
                        onChange={(e) => setProdForm({ ...prodForm, compatibleOvens: e.target.value })}
                        placeholder="e.g. Deck, Rotary"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Weight (kg)</label>
                      <input
                        type="text"
                        value={prodForm.weight}
                        onChange={(e) => setProdForm({ ...prodForm, weight: e.target.value })}
                        placeholder="e.g. 0.45 kg"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Base Cost Price * (₹)</label>
                      <input
                        type="number"
                        required
                        value={prodForm.basePrice}
                        onChange={(e) => setProdForm({ ...prodForm, basePrice: e.target.value })}
                        placeholder="e.g. 285"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Minimum Order Qty * (pcs)</label>
                      <input
                        type="number"
                        required
                        value={prodForm.moq}
                        onChange={(e) => setProdForm({ ...prodForm, moq: e.target.value })}
                        placeholder="e.g. 12"
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Product Photo Image URL</label>
                    <input
                      type="text"
                      value={prodForm.image}
                      onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Product Description / Commercial Features</label>
                    <textarea
                      value={prodForm.description}
                      onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                      rows={3}
                      placeholder="Describe raw materials benefits, baking oven lifecycle parameters, sliding cover configurations..."
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inStockForm"
                      checked={prodForm.inStock}
                      onChange={(e) => setProdForm({ ...prodForm, inStock: e.target.checked })}
                      className="w-4 h-4 text-[#2C5F8A] border-slate-700 bg-slate-950 rounded"
                    />
                    <label htmlFor="inStockForm" className="text-slate-300 font-semibold select-none">
                      Mark as In Stock immediately
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
                  >
                    Commit New Product to Catalog
                  </button>
                </form>
              </div>
            )}

            {/* PRODUCT CATALOG LISTING & EDITOR FORMS */}
            <div className="bg-slate-900 border border-slate-850 rounded-xl p-6">
              <h3 className="font-bold text-white text-base mb-6 pb-3 border-b border-slate-800">
                Products Control directory
              </h3>
              
              <div className="space-y-6">
                {products.map((p) => {
                  const isEditing = editingProductId === p.id

                  if (isEditing) {
                    return (
                      <div key={p.id} className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                          <span className="font-bold text-slate-200">Editing Product: <span className="text-[#2C5F8A] font-mono-spec font-bold">{p.sku}</span></span>
                          <button onClick={() => setEditingProductId(null)} className="text-slate-400 hover:text-white">Cancel</button>
                        </div>

                        <form onSubmit={(e) => handleEditProductSubmit(e, p.id)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Product Name *</label>
                              <input
                                type="text"
                                required
                                value={prodForm.name}
                                onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">SKU *</label>
                              <input
                                type="text"
                                required
                                value={prodForm.sku}
                                onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Category *</label>
                              <select
                                value={prodForm.category}
                                onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              >
                                <option value="Loaf Molds">Loaf Molds</option>
                                <option value="Bread Trays">Bread Trays</option>
                                <option value="Perforated Trays">Perforated Trays</option>
                                <option value="Baguette Molds">Baguette Molds</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Material *</label>
                              <input
                                type="text"
                                required
                                value={prodForm.material}
                                onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Dimensions *</label>
                              <input
                                type="text"
                                required
                                value={prodForm.dimensions}
                                onChange={(e) => setProdForm({ ...prodForm, dimensions: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Base Cost Price * (₹)</label>
                              <input
                                type="number"
                                required
                                value={prodForm.basePrice}
                                onChange={(e) => setProdForm({ ...prodForm, basePrice: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">MOQ Limit * (pcs)</label>
                              <input
                                type="number"
                                required
                                value={prodForm.moq}
                                onChange={(e) => setProdForm({ ...prodForm, moq: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Image URL</label>
                              <input
                                type="text"
                                value={prodForm.image}
                                onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Finish Type</label>
                              <input
                                type="text"
                                value={prodForm.finish}
                                onChange={(e) => setProdForm({ ...prodForm, finish: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Description</label>
                            <textarea
                              value={prodForm.description}
                              onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                              rows={2}
                              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2"
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white font-bold py-2 rounded-lg transition-colors text-center"
                          >
                            Commit Changes
                          </button>
                        </form>
                      </div>
                    )
                  }

                  // Read-Only Product card in Admin Panel
                  return (
                    <div 
                      key={p.id}
                      className="border border-slate-800 rounded-xl p-4 sm:p-5 bg-slate-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-lg p-1 border border-slate-800 flex items-center justify-center shrink-0">
                          <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono-spec font-bold text-[#2C5F8A] text-sm">{p.sku}</span>
                            <span className="text-[10px] text-slate-500 font-semibold bg-slate-800 px-2 py-0.5 rounded uppercase">{p.category}</span>
                          </div>
                          <h4 className="font-bold text-slate-200 text-sm">{p.name}</h4>
                          <p className="text-slate-400 leading-relaxed max-w-xl">{p.description.slice(0, 100)}...</p>
                          <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 font-mono-spec font-medium pt-1">
                            <div>Material: {p.material}</div>
                            <div>Dims: {p.dimensions}</div>
                            <div>MOQ: {p.moq} pcs</div>
                            <div>Base Price: ₹{p.basePrice}</div>
                          </div>
                        </div>
                      </div>

                      {/* CRUD Operation controls */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 pt-3 sm:pt-0 border-t border-slate-800 sm:border-t-0 w-full sm:w-auto justify-between">
                        
                        <button
                          onClick={() => handleToggleStock(p.id, p.inStock)}
                          className={`px-3 py-1 rounded text-[10px] font-bold font-mono-spec uppercase border tracking-wider transition-colors shrink-0 ${p.inStock ? 'bg-green-950/40 border-green-800 text-green-400 hover:bg-green-900/40' : 'bg-amber-950/40 border-amber-800 text-amber-400 hover:bg-amber-900/40'}`}
                        >
                          {p.inStock ? 'In Stock' : 'Made to Order'}
                        </button>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditingProduct(p)}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded transition-all text-[11px]"
                          >
                            Edit Specs
                          </button>
                          
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="bg-red-950/40 border border-red-950 hover:bg-red-900 text-red-400 font-semibold px-3 py-1.5 rounded transition-all text-[11px]"
                          >
                            Delete
                          </button>
                        </div>

                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Dispatch Orders */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Orders list table */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-xl p-6">
              <h3 className="font-bold text-white text-base mb-4">Commercial Orders Directory</h3>
              
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40 font-bold uppercase tracking-wider">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Summary</th>
                      <th className="p-3">Dispatch Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-850/40">
                        <td className="p-3 font-mono-spec font-bold text-slate-200">{o.id}</td>
                        <td className="p-3">
                          <div className="font-bold">{o.billingDetails.businessName.split(' & ')[0]}</div>
                          <div className="text-[10px] text-slate-500">{new Date(o.date).toLocaleDateString()}</div>
                        </td>
                        <td className="p-3 font-mono-spec">
                          {o.items[0]?.name.split(' | ')[0]} ({o.items[0]?.qty} pcs)
                        </td>
                        <td className="p-3">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono-spec uppercase ${o.status === 'Delivered' ? 'bg-green-950 border border-green-800 text-green-400' : 'bg-amber-950 border border-amber-800 text-amber-400'}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrderId(o.id)
                              setDispatchStatus(o.status)
                              setDriverName(o.driverName || '')
                              setDriverPhone(o.driverPhone || '')
                            }}
                            className="text-[#2C5F8A] hover:underline font-semibold"
                          >
                            Update status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Update Status form */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-850 rounded-xl p-6 h-fit space-y-4">
              <h3 className="font-bold text-white text-base pb-2 border-b border-slate-800">
                Update Order Tracking
              </h3>

              {selectedOrderId ? (
                <form onSubmit={handleUpdateOrderDispatch} className="space-y-4 text-xs">
                  <p className="text-slate-400 font-medium">
                    Modifying: <strong className="text-white font-mono-spec">{selectedOrderId}</strong>
                  </p>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Queue Status</label>
                    <select
                      value={dispatchStatus}
                      onChange={(e) => setDispatchStatus(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded p-2 focus:outline-none"
                    >
                      <option value="Processing">Processing / Pack Queue</option>
                      <option value="Shipped">Shipped / Cargo Carrier</option>
                      <option value="Out for Delivery">Out for Delivery (Local)</option>
                      <option value="Delivered">Delivered & Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Cargo Driver Name</label>
                    <input
                      type="text"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="e.g. Sanjay Kumar"
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Cargo Driver Phone</label>
                    <input
                      type="text"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      placeholder="e.g. +91 9999999999"
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white font-bold py-2 rounded transition-colors text-center"
                  >
                    Commit Dispatch Tracking
                  </button>
                </form>
              ) : (
                <p className="text-slate-500 text-xs italic">Select an order from the directory list on the left to adjust dispatch coordinates or assign transport drivers.</p>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: Quote Requests */}
        {activeTab === 'quotes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Quote Requests Directory */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-850 rounded-xl p-6">
              <h3 className="font-bold text-white text-base mb-4">Custom Fabrication Quote Logs</h3>
              
              <div className="space-y-4 text-xs">
                {quotes.length === 0 ? (
                  <p className="text-slate-500 italic">No custom quotes logged yet.</p>
                ) : (
                  quotes.map((q) => (
                    <div 
                      key={q.id}
                      className={`border rounded-lg p-4 transition-colors ${selectedQuoteId === q.id ? 'border-[#2C5F8A] bg-slate-850/40' : 'border-slate-800 bg-slate-950/20'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <strong className="text-slate-200 font-mono-spec">{q.id}</strong>
                          <span className="text-[10px] text-slate-500 ml-2">{new Date(q.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono-spec uppercase tracking-wider ${q.status === 'Responded' ? 'bg-green-950 text-green-400' : (q.status === 'Converted' ? 'bg-slate-800 text-slate-400' : 'bg-amber-950 text-amber-400')}`}>
                          {q.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-300 font-medium">
                        <p><strong>Item Line:</strong> {q.productName}</p>
                        <p><strong>Quantity:</strong> {q.qty} pcs</p>
                        <p className="text-slate-400 italic">"Requirements: {q.requirements}"</p>
                      </div>

                      {q.status === 'Pending' && (
                        <div className="pt-3 border-t border-slate-850 mt-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedQuoteId(q.id)
                              setQuotedPrice('')
                              setAdminReplyMsg('')
                            }}
                            className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white text-[11px] font-semibold px-4 py-1 rounded transition-colors"
                          >
                            Prepare Pricing Offer
                          </button>
                        </div>
                      )}

                      {q.status === 'Responded' && (
                        <p className="text-[10px] text-green-400 font-mono-spec mt-2">
                          ✓ Replied with price: ₹{q.quotedPrice}/pc ex-GST. (Message: "{q.adminReply}")
                        </p>
                      )}

                      {q.status === 'Converted' && (
                        <p className="text-[10px] text-slate-500 font-mono-spec mt-2">
                          ✓ Converted to active manufacturing order.
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quote Response Editor form */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-850 rounded-xl p-6 h-fit space-y-4">
              <h3 className="font-bold text-white text-base pb-2 border-b border-slate-800">
                Compose Quote Offer
              </h3>

              {selectedQuoteId ? (
                <form onSubmit={handleReplyToQuoteSubmit} className="space-y-4 text-xs">
                  <p className="text-slate-400 font-medium">
                    Replying to: <strong className="text-white font-mono-spec">{selectedQuoteId}</strong>
                  </p>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Quoted Unit Price (ex-GST) *</label>
                    <input
                      type="number"
                      required
                      value={quotedPrice}
                      onChange={(e) => setQuotedPrice(e.target.value)}
                      placeholder="e.g. 450"
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Estimate / Fabrication Lead Time *</label>
                    <textarea
                      required
                      value={adminReplyMsg}
                      onChange={(e) => setAdminReplyMsg(e.target.value)}
                      rows={3}
                      placeholder="e.g. Custom silicone coating. Lead time 14 working days Ex-Factory..."
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded p-2 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors text-center"
                  >
                    Dispatch Quote Offer
                  </button>
                </form>
              ) : (
                <p className="text-slate-500 text-xs italic">Select a pending quotation request on the left to write specifications replies and input custom fabrication price bids.</p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
