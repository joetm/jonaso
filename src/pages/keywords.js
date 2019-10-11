import React from "react"
import { Container, Label} from 'semantic-ui-react'
import { spacer } from "../common"
import { ResponsiveContainer, Treemap, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'


class Keywords extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isZoomed: false,
      activeTooltipIndex: false,
      activeLabel: null,
      subcontent: [],
    }
  }
  handleBackButtonClick = () => {
    this.setState({isZoomed: false})
  }
  handleClick = (e) => {
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
  render() {
    const { keywords = [] } = this.props
    const { isZoomed, subcontent } = this.state
    console.log('keywords', keywords);

    // filtered_keywords = keywords.map(kw => kw.num > 1 ? kw : null);
    // console.log('filtered_keywords', filtered_keywords);

    return (
        <Container>
          <h2>Research Interests</h2>

          <ResponsiveContainer width="100%" height={960}>
                <BarChart layout="vertical" data={keywords}>{/* onClick={this.handleClick} */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="num"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={200}
                  />
                  <Tooltip
                    separator=" "
                    formatter={(value, name, props) => (<span>Publications: {value}</span>)}
                  />
                  <Bar
                    dataKey="num"
                    fill="#82ca9d"
                  />
                </BarChart>
{/*
                :
                <Treemap
                  data={subcontent}
                  isAnimationActive={true}
                  animationDuration={1000}
                  dataKey="num"
                  onClick={this.handleClick}
                />
*/}
          </ResponsiveContainer>

        </Container>
    )
  }
}

export default Keywords
