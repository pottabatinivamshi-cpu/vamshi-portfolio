import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Full-screen cinematic loading screen shown on initial page load.
 * Animates a progress counter and reveals the site with a curtain wipe.
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsDone(true), 400)
          return 100
        }
        return prev + Math.floor(Math.random() * 8) + 2
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(onComplete, 900)
      return () => clearTimeout(timer)
    }
  }, [isDone, onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Curtain panels */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-base z-10"
            initial={{ x: 0 }}
            animate={isDone ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-base z-10"
            initial={{ x: 0 }}
            animate={isDone ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="relative z-20 flex flex-col items-center">
            <motion.div
              className="font-display text-2xl md:text-4xl tracking-[0.3em] text-ink uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Vamshi<span className="text-accent">.</span>
            </motion.div>

            <div className="relative w-48 md:w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <motion.div
              className="mt-4 font-display text-sm tracking-widest text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(progress, 100)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
