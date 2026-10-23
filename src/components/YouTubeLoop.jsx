import { useEffect, useRef } from 'react'
import { loadYouTubeAPI } from '../lib/youtube'

const BEZEL_MS = 4500

/**
 * Muted, chrome-less YouTube loop over a list of cuts ({ videoId, start, end }).
 * YouTube flashes its play bezel and title after every load, play or seek, so `onLiveChange(true)`
 * only fires once that has faded; callers keep a cover (static, thumbnail) up until then.
 * The player is over-scanned (scaled past its box) to crop the remaining edge chrome.
 * `active={false}` pauses the player instead of destroying it, so scrolling back resumes
 * instantly rather than reloading YouTube's player and re-buffering.
 */
export default function YouTubeLoop({ cuts, onLiveChange, overscan = 1.4, active = true }) {
  const mountRef = useRef(null)
  const playerRef = useRef(null)
  const readyRef = useRef(false)
  const revealRef = useRef(0)
  const activeRef = useRef(active)
  const onLive = useRef(onLiveChange)
  onLive.current = onLiveChange
  activeRef.current = active

  useEffect(() => {
    const mount = mountRef.current
    let player
    let poll
    let cancelled = false
    let index = 0
    const setLive = (v) => !cancelled && onLive.current?.(v)

    const nextCut = () => {
      const prev = cuts[index]
      index = (index + 1) % cuts.length
      const c = cuts[index]
      setLive(false)
      if (c.videoId === prev.videoId) player.seekTo(c.start ?? 0, true)
      else player.loadVideoById({ videoId: c.videoId, startSeconds: c.start ?? 0 })
    }

    loadYouTubeAPI().then((YT) => {
      if (cancelled) return
      // The API replaces its target with an iframe, so give it a node React doesn't own
      const target = document.createElement('div')
      mount.appendChild(target)
      player = new YT.Player(target, {
        host: 'https://www.youtube-nocookie.com',
        width: '100%',
        height: '100%',
        videoId: cuts[0].videoId,
        playerVars: {
          autoplay: activeRef.current ? 1 : 0, mute: 1, controls: 0, disablekb: 1, fs: 0,
          iv_load_policy: 3, modestbranding: 1, playsinline: 1, rel: 0, start: cuts[0].start ?? 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute()
            playerRef.current = player
            readyRef.current = true
            // autoplay=1 normally starts it; an explicit play() would flash the pause bezel
            setTimeout(() => {
              if (!cancelled && activeRef.current && player.getPlayerState?.() !== YT.PlayerState.PLAYING) {
                player.playVideo()
              }
            }, 1500)
            poll = setInterval(() => {
              const end = cuts[index].end
              if (end && player.getCurrentTime?.() >= end) nextCut()
            }, 150)
          },
          onStateChange: (e) => {
            clearTimeout(revealRef.current)
            if (e.data === YT.PlayerState.PLAYING) {
              revealRef.current = setTimeout(() => setLive(true), BEZEL_MS)
            } else if (e.data === YT.PlayerState.ENDED) {
              nextCut()
            } else if (e.data !== YT.PlayerState.BUFFERING) {
              setLive(false)
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      clearInterval(poll)
      clearTimeout(revealRef.current)
      readyRef.current = false
      playerRef.current = null
      player?.destroy?.()
      mount.innerHTML = ''
    }
  }, [cuts])

  // Pause/resume with visibility instead of tearing the player down
  useEffect(() => {
    const player = playerRef.current
    if (!readyRef.current || !player) return
    if (active) player.playVideo()
    else player.pauseVideo()
  }, [active])

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-video -translate-x-1/2 -translate-y-1/2"
      style={{ height: `${overscan * 100}%` }}
    >
      <div ref={mountRef} className="h-full w-full" />
    </div>
  )
}
