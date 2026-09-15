import React, { useRef, useState } from "react"
import ForceGraph2D from 'react-force-graph-2d'

// client:only island — react-force-graph touches window at import time,
// which is why the Gatsby build needed @loadable; here it simply never
// runs on the server. Graph data is computed at build (network-data.js).

export default function CollabNetwork({ nodes, edges }) {
  const [mincollabs, setMincollabs] = useState(1)
  const gContainer = useRef(null)

  function changeFilter(e) {
    setMincollabs(e.target.value)
  }

  const graph = {
    nodes,
    links: edges.filter(e => e.val >= mincollabs),
  }

  return (
        <div className="ui container">
          <h2 style={{float:'left', display:'inline-block'}}>
            Collaboration Network
          </h2>
          <div style={{float:'right'}}>
            # publications: {' '}
            <select className="ui inline compact selection dropdown" onChange={changeFilter}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div style={{clear:'both'}} ref={(ref) => gContainer.current = ref}>

            <ForceGraph2D
              graphData={graph}
              width={gContainer?.current?.offsetWidth}
              height={600}
              backgroundColor="#FAFAFA"
              nodeAutoColorBy="group"
              linkWidth="val"
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id
                const fontSize = 12 / globalScale
                ctx.font = `${fontSize}px sans-serif`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2) // some padding
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
                // ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = node.color
                ctx.fillText(label, node.x, node.y)
                node.__bckgDimensions = bckgDimensions // to re-use in nodePointerAreaPaint
              }}
              nodePointerAreaPaint={(node, color, ctx) => {
                ctx.fillStyle = color
                const bckgDimensions = node.__bckgDimensions
                bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)
              }}
            />

          </div>
        </div>
  )
}
