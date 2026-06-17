import { motion } from 'framer-motion'
import { Briefcase, Check } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { experienceData } from '../data/content'

function TimelineItem({ exp, index, isLast }) {
  const isEven = index % 2 === 0

  return (
    <div className="relative grid md:grid-cols-2 gap-6 md:gap-12 pb-16 md:pb-24 last:pb-0">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[19px] md:left-1/2 top-12 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
      )}

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, type: 'spring' }}
        className="absolute left-0 md:left-1/2 top-1 w-10 h-10 rounded-full bg-surface border-2 border-accent flex items-center justify-center md:-translate-x-1/2 z-10 shadow-[0_0_20px_#FF6B0040]"
      >
        <Briefcase size={16} className="text-accent" />
      </motion.div>

      {/* Content - alternates sides on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`pl-16 md:pl-0 ${isEven ? 'md:order-1 md:pr-16 md:text-right' : 'md:order-2 md:col-start-2 md:pl-16'}`}
      >
        <div className="p-6 md:p-8 rounded-2xl glass">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-display uppercase tracking-wider mb-4">
            {exp.duration}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-1">{exp.role}</h3>
          <p className="text-accent text-sm font-display uppercase tracking-wider mb-4">{exp.org}</p>
          <p className="text-muted text-sm leading-relaxed mb-4">{exp.description}</p>
          <ul className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : ''}`}>
            {exp.points.map((point) => (
              <li
                key={point}
                className={`flex items-center gap-2 text-sm text-ink/80 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <Check size={14} className="text-accent shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Empty spacer for alternating layout */}
      <div className={`hidden md:block ${isEven ? 'md:order-2' : 'md:order-1 md:col-start-1 md:row-start-1'}`} />
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 section-padding overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-radial-glow opacity-30 pointer-events-none" />

      <SectionHeading
        eyebrow="Experience"
        title="My Journey So Far"
        align="center"
        description="From self-taught beginnings to leading a production department — every project has shaped how I tell stories."
      />

      <div className="mt-16 max-w-4xl mx-auto">
        {experienceData.map((exp, i) => (
          <TimelineItem
            key={exp.id}
            exp={exp}
            index={i}
            isLast={i === experienceData.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
