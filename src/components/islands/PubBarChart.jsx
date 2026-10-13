import React, { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useGrowIn } from './useGrowIn'

// Publications-per-year bar chart island. Clicking a bar filters the
// prerendered year list via window.__pubsFilterYear (see publications.astro).
export default function PubBarChart({ graphdata }) {
  const [selectedYear, setSelectedYear] = useState(false)
  // bars grow from the bottom, see useGrowIn
  const grow = useGrowIn(graphdata.refsByYear, ['num'])

  return (
        <ResponsiveContainer width="100%" height={150}>
          <BarChart ref={grow.chartRef} data={grow.data}>
            <XAxis dataKey="year" />
            <YAxis
              type="number"
              domain={[0, grow.yMax]}
              ticks={graphdata.tickArray}
              allowDecimals={false}
            />
            <Tooltip
              active={Boolean(selectedYear)}
            />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Bar dataKey="num" fill="#8CE6A9"
              isAnimationActive={false}
              onClick={(e) => {
                let y = parseInt(e['year'], 10);
                y = selectedYear !== y ? y : false;
                setSelectedYear(y)
                window.__pubsFilterYear?.(y)}
              }
              style={{cursor:'pointer'}}
            >
              {grow.done && <LabelList dataKey="num" position="top" />}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
  )
}
