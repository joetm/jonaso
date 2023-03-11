import 'semantic-ui-css/components/button.min.css'

import React from "react"
import { Button } from 'semantic-ui-react'
import { ResponsiveContainer, Treemap } from 'recharts'
import { spacer } from "../../../common"
import Layout from "../../../components/layout"
import GraphSwitcher from "../../../components/GraphSwitcher"
import { Seo } from "../../../components/Seo"


const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'

const HEIGHT = 1250;
const colorDefault = '#eb008c';
const colorZoomed = '#FF86A6';

// old green: #82ca9d

export function Head() {
  return (
    <Seo
      title="Research Interests // jonaso.de"
    >
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests/treemap/" />
    </Seo>
  )
}

class TreeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // chart: 'bar',
      isZoomed: false,
      activeTooltipIndex: false,
      activeLabel: null,
      level2: [],
      color: colorDefault,
      breadcrumb: null,
    }
  }
  handleBackButtonClick = () => {
    this.setState({isZoomed: false})
  }
  handleClick = bar => {
    const { isZoomed } = this.state
    if (!isZoomed) {
        // query level2
        const URL = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/level2/${bar.id}.json`
        fetch(URL)
        .then(response => {
          if (response.status >= 400) {
            return []
          }
          return response.json()
        })
        .then(level2 => {
          this.setState({
            isZoomed: true,
            level2,
            breadcrumb: bar.name,
            color: colorZoomed
          })
        })
    } else {
        this.setState({
          isZoomed: false,
          level2: [],
          breadcrumb: null,
          color: colorDefault
        })
    }
  }
  zoomOut = () => {
    this.setState({
      isZoomed: false,
      level2: [],
    })
  }
  render() {
    const { keywords = [] } = this.props
    const { level2, isZoomed, breadcrumb } = this.state // chart
    // const barChartActive = chart === 'bar'
    const displaydata = isZoomed && level2.length ? level2 : keywords;

    return (
        <div className="ui container">
          <h2>
            Research Interests
            {' '}
            <GraphSwitcher active="treemap" />
          </h2>

          {
            isZoomed &&
              <div style={{float: 'right', marginRight: '1em'}}>
                <span style={{marginRight: '1em'}}>{breadcrumb}</span>
                <Button circular onClick={this.zoomOut} icon='left arrow' />
              </div>
          }

          <div style={{clear:'both'}}></div>

          <ResponsiveContainer width="100%" height={HEIGHT}>
                <Treemap
                  data={displaydata}
                  isAnimationActive={true}
                  animationDuration={800}
                  dataKey="num"
                />
          </ResponsiveContainer>

        </div>
    )
  }
}



class Interests extends React.Component {
  state = {
    keywords: [],
  }
  componentDidMount = () => {
    // ------------
    // get keywords
    // ------------
    fetch(_KEYWORDS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(keywords => this.setState({ keywords }))
  }
  render() {
    const { keywords } = this.state
    const filtered_keywords = keywords.filter(kw => kw.num > 19)
    return (
      <Layout>
        <div className="ui container">
          <TreeComponent keywords={filtered_keywords} />
          <div style={spacer}></div>
        </div>
      </Layout>
    )
  }
}

export default Interests
