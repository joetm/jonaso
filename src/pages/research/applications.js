"use client"

import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
// import { Seo } from "../../components/Seo"


const _URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/interest-applicationareas.json'


// export function Head() {
//   const escape = '/'
//   return (
//     <Seo title={`Research Interests ${escape}${escape} jonaso.de`}>
//       <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests/" />
//     </Seo>
//   ) //
// }


export default function ApplicationInterests() {
  const [ applications, setApplications ] = useState({})
  const [ aggregates, setAggregates ] = useState({})

  useEffect(() => {
    const dataFetch = async () => {
      const data = await ( await fetch(_URL) ).json()
      setApplications(data)

      const agg = {}
      Object.keys(data).forEach(k => {
        const t = k.split('>')[0]
        if (agg[t]) {
          agg[t] += 1
        } else {
          agg[t] = 1      
        }
      })
      console.log('aggregates', agg)
      setAggregates(agg)
    }
    dataFetch()
  }, [])

  const appKeys = Object.keys(applications)
  appKeys.sort()

  const aggKeys = Object.keys(aggregates)
  aggKeys.sort()

  return (
    <Layout>
      <div className="ui container">
        <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
            <h2>Application Area Interests</h2>
        </div>

        {
          aggKeys &&
            <div className="ui segment" style={{marginBottom: '2rem'}}>
              {
                aggKeys.map(key => (
                  <div key={`agg${key}`} style={{display:'inline-block', marginRight: '1rem'}}>
                    <span className="ui basic blue label">{key}</span>
                    {' '}
                    {aggregates[key]}
                  </div>
                ))
              }
            </div>
        }

        {
          appKeys &&
            appKeys.map(key => <div>{key}</div>)
        }

      </div>
    </Layout>
  )

}
