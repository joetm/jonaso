"use client"

import React, { useState, useEffect } from "react"
import { spacer } from "../common"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"


export function Head() {
  return (
    <Seo title="Jufo // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/jufo/" />
    </Seo>
  ) //
}


export default function JufoPage() {
  const [jufo, updateJufo] = useState(false)
  useEffect(() => {
    fetch('/static/references-detail.json')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server: Could not get jufo points")
      }
      return response.json()
    })
    .then(publications => {
      let jufo = publications.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)
      updateJufo(jufo)
    })
  }, [])

  return (
    <Layout>
      <div className="ui container">
        <h1>Jufo Points</h1>
        <section style={{textAlign:'center'}}>
          <p style={{fontSize:'22pt'}}>{jufo ? <span>&asymp; {jufo}</span> : '...loading...'}</p>
        </section>
        <div className="spacer" style={spacer}></div>
      </div>
    </Layout>
  )

}
