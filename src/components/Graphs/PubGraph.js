import moment from 'moment'
import React, { useState, useEffect } from "react"
import { Tooltip, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'


// const getMin = (documents) => documents.reduce((min, d) => d.day < min ? d.day : min, documents[0].day)
// const getMax = (documents) => documents.reduce((max, d) => d.day > max ? d.day : max, documents[0].day)

function augmentDate(docs) {
  return docs.map(doc => {
    doc.day = new Date(doc.modified * 1000).setHours(0,0,0,0)
    doc.month = new Date(doc.modified * 1000).setDate(1)
    doc.modified = doc.modified * 1000
    return doc
  })
}
function aggregateByDay(docs) {
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


function PubGraph({documents}) {
  const [docs, updateDocs] = React.useState([])
  let isAggregated = false

  React.useEffect(() => {
    let propdocs = augmentDate(documents)
    if (!isAggregated) {
      propdocs = aggregateByDay(propdocs)
      const keys = Object.keys(propdocs)
      keys.sort()
      propdocs = keys.map(function(key) {
        return {
          num: propdocs[key],
          day: Number(key),
        }
      })
      isAggregated = true
    }
    updateDocs(propdocs)
  }, [documents])

  return (
      <div className="ui container">
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
          <Tooltip content={null} /> {/* Disables tooltips */}
        </BarChart>
        </ResponsiveContainer>
      </div>
  )
}

export default PubGraph
