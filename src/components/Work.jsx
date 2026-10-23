import { useEffect, useMemo, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { projects } from '../data/content'
import { thumb } from '../lib/youtube'
import { useInView } from '../hooks/useInView'
import { useMediaQuery } from '../hooks/useMediaQuery'
import SectionHead from './SectionHead'
import VideoModal from './VideoModal'
import YouTubeLoop from './YouTubeLoop'

/** Deterministic pseudo-random waveform so SSR and client match */
function useWaveform(seed, bars = 72) {
  return useMemo(() => {
    let x = seed * 9301 + 49297
    const rand = () => {
      x = (x * 9301 + 49297) % 233280
      return x / 233280
    }
    return Array.from({ length: bars }, (_, i) => {
      const envelope = 0.45 + 0.55 * Math.abs(Math.sin((i / bars) * Math.PI * (2 + (seed % 3))))
      return Math.max(0.12, Math.min(1, envelope * (0.35 + rand() * 0.75)))
    })
  }, [seed, bars])
}

function Waveform({ seed, playing }) {
  const bars = useWaveform(seed)
  return (
    <div className="h-4 overflow-hidden rounded-[3px] bg-wave/[0.07]">
      <svg
        viewBox={`0 0 ${bars.length * 3} 16`}
        preserveAspectRatio="none"
        className={`wave h-full w-full ${playing ? 'wave-live' : ''}`}
        aria-hidden="true"
      >
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 3}
            y={8 - h * 7}
            width="1.6"
            height={h * 14}
            rx="0.8"
            fill="#4ADE80"
            opacity="0.8"
            // Stagger each bar so the waveform ripples like a live audio meter
            style={{ animationDelay: `${-((i * 37 + seed * 11) % 100) / 100}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

const ratio = (p) => (p.vertical ? 9 / 16 : 16 / 9)

/**
 * Groups clips into justified rows: every clip in a row shares one height and its width follows
 * its real aspect ratio. Rows fill toward `target` (sum of aspect ratios). Phones get exactly two
 * per row, pairing clips of the same orientation so neither gets squashed.
 */
function buildRows(items, mode) {
  if (mode === 'phone') {
    const h = items.filter((p) => !p.vertical)
    const v = items.filter((p) => p.vertical)
    const rows = []
    while (h.length || v.length) {
      if (h.length) rows.push(h.splice(0, 2))
      if (v.length) rows.push(v.splice(0, 2))
    }
    return rows.map((row) => ({ items: row, pad: row.length === 1 ? ratio(row[0]) : 0 }))
  }

  const target = mode === 'desktop' ? 3.6 : 2.6
  const rows = []
  let row = []
  let sum = 0
  for (const p of items) {
    const next = sum + ratio(p)
    if (row.length && Math.abs(next - target) > Math.abs(sum - target)) {
      rows.push({ items: row, pad: 0 })
      row = []
      sum = 0
    }
    row.push(p)
    sum += ratio(p)
  }
  rows.push({ items: row, pad: Math.max(0, target - sum) })
  return rows
}

/** Self-hosted preview: plays/pauses with visibility and never reloads, like a native <video> loop */
function PreviewVideo({ src, poster, active, onLive }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active) v.play().catch(() => {})
    else v.pause()
  }, [active])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      onPlaying={() => onLive(true)}
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
  )
}

function Clip({ project, index, onOpen, grow }) {
  // Load a little before the tile arrives, play while it's mostly on screen
  const [nearRef, near] = useInView(0, '300px 0px')
  const [ref, inView] = useInView(0.35)
  const [mounted, setMounted] = useState(false)
  const [live, setLive] = useState(false)
  const cuts = useMemo(() => [{ videoId: project.videoId }], [project.videoId])

  // Once a player exists, keep it: scrolling away pauses it instead of destroying it
  useEffect(() => {
    if (near) setMounted(true)
  }, [near])

  return (
    <article
      ref={nearRef}
      className="reveal group min-w-0"
      style={{ flex: `${grow} 1 0%`, '--d': `${(index % 3) * 0.06}s` }}
    >
      <button
        ref={ref}
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Play ${project.title} with sound`}
        className="block w-full text-left"
      >
        <div
          className="relative overflow-hidden rounded-md bg-black ring-1 ring-line transition-shadow group-hover:ring-accent/60"
          style={{ aspectRatio: project.vertical ? '9 / 16' : '16 / 9' }}
        >
          {project.preview ? (
            <PreviewVideo src={project.preview} poster={thumb(project.videoId)} active={inView} onLive={setLive} />
          ) : (
            mounted && <YouTubeLoop cuts={cuts} onLiveChange={setLive} overscan={1.3} active={inView} />
          )}
          {/* Thumbnail covers the player until playback is clean */}
          <img
            src={thumb(project.videoId)}
            alt={`${project.title} — ${project.category} edit by Vamshi Pottabatini`}
            loading="lazy"
            width="480"
            height="360"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${
              live ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span className="label absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[9px] text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <Volume2 size={11} /> Watch
          </span>
        </div>

        <div className="mt-2">
          <Waveform seed={project.id} playing={inView && live} />
        </div>
      </button>

      <h3 className="mt-3 line-clamp-2 text-sm font-medium text-ink md:text-base">{project.title}</h3>
      <p className="label mt-1 truncate text-[10px] text-muted">{project.category}</p>
    </article>
  )
}

export default function Work() {
  const [active, setActive] = useState(null)
  const tablet = useMediaQuery('(min-width: 768px)')
  const desktop = useMediaQuery('(min-width: 1024px)')
  const rows = useMemo(() => buildRows(projects, desktop ? 'desktop' : tablet ? 'tablet' : 'phone'), [tablet, desktop])
  let n = 0

  return (
    <section id="work" className="section-x relative py-24 md:py-32">
      <SectionHead label="Selected edits" title="The Work" note="Plays as you scroll · tap for sound" />

      <div className="mt-12 flex flex-col gap-8 md:gap-10">
        {rows.map((row, r) => (
          <div key={r} className="flex items-start gap-3 md:gap-5">
            {row.items.map((p) => (
              <Clip key={p.id} project={p} index={n++} onOpen={setActive} grow={ratio(p)} />
            ))}
            {row.pad > 0 && <div style={{ flex: `${row.pad} 1 0%` }} aria-hidden="true" />}
          </div>
        ))}
      </div>

      {active && (
        <VideoModal
          videoId={active.videoId}
          title={active.title}
          description={active.description}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  )
}
