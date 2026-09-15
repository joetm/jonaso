import React from "react"
import { Tooltip, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Reading-activity bar chart island. Receives day-aggregated data computed
// at build time (see views/research/reading-data.js); moment.js replaced
// with vanilla date formatting.

const pad = v => (v < 10 ? '0' : '') + v

function formatDay(d) {
  const dt = new Date(d)
  return `${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`
}

export default function PubGraph({docs}) {
  return (
      <div className="ui container">
        <ResponsiveContainer width="100%" height={150}>
        <BarChart data={docs}>
          <XAxis
            scale="time"
            domain={['dataMin', 'dataMax']}
            dataKey="day"
            tickFormatter={formatDay}
          />
          <YAxis type="number" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Bar type="step" dataKey="num" fill="#4183c4" />
          <Tooltip content={null} /> {/* Disables tooltips */}
        </BarChart>
        </ResponsiveContainer>
      </div>
  )
}
