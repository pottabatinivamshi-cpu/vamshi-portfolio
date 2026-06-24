import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Instagram, Linkedin, Send, ArrowUpRight, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { personal } from '../data/content'

// ✅ PASTE YOUR FORMSPREE ENDPOINT HERE
const FORMSPREE_URL = 'https://formspree.io/f/mykqknzy'

const contactLinks = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    value: 'Chat with me',
    href: personal.whatsapp,
    icon: MessageCircle,
  },
  // {
  //   label: 'Instagram',
  //   value: '@vamshi.edits',
  //   href: personal.instagram,
  //   icon: Instagram,
  // },
  {
    label: 'LinkedIn',
    value: 'Vamshi Pottabatini',
    href: personal.linkedin,
    icon: Linkedin,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // Reset back to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <section id="contact" className="relative py-28 md:py-36 section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <SectionHeading
        eyebrow="Contact"
        title="Let's Create Something Great Together"
        description="Have a project in mind? Reach out and let's talk about how we can bring your vision to life."
      />

      <div className="mt-14 grid lg:grid-cols-12 gap-8">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="lg:col-span-7 p-6 md:p-10 rounded-3xl glass flex flex-col gap-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-display uppercase tracking-wider text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isLoading || isSuccess}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-transparent border border-white/10 rounded-xl px-4 py-3 text-ink placeholder:text-white/30 focus:border-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-display uppercase tracking-wider text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading || isSuccess}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-transparent border border-white/10 rounded-xl px-4 py-3 text-ink placeholder:text-white/30 focus:border-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-display uppercase tracking-wider text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              disabled={isLoading || isSuccess}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="bg-transparent border border-white/10 rounded-xl px-4 py-3 text-ink placeholder:text-white/30 focus:border-accent transition-colors duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Success message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
            >
              <CheckCircle size={18} />
              <p className="text-sm font-display">Message sent! I'll get back to you soon.</p>
            </motion.div>
          )}

          {/* Error message */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
            >
              <AlertCircle size={18} />
              <p className="text-sm font-display">Something went wrong. Please try again or email me directly.</p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading || isSuccess}
            whileHover={!isLoading && !isSuccess ? { scale: 1.02 } : {}}
            whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-base font-display font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_30px_#FF6B0060] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && (
              <>
                <Loader size={16} className="animate-spin" />
                Sending...
              </>
            )}
            {isSuccess && (
              <>
                <CheckCircle size={16} />
                Message Sent!
              </>
            )}
            {(status === 'idle' || isError) && (
              <>
                Send Message
                <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Contact links */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              className="group flex items-center justify-between p-5 md:p-6 rounded-2xl glass hover:border-accent/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <link.icon size={20} className="text-accent group-hover:text-base transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">{link.label}</p>
                  <p className="font-display font-medium text-ink">{link.value}</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-muted group-hover:text-accent transition-colors duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}