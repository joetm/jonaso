import { useMemo, useRef, useState } from "react"

// Recharts' own animation interpolates point/bar positions, so any re-layout
// (ResponsiveContainer measuring its width, a scrollbar appearing) slides
// lines and bars sideways. Instead, recharts animation stays off and the
// values themselves grow from 0 to their real size once, frame by frame,
// so only heights ever change.
export function useGrowIn(data, keys, duration = 1000) {
  const [progress, setProgress] = useState(0)
  const started = useRef(false)

  const grownData = useMemo(() => progress >= 1 ? data : data.map(o => {
    const scaled = { ...o }
    for (const k of keys) if (o[k] != null) scaled[k] = o[k] * progress
    return scaled
  }), [data, progress])

  // fixed y maximum, so the axis doesn't rescale while values grow
  const yMax = useMemo(() => Math.max(0, ...data.flatMap(o => keys.map(k => Number(o[k]) || 0))), [data])

  return {
    data: grownData,
    yMax,
    done: progress >= 1,
    // the chart mounts only once ResponsiveContainer knows its size
    chartRef: node => {
      if (!node || started.current) return
      started.current = true
      const t0 = performance.now()
      const step = now => {
        const p = Math.min(1, (now - t0) / duration)
        setProgress(1 - Math.pow(1 - p, 3)) // ease-out
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    },
  }
}
