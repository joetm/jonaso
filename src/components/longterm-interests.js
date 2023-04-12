"use client"

import React, { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'


const _DATASOURCE = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/topkeyword-timeline.json'
const HEIGHT = 350
// const colorDefault = '#eb008c'
// const colorZoomed = '#FF86A6'
const lines = {
  colors: {
    'a': '#101010', // ML
    'b': '#EB008C', // Crowdsourcing
    'c': '#F0E442', // Creativity
    'd': '#009E73', // HCI
    'e': '#56B4E9', // AI
    'f': '#101010', // NLP
    // 'g': '#CC6677', // Social Media
    // 'h': '#eb008c', // Future of Work
    // CC79A7
    // D55E00
  },
  dashing: {
    'a': null, // ML
    'b': '', // Crowdsourcing
    'c': '', // Creativity
    'd': '', // HCI
    'e': '', // AI
    'f': '4 1 2', // NLP
    // 'g': '1', // Social Media
    // 'h': '1', // Future of Work
  },
}

export default function LTInterests() {
  const [ graphdata, setGraphData ] = useState({legend: {}, data: []})
  const defaultStrokes = {
    'a': 2, // ML
    'b': 2, // Crowdsourcing
    'c': 2, // Creativity
    'd': 2, // HCI
    'e': 2, // AI
    'f': 2, // NLP
  }
  const [ strokes, setStrokes ] = useState(defaultStrokes)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(_DATASOURCE)
      ).json()
      // skip the last quarter to prevent the graph to drop off due to running month
      data.data = data.data.slice(0, -3)
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
              tickCount={12}
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
                    type="monotone"
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
