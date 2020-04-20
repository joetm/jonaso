import React from "react"
import { Container, Button } from 'semantic-ui-react'
import { ResponsiveContainer, Treemap, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'



class Keywords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: 'bar',
      isZoomed: false,
      activeTooltipIndex: false,
      activeLabel: null,
      subcontent: [],
      level2: [],
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
          console.log('setting data:', level2);
          this.setState({
            isZoomed: true,
            level2
          })
        })
        console.log('isZoomed:', isZoomed);
    } else {
        this.setState({
          isZoomed: false,
          level2: [],
        })
        console.log('isZoomed:', isZoomed);
    }
  }
  changeChartType = (chart) => {
    this.setState({chart})
  }
  render() {
    const { keywords = [] } = this.props
    const { chart, level2, isZoomed } = this.state
    const barChartActive = chart === 'bar'

    const displaydata = isZoomed && level2.length ? level2 : keywords;

    // filtered_keywords = keywords.map(kw => kw.num > 1 ? kw : null);

    return (
        <Container style={{marginBottom: '2em'}}>
          <h2 style={{float:'left', display:'inline-block'}}>Research Interests</h2>

          <Button.Group style={{float: 'right'}}>
              <Button positive={barChartActive} onClick={() => this.changeChartType('bar')}>Bar</Button>
              <Button.Or />
              <Button positive={!barChartActive} onClick={() => this.changeChartType('tree')}>Tree</Button>
          </Button.Group>

          <div style={{clear:'both'}}></div>

          <ResponsiveContainer width="100%" height={740}>
            {
              barChartActive ?
                <BarChart layout="vertical" data={displaydata}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="num" />
                        <YAxis type="category" dataKey="name" width={200} />
                        <Tooltip
                          separator=" "
                          formatter={(value, name, props) => (<span>Publications: {value}</span>)}
                        />
                        <Bar
                          dataKey="num"
                          fill="#82ca9d"
                          className="clickable"
                          onClick={this.handleClick}
                        />
                </BarChart>
              :
                <Treemap
                  data={displaydata}
                  isAnimationActive={true}
                  animationDuration={1000}
                  dataKey="num"
                />
            }
          </ResponsiveContainer>

        </Container>
    )
  }
}

export default Keywords
