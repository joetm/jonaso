import React from "react"
import { Container, Button } from 'semantic-ui-react'
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts' // Treemap


const HEIGHT = 1250;
const colorDefault = '#eb008c';
const colorZoomed = '#FF86A6';

// old green: #82ca9d

class Keywords extends React.Component {
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
  // changeChartType = (chart) => this.setState({chart})
  render() {
    const { keywords = [] } = this.props
    const { level2, isZoomed, breadcrumb, color } = this.state // chart
    // const barChartActive = chart === 'bar'
    const displaydata = isZoomed && level2.length ? level2 : keywords;

    // filtered_keywords = keywords.map(kw => kw.num > 1 ? kw : null);

    return (
        <Container style={{marginBottom: '2em'}}>
          <h2 style={{float:'left', display:'inline-block'}}>Research Interests</h2>

          {/*
          <Button.Group style={{float: 'right'}}>
              <Button positive={barChartActive}
                onClick={() => this.changeChartType('bar')}>Bar</Button>
              <Button.Or />
              <Button positive={!barChartActive}
                onClick={() => this.changeChartType('tree')}>Tree</Button>
          </Button.Group>
          */}

          {
            isZoomed &&
              <div style={{float: 'right', marginRight: '1em'}}>
                <span style={{marginRight: '1em'}}>{breadcrumb}</span>
                <Button circular onClick={this.zoomOut} icon='left arrow' />
              </div>
          }

          <div style={{clear:'both'}}></div>

          <ResponsiveContainer width="100%" height={HEIGHT}>
            {/*
              barChartActive ?
            */}
                <BarChart
                  layout="vertical"
                  data={displaydata}
                  onClick={isZoomed ? this.zoomOut : null}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="num" />
                        <YAxis type="category" dataKey="name" width={275} />
                        <Tooltip
                          separator=" "
                          formatter={(value, name, props) => (<span>Publications: {value}</span>)}
                        />
                        <Bar
                          dataKey="num"
                          fill={color}
                          className={!isZoomed ? "clickable" : ""}
                          onClick={this.handleClick}
                        >
                        {/*
                          <LabelList dataKey="num" position="insideRight" />
                        */}
                        </Bar>
                </BarChart>
            {/*
              :
                <Treemap
                  data={displaydata}
                  isAnimationActive={true}
                  animationDuration={800}
                  dataKey="num"
                />
            */}
          </ResponsiveContainer>

        </Container>
    )
  }
}

export default Keywords
