import { useState, useEffect } from 'react'
import { Video, Image as ImageIcon, Plus, Trash2, Lock, Check, RefreshCw, X } from 'lucide-react'

export const DEFAULT_MEDIA = [
  { id: '1', src: '/portfolio_1.png', alt: 'Bridal Makeover Look', type: 'image', title: 'Traditional Bridal Look' },
  { id: '2', src: '/portfolio_2.png', alt: 'Eye Makeup Artistry', type: 'image', title: 'HD Eye Artistry' },
  { id: '3', src: '/bridal_makeup.png', alt: 'Royal Bridal Glow', type: 'image', title: 'Royal South Indian Bride' },
  { id: '4', src: '/portfolio_3.png', alt: 'Wedding Hair Styling', type: 'image', title: 'Traditional Flower Hairstyle' },
  { id: '5', src: '/portfolio_4.png', alt: 'Full Bridal Transformation', type: 'image', title: 'Full Reception Glam' },
  { id: '6', src: '/hair_styling.png', alt: 'Hair Artistry Close-up', type: 'image', title: 'Custom Hair Braids' },
]

export const STORAGE_KEY = 'sandy_makeover_media_v1'

export function getStoredMedia() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {
    console.error('Error reading stored media', e)
  }
  return DEFAULT_MEDIA
}

export default function AdminMediaModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passError, setPassError] = useState(false)

  // Media state
  const [mediaList, setMediaList] = useState(getStoredMedia)
  const [activeTab, setActiveTab] = useState('add') // 'add' | 'manage'
  
  // New item form
  const [itemType, setItemType] = useState('video') // 'video' | 'image'
  const [title, setTitle] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [fileData, setFileData] = useState(null)
  const [fileName, setFileName] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setSuccessMsg('')
    }
    window.addEventListener('open-admin-media-modal', handleOpen)
    return () => window.removeEventListener('open-admin-media-modal', handleOpen)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  const handleLogin = (e) => {
    e.preventDefault()
    // Admin password (default: sandy123)
    if (passcode.trim() === 'sandy123' || passcode.trim() === 'admin') {
      setIsAuth(true)
      setPassError(false)
    } else {
      setPassError(true)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setFileName(file.name)

    // Check size limit (max 50MB for dataURL in localStorage)
    if (file.size > 50 * 1024 * 1024) {
      alert('File is too large. Please select a video/image under 50MB or use a URL link.')
      return
    }

    const reader = new FileReader()
    reader.onload = (evt) => {
      setFileData(evt.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    const mediaUrl = fileData || urlInput.trim()
    if (!mediaUrl) {
      alert('Please provide a video URL or select a file to upload.')
      return
    }

    const newItem = {
      id: Date.now().toString(),
      src: mediaUrl,
      title: title.trim() || (itemType === 'video' ? 'Bridal Video Reel' : 'Bridal Beauty Look'),
      alt: title.trim() || 'Sandy Makeover bridal transformation',
      type: itemType,
    }

    const updated = [newItem, ...mediaList]
    setMediaList(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new CustomEvent('sandy-media-updated'))
    } catch (err) {
      alert('Browser storage quota reached. Please use a direct video URL link (e.g. MP4 link) instead of uploading large file directly.')
    }

    // Reset Form
    setTitle('')
    setUrlInput('')
    setFileData(null)
    setFileName('')
    setSuccessMsg(`${itemType === 'video' ? 'Video' : 'Image'} added successfully!`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  const handleDeleteItem = (id) => {
    if (!confirm('Are you sure you want to remove this item?')) return
    const updated = mediaList.filter(m => m.id !== id)
    setMediaList(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('sandy-media-updated'))
  }

  const handleResetDefault = () => {
    if (!confirm('Reset gallery to default initial media?')) return
    setMediaList(DEFAULT_MEDIA)
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('sandy-media-updated'))
    setSuccessMsg('Reset to default gallery successfully!')
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[99999] bg-[#1E0B10]/90 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label="Admin Video Manager">
      
      <div className="relative w-full max-w-[560px] bg-[#1E0B10] border border-gold/30 p-6 md:p-8 max-h-[90vh] flex flex-col justify-between shadow-2xl overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/20 mb-6">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-gold" />
            <h3 className="font-serif italic text-[22px] text-cream font-medium">Video & Media Admin Manager</h3>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close Admin Modal" className="text-cream/50 hover:text-cream text-xl p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock Screen if not authenticated */}
        {!isAuth ? (
          <form onSubmit={handleLogin} className="py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-[20px] text-gold mb-2">Sandy Studio Security</h4>
            <p className="font-sans text-[12px] text-cream/70 max-w-[320px] mb-6">
              Enter admin passcode to upload and manage bridal videos and stories.
            </p>
            <input
              type="password"
              placeholder="Enter Admin Passcode (Default: sandy123)"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              className="w-full max-w-[320px] bg-dark-3 border border-border text-cream text-[13px] px-4 py-3 outline-none focus:border-gold mb-3 text-center tracking-wider"
              autoFocus
            />
            {passError && <p className="text-[11px] text-red-400 mb-3">Incorrect passcode. (Try: sandy123)</p>}
            <button type="submit" className="btn-gold-solid text-[10px] tracking-[0.2em] px-8 py-3">
              Unlock Manager →
            </button>
          </form>
        ) : (
          <div>
            {/* Nav Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border/20 pb-3">
              <button
                onClick={() => setActiveTab('add')}
                className={`flex items-center gap-2 px-4 py-2 font-sans text-[11px] font-semibold tracking-wider uppercase border transition-all ${
                  activeTab === 'add' ? 'bg-gold/15 text-gold border-gold' : 'border-transparent text-cream/60 hover:text-cream'
                }`}
              >
                <Plus className="w-4 h-4" /> Upload / Add Video
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`flex items-center gap-2 px-4 py-2 font-sans text-[11px] font-semibold tracking-wider uppercase border transition-all ${
                  activeTab === 'manage' ? 'bg-gold/15 text-gold border-gold' : 'border-transparent text-cream/60 hover:text-cream'
                }`}
              >
                Manage Gallery ({mediaList.length})
              </button>
            </div>

            {/* Success Message Banner */}
            {successMsg && (
              <div className="flex items-center gap-2 text-[12px] text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 p-3 mb-5">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* TAB 1: ADD VIDEO / IMAGE */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddItem} className="space-y-5">
                {/* Media Type Selector */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-gold mb-2">
                    Media Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setItemType('video')}
                      className={`flex items-center justify-center gap-2 p-3 border font-sans text-[11px] uppercase tracking-wider transition-all ${
                        itemType === 'video' ? 'bg-gold text-dark font-semibold border-gold' : 'border-border text-cream/70 hover:border-gold/40'
                      }`}
                    >
                      <Video className="w-4 h-4" /> Video Reel (MP4)
                    </button>
                    <button
                      type="button"
                      onClick={() => setItemType('image')}
                      className={`flex items-center justify-center gap-2 p-3 border font-sans text-[11px] uppercase tracking-wider transition-all ${
                        itemType === 'image' ? 'bg-gold text-dark font-semibold border-gold' : 'border-border text-cream/70 hover:border-gold/40'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" /> Photo Image
                    </button>
                  </div>
                </div>

                {/* Title / Description */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-gold mb-1.5">
                    Title / Caption
                  </label>
                  <input
                    type="text"
                    placeholder={itemType === 'video' ? 'e.g. Royal South Indian Bridal Transformation' : 'e.g. Classic HD Eye Makeup'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-dark-3 border border-border text-cream text-[13px] px-3.5 py-2.5 outline-none focus:border-gold"
                  />
                </div>

                {/* Option A: File Upload */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-gold mb-1.5">
                    Option A: Upload {itemType === 'video' ? 'Video' : 'Image'} File
                  </label>
                  <div className="relative border border-dashed border-gold/40 hover:border-gold bg-dark-3/60 p-4 text-center cursor-pointer transition-all">
                    <input
                      type="file"
                      accept={itemType === 'video' ? 'video/mp4,video/webm,video/*' : 'image/*'}
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-1.5">
                      <Plus className="w-5 h-5 text-gold" />
                      <span className="font-sans text-[11px] text-cream/80 font-medium">
                        {fileName ? `Selected: ${fileName}` : `Click to browse & choose ${itemType} file`}
                      </span>
                      <span className="font-sans text-[9px] text-cream/40 uppercase tracking-wider">
                        Supports MP4, WEBM, MOV, JPG, PNG
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center font-sans text-[10px] text-cream/40 uppercase tracking-widest">— OR —</div>

                {/* Option B: Direct URL */}
                <div>
                  <label className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-gold mb-1.5">
                    Option B: Direct {itemType === 'video' ? 'Video' : 'Image'} URL Link
                  </label>
                  <input
                    type="url"
                    placeholder={itemType === 'video' ? 'https://example.com/bridal-reels.mp4' : 'https://example.com/photo.jpg'}
                    value={urlInput}
                    onChange={e => { setUrlInput(e.target.value); setFileData(null); setFileName(''); }}
                    className="w-full bg-dark-3 border border-border text-cream text-[13px] px-3.5 py-2.5 outline-none focus:border-gold placeholder:text-cream/20"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full btn-outline-gold py-3.5 text-[10px] font-semibold tracking-[0.2em] uppercase mt-4"
                >
                  Publish New {itemType === 'video' ? 'Video' : 'Image'} to Website →
                </button>
              </form>
            )}

            {/* TAB 2: MANAGE / DELETE */}
            {activeTab === 'manage' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px] font-sans text-cream/60">
                  <span>Current Live Media ({mediaList.length})</span>
                  <button
                    onClick={handleResetDefault}
                    className="flex items-center gap-1 text-gold hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Defaults
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto no-scrollbar p-1">
                  {mediaList.map((item) => (
                    <div key={item.id} className="relative group aspect-square border border-border overflow-hidden bg-dark-3">
                      {item.type === 'video' ? (
                        <video src={item.src} className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                      )}
                      
                      {/* Format Badge */}
                      <div className="absolute top-2 left-2 bg-dark/80 border border-gold/30 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-gold font-semibold">
                        {item.type}
                      </div>

                      {/* Delete Overlay */}
                      <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-transform hover:scale-110"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
