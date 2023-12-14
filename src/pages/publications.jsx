"use client"

import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/item.min.css'

import React, { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// import useDetectPrint from 'use-detect-print'
import { noMarginGrid } from "../common"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"

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

const styles = {
  menu: {
    textAlign: 'center',
    fontSize: '1.5em',
    lineHeight: '2em',
    marginBottom: '1em',
    marginTop: '0.5em',
  },
}

const _REFERENCES_PER_YEAR = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references.json"
const _REFERENCES_PER_TYPE = "https://raw.githubusercontent.com/joetm/jonaso/master/public/static/references-type.json"
// const _REFERENCES_PER_YEAR = "/static/references.json"
// const _REFERENCES_PER_TYPE = "/static/references-type.json"
const _CITATION_URL = "https://raw.githubusercontent.com/joetm/jonaso/master/stat_aggregator/publications-citations.json"


export function Head() {
  return (
    <Seo title="Publications // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/publications/" />
    </Seo>
  )
} //

/**
 * Group publications by year
 * @param {Array} pubList - List of publications
 * @returns {Object} categorizedList - Categorized list of publications
 */
function categorizeListPerYear(pubList) {
    if (!pubList) {
        return {}
    }
    const annotatedList = pubList.map(text => {
        const yRegex = /20\d\d/
        const found = text.match(yRegex)
        return {__html: text.replace('publications_bib.html', '/static/publications_bib.html'), year: found[0] || 'forthcoming'}
    })
    const categorizedList = {}
    annotatedList.forEach(obj => {
      if (categorizedList[obj.year]) {
          categorizedList[obj.year].push(obj)
      } else {
          categorizedList[obj.year] = [obj]
      }
    })
    return categorizedList
} //


export default function Publications() {
  const [references, setReferences] = useState({})
  const [referencesDetail, setReferencesDetail] = useState({})
  const [showing, setShowing] = useState('type')
  const [graphdata, setGraphdata] = useState({})
  const [citations, setCitations] = useState([])

  const [isRefLoaded, setIsRefLoaded] = useState(false)
  const [isCitsLoaded, setIsCitsLoaded] = useState(false)

  useEffect(() => {
    // ***
    const refFetch = async () => {
      const refs = await (
        await fetch(_REFERENCES_PER_YEAR)
      ).json()
      const categorizedRefs = categorizeListPerYear(refs)
      // const refMapping = JSON.parse(JSON.stringify(references))
      const refsByYear = []
      let maxRefsByYear = 0
      for (let y in categorizedRefs) {
        const c = categorizedRefs[y].length
        refsByYear.push({year: y, num: c})
        if (c > maxRefsByYear) {
          maxRefsByYear = c
        }
      }
      maxRefsByYear = maxRefsByYear + 2
      const tickArray = []
      for (let i = 0; i <= maxRefsByYear; i+=2) {
        tickArray.push(i)
      }
      const graphdata = {refsByYear, tickArray}
      setReferences(categorizedRefs)
      setGraphdata(graphdata)
      setIsRefLoaded(true)
    }
    // ***
    const typFetch = async () => {
      const refDetail = await (
        await fetch(_REFERENCES_PER_TYPE)
      ).json()
      // replace link to bib
      for (const key of Object.keys(refDetail)) {
        refDetail[key] = refDetail[key].map(obj => {
          obj.title = obj.title.replace('publications_bib.html', '/static/publications_bib.html')
          return obj
        })
      }
      setReferencesDetail(refDetail)
    }
    // ***
    const citFetch = async () => {
      const cits = await ( await fetch(_CITATION_URL) ).json()
      // console.log('citations', cits)
      setCitations(cits)
      setIsCitsLoaded(true)
    }
    // ***
    refFetch()
    typFetch()
    citFetch()
  }, [])

  // add formatted ref html to the citations array
  // useEffect(() => {
  //   if (isRefLoaded && isCitsLoaded) {
  //     const newCitations = []
  //     for (const index in citations) {
  //       const year = citations[index].year
  //       const title = citations[index].title.replace("\n", "").toLowerCase()
  //       const subgroup = references[year]
  //       for (const i in subgroup) {
  //         const pub = subgroup[i].__html.replace("\n", "").toLowerCase()
  //         if (pub.indexOf( title ) > -1) {
  //           newCitations.push( { year, citations: citations[index].citations, title: citations[index].title, __html: subgroup[i].__html } )
  //           break
  //         }
  //       }
  //     }
  //     setCitations(newCitations)
  //   }
  // }, [setIsRefLoaded, isCitsLoaded])


  const keysYear = Object.keys(references).reverse()
  const keysType = Object.keys(referencesDetail).reverse()

  // custom sort order
  let customSortOrder = []
  if (keysType.length > 0) {
    customSortOrder = [
      "Journal Articles",
      "Conference Papers",
      "Workshops",
      "Workshop Proceedings",
      "Doctoral Consortia",
      "Conference Posters and Position Papers",
      "Pre-prints and Working Papers",
      "Theses and Seminal Papers",
    ]
  }


// const aggregated = citations.map(e => ({year: e.year, num: e.citations}))
// .reduce((acc, { num, year }) => {
//   year = parseInt(year, 10)
//   acc[year] = acc[year] || 0
//   acc[year] += parseInt(num, 10)
//   return acc
// }, {})
// const citations_per_year = Object.keys(aggregated).map(year => ({
//   year: year,
//   citations: aggregated[year]
// }))
// console.log('aggregated', aggregated)


  return (
    <Layout>
      <div className="ui container">

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

        <div id="publicationButtons" style={styles.menu}>
          <div style={{float:'right',marginTop:'0.5em'}}>
            <a title="Download publications as pdf" href="/cv/oppenlaender-publications.pdf" target="_blank">
              <i aria-hidden="true" className="file pdf outline large icon"></i>
            </a>
          </div>
          <div className="ui buttons">
            <button
              title="Sort by year"
              className="ui button"
              onClick={() => setShowing('year')}
              disabled={showing === 'year'}
            >YEAR</button>
            <div className="or"></div>
            <button
              title="Sort by type"
              className="ui button"
              tabIndex="-1"
              onClick={() => setShowing('type')}
              disabled={showing === 'type'}
            >TYPE</button>
            {
              citations.length &&
              <>
                <div className="or"></div>
                <button
                  title="Sort by citations"
                  className="ui button"
                  tabIndex="-1"
                  onClick={() => setShowing('cits')}
                  disabled={showing === 'cits'}
                >CITATION</button>
              </>
            }
          </div>
          <div style={{clear:'both'}}></div>
        </div>
        

        {
          showing === 'type' &&
            <div className="ui container" id="publications-type">
                  {
                    customSortOrder.map(typ => {
                      return (
                        <div className="ui grid" key={typ} style={noMarginGrid}>
                            <div className="row">
                              <h1>{typ}</h1>
                            </div>
                            {
                              referencesDetail[typ] && referencesDetail[typ].map((ref, index) => {
                                let title = ref.title.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                                title = title.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                                const icostr = title.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline'
                                return (
                                  <div className="row" key={index}>
                                    <div className="two wide column">
                                      <MediaContextProvider>
                                        <Media at="sm">
                                          <i aria-hidden="true" className={`grey ${icostr} large icon`}></i>
                                        </Media>
                                        <Media at="md">
                                          <i aria-hidden="true" className={`grey ${icostr} huge icon`}></i>
                                        </Media>
                                        <Media greaterThanOrEqual="lg">
                                          <i aria-hidden="true" className={`grey ${icostr} big icon`}></i>
                                        </Media>
                                        </MediaContextProvider>
                                    </div>
                                    <div className="fourteen wide column">
                                      <div className="item">
                                        <div className="content">
                                          <div className="header" dangerouslySetInnerHTML={{__html: title}}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            }
                        </div>
                      )
                    })
                  }
                <div className="spacer"></div>
            </div>
        }

        {
          showing === 'year' &&
            <div className="ui container" id="publications-year">
                  {
                    keysYear.map(year => {
                      return (
                        <div className="ui grid" key={year} style={noMarginGrid}>
                            <div className="row">
                              <h1>{year}</h1>
                            </div>
                            {
                              references[year].map((item, index) => {
                                item.__html = item.__html.replace('Jonas Oppenlaender', '<strong>Jonas Oppenlaender</strong>')
                                item.__html = item.__html.replace('Jonas Oppenländer', '<strong>Jonas Oppenländer</strong>')
                                item.__html = item.__html.replace('--', '–')
                                const icostr = item.__html.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline'
                                return (
                                  <div className="row" key={index}>
                                    <div className="two wide column">
                                      <MediaContextProvider>
                                        <Media at="sm">
                                          <i aria-hidden="true" className={`grey ${icostr} large icon`}></i>
                                        </Media>
                                        <Media at="md">
                                          <i aria-hidden="true" className={`grey ${icostr} huge icon`}></i>
                                        </Media>
                                        <Media greaterThanOrEqual="lg">
                                          <i aria-hidden="true" className={`grey ${icostr} big icon`}></i>
                                        </Media>
                                      </MediaContextProvider>
                                    </div>
                                    <div className="fourteen wide column">
                                      <div className="item">
                                        <div className="content">
                                          <div className="header" dangerouslySetInnerHTML={item}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            }
                        </div>
                      )
                    })
                  }
            </div>
        }

        {
          showing === 'cits' &&
            <div className="ui container" id="publications-cits">
                  {
                    citations.map(c => {
                      const icostr = c.__html ? c.__html.indexOf('.pdf') === -1 ? 'file outline' : 'file alternate outline' : 'file outline'
                        return (
                          <div className="ui grid" key={c.title} style={noMarginGrid}>
                              <div className="row">
                                <div className="one wide column">
                                  <MediaContextProvider>
                                    <Media at="sm">
                                      <i aria-hidden="true" className={`grey ${icostr} large icon`}></i>
                                    </Media>
                                    <Media at="md">
                                      <i aria-hidden="true" className={`grey ${icostr} huge icon`}></i>
                                    </Media>
                                    <Media greaterThanOrEqual="lg">
                                      <i aria-hidden="true" className={`grey ${icostr} big icon`}></i>
                                    </Media>
                                    </MediaContextProvider>
                                </div>
                                {
                                  c.__html ?
                                    <div className="thirteen wide column" dangerouslySetInnerHTML={c}></div>
                                  :
                                    <div className="thirteen wide column">{c.title}</div>
                                }
                                <div className="two wide column">
                                  {c.citations.replace('*', '')}
                                </div>
                              </div>
                          </div>
                      )
                    })
                  }
              <div className="spacer"></div>
            </div>
        }

      </div>
    </Layout>
  )
}
