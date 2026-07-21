import React, { useState, useMemo } from 'react'
import { B2BDatabase } from '../lib/db'

export default function Shop({ navigateTo, cart, wishlist, toggleWishlist, addToCart }) {
  const allProducts = B2BDatabase.getProducts()

  // State
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [maxPrice, setMaxPrice] = useState(600)
  const [minMoq, setMinMoq] = useState(15)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  // Unique lists for filters
  const categories = ['Loaf Molds', 'Bread Trays', 'Perforated Trays', 'Baguette Molds']
  const materials = ['Aluminium', 'Stainless Steel', 'Carbon Steel (Non-Stick)', 'Alusteel (Aluminium-Steel Alloy)']

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = !selectedCategory || p.category === selectedCategory
        const matchesMaterial = !selectedMaterial || p.material.includes(selectedMaterial)
        const matchesPrice = p.basePrice <= maxPrice
        const matchesMoq = p.moq <= minMoq
        const matchesStock = !onlyInStock || p.inStock
        return matchesSearch && matchesCategory && matchesMaterial && matchesPrice && matchesMoq && matchesStock
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.basePrice - b.basePrice
        if (sortBy === 'price-high') return b.basePrice - a.basePrice
        if (sortBy === 'moq-low') return a.moq - b.moq
        if (sortBy === 'newest') return b.id.localeCompare(a.id)
        // default/popularity sort
        return a.id.localeCompare(b.id)
      })
  }, [allProducts, search, selectedCategory, selectedMaterial, maxPrice, minMoq, onlyInStock, sortBy])

  const handleResetFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedMaterial('')
    setMaxPrice(600)
    setMinMoq(15)
    setOnlyInStock(false)
    setSortBy('popular')
  }

  return (
    <div className="bg-[#F8F8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-brand text-slate-900 tracking-tight">Product Catalogue</h1>
            <p className="text-slate-500 text-sm mt-1">Browse and filter industrial bakeware items by specifications and bulk pricing tiers.</p>
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or SKU (e.g. LP-450)..."
              className="w-full pl-10 pr-4 b2b-input shadow-sm"
            />
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden flex gap-4 mb-6">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex-1 min-h-[48px] bg-white border border-slate-200 rounded-lg flex items-center justify-center space-x-2 text-slate-700 font-semibold shadow-sm"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filter Specs ({[selectedCategory, selectedMaterial, onlyInStock].filter(Boolean).length})</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 min-h-[48px] bg-white border border-slate-200 rounded-lg px-4 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="moq-low">MOQ: Low to High</option>
            <option value="newest">Newest Launch</option>
          </select>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 h-fit sticky top-24">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-base">Filters</h2>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#2C5F8A] hover:underline font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full b2b-input min-h-[40px] text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Material Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Material</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full b2b-input min-h-[40px] text-sm"
              >
                <option value="">All Materials</option>
                {materials.map((m) => (
                  <option key={m} value={m}>{m.split(' (')[0]}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Max Unit Price</span>
                <span className="font-mono-spec font-normal text-slate-800">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2C5F8A]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-spec">
                <span>₹200</span>
                <span>₹600</span>
              </div>
            </div>

            {/* MOQ Filter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Max MOQ Required</span>
                <span className="font-mono-spec font-normal text-slate-800">{minMoq} pcs</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={minMoq}
                onChange={(e) => setMinMoq(Number(e.target.value))}
                className="w-full accent-[#2C5F8A]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-spec">
                <span>5 pcs</span>
                <span>15 pcs</span>
              </div>
            </div>

            {/* Stock Filter */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="stock-toggle"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-[#2C5F8A] border-slate-300 rounded focus:ring-[#2C5F8A] accent-[#2C5F8A]"
              />
              <label htmlFor="stock-toggle" className="text-sm font-semibold text-slate-700 select-none">
                In Stock Items Only
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="md:col-span-3">
            
            {/* Desktop Sorting header bar */}
            <div className="hidden md:flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 mb-6 shadow-sm">
              <p className="text-slate-600 text-sm">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> industrial items
              </p>
              
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="b2b-input min-h-[36px] py-1 text-sm bg-transparent border-slate-200"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="moq-low">MOQ: Low to High</option>
                  <option value="newest">Newest Launch</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">No specifications matched</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">Try resetting filters, searching a different keyword, or contact us for custom fabrication orders.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => {
                  const isWishlisted = wishlist.includes(p.id)
                  
                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
                    >
                      {/* Wishlist toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(p.id)
                        }}
                        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur hover:bg-white flex items-center justify-center shadow-sm border border-slate-200 transition-transform active:scale-90"
                        aria-label="Toggle Wishlist"
                      >
                        <svg
                          className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-400'}`}
                          fill={isWishlisted ? 'currentColor' : 'none'}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      {/* Image Tappable area */}
                      <div 
                        onClick={() => navigateTo('product', { id: p.id })}
                        className="h-40 sm:h-48 bg-white p-4 flex items-center justify-center cursor-pointer relative overflow-hidden"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 left-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono-spec uppercase shadow-sm ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {p.inStock ? 'In Stock' : 'Made To Order'}
                          </span>
                        </div>
                      </div>

                      {/* Product details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div 
                          onClick={() => navigateTo('product', { id: p.id })}
                          className="space-y-1 cursor-pointer"
                        >
                          <p className="text-[10px] text-slate-400 font-bold font-mono-spec uppercase tracking-wider">{p.sku}</p>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#2C5F8A] transition-colors line-clamp-2 h-10 leading-tight">
                            {p.name}
                          </h3>
                          <div className="text-[11px] text-slate-500 font-mono-spec space-y-0.5">
                            <div>Material: {p.material.split(' (')[0]}</div>
                            <div>Dims: {p.dimensions}</div>
                          </div>
                        </div>

                        {/* Price block and quick cart */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-slate-400 font-mono-spec leading-none block">Wholesale Price</span>
                            <span className="text-base font-extrabold text-[#2C5F8A] font-mono-spec">₹{p.basePrice}</span>
                            <span className="text-[10px] text-slate-500 font-normal">/pc</span>
                          </div>
                          
                          <button
                            onClick={() => addToCart(p, p.moq)}
                            className="bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                            title={`Add MOQ (${p.moq} pcs) to Cart`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[10px] font-bold ml-1 font-mono-spec">MOQ: {p.moq}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </main>
        </div>

      </div>

      {/* 8. Mobile Filter Slide-up Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex items-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsFilterDrawerOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          {/* Drawer Panel */}
          <div className="bg-white w-full rounded-t-2xl shadow-xl z-10 flex flex-col max-h-[85vh] transition-transform duration-300 relative border-t border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Filter Specifications</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              
              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full b2b-input text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Material</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full b2b-input text-sm"
                >
                  <option value="">All Materials</option>
                  {materials.map((m) => (
                    <option key={m} value={m}>{m.split(' (')[0]}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Max Unit Price</span>
                  <span className="font-mono-spec font-normal text-slate-800">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="600"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2C5F8A] h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono-spec">
                  <span>₹200</span>
                  <span>₹600</span>
                </div>
              </div>

              {/* MOQ Range */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Max MOQ Required</span>
                  <span className="font-mono-spec font-normal text-slate-800">{minMoq} pcs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="1"
                  value={minMoq}
                  onChange={(e) => setMinMoq(Number(e.target.value))}
                  className="w-full accent-[#2C5F8A] h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono-spec">
                  <span>5 pcs</span>
                  <span>15 pcs</span>
                </div>
              </div>

              {/* In Stock toggle */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="stock-toggle-mobile"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-5 h-5 text-[#2C5F8A] border-slate-300 rounded focus:ring-[#2C5F8A] accent-[#2C5F8A]"
                />
                <label htmlFor="stock-toggle-mobile" className="text-base font-semibold text-slate-700 select-none">
                  In Stock Items Only
                </label>
              </div>

            </div>

            {/* Bottom Actions footer */}
            <div className="p-6 border-t border-slate-100 flex gap-4 bg-slate-50">
              <button
                onClick={() => {
                  handleResetFilters()
                  setIsFilterDrawerOpen(false)
                }}
                className="flex-1 min-h-[48px] border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-semibold text-center"
              >
                Reset All
              </button>
              
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 min-h-[48px] bg-[#2C5F8A] hover:bg-[#1A3A5C] text-white rounded-lg font-semibold text-center flex items-center justify-center"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
