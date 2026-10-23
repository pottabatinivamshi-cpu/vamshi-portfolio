import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { FORMSPREE_URL, personal, projectTypes } from '../data/content'
import SectionHead from './SectionHead'

const empty = { name: '', email: '', projectType: projectTypes[0], message: '' }

function Field({ label, children }) {
  return (
    <label className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-start sm:gap-4">
      <span className="label pt-3 text-muted">{label}</span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-md border border-line bg-night px-3 py-2.5 text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none disabled:opacity-50'

/** Contact form styled as an editor's export / render panel */
export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | rendering | done | error
  const [progress, setProgress] = useState(0)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (status === 'done' || status === 'error') setStatus('idle')
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('rendering')
    setProgress(0)
    // Ease toward 90% while the request is in flight
    timer.current = setInterval(() => setProgress((p) => p + (90 - p) * 0.12), 80)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      clearInterval(timer.current)
      if (!res.ok) throw new Error(String(res.status))
      setProgress(100)
      setStatus('done')
      setForm(empty)
    } catch {
      clearInterval(timer.current)
      setStatus('error')
    }
  }

  const busy = status === 'rendering'
  return (
    <section id="contact" className="section-x relative py-24 md:py-32">
      <SectionHead label="Contact" title="Export Your Project" note="Fill in the settings · hit render" />

      <form
        onSubmit={submit}
        className="reveal mt-12 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-line bg-surface2 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-wave shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-wave shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-wave shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          </div>
          <p className="label text-[10px] text-muted">Export Settings</p>
          <span className="w-10" />
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr]">
          <fieldset disabled={busy} className="space-y-5 p-5 md:p-8">
            <Field label="Format">
              <select name="projectType" value={form.projectType} onChange={update} className={inputCls}>
                {projectTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Your name">
              <input name="name" required value={form.name} onChange={update} placeholder="Jane Doe" className={inputCls} autoComplete="name" />
            </Field>
            <Field label="Email">
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                className={inputCls}
                autoComplete="email"
              />
            </Field>
            <Field label="Brief">
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update}
                placeholder="Footage, length, deadline, references…"
                className={`${inputCls} resize-none`}
              />
            </Field>
          </fieldset>

          {/* Direct links */}
          <aside className="flex flex-col gap-6 border-t border-line bg-night/40 p-5 md:p-8 lg:border-l lg:border-t-0">
            <div>
              <p className="label text-muted">Or send directly</p>
              <div className="mt-3 flex flex-col gap-2">
                {[
                  ['Email', `mailto:${personal.email}`, personal.email],
                  ['WhatsApp', personal.whatsapp],
                  ['LinkedIn', personal.linkedin],
                ].map(([label, href, detail]) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    <span className="min-w-0">
                      {label}
                      {detail && <span className="block truncate font-mono text-[11px] text-muted">{detail}</span>}
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Render bar */}
        <div className="flex flex-col gap-4 border-t border-line bg-surface2 px-5 py-4 md:flex-row md:items-center md:px-8">
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-[width] duration-200 ${status === 'error' ? 'bg-red-500' : status === 'done' ? 'bg-wave' : 'bg-accent'}`}
                style={{ width: `${status === 'idle' ? 0 : status === 'error' ? 100 : progress}%` }}
              />
            </div>
            <p className="label mt-2 text-[10px] text-muted" aria-live="polite">
              {status === 'idle' && 'Ready to render'}
              {status === 'rendering' && `Rendering… ${Math.round(progress)}%`}
              {status === 'done' && "Render complete — I'll reply within 24 hours."}
              {status === 'error' && `Render failed — try again, or email ${personal.email}.`}
            </p>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="label inline-flex items-center justify-center gap-2 rounded-md bg-accent px-8 py-3.5 font-medium text-[#080808] transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === 'done' ? (
              <>
                <Check size={15} /> Sent
              </>
            ) : busy ? (
              'Rendering…'
            ) : (
              <>
                Render <ArrowRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
