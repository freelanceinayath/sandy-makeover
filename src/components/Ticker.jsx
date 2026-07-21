/* Scrolling ticker strip — dark with gold accents */
const ITEMS = [
  'Bridal Makeup','·','Groom Styling','·','Hair Artistry','·',
  'Reception Glamour','·','Engagement Looks','·','Premium Products','·',
  'Home Service','·','Travel Available','·',
]
const ALL = [...ITEMS, ...ITEMS]

export default function Ticker() {
  return (
    <div className="bg-dark-3 border-y border-border overflow-hidden select-none py-4">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {ALL.map((item, i) => (
          <span key={i} className={`font-sans text-[10px] font-medium tracking-[0.22em] uppercase whitespace-nowrap px-5
            ${item === '·' ? 'text-gold' : 'text-cream/70'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
