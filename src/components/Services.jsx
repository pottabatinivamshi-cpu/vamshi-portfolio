import { useState } from 'react'
import { motion } from 'framer-motion'
import { services } from '../data/content'
import { useMediaQuery } from '../hooks/useMediaQuery'
import SectionHead from './SectionHead'

const FOLDER_W = 300
const BACK_H = 210
const FRONT_H = 172
const spring = { type: 'spring', stiffness: 170, damping: 22 }

// Front pocket of the folder, with the raised left flap
const FRONT_PATH =
  'path("M18 0 H128 C142 0 148 4 156 11 L166 19 C172 23 176 24 186 24 H282 Q300 24 300 42 V154 Q300 172 282 172 H18 Q0 172 0 154 V18 Q0 0 18 0 Z")'

/** Card geometry for each state. y is the card centre, measured from the top of the folder. */
function layout(i, open, wide) {
  if (!open) {
    return { w: 128, h: 160, x: [-46, 14, 66][i], y: 46 - i * 6, rotate: [-5, 3, 9][i], z: 3 - i }
  }
  if (wide) {
    return { w: 260, h: 300, x: (i - 1) * 284, y: -200, rotate: (i - 1) * 3, z: 3 - i }
  }
  return { w: 300, h: 150, x: 0, y: -105 - (2 - i) * 164, rotate: 0, z: 3 - i }
}

function Paper({ service, i, open, wide }) {
  const g = layout(i, open, wide)
  return (
    <motion.div
      className="absolute left-1/2 top-0 overflow-hidden rounded-xl bg-ink text-[#080808] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      style={{ zIndex: g.z }}
      initial={false}
      animate={{ width: g.w, height: g.h, x: g.x - g.w / 2, y: g.y - g.h / 2, rotate: g.rotate }}
      transition={{ ...spring, delay: open ? i * 0.07 : (2 - i) * 0.04 }}
    >
      {/* Placeholder lines while the paper is filed away */}
      <motion.div
        className="absolute inset-x-4 top-5 flex flex-col gap-2.5"
        animate={{ opacity: open ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="h-2.5 w-3/4 rounded-full bg-black/15" />
        {[1, 0.8, 0.9, 0.6].map((w, k) => (
          <span key={k} className="h-1.5 rounded-full bg-black/10" style={{ width: `${w * 100}%` }} />
        ))}
      </motion.div>

      <motion.div
        className="flex h-full flex-col justify-between p-5"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ delay: open ? 0.25 + i * 0.07 : 0, duration: 0.3 }}
      >
        <span className="font-mono text-xs text-accent">0{i + 1} / 03</span>
        <div>
          <h3 className="font-display text-2xl uppercase leading-none md:text-3xl">{service.title}</h3>
          <p className="mt-2 text-sm leading-snug text-black/65">{service.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const [open, setOpen] = useState(false)
  const wide = useMediaQuery('(min-width: 960px)')
  const lift = open ? (wide ? 380 : 610) : 90

  return (
    <section id="services" className="section-x relative overflow-hidden py-24 md:py-32">
      <SectionHead label="Services" title="What I Give" note="Raw · Refined · Released" />

      <motion.div
        className="relative mx-auto mt-12"
        style={{ width: FOLDER_W }}
        initial={false}
        animate={{ height: lift + BACK_H }}
        transition={spring}
      >
        <div
          onClick={() => setOpen((o) => !o)}
          className="absolute bottom-0 left-0 cursor-pointer"
          style={{ width: FOLDER_W, height: BACK_H, perspective: 900 }}
        >
          {/* Back panel */}
          <div className="absolute inset-0 rounded-[22px] bg-[#1b1b1b] shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/5" />

          {/* Papers sit between the back and the frosted front */}
          <div className="absolute inset-x-0 top-0">
            {services.map((s, i) => (
              <Paper key={s.title} service={s} i={i} open={open} wide={wide} />
            ))}
          </div>

          {/* Frosted front pocket */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((o) => !o)
            }}
            aria-expanded={open}
            aria-label={open ? 'Close the folder' : 'Open the folder to see services'}
            className="absolute inset-x-0 bottom-0 z-10 block bg-[rgba(70,70,70,0.42)] backdrop-blur-md"
            style={{ height: FRONT_H, clipPath: FRONT_PATH, transformOrigin: '50% 100%' }}
            animate={{ rotateX: open ? -14 : 0 }}
            transition={spring}
          >
            <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          </motion.button>
        </div>
      </motion.div>

      <p className="label mt-8 text-center text-muted">
        {open ? 'Tap the folder to file them away' : 'Tap the folder ↑'}
      </p>
    </section>
  )
}
