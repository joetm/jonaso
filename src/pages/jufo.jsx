"use client"

import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"


const _PUB_URL = '/static/references-detail.json'


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
    const fetchData = async () => {
      const publications = await (
        await fetch(_PUB_URL)
      ).json()
      const jufo = publications.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)
      updateJufo(jufo)
    }
    fetchData()
  }, [])
  return (
    <Layout>
      <div className="ui container">
        <h1>Jufo Points</h1>
        <section style={{textAlign:'center'}}>
          <p style={{fontSize:'22pt'}}>{jufo ? <span>&asymp; {jufo}</span> : '...loading...'}</p>
        </section>
      </div>
    </Layout>
  )
}
