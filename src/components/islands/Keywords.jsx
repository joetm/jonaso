import React, { useEffect, useRef, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
// import md5 from "md5"

import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/icon.min.css'

// Keyword drill-down island. Level 1 comes prefiltered at build time via
// the `initial` prop (was fetched on mount); deeper levels are still
// fetched on demand when a bar is clicked.

const BARHEIGHT = 38
// width of the keyword labels column; the bars (and the breadcrumb) start after it
const LABELS_WIDTH = 275
const CHART_MARGIN = 5 // recharts' default chart margin
export const CUTOFF = 19
const CUTOFF_SUBLEVEL = 0
const colorDefault = '#eb008c'
const colorZoomed = '#FF86A6'
const colorHighlighted = '#6b003f'


export default function Keywords({ initial = [] }) {
  // const [activeTooltipIndex, setActiveTooltipIndex] = useState(false)
  const [activeLevel, setActiveLevel] = useState(1)
  const [data, setData] = useState({
    1: {data: initial, label: null},
    2: {data: [], label: null},
    3: {data: [], label: null},
  })
  // interest highlighted in the timeline line chart (LTInterests island)
  const [highlighted, setHighlighted] = useState(null)
  // bar under the mouse
  const [hovered, setHovered] = useState(null)
  const mouse = useRef(null)
  const chartBox = useRef(null)

  // After a zoom, new bars appear under a mouse that hasn't moved, so no
  // mouseenter fires: once they have animated in, check what's under the
  // last known mouse position.
  function hoverUnderMouse() {
    if (!mouse.current || !chartBox.current) return
    // by geometry, since the value labels sit on top of the bars
    const {x, y} = mouse.current
    const rects = [...chartBox.current.querySelectorAll('.recharts-bar-rectangle')]
    const i = rects.findIndex(r => {
      const b = r.getBoundingClientRect()
      return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
    })
    const kw = displaydata['data'][i]
    setHovered(kw ? kw.name : null)
  }
  useEffect(() => {
    const onHighlight = e => setHighlighted(e.detail)
    window.addEventListener('interest-highlight', onHighlight)
    return () => window.removeEventListener('interest-highlight', onHighlight)
  }, [])

  function zoomOut() {
    setHovered(null)
    // console.log('zoomout')
    const newlevel = (activeLevel - 1) > 1 ? activeLevel - 1 : 1
    setActiveLevel(newlevel)
  }

  function zoomIn(bar) {
    console.log('Loading:', bar.name)
    let qid = bar.id
    // if (activeLevel === 2) {
    //   console.log(data[1].label + "-" + bar.name)
    //   qid = md5(data[1].label + "-" + bar.name)
    // }
    const URL = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/level${activeLevel+1}/${qid}.json`
    console.log(URL)
    fetch(URL).then(res => res.json())
      .then(lvldata => {
        const newlevel = activeLevel + 1
        const newdata = { ...data }
        newdata[newlevel]['data'] = lvldata.filter(kw => kw.num > CUTOFF_SUBLEVEL)
        newdata[newlevel]['label'] = bar.name
        setHovered(null)
        setData(newdata)
        setActiveLevel(newlevel)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
      })
  }

  const isZoomed = activeLevel > 1
  // the deepest level can't be drilled into
  const isClickable = activeLevel < 3
  const displaydata = data[activeLevel]
  const color = isZoomed ? colorZoomed : colorDefault

  if (!displaydata) {
    return null
  }

  const displayheight = displaydata['data'].length * BARHEIGHT

  return (
    <div className="ui container">
      {/* back button in normal flow (a floated, zero-height row gets overlapped
          by the recharts wrapper, which then swallows the clicks) */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '2em', marginBottom: '.5em', fontSize: 'initial', visibility: isZoomed ? 'visible' : 'hidden'}}>
          <div style={{paddingLeft: LABELS_WIDTH + CHART_MARGIN}}>
              {
                activeLevel > 2 &&
                  <span>{data[activeLevel-1]['label']} &gt; </span>
              }
              <span>{displaydata['label']}</span>
          </div>
          <i aria-hidden="true" title="Back" onClick={zoomOut} style={{cursor: 'pointer'}} className="left circular arrow icon clickable"></i>
      </div>
      <div ref={chartBox} onMouseMove={e => { mouse.current = {x: e.clientX, y: e.clientY} }}>
        <ResponsiveContainer width="100%" height={displayheight}>
              <BarChart
                layout="vertical"
                data={displaydata['data']}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="num" />
                  <YAxis type="category" dataKey="name" width={LABELS_WIDTH} style={{fontSize: '.9rem'}} />
                  <Bar
                    dataKey="num"
                    fill={color}
                    className={isClickable ? "clickable" : ""}
                    onClick={ (e) => {if (isClickable) { zoomIn(e) }} }
                    onMouseEnter={ (e) => setHovered(e.name) }
                    onMouseLeave={ () => setHovered(null) }
                    onAnimationEnd={hoverUnderMouse}
                  >
                    {
                      displaydata['data'].map(kw => (
                        <Cell key={kw.name} fill={(isClickable && kw.name === hovered) || (!isZoomed && kw.name === highlighted) ? colorHighlighted : color} />
                      ))
                    }
                    <LabelList
                      dataKey="num"
                      position="insideRight"
                      style={{ fontSize: '80%', fill: '#ffffff' }}
                    />
                  </Bar>
              </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
