// import { motion } from 'framer-motion'
// import {
//   Youtube, Smartphone, Sparkles, Clapperboard, Share2, Palette, ArrowRight,
// } from 'lucide-react'
// import SectionHeading from './SectionHeading'
// import { servicesData } from '../data/content'

// const iconMap = {
//   Youtube, Smartphone, Sparkles, Clapperboard, Share2, Palette,
// }

// export default function Services() {
//   return (
//     <section id="services" className="relative py-28 md:py-36 section-padding overflow-hidden">
//       <SectionHeading
//         eyebrow="Services"
//         title="What I Can Do For Your Brand"
//         description="From raw footage to polished, platform-ready content — full-spectrum video editing and motion design services."
//       />

//       <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {servicesData.map((service, i) => {
//           const Icon = iconMap[service.icon] || Sparkles
//           return (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
//               whileHover={{ y: -6 }}
//               className="group relative p-8 rounded-3xl glass overflow-hidden transition-all duration-500 hover:border-accent/40"
//             >
//               {/* Number watermark */}
//               <span className="absolute -top-4 -right-2 font-display text-7xl font-extrabold text-white/[0.03] group-hover:text-accent/10 transition-colors duration-500 select-none">
//                 {String(i + 1).padStart(2, '0')}
//               </span>

//               {/* Icon */}
//               <div className="relative z-10 w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
//                 <Icon size={24} className="text-accent group-hover:text-base transition-colors duration-500" />
//               </div>

//               <h3 className="relative z-10 font-display text-xl font-semibold text-ink mb-3">
//                 {service.title}
//               </h3>
//               <p className="relative z-10 text-sm text-muted leading-relaxed mb-6">
//                 {service.description}
//               </p>

//               {/* <div className="relative z-10 flex items-center gap-2 text-accent font-display text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                 Learn More
//                 <ArrowRight size={14} /> */}
//               {/* </div> */}

//               {/* Glow on hover */}
//               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-3xl transition-all duration-700" />
//             </motion.div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Smartphone, Sparkles, Share2, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { servicesData } from '../data/content'

const iconMap = { Youtube, Smartphone, Sparkles, Share2 }

// Corner bracket decoration — exactly like the reference
function CornerBrackets() {
  return (
    <>
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-5 h-5 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-accent" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-accent" />
      </div>
      {/* Top-right */}
      <div className="absolute top-0 right-0 w-5 h-5 z-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-accent" />
        <div className="absolute top-0 right-0 w-[2px] h-full bg-accent" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0 w-5 h-5 z-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
        <div className="absolute bottom-0 left-0 w-[2px] h-full bg-accent" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0 w-5 h-5 z-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-accent" />
        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-accent" />
      </div>
    </>
  )
}

// Unique background visual for each card — fills the top area
function CardVisual({ icon: Icon, index }) {
  const bgColors = [
    'from-orange-950/60 to-zinc-900',
    'from-violet-950/60 to-zinc-900',
    'from-cyan-950/60 to-zinc-900',
    'from-rose-950/60 to-zinc-900',
  ]

  return (
    <div
      className={`relative w-full h-48 bg-gradient-to-br ${bgColors[index % bgColors.length]} flex items-center justify-center overflow-hidden`}
    >
      {/* Large faded icon watermark */}
      <Icon
        size={120}
        className="absolute opacity-5 text-white scale-125"
        strokeWidth={0.5}
      />

      {/* Floating card UI mockup */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Main icon card */}
        <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_#FF6B0030]">
          <Icon size={30} className="text-accent" />
        </div>

        {/* Decorative mini UI bars below icon — like the card mockups in reference */}
        <div className="flex flex-col gap-1.5 w-28">
          <div className="h-[3px] rounded-full bg-white/10 w-full" />
          <div className="h-[3px] rounded-full bg-accent/30 w-3/4" />
          <div className="h-[3px] rounded-full bg-white/10 w-1/2" />
        </div>
      </div>

      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  )
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[service.icon] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 bg-surface group cursor-pointer"
    >
      <CornerBrackets />

      {/* Top visual area */}
      <CardVisual icon={Icon} index={index} />

      {/* Bottom info area */}
      <div className="relative p-5 flex items-end justify-between gap-4">
        <div>
          {/* Number label */}
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-accent mb-1">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="font-display text-lg font-bold text-ink leading-tight mb-1">
            {service.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* + button — exactly like reference */}
        {/* <motion.div
          animate={hovered ? { rotate: 90, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-9 h-9 rounded-lg border border-white/20 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-colors duration-300"
        >
          <Plus size={18} className="text-muted group-hover:text-accent transition-colors duration-300" />
        </motion.div> */}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 overflow-hidden px-8 md:px-16 xl:px-24">
      <SectionHeading
        eyebrow="Services"
        title="What I Can Do For You"
        description="Raw · Refined · Released"
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {servicesData.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}