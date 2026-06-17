import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Play } from 'lucide-react'
import { navLinks, personal } from '../data/content'

/**
 * Sticky, transparent-to-glass navbar with animated underline links
 * and a full-screen mobile menu overlay.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Determine active section based on scroll position
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`section-padding flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'mx-3 md:mx-6 mt-2 rounded-2xl glass-strong py-3 px-5 md:px-8' : ''
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold tracking-tight z-[81]"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 border border-accent/30">
              <Play size={16} className="text-accent fill-accent" />
            </span>
            <span>
              Vamshi<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="relative font-display text-sm uppercase tracking-wider text-ink/80 hover:text-ink transition-colors py-2 group"
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4 z-[81]">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              className="hidden md:inline-flex items-center font-display text-sm uppercase tracking-wider px-5 py-2.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-base transition-all duration-300"
            >
              Let's Talk
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((p) => !p)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full glass text-ink"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[75] bg-base/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="font-display text-3xl md:text-5xl uppercase tracking-wide text-ink hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mt-12 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-muted text-sm">{personal.email}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
