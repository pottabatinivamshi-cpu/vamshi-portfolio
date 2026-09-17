// import { useState, useMemo } from 'react'
// import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
// import { Play, ArrowUpRight } from 'lucide-react'
// import SectionHeading from './SectionHeading'
// import VideoModal from './VideoModal'
// import { portfolioCategories, portfolioProjects } from '../data/content'

// function ProjectCard({ project, index, onPlay }) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
//       whileHover={{ y: -8 }}
//       onClick={() => onPlay(project)}
//       className="group relative rounded-2xl overflow-hidden glass cursor-pointer"
//     >
//       {/* Thumbnail */}
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <img
//           src={project.thumbnail}
//           alt={project.title}
//           loading="lazy"
//           className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//         />
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

//         {/* Play button overlay */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             whileHover={{ scale: 1 }}
//             className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center w-16 h-16 rounded-full bg-accent/90 backdrop-blur-sm shadow-[0_0_30px_#FF6B0080]"
//           >
//             <Play size={22} className="fill-base text-base ml-0.5" />
//           </motion.div>
//         </div>

//         {/* Category badge */}
//         <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-strong text-[10px] md:text-xs font-display uppercase tracking-wider text-ink">
//           {project.category}
//         </span>

//         {/* External link icon */}
//         <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
//           <ArrowUpRight size={16} className="text-ink" />
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-5 md:p-6">
//         <h3 className="font-display text-lg md:text-xl font-semibold text-ink mb-2 group-hover:text-accent transition-colors duration-300">
//           {project.title}
//         </h3>
//         <p className="text-sm text-muted leading-relaxed">{project.description}</p>
//       </div>
//     </motion.div>
//   )
// }

// export default function Portfolio() {
//   const [activeCategory, setActiveCategory] = useState('All')
//   const [activeVideo, setActiveVideo] = useState(null)

//   const filteredProjects = useMemo(() => {
//     if (activeCategory === 'All') return portfolioProjects
//     return portfolioProjects.filter((p) => p.category === activeCategory)
//   }, [activeCategory])

//   return (
//     <section id="portfolio" className="relative py-28 md:py-36 section-padding overflow-hidden">
//       <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-radial-glow opacity-30 pointer-events-none" />

//       <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
//         <SectionHeading
//           eyebrow="Portfolio"
//           title="Selected Work & Featured Projects"
//           description="A curated showcase across YouTube content, social media, motion graphics, and cinematic edits."
//         />
//       </div>

//       {/* Category filters */}
//       <LayoutGroup>
//         <div className="flex flex-wrap gap-3 mb-12">
//           {portfolioCategories.map((cat) => {
//             const isActive = activeCategory === cat
//             return (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`relative px-5 py-2.5 rounded-full font-display text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 ${
//                   isActive ? 'text-base' : 'text-muted hover:text-ink'
//                 }`}
//               >
//                 {isActive && (
//                   <motion.span
//                     layoutId="activeCategoryPill"
//                     className="absolute inset-0 rounded-full bg-accent"
//                     transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
//                   />
//                 )}
//                 {!isActive && (
//                   <span className="absolute inset-0 rounded-full border border-white/10" />
//                 )}
//                 <span className="relative z-10">{cat}</span>
//               </button>
//             )
//           })}
//         </div>
//       </LayoutGroup>

//       {/* Grid */}
//       <motion.div
//         layout
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//       >
//         <AnimatePresence mode="popLayout">
//           {filteredProjects.map((project, i) => (
//             <ProjectCard key={project.id} project={project} index={i} onPlay={setActiveVideo} />
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* Video modal */}
//       {activeVideo && (
//         <VideoModal
//           videoId={activeVideo.videoId}
//           title={activeVideo.title}
//           onClose={() => setActiveVideo(null)}
//         />
//       )}
//     </section>
//   )
// }

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import SectionHeading from './SectionHeading'
import VideoModal from './VideoModal'
import { portfolioProjects } from '../data/content'

function BentoCard({ project, className, style }) {
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative rounded-2xl overflow-hidden cursor-pointer bg-surface ${className}`}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {/* Thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Autoplay on hover */}
        {hovered && (
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&mute=1&loop=1&playlist=${project.videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            title={project.title}
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

        {/* Play button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_30px_#FF6B0080]"
          >
            <Play size={20} className="fill-white text-white ml-0.5" />
          </motion.div>
        </div>

        {/* Tag + Title */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <span className="inline-block px-2 py-1 rounded text-[10px] uppercase tracking-widest font-display border border-accent/60 text-accent bg-black/40 mb-2">
            {project.category}
          </span>
          <p className="font-display font-semibold text-white text-sm leading-tight">
            {project.title}
          </p>
        </div>
      </motion.div>

      {modalOpen && (
        <VideoModal
          videoId={project.videoId}
          title={project.title}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default function Portfolio() {
  const p = portfolioProjects

  return (
    <section id="portfolio" className="relative py-28 md:py-36 section-padding overflow-hidden">
      <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-radial-glow opacity-30 pointer-events-none" />

      <SectionHeading
        eyebrow="Portfolio"
        title="Featured Projects"
        description="Hover to preview. Click to watch."
      />

      {/* Bento Grid
          Layout (3 cols):
          ┌──────────┬──────────┬──────────┐  ← row 1: 300px
          │  H: [0]  │  H: [1]  │          │
          ├──────────┼──────────┤  V: [2]  │  ← row 2: 300px
          │  V: [3]  │  H: [4]  │          │
          ├──────────┼──────────┴──────────┤  ← row 3: 300px
          │  V: [5]  │   H (wide): [6]     │
          └──────────┴─────────────────────┘
      */}
      <div
        className="mt-14 w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '220px 220px 220px',
          gap: '12px',
        }}
      >
        {/* [0] Viram Shah — Horizontal, R1 C1 */}
        <BentoCard
          project={p[0]}
          style={{ gridColumn: '1', gridRow: '1' }}
          className="w-full h-full"
        />

        {/* [1] Maahi Artist — Horizontal, R1 C2 */}
        <BentoCard
          project={p[1]}
          style={{ gridColumn: '2', gridRow: '1' }}
          className="w-full h-full"
        />

        {/* [2] E-Summit — Vertical tall, C3 R1+R2 */}
        <BentoCard
          project={p[2]}
          style={{ gridColumn: '3', gridRow: '1 / span 2' }}
          className="w-full h-full"
        />

        {/* [3] Team Reveal — Vertical, R2 C1 */}
        <BentoCard
          project={p[3]}
          style={{ gridColumn: '1', gridRow: '2' }}
          className="w-full h-full"
        />

        {/* [4] Rush Hour — Horizontal, R2 C2 */}
        <BentoCard
          project={p[4]}
          style={{ gridColumn: '2', gridRow: '2' }}
          className="w-full h-full"
        />

        {/* [5] Student Startup — Vertical, R3 C1 */}
        <BentoCard
          project={p[5]}
          style={{ gridColumn: '1', gridRow: '3' }}
          className="w-full h-full"
        />

        {/* [6] Animated Logo — Wide horizontal, R3 C2+C3 */}
        <BentoCard
          project={p[6]}
          style={{ gridColumn: '2 / span 2', gridRow: '3' }}
          className="w-full h-full"
        />
      </div>
    </section>
  )
}

