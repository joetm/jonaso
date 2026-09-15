import React from "react"

import applications from "../../../reading_list/interest-applicationareas.json"

// Aggregate top-level categories at build time (was a client-side
// fetch + useState; expand/collapse is now native <details>, zero JS).
const aggregates = (() => {
  const agg = {}
  Object.keys(applications).forEach(k => {
    const t = k.split('>')[0]
    agg[t] = agg[t] ? agg[t] + 1 : 1
  })
  return Object.keys(agg).map(k => ({name: k, value: agg[k]}))
})()

const appKeys = Object.keys(applications)
appKeys.sort()


export default function ApplicationInterests() {
  return (
      <div className="ui container">
        <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
            <h2>Application Domain Interests</h2>
        </div>

        {
          aggregates.map(obj => (
            <div
              key={`agg${obj.name}`}
              style={{marginBottom: '1rem'}}
            >
              <div
                className="ui basic blue label"
                style={{marginBottom: '1rem'}}
              >
                <strong>{obj.name}</strong>
                <div className="detail">{obj.value}</div>
              </div>
              {
                appKeys.map(key => key.startsWith(obj.name) ?
                      <details key={key} style={{cursor: 'pointer'}}>
                        <summary>{key.replace(obj.name, '')}</summary>
                        <ul style={{margin: 0}}>
                          {
                            applications[key].map(d => (
                              <li key={d.title}>{d.title} ({d.year})</li>
                            ))
                          }
                        </ul>
                      </details>
                    :
                      null
                )
              }
            </div>
          ))
        }

      </div>
  )
}
