import { useEffect, useRef, useState } from 'react'
import { sections } from '../data/content'
import { RUNTIME, sectionTimes, scrollToId } from '../lib/timecode'

/*
 * Scroll progress as an editing timeline.
 * The "reading line" slides from the top of the viewport (page start) to the bottom (page end),
 * so every section's start lines up with its timecode when its top crosses that line.
 */
const durations = sectionTimes.map((t, i) => (sectionTimes[i + 1] ?? RUNTIME) - t)

function measure() {
  const doc = document.documentElement
  const vh = window.innerHeight
  const max = Math.max(1, doc.scrollHeight - vh)
  const tops = sections.map((s) => {
    const el = document.getElementById(s.id)
    return el ? el.getBoundingClientRect().top + window.scrollY : 0
  })
  return { vh, max, docHeight: doc.scrollHeight, tops }
}

function timeAtScroll(scrollY, m) {
  const readPos = scrollY + m.vh * Math.min(1, scrollY / m.max)
  for (let i = sections.length - 1; i >= 0; i--) {
    if (readPos >= m.tops[i]) {
      const end = m.tops[i + 1] ?? m.docHeight
      const frac = end > m.tops[i] ? Math.min(1, (readPos - m.tops[i]) / (end - m.tops[i])) : 0
      return { time: sectionTimes[i] + durations[i] * frac, index: i }
    }
  }
  return { time: 0, index: 0 }
}

function scrollAtTime(time, m) {
  let i = sectionTimes.findLastIndex((t) => time >= t)
  if (i < 0) i = 0
  const end = m.tops[i + 1] ?? m.docHeight
  const readPos = m.tops[i] + ((time - sectionTimes[i]) / durations[i]) * (end - m.tops[i])
  // invert readPos = y * (1 + vh / max)
  return Math.min(m.max, readPos / (1 + m.vh / m.max))
}

export default function Timeline() {
  const trackRef = useRef(null)
  const headRef = useRef(null)
  const metrics = useRef(null)
  const scrubbing = useRef(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frame = 0
    const render = () => {
      frame = 0
      if (!metrics.current) metrics.current = measure()
      const { time, index } = timeAtScroll(window.scrollY, metrics.current)
      headRef.current.style.left = `${(time / RUNTIME) * 100}%`
      setActive(index)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    const remeasure = () => {
      metrics.current = measure()
      schedule()
    }

    remeasure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    // Fonts, images and embeds shift section offsets after load
    const ro = new ResizeObserver(remeasure)
    ro.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      ro.disconnect()
    }
  }, [])

  const scrubTo = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    window.scrollTo({ top: scrollAtTime(frac * RUNTIME, metrics.current ?? measure()), behavior: 'instant' })
  }

  const onPointerDown = (e) => {
    if (e.target.closest('[data-clip]')) return
    scrubbing.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    scrubTo(e.clientX)
  }
  const onPointerMove = (e) => scrubbing.current && scrubTo(e.clientX)
  const onPointerUp = () => {
    scrubbing.current = false
  }

  return (
    <nav
      aria-label="Page timeline"
      className="fixed inset-x-0 bottom-0 z-50 flex h-12 items-stretch border-t border-line bg-night/85 px-3 backdrop-blur-md md:px-6"
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative flex flex-1 cursor-ew-resize touch-none flex-col justify-center gap-1 py-1.5"
      >
        <div className="ruler h-2 w-full opacity-70" aria-hidden="true" />
        <div className="flex h-5 w-full gap-[2px]">
          {sections.map((s, i) => (
            <a
              key={s.id}
              data-clip
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(s.id)
              }}
              style={{ flexGrow: durations[i], flexBasis: 0 }}
              className={`flex min-w-0 cursor-pointer items-center overflow-hidden rounded-[3px] border px-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors md:text-[10px] ${
                i === active
                  ? 'border-accent/60 bg-accent/20 text-ink'
                  : 'border-line bg-surface2 text-muted hover:text-ink'
              }`}
            >
              <span className="truncate">{s.label}</span>
            </a>
          ))}
        </div>

        {/* Playhead */}
        <div ref={headRef} className="pointer-events-none absolute inset-y-0 left-0 w-0" aria-hidden="true">
          <div className="absolute -left-[5px] top-0 h-2.5 w-[11px] bg-accent [clip-path:polygon(0_0,100%_0,100%_55%,50%_100%,0_55%)]" />
          <div className="absolute -left-px top-0 h-full w-[2px] bg-accent shadow-[0_0_8px_#FF5C00]" />
        </div>
      </div>
    </nav>
  )
}
