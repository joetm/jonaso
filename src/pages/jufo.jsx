"use client"

import React, { useState } from "react"
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
  const [ pubs, storePubs ] = useState([])
  const { isLoading, error, data } = useQuery({
    queryKey: ['references-detail.json'],
    queryFn: () => fetch(_PUB_URL)
              .then((res) => res.json())
              .then((pubs) => {
                storePubs(pubs)
                return pubs.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)
              })
  })

  function parseTitle(title) {
    // title = title.replace('\\\'{c}', 'ć')
    title = title.replace('\\"a', 'ä')
    title = title.replace('\\"u', 'ü')
    title = title.replace('\\\"u', 'ü')
    title = title.replace('\\"o', 'ö')
    title = title.replace('\{', '')
    title = title.replace('\}', '')
    title = title.replace('{', '')
    title = title.replace('}', '')
    title = title.replace('{', '')
    title = title.replace('}', '')
    return title
  }

  return (
    <Layout>
      <div className="ui container">
        <h1>Jufo Points</h1>
        <section style={{textAlign:'center'}}>
          <p style={{fontSize:'22pt'}}>
            { error && 'An error has occurred: ' + error.message }
            {
              isLoading ? '...loading...' : <span>&asymp; {data}</span>
            }
          </p>
        </section>
        {
          pubs.length &&
            <section style={{textAlign:'center'}}>
              <ul style={{textAlign: 'left'}}>
                {
                  pubs.map(p => <li key={p.title}>
                    {p.jufo}:{' '}
                    {parseTitle(p.title)}
                    {p.booktitle && ' (' + p.booktitle + ')'}
                    </li>)
                }
              </ul>
            </section>
        }
      </div>
    </Layout>
  )
}
