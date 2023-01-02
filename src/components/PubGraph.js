import React from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import moment from 'moment'


// const getMin = (documents) => documents.reduce((min, d) => d.day < min ? d.day : min, documents[0].day)
// const getMax = (documents) => documents.reduce((max, d) => d.day > max ? d.day : max, documents[0].day)

const augmentDate = (docs) => {
  return docs.map(doc => {
    doc.day = new Date(doc.modified * 1000).setHours(0,0,0,0)
    doc.month = new Date(doc.modified * 1000).setDate(1)
    doc.modified = doc.modified * 1000
    return doc
  })
}

const aggregateByDay = (docs) => {
  const aggDocs = {}
  for (let i = 0; i < docs.length; i++) {
    // count the doc
    if (docs[i].day in aggDocs) {
      aggDocs[docs[i].day] += 1
    } else {
      aggDocs[docs[i].day] = 1
    }
  }
  return aggDocs
}


class PubGraph extends React.Component {
  state = {
    docs: []
  }
  isAggregated = false;
  componentWillReceiveProps(nextProps) {
    // only need aggregation once
    if (nextProps.documents && nextProps.documents.length > this.props.documents.length) {
      const { documents } = nextProps
      let docs = []
      docs = augmentDate(documents)
      if (!this.isAggregated) {
        docs = aggregateByDay(docs)
        // convert obj to array
        const keys = Object.keys(docs)
        keys.sort()
        docs = keys.map(function(key) {
          return {
            num: docs[key],
            day: Number(key),
          }
        })
        this.isAggregated = true
        this.setState({ docs })
      }
    }
  }
  render() {
    const { docs } = this.state
    return (
        <div className="ui container">
          <h1>Timeline</h1>
          <ResponsiveContainer width="100%" height={150}>
          <BarChart data={docs}>
            <XAxis
              scale="time"
              domain={['dataMin', 'dataMax']}
              dataKey="day"
              tickFormatter={d => moment(d).format('MM-DD')}
            />
            <YAxis type="number" />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Bar type="step" dataKey="num" fill="#4183c4" />
          </BarChart>
          </ResponsiveContainer>
        </div>
    )
  }
}

export default PubGraph
