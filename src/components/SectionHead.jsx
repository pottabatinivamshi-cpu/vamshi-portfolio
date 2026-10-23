export default function SectionHead({ label, title, note }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="label reveal flex items-center gap-3 text-accent">
          <span className="h-px w-8 bg-accent" />
          {label}
        </p>
        <h2 className="reveal mt-4 font-display text-clamp-h2 uppercase text-ink" style={{ '--d': '0.08s' }}>
          {title}
        </h2>
      </div>
      {note && (
        <p className="label reveal text-muted md:pb-2" style={{ '--d': '0.16s' }}>
          {note}
        </p>
      )}
    </div>
  )
}
