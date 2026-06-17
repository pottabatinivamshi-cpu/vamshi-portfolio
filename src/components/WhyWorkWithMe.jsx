import { motion } from 'framer-motion'
import {
  BookOpen, TrendingUp, Zap, Eye, MessageCircle, Users,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { whyWorkData } from '../data/content'

const iconMap = { BookOpen, TrendingUp, Zap, Eye, MessageCircle, Users }

export default function WhyWorkWithMe() {
  return (
    <section className="relative py-28 md:py-36 section-padding overflow-hidden">
      <SectionHeading
        eyebrow="Why Work With Me"
        title="What Sets My Work Apart"
        description="Beyond technical skill, I bring leadership, communication, and a deep understanding of audience behavior to every project."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-white/10">
        {whyWorkData.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Zap
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative p-8 md:p-10 bg-surface/40 hover:bg-surface2 transition-colors duration-500 flex flex-col gap-4"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-300"
              >
                <Icon size={20} className="text-accent group-hover:text-base transition-colors duration-300" />
              </motion.div>
              <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>

              {/* Corner accent on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-accent/0 group-hover:border-r-accent/20 transition-all duration-500" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
