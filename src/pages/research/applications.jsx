"use client"

import React, { useState, useEffect } from "react"
// import { BarChart, Bar, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"


const _URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/interest-applicationareas.json'


export function Head() {
  const escape = '/'
  return (
    <Seo title={`Application Domain Interests ${escape}${escape} jonaso.de`}>
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/research/applications/" />
    </Seo>
  ) //
}


export default function ApplicationInterests() {
  const [ applications, setApplications ] = useState({})
  const [ aggregates, setAggregates ] = useState([])
  const [ expandedKey, setExpandedKey ] = useState(null)

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
      setAggregates(agglist)
    }
    dataFetch()
  }, [])

  function toggleCategory(newKey) {
    if (expandedKey === newKey) { setExpandedKey(null) }
    else { setExpandedKey(newKey) }
  }
  function toggleSubCategory(newKey) {
    if (expandedKey === newKey) { setExpandedKey(null) }
    else { setExpandedKey(newKey) }
  }

  const appKeys = Object.keys(applications)
  appKeys.sort()

  return (
    <Layout>
      <div className="ui container">
        <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
            <h2>Application Domain Interests</h2>
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
          aggregates &&
            <div>
              {
                aggregates.map(obj => (
                  <div
                    key={`agg${obj.name}`}
                    style={{marginBottom: '1rem'}}
                  >
                    <div
                      className="ui basic blue label"
                      style={{marginBottom: '1rem', cursor: 'pointer'}}
                      onClick={() => toggleCategory(obj.name)}
                    >
                      <strong>{obj.name}</strong>
                      <div className="detail">{obj.value}</div>
                    </div>
                    {
                      appKeys &&
                        appKeys.map(key => key.startsWith(obj.name) ?
                              <div
                                key={key}
                                onClick={() => toggleSubCategory(key)}
                                style={{cursor: 'pointer'}}
                              >
                                {key.replace(obj.name, '')}
                                <div>
                                  <ul style={{display: expandedKey === obj.name || expandedKey === key ? 'block' : 'none', margin: 0}}>
                                    {
                                      applications[key].map(d => (
                                        <li key={d.title}>{d.title} ({d.year})</li>
                                      ))
                                    }
                                  </ul>
                                </div>
                              </div>
                            :
                              null
                        )
                    }
                  </div>
                ))
              }
            </div>
        }

      </div>
    </Layout>
  )

}
