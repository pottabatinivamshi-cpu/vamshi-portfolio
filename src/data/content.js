// Centralized content data for the portfolio
// Edit this file to update text, links, and project info across the site

export const personal = {
  name: 'Vamshi Pottabatini',
  firstName: 'Vamshi',
  title: 'Video Editor, Motion Graphics Designer & Production Lead',
  tagline: 'Transforming Raw Footage Into Engaging Stories',
  shortDescription:
    "I help creators, brands, and organizations increase engagement through professional video editing, motion graphics, and cinematic storytelling.",
  email: 'pottabatinivamshi@gmail.com',
  whatsapp: 'https://wa.me/9372534404',
  // instagram: 'https://instagram.com/vamshi.edits',
  linkedin: 'https://www.linkedin.com/in/vamshi-pottabatini-472a51312',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const aboutData = {
  heading: "I turn footage into films, and moments into movements.",
  bio: [
    "I'm a video editor and motion graphics designer with a passion for cinematic storytelling. Over the past few years, I've worked across YouTube content, social media reels, brand promos, and live event coverage — always with one goal: make people feel something in the first three seconds.",
    "As a Content Production Lead, I don't just edit — I think in narratives, pacing, and audience retention. Whether it's a fast-cut Instagram reel or a slow cinematic brand film, every frame is intentional.",
  ],
  roles: [
    'Video Editor',
    'Motion Graphics Designer',
    'Creative Storyteller',
    'Content Production Lead',
  ],
  specializations: [
    { title: 'YouTube Video Editing', desc: 'Long-form storytelling with strong pacing and retention hooks.' },
    { title: 'Reels & Shorts Editing', desc: 'High-energy, trend-aware vertical content built for engagement.' },
    { title: 'Motion Graphics', desc: 'Custom animated graphics, titles, and visual effects.' },
    { title: 'Cinematic Editing', desc: 'Color-graded, emotionally driven narrative edits.' },
    { title: 'Social Media Content', desc: 'Platform-optimized content for Instagram, YouTube & more.' },
  ],
  stats: [
    { label: 'Projects Delivered', value: 20, suffix: '+' },
    { label: 'Hours of Footage Edited', value: 100, suffix: '+' },
    // { label: 'Happy Clients', value: 30, suffix: '+' },
    // { label: 'Years of Experience', value: 3, suffix: '+' }, 
  ],
}

export const experienceData = [
  {
    id: 1,
    role: 'HOD – Production',
    org: 'DJSCE E-Cell',
    duration: '2025 – Present',
    description:
      'Leading the Production Department for the Entrepreneurship Cell, overseeing all video content for flagship events and campaigns.',
    points: [
      'Leading the Production Department',
      'Managing content production workflows',
      'Creating promotional and event videos',
      'Coordinating with marketing and design teams',
      'Mentoring creative team members',
      'Ensuring professional production quality',
    ],
  },
  // {
  //   id: 2,
  //   role: 'Freelance Video Editor',
  //   org: 'Independent / Multiple Clients',
  //   duration: '2023 – 2025',
  //   description:
  //     'Worked with creators and small businesses to produce YouTube content, reels, and motion graphics packages tailored to brand identity.',
  //   points: [
  //     'Delivered 80+ edited videos across niches',
  //     'Built repeatable editing templates for clients',
  //     'Collaborated remotely with creators worldwide',
  //     'Maintained consistent fast turnaround times',
  //   ],
  // },
  // {
  //   id: 3,
  //   role: 'Motion Design Enthusiast',
  //   org: 'Self-Taught Journey',
  //   duration: '2022 – 2023',
  //   description:
  //     'Began the journey into motion graphics and editing, mastering After Effects and DaVinci Resolve through hands-on projects.',
  //   points: [
  //     'Learned After Effects, Premiere Pro & DaVinci Resolve',
  //     'Created first short films and edited reels',
  //     'Built a foundation in color theory and pacing',
  //   ],
  // },
]

export const portfolioCategories = [
  'All',
  'YouTube Videos',
  'Reels & Shorts',
  'Motion Graphics',
  'Event Highlights',
  
]

export const portfolioProjects = [
  {
    id: 1,
    title: 'Viram Shah Podcast Intro',
    category: 'YouTube Videos',
    description: "Edited Viram Shah's podcast intro with seamless transitions, motion graphics, and clean visual effects to create a captivating and professional start to the episode.",
    thumbnail: 'https://img.youtube.com/vi/oiwF8YpoXxA/maxresdefault.jpg',
    videoId: 'oiwF8YpoXxA', // replace with your real YouTube video ID
  },
  {
    id: 2,
    title: 'Maahi Artist Reveal Video',
    category: 'Reels',
    description: 'Produced a high-energy artist reveal featuring creative editing, motion graphics, and suspense-driven pacing to maximize audience excitement and engagement.',
    thumbnail: 'https://img.youtube.com/vi/CyhcqWhcYTY/maxresdefault.jpg',
    videoId: 'CyhcqWhcYTY',
  },
  // {
  //   id: 3,
  //   title: 'Brand Logo Reveal Animation',
  //   category: 'Motion Graphics',
  //   description: 'Custom animated logo reveal with particle effects and kinetic typography.',
  //   thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
  //   videoId: 'dQw4w9WgXcQ',
  // },
  {
    id: 4,
    title: 'E-Summit 2026 Aftermovie',
    category: 'Event Highlights',
    description: 'Edited the E-Summit 2026 Event Highlights Reel, capturing key moments, speaker sessions, networking interactions, and audience engagement through dynamic editing and cinematic storytelling.',
    thumbnail: 'https://img.youtube.com/vi/i7236sNfWbY/maxresdefault.jpg',
    videoId: 'i7236sNfWbY',
  },
  {
    id: 5,
    title: 'DJSCE ECELL TEAM REVEAL',
    category: 'Hard Edits',
    description: 'Created an engaging team reveal edit with rapid-paced cuts, creative masking effects, smooth transitions, and color grading.',
    thumbnail: 'https://img.youtube.com/vi/pk3-_tdc0FU/maxresdefault.jpg',
    videoId: 'pk3-_tdc0FU',
  },
  {
    id: 6,
    title: 'Rush Hour 5.0 Event Highlights Reel',
    category: 'Reels',
    description: "Edited the Rush Hour 5.0 Event Highlights Reel, capturing the event's energy through dynamic pacing, seamless transitions, beat-synced cuts, and color grading.",
    thumbnail: 'https://img.youtube.com/vi/bK3cisJ6P0Q/maxresdefault.jpg',
    videoId: 'bK3cisJ6P0Q',
  },
  {
    id: 7,
    title: 'Student Startup Promo Video',
    category: 'YouTube Videos',
    description: 'Edited a startup trailer using transitions, text animations, and color grading to present the business idea in a clear and engaging way.',
    thumbnail: 'https://img.youtube.com/vi/V_pVwgQ0Ccc/maxresdefault.jpg',
    videoId: 'V_pVwgQ0Ccc',
  },
  {
    id: 8,
    title: 'Animated Logo Sequence',
    category: 'Motion Graphics',
    description: 'Created a dynamic E-Cell logo animation in After Effects using smooth motion design and professional animation principles.',
    thumbnail: 'https://img.youtube.com/vi/_EjCAGr4ViM/maxresdefault.jpg',
    videoId: '_EjCAGr4ViM',
  },
  // {
  //   id: 9,
  //   title: 'Cultural Fest Highlight Reel',
  //   category: 'Event Highlights',
  //   description: 'High-energy event highlight reel capturing performances, crowd reactions, and atmosphere.',
  //   thumbnail: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=80&w=1200&auto=format&fit=crop',
  //   videoId: 'dQw4w9WgXcQ',
  // },
]

export const servicesData = [
  {
    title: 'YouTube Video Editing',
    description: 'Engaging long-form edits with strong storytelling, pacing, and retention-focused structure.',
    icon: 'Youtube',
  },
  {
    title: 'Reels Editing',
    description: 'Scroll-stopping vertical content optimized for Instagram, YouTube Shorts, and TikTok.',
    icon: 'Smartphone',
  },
  {
    title: 'Motion Graphics & Visual Effects',
    description: 'Custom animations, kinetic typography, and VFX that elevate your content visually.',
    icon: 'Sparkles',
  },
  // {
  //   title: 'Cinematic Video Editing',
  //   description: 'Narrative-driven edits with film-like pacing, transitions, and emotional depth.',
  //   icon: 'Clapperboard',
  // },
  {
    title: 'Social Media Content Editing',
    description: 'Platform-optimized content tailored to algorithms, formats, and audience behavior.',
    icon: 'Share2',
  },
  // {
  //   title: 'Color Correction & Grading',
  //   description: 'Professional color work to give your footage a polished, consistent, cinematic look.',
  //   icon: 'Palette',
  // },
]

export const toolsData = [
  {
    name: 'Adobe After Effects',
    description: 'Industry-standard motion graphics and visual effects compositing.',
    icon: 'Wand2',
  },
  {
    name: 'DaVinci Resolve',
    description: 'Professional color grading, editing, and audio post-production.',
    icon: 'SlidersHorizontal',
  },
  {
    name: 'CapCut',
    description: 'Fast, trend-driven editing for short-form social content.',
    icon: 'Scissors',
  },
]

export const whyWorkData = [
  {
    title: 'Creative Storytelling',
    description: 'Every edit is built around a narrative — not just a sequence of clips.',
    icon: 'BookOpen',
  },
  {
    title: 'High-Retention Editing',
    description: 'Pacing and hooks designed to keep viewers watching until the end.',
    icon: 'TrendingUp',
  },
  {
    title: 'Fast Turnaround',
    description: 'Efficient workflows that deliver quality without compromising deadlines.',
    icon: 'Zap',
  },
  {
    title: 'Attention to Detail',
    description: 'Every frame, transition, and sound cue is reviewed and refined.',
    icon: 'Eye',
  },
  {
    title: 'Professional Communication',
    description: 'Clear, responsive collaboration from brief to final delivery.',
    icon: 'MessageCircle',
  },
  {
    title: 'Production Leadership',
    description: 'Experience leading creative teams and managing production pipelines.',
    icon: 'Users',
  },
]

// export const testimonialsData = [
//   {
//     name: 'Ananya Sharma',
//     role: 'YouTube Creator, Tech Niche',
//     quote:
//       "Vamshi completely transformed our channel's editing style. Retention went up noticeably and the motion graphics gave us a much more premium feel.",
//     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
//   },
//   {
//     name: 'Rohan Mehta',
//     role: 'Founder, D2C Brand',
//     quote:
//       "We needed reels that actually performed, and Vamshi delivered consistently. Fast turnarounds, great communication, and the edits just hit different.",
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
//   },
//   {
//     name: 'Priya Nair',
//     role: 'Event Coordinator, College Fest',
//     quote:
//       "The aftermovie Vamshi created captured the entire energy of our event perfectly. Everyone was asking who edited it — it looked like a professional production.",
//     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
//   },
//   {
//     name: 'Karan Verma',
//     role: 'Podcast Host',
//     quote:
//       "Working with Vamshi on our podcast clips was seamless. He understands what makes a moment shareable and turns raw recordings into scroll-stopping content.",
//     avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
//   },
// ]

export const footerLinks = {
  navigation: navLinks,
  socials: [
    // { label: 'Instagram', href: personal.instagram, icon: 'Instagram' },
    { label: 'LinkedIn', href: personal.linkedin, icon: 'Linkedin' },
    { label: 'WhatsApp', href: personal.whatsapp, icon: 'MessageCircle' },
    { label: 'Email', href: `mailto:${personal.email}`, icon: 'Mail' },
  ],
}
