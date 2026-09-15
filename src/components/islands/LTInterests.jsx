import React, { useState } from "react"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Long-term interests timeline island. Receives its data at build time
// (was a client-side fetch of topkeyword-timeline.json); the legend/line
// hover highlighting keeps it an island.

const HEIGHT = 350
// const colorDefault = '#eb008c'
// const colorZoomed = '#FF86A6'
const lines = {
  colors: {
    'a': '#101010', // black
    'b': '#009E73', // green
    'c': '#56B4E9', // light blue
    'd': '#F0E442', // yellow
    'e': '#EB008C', // pink
    'f': '#1010FF', // dark blue
    'g': '#D55E00', // orange
    'h': '#eb008c',
    // CC79A7
    // D55E00
  },
  dashing: {
    'a': null,
    'b': '',
    'c': '',
    'd': '',
    'e': '',
    'f': '', // 4 1 2
    'g': '1',
    'h': '1',
  },
}

export default function LTInterests({ graphdata }) {
  const defaultStrokes = {
    'a': 3,
    'b': 3,
    'c': 3,
    'd': 2,
    'e': 2,
    'f': 2,
    'g': 2,
  }
  const [ highlighted, setHighlighted ] = useState(null)

  function formatXAxis(t) {
    const d = new Date(t * 1000)
    return `${d.getFullYear()}-${d.getMonth()}`
  }

  function handleLegendMouseOver(e) {
    setHighlighted(e.value)
  }
  function handleLegendMouseOut() {
    setHighlighted(null)
  }
  function highlightLine(e) {
    setHighlighted(e.id)
  }
  function unselectLine() {
    setHighlighted(null)
  }

  return (
    <div style={{padding: '1rem 0 2rem 0'}}>
      <ResponsiveContainer width="100%" height={HEIGHT}>
        <LineChart
          data={graphdata.data}
          width={730} height={250}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="t"
              domain={['dataMin','dataMax']}
              tickFormatter={formatXAxis}
              tickCount={24}
            />
            <YAxis
              domain={[0, 'dataMax']}
            />
            <Legend
              formatter={(value, entry, index) => (<span style={{fontWeight: highlighted === value ? 'bold' : 'normal'}}>{graphdata.legend[value]}</span>)}
              onMouseOver={handleLegendMouseOver}
              onMouseOut={handleLegendMouseOut}
            />
            {
              Object.entries(graphdata.legend).map(e =>
                  <Line
                    key={`${e[0]}`}
                    id={e[0]}
                    type="linear"
                    dataKey={e[0]}
                    stroke={lines.colors[e[0]]}
                    strokeWidth={highlighted === e[0] ? 5 : defaultStrokes[e[0]]}
                    strokeDasharray={lines.dashing[e[0]]}
                    fill={lines.colors[e[0]]}
                    connectNulls={false}
                    isAnimationActive={true}
                    onMouseOver={highlightLine}
                    onMouseOut={unselectLine}
                    dot={false}
                  />
              )
            }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
