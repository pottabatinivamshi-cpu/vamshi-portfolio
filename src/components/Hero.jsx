import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Volume2 } from 'lucide-react'
import { heroReel, personal } from '../data/content'
import { scrollToId } from '../lib/timecode'
import VideoModal from './VideoModal'
import YouTubeLoop from './YouTubeLoop'

/** Plays the hero loop: a local MP4 if configured, otherwise loops YouTube cuts. */
function ReelLoop() {
  const [live, setLive] = useState(false)
  const videoRef = useRef(null)

  // React doesn't server-render `muted`, so enforce it before starting playback
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  if (heroReel.video) {
    return (
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={heroReel.video}
        poster={heroReel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    )
  }

  return (
    <>
      <img src={heroReel.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* 16:9 player, center-cut into the 4:3 tube */}
      <YouTubeLoop cuts={heroReel.cuts} onLiveChange={setLive} overscan={heroReel.overscan} />
      {/* "Tuning" static covers each cut until YouTube's overlay has faded */}
      <div
        className={`crt-static absolute inset-0 transition-opacity duration-300 ${live ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
    </>
  )
}

export default function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <section id="home" className="section-x relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24">
      {/* Night-street backdrop behind the TV: darkened toward the text, shadowed at the bottom, vignetted */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src="/media/hero-bg.webp"
          alt=""
          width="564"
          height="748"
          className="absolute inset-0 h-full w-full object-cover opacity-70 lg:left-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,#000_45%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-transparent lg:via-night/20" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night via-night/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,transparent_25%,rgba(8,8,8,0.85)_80%)]" />
      </div>

      <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="order-2 lg:order-1">
          <p className="label reveal text-muted">Portfolio · {new Date().getFullYear()}</p>

          <h1 className="reveal mt-5 font-display text-clamp-hero uppercase text-ink" style={{ '--d': '0.08s' }}>
            {personal.firstName}
            <span className="sr-only"> {personal.lastName}</span>
          </h1>

          <p className="label reveal mt-6 text-ink" style={{ '--d': '0.16s' }}>
            {personal.roles.join('  |  ')}
          </p>
          <p className="label reveal mt-3 flex items-center gap-2 text-muted" style={{ '--d': '0.2s' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-wave" aria-hidden="true" />
            Available for freelance · {personal.location}
          </p>

          <div className="reveal mt-10 grid w-full max-w-sm grid-cols-2 gap-3" style={{ '--d': '0.28s' }}>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('work')
              }}
              className="label flex h-12 items-center justify-center rounded-full border border-accent bg-accent font-bold text-[#080808] transition-transform hover:scale-[1.03]"
            >
              See the work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
              className="label group flex h-12 items-center justify-center gap-2 rounded-full border border-line text-ink transition-colors hover:border-ink"
            >
              Let's talk
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Vintage TV playing the showreel */}
        <div className="reveal order-1 lg:order-2" style={{ '--d': '0.1s' }}>
          <div className="relative mx-auto aspect-[658/602] w-full max-w-[560px]">
            {/* Grounding: the surface the TV sits on (stand base is at 97.8% of the image height) */}
            <div className="pointer-events-none absolute inset-x-[-18%] top-[97.8%] h-[26%]" aria-hidden="true">
              {/* Surface plane, catching the tube's teal spill and fading into the dark */}
              <div className="tv-surface absolute inset-0" />
              {/* Faint reflection of the set */}
              <img src="/media/tv.webp" alt="" className="tv-reflection absolute left-[13.24%] top-[-8.5%] w-[73.53%]" />
            </div>
            {/* Ambient occlusion + tight contact shadow where the stand meets the surface */}
            <div className="pointer-events-none absolute left-[-2%] right-[-2%] top-[90%] h-[16%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.95),transparent)] blur-md" aria-hidden="true" />
            <div className="pointer-events-none absolute left-[4%] right-[4%] top-[96.2%] h-[3.5%] rounded-[50%] bg-black/90 blur-[3px]" aria-hidden="true" />
            {/* Showreel sits behind the set; the TV image has its glass cut out, so the real bezel masks it */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Watch the showreel with sound"
              className="crt-screen group absolute overflow-hidden bg-black"
              style={{ left: '9.12%', top: '9.47%', width: '81.31%', height: '71.43%' }}
            >
              <ReelLoop />
              <span className="crt-vignette pointer-events-none absolute inset-0" />
              <span className="crt-glare pointer-events-none absolute inset-0" />
              <span className="label absolute bottom-[10%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1.5 text-[10px] text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Volume2 size={12} /> Watch with sound
              </span>
            </button>
            <img
              src="/media/tv.webp"
              width="658"
              height="602"
              fetchpriority="high"
              alt="Vintage CRT television playing Vamshi Pottabatini's editing showreel"
              className="tv-image pointer-events-none absolute inset-0 h-full w-full select-none"
            />
          </div>
        </div>
      </div>

      {open && (
        <VideoModal
          src={heroReel.video || undefined}
          videoId={heroReel.featured.videoId}
          title={heroReel.video ? heroReel.title : heroReel.featured.title}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  )
}
