"use client"

import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/item.min.css'

import React, { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
// import useDetectPrint from 'use-detect-print'
import { noMarginGrid } from "../../common"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"
import Loader from "../../components/loading.jsx"

// replacement for Responsive component from semantic-ui-react
// see: https://react.semantic-ui.com/migration-guide/
// https://github.com/artsy/fresnel
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 990,
  },
})

const _REFERENCES_URL = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/docentship.json"


export function Head() {
  return (
    <Seo title="Docentship Status // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/docentship/" />
    </Seo>
  )
} //


export default function Docentship() {
  const [references, setReferences] = useState([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // ***
    const refFetch = async () => {
      const refs = await (
        await fetch(_REFERENCES_URL)
      ).json()
      // const refMapping = JSON.parse(JSON.stringify(references))
      // let maxRefsByYear = 0
      // for (let y in categorizedRefs) {
      //   const c = categorizedRefs[y].length
      //   refsByYear.push({year: y, num: c})
      // }
      const docentRefs = refs.filter(o => 'docentship' in o)
      // console.log(filteredRefs)
      setReferences(docentRefs)

      const actualRefs = docentRefs.filter(o => o.howpublished.toLowerCase() !== 'pre-prints and working papers')
      console.log(actualRefs)

      setProgress(actualRefs.length)

    }
    refFetch()
  }, [])

  return (
    <Layout>
      <div className="ui container">

          <h1 style={{marginBottom: '30px'}}>Docentship Progress {progress}/10</h1>

          {
            !references.length && <Loader />
          }

            {/*
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={graphdata.refsByYear}>
                <XAxis dataKey="year" />
                <YAxis
                  type="number"
                  domain={[0, 'dataMax']}
                  ticks={graphdata.tickArray}
                  allowDecimals={false}
                />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Bar dataKey="num" fill="#8CE6A9">
                  <LabelList dataKey="num" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            */}

            <div className="ui container" id="publications-type">
                  {
                    references.map((ref, index) => {
                      const color = ref?.howpublished === 'Pre-prints and Working Papers' ? 'red' : 'black'
                      return (
                        <div className="ui grid" key={index} style={noMarginGrid}>

                            <div className="row">
                              <h3 style={{color}}>{index+1}. {ref?.title}</h3>
                            </div>

                            <div className="row">
                              <div className="one wide column"></div>
                              <div className="fifteen wide column">
                                <div className="item">
                                  <div className="content">
                                    <div style={{color}} className="header">
                                      {ref?.howpublished}
                                    </div>
                                    <div>
                                      {ref?.journal}
                                    </div>
                                    <div>
                                      {ref?.booktitle}
                                    </div>
                                    <div>
                                      Jufo {ref?.jufo}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                        </div>
                      )
                    })
                  }
                <div className="spacer"></div>
            </div>

      </div>
    </Layout>
  )
}
