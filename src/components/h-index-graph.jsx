import React from "react"
import { CartesianGrid, XAxis, YAxis, Scatter, ScatterChart } from 'recharts'

export default function HIndexGraph({ citation_graph_data }) {
  // diagonal line data
  const maxX = Math.max(...citation_graph_data.map(d => d.x))
  const maxY = Math.max(...citation_graph_data.map(d => d.y))
  const maxVal = Math.max(maxX, maxY)
  const diagonalLineData = [{ x: 0, y: 0 }, { x: maxVal, y: maxVal }]

  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '2rem'}}>
        <ScatterChart width={400} height={400}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" />
          <YAxis type="number" dataKey="y" />
          <Scatter data={citation_graph_data} fill="gray" />
          <Scatter name="Diagonal Line" data={diagonalLineData} line={{ stroke: '#666666' }} shape={() => null} />
        </ScatterChart>
      </div>
  )
}
