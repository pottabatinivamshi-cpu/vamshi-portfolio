import { credits, personal, software, stats } from '../data/content'
import SectionHead from './SectionHead'

const tilts = [-2, 1.5, -1.2, 2]

/** A credit styled as a ticket; the years run down the tear-off stub */
function Ticket({ credit, index }) {
  return (
    <li className="reveal" style={{ '--d': `${index * 0.1}s` }}>
      <div className="ticket-wrap" style={{ '--tilt': `${tilts[index % tilts.length]}deg` }}>
        <article className="ticket">
          <div className="ticket-main">
            <p className="ticket-role">{credit.role}</p>
            <p className="ticket-org">{credit.org}</p>
          </div>
          <div className="ticket-stub">
            <span className="ticket-year">{credit.years}</span>
          </div>
        </article>
      </div>
    </li>
  )
}

export default function About() {
  return (
    <section id="about" className="section-x relative py-24 md:py-32">
      <SectionHead label="About" title="Behind the Cut" />

      <p className="reveal mt-12 max-w-4xl text-2xl font-medium leading-snug text-ink md:text-4xl">
        {personal.statement.split('engaging stories')[0]}
        <span className="text-accent">engaging stories</span>
        {personal.statement.split('engaging stories')[1]}
      </p>

      <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-2">
        <div className="reveal flex gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl text-ink md:text-6xl">{s.value}</p>
              <p className="label mt-2 text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ '--d': '0.08s' }}>
          <h3 className="label text-muted">Software</h3>
          <ul className="mt-4 space-y-2">
            {software.map((name) => (
              <li key={name} className="text-lg text-ink">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="label reveal text-muted">Credits</h3>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {credits.map((c, i) => (
            <Ticket key={c.role} credit={c} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
