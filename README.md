# Vamshi Pottabatini — Portfolio

A premium, cinematic, dark-themed portfolio website for a Video Editor & Motion Graphics Designer. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom theme: black `#0A0A0A` + orange `#FF6B00` accent)
- **Framer Motion** for animations, page transitions, scroll reveals, and stagger effects
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## How it works

- **Content** lives in `src/data/content.js` (projects, services, credits, links, section timecodes).
- **Timeline** — the bar at the bottom is the scroll progress: a playhead moves across one clip per
  section. Drag it to scrub, click a clip to jump. Section timecodes are set in `sections`.
- **Hero showreel** — plays inside the vintage TV (`public/media/tv.webp`). For the cleanest loop, export
  an 8–10s muted MP4 of your best cuts to `public/media/showreel.mp4` and set `heroReel.video` to
  `'/media/showreel.mp4'`. Otherwise it loops a YouTube segment set in `heroReel.cuts`.
  A quick way to make the file (H.264, no audio, web-optimized):
  `ffmpeg -i reel.mov -t 10 -an -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -movflags +faststart public/media/showreel.mp4`
- **Work tiles** autoplay muted while on screen and open with sound on click. For smooth playback,
  give each project a short self-hosted preview instead of streaming from YouTube: export 6–10s of
  the edit (H.264, 720p, no audio, ~1–2 MB) to `public/media/previews/` and set `preview` on the
  project in `content.js`, e.g. `preview: '/media/previews/esummit.mp4'`. With ffmpeg:
  `ffmpeg -ss 5 -i edit.mp4 -t 8 -an -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -movflags +faststart public/media/previews/esummit.mp4`

## SEO

`npm run build` prerenders the page to static HTML (`scripts/prerender.mjs`), so search engines see
the full content without running JavaScript. `index.html` holds the title, description, canonical URL,
Open Graph tags and JSON-LD (Person / WebSite / ProfilePage). `public/robots.txt` and
`public/sitemap.xml` point at the production URL — update them if the domain changes.

After deploying, add the site to [Google Search Console](https://search.google.com/search-console),
submit `sitemap.xml`, and request indexing.
