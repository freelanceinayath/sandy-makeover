/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'delay-100','delay-150','delay-200','delay-300','delay-400','delay-500','delay-600','delay-700',
    'reveal','reveal-scale','reveal-left','in-view','glass','img-zoom','bg-gold-gradient',
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:   ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Updated exact color pattern
        dark:     '#1E0B10', // deepest derived background
        'dark-2': '#32131A', // exact maroon
        'dark-3': '#290E14', // mid tone maroon-black
        'dark-4': '#3D1820', // lighter maroon accent
        cream:    '#F5EFE5', // exact ivory
        'cream-2':'#DED5CD', // derived muted champagne
        'cream-3':'#CBBFA9', // darker champagne
        gold:     '#C3A359', // exact gold
        'gold-light': '#D2BA82', // derived gold tint 1
        'gold-dark':  '#A0823E', // derived darker gold
        'gold-extra': '#DECCA4', // derived gold tint 2
        muted:    'rgba(245,239,229,0.5)',
        border:   'rgba(195,163,89,0.18)',
        'border-light': 'rgba(195,163,89,0.35)',
        polaroid: '#F5EFE5',
        ivory:    '#F5EFE5',
        canvas:   '#FFFFFF',
        ink:      '#111111',
        night:    '#1E0B10',
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg,#C3A359,#A0823E)',
        'dark-gradient':    'linear-gradient(180deg,#1E0B10 0%,#32131A 100%)',
        'hero-overlay':     'linear-gradient(to top,rgba(30,11,16,0.92) 0%,rgba(30,11,16,0.55) 50%,rgba(30,11,16,0.25) 100%)',
      },
      boxShadow: {
        'polaroid':    '0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
        'gold-glow':   '0 0 40px rgba(195,163,89,0.15)',
        'luxury-sm':   '0 2px 16px rgba(0,0,0,0.3)',
        'luxury-md':   '0 8px 40px rgba(0,0,0,0.4)',
        'luxury-lg':   '0 24px 64px rgba(0,0,0,0.5)',
        'gold':        '0 8px 32px rgba(195,163,89,0.35)',
      },
      animation: {
        'ken-burns':   'kenBurns 22s ease-in-out infinite alternate',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'wa-pulse':    'waPulse 2.5s ease-out infinite',
        'ticker':      'ticker 40s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: { from:{transform:'scale(1)'}, to:{transform:'scale(1.08)'} },
        scrollLine: {
          '0%,100%': {transform:'scaleY(1)',opacity:'0.5'},
          '50%':     {transform:'scaleY(0.5)',opacity:'1'},
        },
        waPulse: {
          '0%':   {transform:'scale(1)',  opacity:'0.7'},
          '100%': {transform:'scale(1.7)',opacity:'0'},
        },
        ticker: {
          from:{transform:'translateX(0)'},
          to:  {transform:'translateX(-50%)'},
        },
        float: {
          '0%,100%': {transform:'translateY(0px) rotate(var(--r,0deg))'},
          '50%':     {transform:'translateY(-12px) rotate(var(--r,0deg))'},
        },
      },
    },
  },
  plugins: [],
}
