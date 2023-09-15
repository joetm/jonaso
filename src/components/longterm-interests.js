"use client"

import React, { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'


const _DATASOURCE = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/topkeyword-timeline.json'
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

export default function LTInterests() {
  const [ graphdata, setGraphData ] = useState({legend: {}, data: []})
  const defaultStrokes = {
    'a': 3,
    'b': 3,
    'c': 3,
    'd': 2,
    'e': 2,
    'f': 2,
    'g': 2,
  }
  const [ strokes, setStrokes ] = useState(defaultStrokes)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(_DATASOURCE)
      ).json()
      // skip the last quarter to prevent the graph to drop off due to running month
      // data.data = data.data.slice(0, -3)
      // start date filtering
      data.data = data.data.filter(o => o.t > 1483221600) // 2017-01-01
      setGraphData(data)
    }
    dataFetch()
  }, [])

  function formatXAxis(t) {
    const d = new Date(t * 1000)
    return `${d.getFullYear()}-${d.getMonth()}`
  }

  function handleLegendMouseOver(e) {
    const newstrokes = { ...strokes, [e.value]: 5 }
    setStrokes(newstrokes)
  }
  function handleLegendMouseOut() {
    setStrokes(defaultStrokes)
  }
  function highlightLine(e) {
    const newstrokes = { ...strokes, [e.id]: 5 }
    setStrokes(newstrokes)
  }
  function unselectLine() {
    setStrokes(defaultStrokes)
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
            {/*
            <Tooltip
              filterNull={true}
              formatter={(value, key, props) => [value, graphdata.legend[key]]}
              labelFormatter={(value) => formatXAxis(value)}
            />
            */}
            <Legend
              formatter={(value, entry, index) => (<span>{graphdata.legend[value]}</span>)}
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
                    strokeWidth={strokes[e[0]]}
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
