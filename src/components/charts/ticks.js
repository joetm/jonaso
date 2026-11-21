// Gridline values for a count axis: 0..top in a "nice" integer step,
// at most `maxSteps` steps. Returns { yMax, yTicks }.
export function countTicks(max, maxSteps = 4) {
  const step = [1, 2, 3, 4, 5, 10, 20, 25, 50, 100].find(s => Math.ceil(max / s) <= maxSteps)
    ?? Math.ceil(max / maxSteps)
  const yMax = Math.max(step, Math.ceil(max / step) * step)
  const yTicks = []
  for (let t = 0; t <= yMax; t += step) yTicks.push(t)
  return { yMax, yTicks }
}
