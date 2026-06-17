import { motion } from 'framer-motion'
import {
  Youtube, Smartphone, Sparkles, Clapperboard, Share2, Palette, ArrowRight,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { servicesData } from '../data/content'

const iconMap = {
  Youtube, Smartphone, Sparkles, Clapperboard, Share2, Palette,
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 section-padding overflow-hidden">
      <SectionHeading
        eyebrow="Services"
        title="What I Can Do For Your Brand"
        description="From raw footage to polished, platform-ready content — full-spectrum video editing and motion design services."
      />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, i) => {
          const Icon = iconMap[service.icon] || Sparkles
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-3xl glass overflow-hidden transition-all duration-500 hover:border-accent/40"
            >
              {/* Number watermark */}
              <span className="absolute -top-4 -right-2 font-display text-7xl font-extrabold text-white/[0.03] group-hover:text-accent/10 transition-colors duration-500 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <Icon size={24} className="text-accent group-hover:text-base transition-colors duration-500" />
              </div>

              <h3 className="relative z-10 font-display text-xl font-semibold text-ink mb-3">
                {service.title}
              </h3>
              <p className="relative z-10 text-sm text-muted leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="relative z-10 flex items-center gap-2 text-accent font-display text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn More
                <ArrowRight size={14} />
              </div>

              {/* Glow on hover */}
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-3xl transition-all duration-700" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
