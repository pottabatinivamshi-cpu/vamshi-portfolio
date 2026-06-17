import { useScrollProgress } from '../hooks/useScrollProgress'

/**
 * Thin fixed progress bar at the top of the viewport showing scroll position
 */
export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[90] bg-transparent">
      <div
        className="h-full bg-accent shadow-[0_0_10px_#FF6B00] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
