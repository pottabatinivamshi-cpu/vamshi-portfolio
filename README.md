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

## Project Structure

```
vamshi-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── content.js        # All editable text, links, project data
    ├── hooks/
    │   ├── useScrollProgress.js
    │   └── useCountUp.js
    └── components/
        ├── LoadingScreen.jsx
        ├── ScrollProgress.jsx
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── SectionHeading.jsx
        ├── About.jsx
        ├── Portfolio.jsx
        ├── Services.jsx
        ├── Tools.jsx
        ├── Experience.jsx
        ├── WhyWorkWithMe.jsx
        ├── Testimonials.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Customization

- **All text content, links, projects, services, testimonials**: edit `src/data/content.js`.
- **Colors / theme**: edit `tailwind.config.js` (`colors.accent`, `colors.base`, etc.) and `src/index.css`.
- **Portfolio thumbnails**: replace the Unsplash placeholder URLs in `content.js` with your real video thumbnails. To embed actual video clips, swap the `<img>` in `Portfolio.jsx` for a `<video>` element or a modal/lightbox player.
- **Contact form**: `Contact.jsx` currently has a placeholder submit handler. Connect it to a service like Formspree, EmailJS, or your own backend endpoint.

## Features

- Cinematic curtain-wipe loading screen
- Sticky glassmorphism navbar with active-section highlighting + mobile menu
- Full-screen animated hero with parallax orbs and rotating rings
- Animated stat counters
- Filterable portfolio grid with smooth layout animations
- Premium service cards, tools showcase, "why work with me" grid
- Animated vertical timeline for experience
- Auto-playing testimonial slider
- Contact section with form + social links
- Scroll progress indicator
- Fully responsive, SEO meta tags included
