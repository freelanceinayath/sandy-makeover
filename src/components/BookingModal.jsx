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

  // Listen for global open event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setIsFlipped(false)
    }
    window.addEventListener('open-booking-modal', handleOpen)
    return () => window.removeEventListener('open-booking-modal', handleOpen)
  }, [])

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
  }

  const handleNextClick = () => {
    if (!selectedDate) {
      alert('Please choose a date to proceed.')
      return
    }
    setIsFlipped(true)
  }

  const handleDone = (e) => {
    e.preventDefault()
    if (!name || !mobile || !location) {
      alert('Please fill out all details.')
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
    <div className="fixed inset-0 z-[9999] bg-[#1E0B10]/85 backdrop-blur-md flex items-center justify-center p-4">
      {/* 3D Card Container */}
      <div className="relative w-full max-w-[390px] h-[550px] perspective-1500">
        
        {/* Flip Inner Card Wrapper */}
        <div className={`relative w-full h-full duration-[800ms] transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          
          {/* ── CARD FRONT: CALENDAR ── */}
          <div className="absolute inset-0 w-full h-full bg-[#1E0B10] border border-border-light p-7 flex flex-col justify-between backface-hidden shadow-2xl">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif italic text-[22px] tracking-wide text-gold">Choose Your Date</span>
                <button onClick={() => setIsOpen(false)} className="text-cream/50 hover:text-cream text-lg transition-colors">✕</button>
              </div>

              {/* Month Switcher */}
              <div className="flex justify-between items-center mb-5 bg-[#32131A]/30 py-2 px-3 border border-border/10">
                <button onClick={handlePrevMonth} className="text-gold hover:text-gold-light text-[18px] px-2 transition-colors">‹</button>
                <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-cream">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="text-gold hover:text-gold-light text-[18px] px-2 transition-colors">›</button>
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {weekDays.map(day => (
                  <span key={day} className="font-sans text-[9px] text-cream/30 font-semibold tracking-wider uppercase">{day}</span>
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
                      className={`aspect-square rounded-none font-sans text-[11px] flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gold text-[#1E0B10] font-semibold shadow-gold' 
                          : isPast 
                            ? 'text-cream/15 cursor-not-allowed' 
                            : 'text-cream/70 hover:bg-gold/10 hover:text-gold border border-transparent hover:border-gold/20'
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
              className={`w-full py-4 font-sans text-[10px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 ${
                selectedDate
                  ? 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-[#1E0B10]'
                  : 'bg-cream/5 border border-border/10 text-cream/25 cursor-not-allowed'
              }`}
            >
              Next Step →
            </button>
          </div>

          {/* ── CARD BACK: FORM DETAILS ── */}
          <div className="absolute inset-0 w-full h-full bg-[#1E0B10] border border-border-light p-7 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
            <form onSubmit={handleDone} className="h-full flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif italic text-[22px] tracking-wide text-gold">Booking Details</span>
                  <button type="button" onClick={() => setIsFlipped(false)} className="font-sans text-[9px] tracking-widest text-gold hover:text-gold-light uppercase flex items-center gap-1 transition-colors">
                    ← Back
                  </button>
                </div>

                {/* Form fields */}
                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] font-semibold tracking-[0.18em] text-gold/60 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="bg-transparent border-b border-border hover:border-gold/50 focus:border-gold text-cream text-[13px] py-2 outline-none transition-all duration-300 placeholder:text-cream/20"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] font-semibold tracking-[0.18em] text-gold/60 uppercase mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter active mobile number"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      className="bg-transparent border-b border-border hover:border-gold/50 focus:border-gold text-cream text-[13px] py-2 outline-none transition-all duration-300 placeholder:text-cream/20"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] font-semibold tracking-[0.18em] text-gold/60 uppercase mb-1">Wedding Location</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter venue or city"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="bg-transparent border-b border-border hover:border-gold/50 focus:border-gold text-cream text-[13px] py-2 outline-none transition-all duration-300 placeholder:text-cream/20"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[9px] font-semibold tracking-[0.18em] text-gold/60 uppercase mb-2">Booking Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['bride', 'groom', 'both'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`py-2.5 text-[10px] font-sans border transition-all duration-300 tracking-[0.14em] uppercase ${
                            category === cat
                              ? 'bg-gold/10 text-gold border-gold font-medium'
                              : 'bg-transparent border-border text-cream/40 hover:border-gold/30'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Hair Artistry Toggle */}
                  <div 
                    className="flex items-center gap-3 mt-2 cursor-pointer select-none"
                    onClick={() => setHairArtistry(h => !h)}
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center transition-all duration-300 ${
                      hairArtistry ? 'border-gold bg-gold text-[#1E0B10]' : 'border-border bg-transparent'
                    }`}>
                      {hairArtistry && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                    <span className="font-sans text-[11px] text-cream/60">
                      Include Professional Hair Artistry
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-[#1E0B10] font-sans text-[10px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-luxury-md mt-8"
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
