// Centralized content for the portfolio.
// Edit this file to update text, links, and projects across the site.

export const site = {
  url: 'https://vamshi-portfolio-gamma.vercel.app',
}

export const personal = {
  name: 'Vamshi Pottabatini',
  firstName: 'Vamshi',
  lastName: 'Pottabatini',
  roles: ['Video Editor', 'Motion Designer', 'Production Lead'],
  location: 'Mumbai, India',
  statement:
    'I transform raw footage into engaging stories that capture attention and connect with audiences.',
  email: 'pottabatinivamshi@gmail.com',
  whatsapp: 'https://wa.me/919372534404',
  linkedin: 'https://www.linkedin.com/in/vamshi-pottabatini-472a51312',
}

// Formspree endpoint used by the Render (contact) panel
export const FORMSPREE_URL = 'https://formspree.io/f/mykqknzy'

// Timeline: each section is a "clip" that starts at a timecode (HH:MM:SS:FF @ 24fps).
// The bottom playhead and section headings both read from this list.
export const sections = [
  { id: 'home', label: 'Intro', tc: '00:00:00:00' },
  { id: 'work', label: 'Work', tc: '00:00:12:04' },
  { id: 'services', label: 'What I Give', tc: '00:00:41:17' },
  { id: 'about', label: 'About', tc: '00:01:03:09' },
  { id: 'contact', label: 'Render', tc: '00:01:22:21' },
]
export const runtime = '00:01:40:00'

// Hero loop shown inside the vintage TV: a muted, looping 4:3 MP4 (with audio, played when the TV is clicked).
// Source: Showreel_2026_4x3_ElusiveTime.mp4, re-encoded to 960x720 for the web (~5 MB).
// If `video` is emptied, the TV falls back to looping the YouTube `cuts` below.
export const heroReel = {
  video: '/media/showreel-elusive-time.mp4',
  poster: '/media/showreel-elusive-time-poster.webp',
  title: 'Showreel 2026',
  cuts: [{ videoId: 'pk3-_tdc0FU', start: 1, end: 15 }],
  // How far the YouTube player is zoomed past the screen; raise it for widescreen (letterboxed) videos
  overscan: 1.8,
  // YouTube video opened with sound when the TV is clicked (fallback mode only)
  featured: { videoId: 'pk3-_tdc0FU', title: 'DJSCE E-Cell Team Reveal' },
}

// `vertical: true` marks 9:16 edits so the grid can size them correctly.
// `preview` (optional): a short muted MP4 in public/media/previews/ that plays as you scroll.
// Self-hosted previews play smoothly; without one, the tile streams from YouTube (heavier, laggier).
// Click always opens the full YouTube video with sound.
export const projects = [
  {
    id: 1,
    title: 'Viram Shah Podcast Intro',
    category: 'YouTube',
    description:
      "Edited Viram Shah's podcast intro with seamless transitions, motion graphics, and clean visual effects to create a captivating and professional start to the episode.",
    videoId: 'oiwF8YpoXxA',
  },
  {
    id: 2,
    title: 'Maahi Artist Reveal',
    category: 'Reels & Shorts',
    description:
      'Produced a high-energy artist reveal featuring creative editing, motion graphics, and suspense-driven pacing to maximize audience excitement and engagement.',
    videoId: 'CyhcqWhcYTY',
    vertical: true,
  },
  {
    id: 3,
    title: 'E-Summit 2026 Aftermovie',
    category: 'Event Highlights',
    description:
      'Captured key moments, speaker sessions, networking interactions, and audience engagement through dynamic editing and cinematic storytelling.',
    videoId: 'i7236sNfWbY',
    vertical: true,
  },
  {
    id: 4,
    title: 'DJSCE E-Cell Team Reveal',
    category: 'Reels & Shorts',
    description:
      'An engaging team reveal edit with rapid-paced cuts, creative masking effects, smooth transitions, and color grading.',
    videoId: 'pk3-_tdc0FU',
  },
  {
    id: 5,
    title: 'Rush Hour 5.0 Highlights',
    category: 'Reels & Shorts',
    description:
      "Captured the event's energy through dynamic pacing, seamless transitions, beat-synced cuts, and color grading.",
    videoId: 'bK3cisJ6P0Q',
    vertical: true,
  },
  {
    id: 6,
    title: 'Student Startup Promo',
    category: 'Reels & Shorts',
    description:
      'A startup trailer using transitions, text animations, and color grading to present the business idea in a clear and engaging way.',
    videoId: 'V_pVwgQ0Ccc',
  },
  {
    id: 7,
    title: 'Animated Logo Sequence',
    category: 'Motion Graphics',
    description:
      'A dynamic E-Cell logo animation built in After Effects using smooth motion design and professional animation principles.',
    videoId: 'zFxfct5OUmU',
  },
]

export const services = [
  {
    title: 'YouTube Editing',
    description: 'Long-form edits with strong storytelling, pacing, and a retention-focused structure.',
  },
  {
    title: 'Reels & Shorts',
    description: 'Scroll-stopping vertical content for Instagram Reels, YouTube Shorts, and more.',
  },
  {
    title: 'Motion Graphics',
    description: 'Custom animation, kinetic typography, and VFX that lift your content visually.',
  },
]

export const stats = [
  { value: '20+', label: 'Projects delivered' },
  { value: '100+', label: 'Hours of footage edited' },
]

export const software = ['Adobe After Effects', 'DaVinci Resolve']

export const credits = [
  { role: 'VCP – Productions', org: 'DJSCE E-Cell', years: '2026 – Present' },
  { role: 'HOD – Production', org: 'DJSCE E-Cell', years: '2025 – 2026' },
]

export const projectTypes = ['YouTube edit', 'Reels / Shorts', 'Motion graphics', 'Event aftermovie', 'Something else']
