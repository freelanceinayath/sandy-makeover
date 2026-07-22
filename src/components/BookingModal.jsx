import { useState, useEffect } from 'react'

const WA_NUMBER = '917092368305'

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  
  // Form States
  const [selectedDate, setSelectedDate] = useState(null)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('bride') // bride, groom, both
  const [hairArtistry, setHairArtistry] = useState(false)

  // Calendar States
  const [currentDate, setCurrentDate] = useState(new Date())
  const [daysArray, setDaysArray] = useState([])

  const [errorMsg, setErrorMsg] = useState('')

  // Listen for global open event & ESC key
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setIsFlipped(false)
      setErrorMsg('')
    }
    window.addEventListener('open-booking-modal', handleOpen)
    return () => window.removeEventListener('open-booking-modal', handleOpen)
  }, [])

  // Handle body scroll lock & Escape key
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Generate days in month for the custom calendar
  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDayIndex = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()
    
    const days = []
    
    // Blank padding for days of previous month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null)
    }
    
    // Active days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i))
    }
    
    setDaysArray(days)
  }, [currentDate])

  if (!isOpen) return null

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleDateSelect = (date) => {
    if (!date) return
    const today = new Date()
    today.setHours(0,0,0,0)
    if (date < today) return // Disable past dates
    setSelectedDate(date)
    setErrorMsg('')
  }

  const handleNextClick = () => {
    if (!selectedDate) {
      setErrorMsg('Please choose a date to proceed.')
      return
    }
    setErrorMsg('')
    setIsFlipped(true)
  }

  const handleDone = (e) => {
    e.preventDefault()
    if (!name || !mobile || !location) {
      setErrorMsg('Please fill out all required details.')
      return
    }

    const formattedDate = selectedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const message = `Hello Sandy Makeover! 🌸

I would like to reserve a date:
📅 Date: ${formattedDate}
👤 Name: ${name}
📞 Mobile: ${mobile}
📍 Location: ${location}
👑 Category: ${category.toUpperCase()}
✨ Hair Artistry: ${hairArtistry ? 'YES' : 'NO'}

Please send me a quotation. - Sandy Makeover`

    const encodedText = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodedText}`
    
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1E0B10]/85 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label="Book your date modal">
      {/* 3D Card Container */}
      <div className="relative w-full max-w-[390px] h-[550px] perspective-1500">
        
        {/* Flip Inner Card Wrapper */}
        <div className={`relative w-full h-full duration-[800ms] transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          
          {/* ── CARD FRONT: CALENDAR ── */}
          <div className="absolute inset-0 w-full h-full bg-[#14070B]/95 backdrop-blur-2xl border border-gold/35 rounded-2xl p-7 flex flex-col justify-between backface-hidden shadow-2xl shadow-gold/10">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif italic text-[24px] tracking-wide text-gold">Choose Your Date</span>
                <button onClick={() => setIsOpen(false)} aria-label="Close modal" className="text-white/60 hover:text-white text-lg transition-colors p-1">✕</button>
              </div>

              {errorMsg && !isFlipped && (
                <p className="text-[11px] text-red-300 bg-red-950/60 border border-red-500/40 p-2 mb-3 rounded-lg text-center">{errorMsg}</p>
              )}

              {/* Month Switcher */}
              <div className="flex justify-between items-center mb-5 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
                <button onClick={handlePrevMonth} aria-label="Previous month" className="text-gold hover:text-gold-light text-[20px] font-bold px-2 transition-colors">‹</button>
                <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-white">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button onClick={handleNextMonth} aria-label="Next month" className="text-gold hover:text-gold-light text-[20px] font-bold px-2 transition-colors">›</button>
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {weekDays.map(day => (
                  <span key={day} className="font-sans text-[10px] text-white/50 font-bold tracking-wider uppercase">{day}</span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {daysArray.map((date, idx) => {
                  if (!date) return <div key={`empty-${idx}`} />
                  
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
                  const isPast = date < new Date().setHours(0,0,0,0)
                  
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      disabled={isPast}
                      className={`aspect-square rounded-lg font-sans text-[11px] font-medium flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-[#EAD8B1] via-[#C3A359] to-[#A0823E] text-[#1E0B10] font-bold shadow-lg shadow-gold/30 scale-105' 
                          : isPast 
                            ? 'text-white/15 cursor-not-allowed' 
                            : 'text-white/80 hover:bg-gold/20 hover:text-gold border border-transparent hover:border-gold/30'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextClick}
              disabled={!selectedDate}
              className={`w-full py-3.5 ${
                selectedDate
                  ? 'btn-gold-cta text-[11px] font-bold'
                  : 'bg-white/5 border border-white/10 text-white/25 cursor-not-allowed rounded-full font-sans text-[10px] font-semibold tracking-[0.24em] uppercase'
              }`}
            >
              Next Step →
            </button>
          </div>

          {/* ── CARD BACK: FORM DETAILS ── */}
          <div className="absolute inset-0 w-full h-full bg-[#14070B]/95 backdrop-blur-2xl border border-gold/35 rounded-2xl p-7 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl shadow-gold/10">
            <form onSubmit={handleDone} className="h-full flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                  <span className="font-serif italic text-[24px] tracking-wide text-gold">Booking Details</span>
                  <button type="button" onClick={() => { setIsFlipped(false); setErrorMsg(''); }} className="font-sans text-[10px] tracking-widest text-gold hover:text-gold-light uppercase flex items-center gap-1 font-semibold transition-colors">
                    ← Back
                  </button>
                </div>

                {errorMsg && isFlipped && (
                  <p className="text-[11px] text-red-300 bg-red-950/60 border border-red-500/40 p-2 mb-3 rounded-lg text-center">{errorMsg}</p>
                )}

                {/* Form fields */}
                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="bg-white/5 border-b border-white/20 hover:border-gold focus:border-gold text-white font-sans text-[14px] py-2 px-3 rounded-t-md outline-none transition-all duration-300 placeholder:text-white/35"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white uppercase mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter active mobile number"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      className="bg-white/5 border-b border-white/20 hover:border-gold focus:border-gold text-white font-sans text-[14px] py-2 px-3 rounded-t-md outline-none transition-all duration-300 placeholder:text-white/35"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white uppercase mb-1">Wedding Location</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter venue or city"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="bg-white/5 border-b border-white/20 hover:border-gold focus:border-gold text-white font-sans text-[14px] py-2 px-3 rounded-t-md outline-none transition-all duration-300 placeholder:text-white/35"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white uppercase mb-2">Booking Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['bride', 'groom', 'both'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`py-2.5 text-[10px] font-sans border transition-all duration-300 tracking-[0.16em] uppercase rounded-lg ${
                            category === cat
                              ? 'bg-gradient-to-r from-[#EAD8B1] via-[#C3A359] to-[#A0823E] text-[#1E0B10] border-transparent font-bold shadow-md shadow-gold/20'
                              : 'bg-white/5 border-white/20 text-white/70 hover:border-gold hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Hair Artistry Toggle */}
                  <div 
                    className="flex items-center gap-3 mt-1 cursor-pointer select-none py-1"
                    onClick={() => setHairArtistry(h => !h)}
                  >
                    <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-all duration-300 ${
                      hairArtistry ? 'border-gold bg-gold text-[#1E0B10]' : 'border-white/30 bg-white/5'
                    }`}>
                      {hairArtistry && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                    <span className="font-sans text-[12px] font-medium text-white">
                      Include Professional Hair Artistry
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-gold-cta py-4 text-[11px] font-bold tracking-[0.22em] uppercase mt-6"
              >
                Complete Booking ✓
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
