import { useState, useEffect } from 'react'
import { Play, Eye, Video, Plus, X } from 'lucide-react'
import { getStoredMedia } from './AdminMediaModal'

export default function Instagram() {
  const [items, setItems] = useState(getStoredMedia)
  const [activeVideo, setActiveVideo] = useState(null)
  const [activeImage, setActiveImage] = useState(null)

  // Listen for storage updates when Admin uploads/deletes items
  useEffect(() => {
    const handleUpdate = () => {
      setItems(getStoredMedia())
    }
    window.addEventListener('sandy-media-updated', handleUpdate)
    return () => window.removeEventListener('sandy-media-updated', handleUpdate)
  }, [])

  const handleOpenAdmin = () => {
    window.dispatchEvent(new CustomEvent('open-admin-media-modal'))
  }

  return (
    <section className="bg-dark py-14 md:py-[72px]" id="instagram">
      <div className="max-w-[750px] mx-auto px-4 text-center mb-10">
        <span className="section-label mb-3 block text-gold tracking-[0.25em] text-[10px] md:text-[11px]" data-reveal>
          @sandymakeover
        </span>
        <h2 className="font-serif font-light text-cream leading-snug tracking-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[48px] reveal" data-reveal>
          Bridal Video Reels &
        </h2>
        <p className="font-script text-gold mt-1.5 text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-tight reveal delay-100" data-reveal>
          Wedding Stories
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-7 reveal delay-200" data-reveal>
          <a href="https://instagram.com/sandymakeover" target="_blank" rel="noopener noreferrer"
            id="instagram-follow-btn"
            className="inline-flex items-center gap-3 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold border border-border-light px-6 py-3 hover:bg-gold hover:text-dark transition-all duration-300">
            <img src="/instagram_logo.png" alt="Instagram Logo" className="w-[18px] h-[18px] object-contain rounded-md" loading="lazy" decoding="async" />
            Follow on Instagram
          </a>

          {/* Admin Video Manager Trigger */}
          <button
            onClick={handleOpenAdmin}
            className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-cream/80 bg-[#32131A]/60 border border-gold/40 px-5 py-3 hover:bg-gold hover:text-dark hover:border-gold transition-all duration-300 shadow-luxury-sm"
          >
            <Video className="w-4 h-4 text-gold group-hover:text-dark" />
            Upload Video / Manage
          </button>
        </div>
      </div>

      {/* Grid of Videos & Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 px-3 md:px-5">
        {items.map((post, i) => {
          const isVideo = post.type === 'video'
          return (
            <div
              key={post.id || post.src + i}
              onClick={() => isVideo ? setActiveVideo(post) : setActiveImage(post)}
              className={`group relative aspect-square overflow-hidden cursor-pointer border border-border hover:border-gold/60 transition-all duration-400 reveal-scale ${
                i % 3 === 1 ? 'delay-100' : i % 3 === 2 ? 'delay-200' : ''
              }`}
              data-reveal
            >
              {isVideo ? (
                <>
                  <video
                    src={post.src}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  {/* Video Play Badge */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-dark/80 border border-gold/50 flex items-center justify-center text-gold shadow-lg z-10">
                    <Play className="w-3.5 h-3.5 fill-gold ml-0.5" />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-dark/90 text-gold font-sans text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 border border-gold/30">
                    REEL VIDEO
                  </div>
                </>
              ) : (
                <img
                  src={post.src}
                  alt={post.alt || 'Sandy Makeover bridal look'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-dark/75 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {isVideo ? (
                  <>
                    <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center text-dark shadow-luxury-md transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-dark ml-0.5" />
                    </div>
                    <span className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-gold mt-1">Play Video</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5 text-gold" strokeWidth={2} />
                    <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-cream">View Story</span>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* FULL-SCREEN VIDEO LIGHTBOX PLAYER MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[99999] bg-[#0A0402]/95 backdrop-blur-lg flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video Player"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[420px] bg-dark border border-gold/40 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/20 bg-dark-2">
              <span className="font-serif italic text-[18px] text-gold font-medium">
                {activeVideo.title || 'Bridal Makeover Video Reel'}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video player"
                className="text-cream/60 hover:text-cream text-lg p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[9/16] max-h-[70vh] w-full bg-black">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-dark-3 text-center border-t border-border/20">
              <p className="font-sans text-[12px] font-light text-cream/90 mb-3">
                {activeVideo.title || 'Luxury Bridal Transformation by Sandy Makeover'}
              </p>
              <a
                href="https://wa.me/917092368305"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-solid text-[9px] tracking-[0.2em] py-2.5 px-6 inline-flex"
              >
                Book This Look on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[99999] bg-[#0A0402]/95 backdrop-blur-lg flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo View"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Close photo view"
              className="absolute -top-10 right-0 text-cream/70 hover:text-cream text-xl p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt || 'Sandy Makeover bridal photo'}
              className="max-w-[90vw] max-h-[80vh] object-contain border border-gold/30 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
