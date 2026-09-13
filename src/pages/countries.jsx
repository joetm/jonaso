import React from "react"
import Layout from "../components/layout"
import WorldMap from "react-svg-worldmap"


import countries from "../countries.json"
import countriesVisit from "../countries-visit.json"
import countriesNoGo from "../countries-nogo.json"


const visitedIsos = new Set(countries.map(c => c.iso))
const nogoIsos = new Set(countriesNoGo.map(c => c.iso))

// countries in both lists render red (no-go wins over visited)
const visitedNogoData = [
  ...countries.filter(c => !nogoIsos.has(c.iso)),
  ...countriesNoGo,
].map(c => ({country: c.iso, value: ''}))

const visitedNogoStyle = ({countryCode}) => {
  const iso = countryCode.toLowerCase()
  const listed = nogoIsos.has(iso) || visitedIsos.has(iso)
  return {
    fill: nogoIsos.has(iso) ? 'red' : visitedIsos.has(iso) ? 'green' : '#dddddd',
    fillOpacity: listed ? 0.8 : 0,
    stroke: 'black',
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: 'pointer',
  }
}

const tooltipText = ({countryName, countryCode}) => {
  const iso = countryCode.toLowerCase()
  return nogoIsos.has(iso) ? `${countryName} (no-go)` : `${countryName} (visited)`
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
