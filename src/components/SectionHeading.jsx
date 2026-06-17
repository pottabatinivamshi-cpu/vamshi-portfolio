import { motion } from 'framer-motion'

/**
 * Reusable section heading with eyebrow label, large title, and optional description.
 * Animates in on scroll.
 */
export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span className="w-8 h-[1.5px] bg-accent" />
          <span className="font-display text-xs md:text-sm uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </span>
          {align === 'center' && <span className="w-8 h-[1.5px] bg-accent" />}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display font-bold text-clamp-h2 leading-[1.05] text-ink"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-muted text-base md:text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
