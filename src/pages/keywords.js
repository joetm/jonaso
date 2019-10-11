import React from "react"
import { Container, Label} from 'semantic-ui-react'
import { spacer } from "../common"
import { ResponsiveContainer, Treemap, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'


class Keywords extends React.Component {
  render() {
    const { keywords = [] } = this.props
    // console.log('keywords', keywords);

    // filtered_keywords = keywords.map(kw => kw.num > 1 ? kw : null);
    // console.log('filtered_keywords', filtered_keywords);

    return (
        <Container>
          <h2>Research Interests</h2>
          <ResponsiveContainer width="100%" height={960}>
            <BarChart layout="vertical" data={keywords}>
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
          </ResponsiveContainer>

        </Container>
    )
  }
}

export default Keywords
