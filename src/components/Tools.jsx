import { motion } from 'framer-motion'
import { Wand2, SlidersHorizontal, Scissors } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { toolsData } from '../data/content'

const iconMap = { Wand2, SlidersHorizontal, Scissors }

export default function Tools() {
  return (
    <section className="relative py-28 md:py-36 section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none" />

      <SectionHeading
        eyebrow="Toolkit"
        title="Software I Work With"
        align="center"
        description="Industry-standard tools to bring every project to life, from rough cut to final color."
      />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {toolsData.map((tool, i) => {
          const Icon = iconMap[tool.icon] || Wand2
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="relative p-10 rounded-3xl glass text-center group overflow-hidden"
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:bg-accent transition-all duration-500">
                  <Icon size={28} className="text-accent group-hover:text-base transition-colors duration-500" />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold text-ink mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{tool.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
