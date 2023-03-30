"use client"

import React, { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'


const DATASOURCE = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/topkeyword-timeline.json'
const HEIGHT = 350
// const colorDefault = '#eb008c'
// const colorZoomed = '#FF86A6'
const colors = {
  'a': '#eb008c', // ML
  'b': '#050505', // CS
  'c': '#56B4E9', // Creativity
  'd': '#D55E00', // HCI
  'e': '#CC79A7', // AI
  'f': '#009E73', // NLP
  'g': '#CC6677', // Social Media
  'h': '#F0E442', // Future of Work
  // 
}

export default function LTInterests() {
  const [ graphdata, setGraphData ] = useState({legend: {}, data: []})

  const getData = async () => {
    try {
      const res = await fetch(DATASOURCE)
      const data = await res.json()
      console.log('graphdata', data)
      setGraphData( data )
    } catch (err) {
      console.error("Error fetching topkeyword-timeline.json")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  function formatXAxis(t) {
    const d = new Date(t * 1000)
    const year = d.getFullYear()
    const month = d.getMonth()
    return `${year}-${month}`
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
            />
            {
              Object.entries(graphdata.legend).map(e =>
                  <Line
                    key={`${e[0]}`}
                    type="monotone"
                    dataKey={e[0]}
                    stroke={colors[e[0]]}
                    strokeWidth={2}
                    fill={colors[e[0]]}
                    dot={false}
                  />
              )
            }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
