"use client"

import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"
import { useQuery } from '@tanstack/react-query'


const _PUB_URL = '/static/references-detail.json'


export function Head() {
  return (
    <Seo title="Jufo // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/jufo/" />
    </Seo>
  ) //
}


export default function JufoPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['references-detail.json'],
    queryFn: () => fetch(_PUB_URL)
              .then((res) => res.json())
              .then((pubs) => pubs.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0))
  })
  return (
    <Layout>
      <div className="ui container">
        <h1>Jufo Points</h1>
        <section style={{textAlign:'center'}}>
          <p style={{fontSize:'22pt'}}>
            {
              error && 'An error has occurred: ' + error.message
            }
            {
              isLoading ? '...loading...' : <span>&asymp; {data}</span>
            }
          </p>
        </section>
      </div>
    </Layout>
  )
}
