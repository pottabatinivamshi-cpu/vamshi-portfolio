import { scrollToId } from '../lib/timecode'

export default function Header() {
  const go = (e, id) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <header className="section-x fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-night/90 to-transparent py-4 md:py-5">
      <a href="#home" onClick={(e) => go(e, 'home')} className="label flex items-center gap-2 text-ink">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
        Vamshi<span className="text-muted">.edit</span>
      </a>
      <a
        href="#contact"
        onClick={(e) => go(e, 'contact')}
        className="label rounded-full border border-line px-4 py-2 text-ink transition-colors hover:border-accent hover:text-accent"
      >
        Hire me
      </a>
    </header>
  )
}
