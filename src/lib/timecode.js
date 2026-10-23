import { sections, runtime } from '../data/content'

export const FPS = 24

/** 'HH:MM:SS:FF' -> seconds */
export function parseTimecode(tc) {
  const [h, m, s, f] = tc.split(':').map(Number)
  return h * 3600 + m * 60 + s + f / FPS
}

export const RUNTIME = parseTimecode(runtime)

export const sectionTimes = sections.map((s) => parseTimecode(s.tc))

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
