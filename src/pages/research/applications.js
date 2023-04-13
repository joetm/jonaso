"use client"

import React, { useState, useEffect } from "react"
// import { BarChart, Bar, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
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
  const [ aggregates, setAggregates ] = useState([])

  useEffect(() => {
    const dataFetch = async () => {
      const data = await ( await fetch(_URL) ).json()
      setApplications(data)

      const agg = {}
      Object.keys(data).forEach(k => {
        const t = k.split('>')[0]
        agg[t] = agg[t] ? agg[t] + 1 : 1
      })
      const agglist = []
      Object.keys(agg).forEach(k => {
        agglist.push({name: k, value: agg[k]})
      })
      console.log('agglist', agglist)
      setAggregates(agglist)
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

        {/*
        <ResponsiveContainer width="100%" height={750}>
          <BarChart width={730} height={750} layout="vertical" data={aggregates}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" domain={['dataMin', 'dataMax']} />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        */}

        {
          aggKeys &&
            <div className="ui segment" style={{marginBottom: '2rem'}}>
              {
                aggregates.map(obj => (
                  <div key={`agg${obj.name}`} style={{display:'inline-block', marginRight: '1rem'}}>
                    <span className="ui basic blue label">{obj.name}</span>
                    {' '}
                    {obj.value}
                  </div>
                ))
              }
            </div>
        }

        {
          appKeys &&
            appKeys.map(key => <div key={key}>{key}</div>)
        }

      </div>
    </Layout>
  )

}
