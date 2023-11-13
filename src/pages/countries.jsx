import React from "react"
import Layout from "../components/layout"
import WorldMap from "react-svg-worldmap"


import countries from "../countries.json"
import countriesNoGo from "../countries-nogo.json"
import countriesVisit from "../countries-visit.json"


export default function Countries() {
  return (
    <Layout>
      <div className="ui container" style={{textAlign:'center'}}>
        <h2>Countries I have visited</h2>
        <WorldMap
          color="red"
          value-suffix="people"
          size="responsive"
          data={countries.map(c => ({country: c.iso, value: ''}) )}
        />
        <h2>Countries to visit next</h2>
        <WorldMap
          color="green"
          value-suffix="people"
          size="responsive"
          data={countriesVisit.map(c => ({country: c.iso, value: ''}) )}
        />
        <h2>No-go Countries</h2>
        <WorldMap
          color="black"
          value-suffix="people"
          size="responsive"
          data={countriesNoGo.map(c => ({country: c.iso, value: ''}) )}
        />
      </div>
    </Layout>
  )
}

