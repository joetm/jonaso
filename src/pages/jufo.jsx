"use client"

import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"
import { useQuery } from '@tanstack/react-query'
import CitationMetrics from "../components/CitationMetrics"


const _PUB_URL = '/static/references-detail.json'
const _CITATION_URL = "https://raw.githubusercontent.com/joetm/jonaso/master/stat_aggregator/publications-citations.json"


export function Head() {
  return (
    <Seo title="Jufo // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/jufo/" />
    </Seo>
  ) //
}

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


export default function JufoPage() {
  const [ pubs, storePubs ] = useState([])
  const [ citations, setCitations ] = useState([])
  const { isLoading, error, data } = useQuery({
    queryKey: ['references-detail.json'],
    queryFn: () => fetch(_PUB_URL)
              .then((res) => res.json())
              .then((pubs) => {
                storePubs(pubs)
                return pubs.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)
              })
  })

  useEffect(() => {
    const citFetch = async () => {
      const cits = await ( await fetch(_CITATION_URL) ).json()
      const citation_graph_data = []
      // scatter plot data
      cits.forEach( (obj, index) => citation_graph_data.push(
        { 'x': index + 1, 'y': parseInt(obj.citations, 10) }
      ))
      setCitations(citation_graph_data)
    }
    citFetch()
  }, [])

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
        <section style={{textAlign:'center'}}>
          <CitationMetrics citation_graph_data={citations} />
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
