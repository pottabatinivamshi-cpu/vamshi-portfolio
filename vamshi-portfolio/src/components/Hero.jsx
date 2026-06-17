import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Play } from 'lucide-react'
import { personal } from '../data/content'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-base"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grain opacity-30" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-[100px]"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-[120px]"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating ring decoration */}
      <motion.div
        className="hidden md:block absolute top-1/2 right-[8%] -translate-y-1/2 w-72 h-72 border border-accent/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_#FF6B00]" />
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-1/2 right-[8%] -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 section-padding w-full flex flex-col items-center text-center pt-28"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 font-display text-xs md:text-sm uppercase tracking-[0.2em] text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Available for Freelance Projects
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display font-extrabold leading-[0.95] text-clamp-hero tracking-tight max-w-5xl"
        >
          <span className="block text-ink">Transforming Raw</span>
          <span className="block gradient-text">Footage Into</span>
          <span className="block text-ink">Engaging Stories</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-base md:text-lg text-muted leading-relaxed"
        >
          {personal.shortDescription}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollTo('#portfolio')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-base font-display font-semibold uppercase tracking-wider text-sm overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play size={16} className="fill-base" />
              View Portfolio
            </span>
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-ink font-display font-semibold uppercase tracking-wider text-sm hover:border-accent hover:text-accent transition-all duration-300"
          >
            Contact Me
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Identity tag */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center gap-1"
        >
          <p className="font-display text-sm md:text-base tracking-[0.3em] uppercase text-ink/70">
            {personal.name}
          </p>
          <p className="text-xs md:text-sm text-muted tracking-wider">{personal.title}</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={16} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
