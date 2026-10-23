import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { personal } from '../data/content'
import { scrollToId } from '../lib/timecode'

const keys = [
  { label: "don't", accent: true },
  { label: 'give' },
  { label: 'up' },
  { label: 'arrow', accent: true, action: 'contact' },
  { label: 'do', action: 'contact' },
  { label: 'it', action: 'contact' },
]

function Keycap({ k }) {
  const [pressed, setPressed] = useState(false)
  const press = () => {
    setPressed(true)
    setTimeout(() => setPressed(false), 160)
    if (k.action) setTimeout(() => scrollToId(k.action), 180)
  }
  return (
    <button
      type="button"
      onClick={press}
      aria-label={k.label === 'arrow' ? 'Go to contact' : k.label}
      className={`keycap flex aspect-square items-center justify-center ${k.accent ? 'keycap-accent' : ''} ${pressed ? 'pressed' : ''}`}
    >
      <span className="font-mono text-base sm:text-xl md:text-2xl">
        {k.label === 'arrow' ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 md:h-12 md:w-12">
            <ArrowRight className="h-5 w-5 md:h-7 md:w-7" strokeWidth={2.5} />
          </span>
        ) : (
          k.label
        )}
      </span>
    </button>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Stage */}
      <div className="flex items-center justify-center px-4 py-20 md:py-28">
        <div className="relative">
          <div className="grid w-[min(86vw,460px)] grid-cols-3 gap-3 md:gap-4">
            {keys.map((k) => (
              <Keycap key={k.label} k={k} />
            ))}
          </div>
          <p className="label mt-12 text-center text-muted">Every key is clickable. Go ahead.</p>
        </div>
      </div>

      <div className="section-x flex flex-col items-center justify-between gap-4 border-t border-line py-6 md:flex-row">
        <p className="label text-[10px] text-muted">
          © {new Date().getFullYear()} {personal.name} · {personal.location}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href={`mailto:${personal.email}`} className="label text-[10px] normal-case tracking-normal text-muted hover:text-ink">
            {personal.email}
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="label text-[10px] text-muted hover:text-ink">
            LinkedIn
          </a>
          <a href={personal.whatsapp} target="_blank" rel="noopener noreferrer" className="label text-[10px] text-muted hover:text-ink">
            WhatsApp
          </a>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('home')
            }}
            className="label text-[10px] text-accent"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
