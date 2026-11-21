import { useEffect, useState } from "react"

// Root font scale relative to Semantic's 14px base: 1 on small screens,
// 1.33 on desktop (see the "Scaling" rule in src/overrides.css). The chart
// islands size their SVGs in px; multiplying by this keeps them in step with
// the scaled text, as the old `html { zoom: 1.33 }` did.
// Starts at 1 so the server render and hydration match, then updates.
export function useRootScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const read = () => setScale(parseFloat(getComputedStyle(document.documentElement).fontSize) / 14 || 1)
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])
  return scale
}
