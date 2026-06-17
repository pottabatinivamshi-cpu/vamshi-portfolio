import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { testimonialsData } from '../data/content'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % testimonialsData.length)
  }, [])

  const prev = () => {
    setDirection(-1)
    setIndex((p) => (p - 1 + testimonialsData.length) % testimonialsData.length)
  }

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  const current = testimonialsData[index]

  return (
    <section className="relative py-28 md:py-36 section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none" />

      <SectionHeading
        eyebrow="Testimonials"
        title="What Clients Say"
        align="center"
        description="Real feedback from creators and brands I've collaborated with."
      />

      <div className="mt-14 max-w-3xl mx-auto relative">
        <Quote size={64} className="absolute -top-6 left-1/2 -translate-x-1/2 text-accent/10" />

        <div className="relative min-h-[280px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full p-8 md:p-12 rounded-3xl glass text-center"
            >
              <p className="text-lg md:text-2xl text-ink leading-relaxed font-display">
                "{current.quote}"
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent/40"
                  loading="lazy"
                />
                <div>
                  <p className="font-display font-semibold text-ink">{current.name}</p>
                  <p className="text-sm text-muted">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-accent/40 hover:text-accent transition-colors duration-300"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                aria-label={`Go to testimonial ${i + 1}`}
                className="p-1"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/20'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-accent/40 hover:text-accent transition-colors duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
