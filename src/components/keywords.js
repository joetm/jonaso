import React from "react"
import { Container, Button } from 'semantic-ui-react'
import { ResponsiveContainer, Treemap, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'


// const BChart = ({ keywords }) => {
//   console.log(keywords);
//   return (
//     <BarChart layout="vertical" data={keywords}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis type="number" dataKey="num" />
//             <YAxis type="category" dataKey="name" width={200} />
//             <Tooltip
//               separator=" "
//               formatter={(value, name, props) => (<span>Publications: {value}</span>)}
//             />
//             <Bar dataKey="num" fill="#82ca9d" />
//     </BarChart>
//   )
// }


class Keywords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: 'bar',
      isZoomed: false,
      activeTooltipIndex: false,
      activeLabel: null,
      subcontent: [],
    }
  }
  handleBackButtonClick = () => {
    this.setState({isZoomed: false})
  }
  handleClick = e => {
    let {isZoomed} = this.state
    isZoomed = !isZoomed
    if (isZoomed) {
      // DEV
      let subcontent = [{name:'A',num:12},{name:'B',num:12}]
      this.setState({subcontent})
    }
    this.setState({isZoomed})
    console.log(e, 'zoomed:', isZoomed);
  }
  changeChartType = (chart) => {
    this.setState({chart})
  }
  render() {
    const { keywords = [] } = this.props
    const { chart } = this.state
    const barChartActive = chart === 'bar'
    // console.log('keywords', keywords)

    // filtered_keywords = keywords.map(kw => kw.num > 1 ? kw : null);
    // console.log('filtered_keywords', filtered_keywords);

    return (
        <Container style={{marginBottom: '2em'}}>
          <h2 style={{float:'left', display:'inline-block'}}>Research Interests</h2>

          <Button.Group style={{float: 'right'}}>
              <Button positive={barChartActive} onClick={() => this.changeChartType('bar')}>Bar</Button>
              <Button.Or />
              <Button positive={!barChartActive} onClick={() => this.changeChartType('tree')}>Tree</Button>
          </Button.Group>

          <div style={{clear:'both'}}></div>

          <ResponsiveContainer width="100%" height={580}>
            {
              barChartActive ?
                <BarChart layout="vertical" data={keywords}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="num" />
                        <YAxis type="category" dataKey="name" width={200} />
                        <Tooltip
                          separator=" "
                          formatter={(value, name, props) => (<span>Publications: {value}</span>)}
                        />
                        <Bar dataKey="num" fill="#82ca9d" />
                </BarChart>
              :
                <Treemap
                  data={keywords}
                  isAnimationActive={true}
                  animationDuration={1000}
                  dataKey="num"
                  onClick={this.handleClick}
                />
            }
          </ResponsiveContainer>

        </Container>
    )
  }
}

export default Keywords
