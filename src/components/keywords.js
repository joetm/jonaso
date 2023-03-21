"use client"

import React from "react"
import 'semantic-ui-css/components/button.min.css'
import { ResponsiveContainer, LabelList, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'


const HEIGHT = 1750
const colorDefault = '#eb008c'
const colorZoomed = '#FF86A6'


class Keywords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTooltipIndex: false,
      activeLabel: null,
      level2: [],
      color: colorDefault,
    }
  }
  handleBackButtonClick = () => {
    this.setState({isZoomed: false})
  }
  handleClick = bar => {
    const { isZoomed, zoom } = this.props
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
            level2,
            color: colorZoomed
          })
          zoom(true, bar.name)
        })
    } else {
        this.setState({
          level2: [],
          breadcrumb: null,
          color: colorDefault
        })
        zoom(false)
    }
  }
  zoomOut = () => {
    const { zoom } = this.props
    this.setState({
      level2: [],
      color: colorDefault
    })
    zoom(false)
  }
  // changeChartType = (chart) => this.setState({chart})
  render() {
    const { keywords = [], isZoomed } = this.props
    const { level2, color } = this.state // chart
    const displaydata = isZoomed && level2.length ? level2 : keywords;

    // filtered_keywords = keywords.map(kw => kw.num > 1 ? kw : null);

    return (
        <div className="ui container">
          <div style={{clear:'both'}}></div>

          <ResponsiveContainer width="100%" height={HEIGHT}>
                <BarChart
                  layout="vertical"
                  data={displaydata}
                  onClick={isZoomed ? this.zoomOut : null}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="num" />
                    <YAxis type="category" dataKey="name" width={275} style={{fontSize: '1rem'}} />
                    {/*
                    <Tooltip
                      separator=" "
                      formatter={(value, name, props) => (<span>publications: {value}</span>)}
                    />
                    */}
                    <Bar
                      dataKey="num"
                      fill={color}
                      className={!isZoomed ? "clickable" : ""}
                      onClick={this.handleClick}
                    >
                      <LabelList
                        dataKey="num"
                        position="insideRight"
                        style={{ fontSize: '80%', fill: '#ffffff' }}
                      />
                    </Bar>
                </BarChart>
          </ResponsiveContainer>

        </div>
    )
  }
}

export default Keywords
