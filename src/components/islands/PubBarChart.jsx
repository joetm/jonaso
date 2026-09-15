import React, { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Publications-per-year bar chart island. Clicking a bar filters the
// prerendered year list via window.__pubsFilterYear (see publications.astro).
export default function PubBarChart({ graphdata }) {
  const [selectedYear, setSelectedYear] = useState(false)

  return (
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={graphdata.refsByYear}>
            <XAxis dataKey="year" />
            <YAxis
              type="number"
              domain={[0, 'dataMax']}
              ticks={graphdata.tickArray}
              allowDecimals={false}
            />
            <Tooltip
              active={Boolean(selectedYear)}
            />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Bar dataKey="num" fill="#8CE6A9"
              onClick={(e) => {
                let y = parseInt(e['year'], 10);
                y = selectedYear !== y ? y : false;
                setSelectedYear(y)
                window.__pubsFilterYear?.(y)}
              }
              style={{cursor:'pointer'}}
            >
              <LabelList dataKey="num" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
  )
}
