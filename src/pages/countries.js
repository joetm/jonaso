import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import WorldMap from "react-svg-worldmap"


import countrylist from "../countries.json"


export default function Countries() {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    // const dataFetch = async () => {
    //   const data = await ( await fetch(_URL) ).json()
    //   setCountries(data)
    // }
    // dataFetch()
    setCountries(countrylist)
  })
  return (
    <Layout>
      <div className="ui container" style={{textAlign:'center'}}>
        <h2>Countries I have visited</h2>

        <WorldMap
          color="red"
          value-suffix="people"
          size="responsive"
          data={countries.map(c => ({country: c.iso, value: 1}) )}
        />

        {/*
        <ul>
        {
          countries.map(c => <li>{c.name}</li>)
        }
        </ul>
        */}
        
      </div>
    </Layout>
  )
}

