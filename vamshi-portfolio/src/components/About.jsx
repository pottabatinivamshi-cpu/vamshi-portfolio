import { motion } from 'framer-motion'
import { Film, Sparkles, PenTool, Users } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { aboutData } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'

const roleIcons = {
  'Video Editor': Film,
  'Motion Graphics Designer': Sparkles,
  'Creative Storyteller': PenTool,
  'Content Production Lead': Users,
}

function StatCounter({ stat }) {
  const { ref, count } = useCountUp(stat.value, 1800)
  return (
    <div ref={ref} className="flex flex-col items-center md:items-start">
      <div className="font-display text-4xl md:text-5xl font-bold text-ink">
        {count}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted text-center md:text-left">{stat.label}</p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 section-padding overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-glow opacity-40 pointer-events-none" />

      <SectionHeading
        eyebrow="About Me"
        title={aboutData.heading}
      />

      <div className="mt-14 grid lg:grid-cols-12 gap-12 items-start">
        {/* Left: Bio + roles */}
        <div className="lg:col-span-7">
          {aboutData.bio.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-muted text-base md:text-lg leading-relaxed mb-5"
            >
              {para}
            </motion.p>
          ))}

          {/* Role tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            {aboutData.roles.map((role, i) => {
              const Icon = roleIcons[role] || Sparkles
              return (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm font-display"
                >
                  <Icon size={16} className="text-accent" />
                  {role}
                </motion.div>
              )
            })}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
            {aboutData.stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* Right: Specializations */}
        <div className="lg:col-span-5">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xl font-semibold mb-6 text-ink"
          >
            Specializations
          </motion.h3>
          <div className="flex flex-col gap-3">
            {aboutData.specializations.map((spec, i) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ x: 8 }}
                className="group relative p-5 rounded-2xl glass overflow-hidden transition-colors duration-300 hover:border-accent/40"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <h4 className="font-display font-semibold text-ink mb-1">{spec.title}</h4>
                <p className="text-sm text-muted">{spec.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
