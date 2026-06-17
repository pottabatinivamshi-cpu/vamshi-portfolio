import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animates a number from 0 to `target` when the element enters the viewport
 */
export function useCountUp(target, duration = 2000) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    let animationFrame

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, target, duration])

  return { ref, count }
}
