import { useEffect } from 'react'

/**
 * Fades in every `.reveal` element once it scrolls into view, including ones rendered later
 * (e.g. the work grid re-flowing for a new breakpoint).
 * Elements stay visible without JS (the hidden state is scoped to `html.js`),
 * so the prerendered HTML is fully readable by crawlers.
 */
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    const observeAll = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))

    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
