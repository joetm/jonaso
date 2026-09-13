import React from "react"
import Layout from "../components/layout"
import WorldMap from "react-svg-worldmap"


import countries from "../countries.json"
import countriesVisit from "../countries-visit.json"
import countriesNoGo from "../countries-nogo.json"


const visitedIsos = new Set(countries.map(c => c.iso))
const nogoIsos = new Set(countriesNoGo.map(c => c.iso))

// countries in both lists render green (visited wins over no-go)
const visitedNogoData = [
  ...countries,
  ...countriesNoGo.filter(c => !visitedIsos.has(c.iso)),
].map(c => ({country: c.iso, value: ''}))

const visitedNogoStyle = ({countryCode}) => {
  const iso = countryCode.toLowerCase()
  const listed = nogoIsos.has(iso) || visitedIsos.has(iso)
  return {
    fill: visitedIsos.has(iso) ? 'green' : nogoIsos.has(iso) ? 'red' : '#dddddd',
    fillOpacity: listed ? 0.8 : 0,
    stroke: 'black',
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: 'pointer',
  }
}

const tooltipText = ({countryName, countryCode}) => {
  const iso = countryCode.toLowerCase()
  return visitedIsos.has(iso) ? `${countryName} (visited)` : `${countryName} (no-go)`
}

export default function Countries() {
  return (
    <Layout>
      <div className="ui container" style={{textAlign:'center'}}>
        <h2>Countries visited ({countries.length}) and no-go ({countriesNoGo.length})</h2>
        <WorldMap
          size="responsive"
          data={visitedNogoData}
          styleFunction={visitedNogoStyle}
          tooltipTextFunction={tooltipText}
        />
        <h2>Countries to visit next</h2>
        <WorldMap
          color="blue"
          size="responsive"
          data={countriesVisit.map(c => ({country: c.iso, value: ''}) )}
          tooltipTextFunction={({countryName}) => countryName}
        />
      </div>
    </Layout>
  )
}
