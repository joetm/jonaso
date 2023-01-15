import React from "react"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"
import { spacer } from "../../common"

// fix window SSR error
// import ForceGraph2D from 'react-force-graph-2d'
// import { ForceGraph2D } from 'react-force-graph'
import loadable from '@loadable/component'
const ForceGraph2D = loadable(() => import('react-force-graph-2d'))


const _PUBLICATIONS = 'https://raw.githubusercontent.com/joetm/jonaso/master/public/static/publications.json'

export function Head() {
  return (
    <Seo title="Collaboration Network // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/influencers" />
    </Seo>
  ) //
}


function buildAuthorname(a) {
  let authorname = a.given + ' ' + (a['dropping-particle'] ? a['dropping-particle'] + ' ' : '') + a.family
  if (authorname === 'Jonas Oppenländer') {
    authorname = 'Jonas Oppenlaender'
  }
  return authorname
}


class CollaborationNetwork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: [],
      edges: [],
      isLoading: true,
    }
    this.gContainer = React.createRef()
  }
  componentDidMount = () => {
    fetch(_PUBLICATIONS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(publications => {
      const uniquenodes = {}
      const uniqueedges = {}
      const nodes = []
      const edges = []
      const _self = 'Jonas Oppenlaender'
      publications.forEach(pub => {
        if (pub.author) {
          pub.author.forEach(a => {
            let authorname = buildAuthorname(a)
            if (!uniquenodes[authorname]) {
              let group = 2
              if (authorname === _self) {
                group = 1
              }
              uniquenodes[authorname] = { id: authorname, group }
            }
            //edges to all other co-authors of this publication
            if (authorname !== _self) { // skip self
              // edge to JO
              pub.author.forEach(a2 => {
                let authorname2 = buildAuthorname(a2)
                //skip self
                if (authorname2 !== authorname) {
                  if (!uniqueedges[authorname + '-' + authorname2]) {
                    uniqueedges[authorname + '-' + authorname2] = { source: authorname, target: authorname2, val: 1 }
                  } else {
                    uniqueedges[authorname + '-' + authorname2].val += 1
                  }
                }
              })
            }
          })
        }
      })
      Object.keys(uniquenodes).forEach(key => {
        nodes.push(uniquenodes[key])
      })
      Object.keys(uniqueedges).forEach(key => {
        // only add unidirectional edges
        // const [source, target] = key.split('-')
        // if (!uniqueedges[target + '-' + source]) {
          edges.push(uniqueedges[key])
        // }
      })
      this.setState({ nodes, edges, isLoading: false })
    })
  }
  render() {
    const { nodes, edges, isLoading } = this.state
    const graph = {
      nodes,
      links: edges,
    }

    return (
      <Layout>
        <div className="ui container">
          <h2 style={{float:'left', display:'inline-block'}}>
            Collaboration Network
            { isLoading && <span style={{marginLeft: '1em', fontWeight: 100, fontSize: '1em'}}>...loading...</span>}
          </h2>

          <div
            style={{clear:'both'}}
            ref={(ref) => this.gContainer = ref}
          >

            <ForceGraph2D
              graphData={graph}
              width={this.gContainer.offsetWidth}
              height={600}
              backgroundColor="#FAFAFA"
              nodeAutoColorBy="group"
              linkWidth="val"
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id
                const fontSize = 12/globalScale
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

          <div style={spacer}></div>
        </div>
      </Layout>
    )
  }
}

export default CollaborationNetwork
