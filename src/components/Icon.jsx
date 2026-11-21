import React from "react"
import { ICONS, ICON_ASCENT, ICON_EM } from "./icons-data.js"

// Inline-SVG replacement for Semantic UI's <i class="... icon"> icon font.
// `name` uses the Semantic class names ("file pdf outline"); `className`
// takes the Semantic modifiers that src/styles/icons.css supports
// (large, big, huge, fitted, link, circular, grey, yellow).
// Icons are decorative (aria-hidden) unless a `label` is given.
// To add an icon, see scripts/build-icons.py.

function lookup(name) {
  const icon = ICONS[name]
  if (!icon) throw new Error(`Icon "${name}" missing, add it in scripts/build-icons.py`)
  return icon
}

const viewBox = w => `0 -${ICON_ASCENT} ${w} ${ICON_EM}`

export default function Icon({ name, className = '', label, ...rest }) {
  const { w, d } = lookup(name)
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' }
  return (
    <svg className={`icon ${className}`.trim()} viewBox={viewBox(w)} focusable="false" {...a11y} {...rest}>
      {label && <title>{label}</title>}
      <path d={d} />
    </svg>
  )
}

// Same markup as a string, for HTML that is built as strings
// (e.g. publication entries rendered with dangerouslySetInnerHTML).
export function iconSvg(name, className = '') {
  const { w, d } = lookup(name)
  return `<svg class="icon ${className}" viewBox="${viewBox(w)}" focusable="false" aria-hidden="true"><path d="${d}"/></svg>`
}
