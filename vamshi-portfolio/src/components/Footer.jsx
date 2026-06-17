import { motion } from 'framer-motion'
import { Instagram, Linkedin, MessageCircle, Mail, ArrowUp, Play } from 'lucide-react'
import { footerLinks, personal } from '../data/content'

const iconMap = { Instagram, Linkedin, MessageCircle, Mail }

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative section-padding pt-20 pb-10 border-t border-white/10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-radial-glow opacity-30 pointer-events-none" />

      {/* Big name marquee */}
      {/* <div className="relative overflow-hidden mb-16 select-none">
        <div className="marquee-track">
          {[...Array(2)].map((_, set) => (
            <div key={set} className="flex items-center gap-8 pr-8">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="font-display text-stroke text-[clamp(3rem,12vw,9rem)] font-extrabold uppercase whitespace-nowrap"
                >
                  Vamshi Pottabatini
                </span>
              ))}
            </div>
          ))}
        </div> */}
      {/* </div> */}

      <div className="relative z-10 grid md:grid-cols-3 gap-12 items-start">
        {/* Brand */}
        <div>
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 border border-accent/30">
              <Play size={16} className="text-accent fill-accent" />
            </span>
            Vamshi<span className="text-accent">.</span>
          </a>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            {personal.tagline}
          </p>
        </div>

        {/* Nav links */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-muted mb-4">Navigation</h4>
          <ul className="flex flex-col gap-3">
            {footerLinks.navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-ink/80 hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-muted mb-4">Connect</h4>
          <div className="flex flex-wrap gap-3">
            {footerLinks.socials.map((social) => {
              const Icon = iconMap[social.icon] || Mail
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-accent hover:text-base hover:border-accent transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted text-center md:text-left">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4 }}
          aria-label="Back to top"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:border-accent/40 hover:text-accent transition-colors duration-300 text-sm font-display uppercase tracking-wider"
        >
          Back to Top
          <ArrowUp size={14} />
        </motion.button>
      </div>
    </footer>
  )
}
