import { useState, useEffect } from 'react'
import { Upload, X, Check, RefreshCw, Lock, Image as ImageIcon } from 'lucide-react'

const DEFAULT_INSTA = [
  { id: 1, src: '/portfolio_1.png', alt: 'Bridal look' },
  { id: 2, src: '/portfolio_2.png', alt: 'Eye makeup' },
  { id: 3, src: '/bridal_makeup.png', alt: 'Bridal beauty' },
  { id: 4, src: '/portfolio_3.png', alt: 'Hair styling' },
  { id: 5, src: '/portfolio_4.png', alt: 'Full bridal' },
  { id: 6, src: '/hair_styling.png', alt: 'Hair artistry' },
]

const DEFAULT_PORTFOLIO = [
  { id: 1, src: '/portfolio_groom_blue_front.jpg', alt: 'Navy Sherwani' },
  { id: 2, src: '/portfolio_groom_suit_front.jpg', alt: 'Gold Tuxedo' },
  { id: 3, src: '/portfolio_groom_suit.jpg', alt: 'Gold Profile' },
  { id: 4, src: '/portfolio_groom_blue_cuff.jpg', alt: 'Navy Cuff Adjust' },
  { id: 5, src: '/portfolio_groom_gold_pearl.jpg', alt: 'Gold Sherwani' },
  { id: 6, src: '/portfolio_groom_casual.jpg', alt: 'Groom Grooming Prep' },
]

export default function AdminModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [activeTab, setActiveTab] = useState('insta') // 'insta' | 'portfolio'
  
  const [instaImages, setInstaImages] = useState(DEFAULT_INSTA)
  const [portfolioImages, setPortfolioImages] = useState(DEFAULT_PORTFOLIO)
  const [successMsg, setSuccessMsg] = useState('')

  // Load saved images from localStorage on mount
  useEffect(() => {
    try {
      const savedInsta = localStorage.getItem('sandy_insta_images')
      if (savedInsta) setInstaImages(JSON.parse(savedInsta))

      const savedPortfolio = localStorage.getItem('sandy_portfolio_images')
      if (savedPortfolio) setPortfolioImages(JSON.parse(savedPortfolio))
    } catch (e) {
      console.error('Failed to load custom images', e)
    }
  }, [])

  // Listen for global open event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setSuccessMsg('')
    }
    window.addEventListener('open-admin-modal', handleOpen)
    return () => window.removeEventListener('open-admin-modal', handleOpen)
  }, [])

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLogin = (e) => {
    e.preventDefault()
    // Default PIN: 1234
    if (pin === '1234' || pin === 'sandy2026') {
      setIsAuthenticated(true)
      setPinError('')
    } else {
      setPinError('Incorrect PIN code. Try 1234')
    }
  }

  const handleFileUpload = (e, index, section) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please choose a smaller image.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const newSrc = event.target.result
      if (section === 'insta') {
        const updated = [...instaImages]
        updated[index] = { ...updated[index], src: newSrc }
        setInstaImages(updated)
      } else {
        const updated = [...portfolioImages]
        updated[index] = { ...updated[index], src: newSrc }
        setPortfolioImages(updated)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (newUrl, index, section) => {
    if (section === 'insta') {
      const updated = [...instaImages]
      updated[index] = { ...updated[index], src: newUrl }
      setInstaImages(updated)
    } else {
      const updated = [...portfolioImages]
      updated[index] = { ...updated[index], src: newUrl }
      setPortfolioImages(updated)
    }
  }

  const handleSave = () => {
    try {
      localStorage.setItem('sandy_insta_images', JSON.stringify(instaImages))
      localStorage.setItem('sandy_portfolio_images', JSON.stringify(portfolioImages))

      // Trigger custom event so components re-render live
      window.dispatchEvent(new CustomEvent('sandy-images-updated'))

      setSuccessMsg('Gallery images updated successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (e) {
      alert('Failed to save to browser storage. Try using Image URLs for large files.')
    }
  }

  const handleReset = () => {
    if (confirm('Reset all section images to default original photos?')) {
      localStorage.removeItem('sandy_insta_images')
      localStorage.removeItem('sandy_portfolio_images')
      setInstaImages(DEFAULT_INSTA)
      setPortfolioImages(DEFAULT_PORTFOLIO)
      window.dispatchEvent(new CustomEvent('sandy-images-updated'))
      setSuccessMsg('Images reset to original defaults!')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-[#1E0B10]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog" aria-modal="true" aria-label="Admin image manager modal">
      
      <div className="relative w-full max-w-[650px] bg-[#1E0B10] border border-border-light p-6 md:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} aria-label="Close admin modal"
          className="absolute top-5 right-5 text-cream/50 hover:text-cream text-xl p-1">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-border/15 pb-4">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/30">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif italic text-[24px] font-medium text-gold leading-none">Admin Image Manager</h2>
            <p className="font-sans text-[11px] text-cream/60 mt-1">Upload & update photos for Instagram & Portfolio sections</p>
          </div>
        </div>

        {/* Password Authentication Screen */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="py-6 flex flex-col items-center max-w-[320px] mx-auto text-center">
            <Lock className="w-8 h-8 text-gold/60 mb-3" />
            <span className="font-sans text-[12px] text-cream/80 mb-4">Enter Admin PIN Code to upload images</span>
            
            {pinError && <p className="text-[11px] text-red-400 bg-red-950/40 border border-red-800/40 p-2 mb-3 w-full">{pinError}</p>}
            
            <input
              type="password"
              placeholder="Enter PIN (Default: 1234)"
              value={pin}
              onChange={e => setPin(e.target.value)}
              className="w-full bg-dark-3 border border-border px-4 py-3 text-center text-gold tracking-widest text-[16px] outline-none focus:border-gold mb-4"
              autoFocus
            />
            <button type="submit" className="btn-gold-solid w-full py-3.5 text-[10px]">
              Unlock Admin Panel
            </button>
          </form>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Section Tabs */}
            <div className="flex gap-2 border-b border-border/15 mb-6">
              <button
                onClick={() => setActiveTab('insta')}
                className={`pb-3 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors border-b-2 ${
                  activeTab === 'insta'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-cream/40 hover:text-cream'
                }`}
              >
                Instagram Stories (6 Photos)
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`pb-3 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors border-b-2 ${
                  activeTab === 'portfolio'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-cream/40 hover:text-cream'
                }`}
              >
                Portfolio Gallery (6 Photos)
              </button>
            </div>

            {successMsg && (
              <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-[12px] p-3 mb-5">
                <Check className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Image Grid Editor */}
            <div className="max-h-[380px] overflow-y-auto pr-1 flex flex-col gap-5 no-scrollbar">
              {(activeTab === 'insta' ? instaImages : portfolioImages).map((img, idx) => (
                <div key={idx} className="bg-dark-3 border border-border/20 p-3.5 flex flex-col sm:flex-row items-center gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded border border-border overflow-hidden flex-shrink-0 bg-dark">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-gold/90 text-dark font-mono text-[9px] px-1.5 py-0.5 font-bold">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 w-full flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] font-medium tracking-wider uppercase text-gold">Slot {idx + 1} Image</span>
                      
                      {/* Direct File Picker */}
                      <label className="cursor-pointer text-[10px] text-gold border border-gold/40 hover:bg-gold hover:text-dark px-3 py-1.5 uppercase tracking-wider font-semibold transition-colors inline-flex items-center gap-1.5">
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleFileUpload(e, idx, activeTab)}
                        />
                      </label>
                    </div>

                    {/* Image URL Input */}
                    <input
                      type="url"
                      placeholder="Or paste image URL (e.g. https://...)"
                      value={img.src.startsWith('data:') ? '[Uploaded File]' : img.src}
                      onChange={e => handleUrlChange(e.target.value, idx, activeTab)}
                      className="bg-transparent border-b border-border text-cream text-[12px] py-1 outline-none focus:border-gold placeholder:text-cream/20 font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-border/15">
              <button
                onClick={handleReset}
                className="text-[10px] font-sans text-cream/50 hover:text-red-400 flex items-center gap-1.5 transition-colors uppercase tracking-wider"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={() => setIsOpen(false)} className="px-5 py-3 border border-border text-cream/70 text-[10px] uppercase tracking-wider font-medium hover:text-cream flex-1 sm:flex-none">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-gold-solid py-3 px-6 text-[10px] flex-1 sm:flex-none">
                  Save & Update Website ✓
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
