/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

"use client"

import 'semantic-ui-css/components/loader.min.css'
import "semantic-ui-css/components/table.min.css"

import React, { useState, useEffect } from "react"
import 'semantic-ui-css/components/loader.min.css'
import "semantic-ui-css/components/table.min.css"
import { priocolors } from "../../common"
import Layout from "../../components/layout"
import PubGraph from "../../components/Graphs/PubGraph"
import { Seo } from "../../components/Seo"


const _LIST_URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/readlist-latest.json'

const styles = {
  lastupdate: {
    fontWeight: 'normal',
    fontSize: '0.6em',
    textAlign: 'right',
    float: 'right',
  },
  unrecognized: {
    fontWeight: 'normal',
    fontSize: '0.6em',
    textAlign: 'right',
  },
}


export function Head() {
  return (
    <Seo title="Reading // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/reading/" />
    </Seo>
  ) //
}


export default function ReadingList() {

  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modified, setModified] = useState('loading')
  const [unrecognized_overall, setUnrecognized_overall] = useState()
  const [unrecognized_overall_percent, setUnrecognized_overall_percent] = useState()
  const [percents, setPercents] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const zeroPadding = v => (v < 10 ? '0' : '') + v

  const copyToClipboard = async (e, filename) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(filename)
      setCopiedIndex(filename)
      setTimeout(() => setCopiedIndex(null), 2500) // Reset after 1 second
    } catch (err) {
      console.error('Error copying text to clipboard', err)
    }
  }

  function getKeywords(doc) {
    let kwfirst = ''
    let kwlast = ''
    if (doc.keywords) {
      if (typeof doc.keywords === 'string') {
        doc.keywords = doc.keywords.split('>')
      }
      kwfirst = doc.keywords[0].trim()
      kwlast = doc.keywords[doc.keywords.length - 1].trim()
    }
    return [ kwfirst, kwlast ]
  }
  
  function makeEtAl(authors) {
    if (authors.length > 2) {
      return authors[0] + ' et al.'
    }
    return authors.join(', ')
  }
  
  function getDate(ts) {
    const d = new Date(ts)
    const year = d.getFullYear()
    const month = d.getMonth() + 1 // 0...11
    const day = d.getDate()
    const hour = d.getHours()
    const min = d.getMinutes()
    return `${year}-${month}-${day} ${zeroPadding(hour)}:${zeroPadding(min)}`
  }

  function getKWPercents(docs) {
    const percs = {}
    const kwfirsts = docs.map(doc => {
      let f = getKeywords(doc)[0]
      return f
    })
    kwfirsts.forEach(kw => {
      percs[kw] = percs[kw] ? percs[kw] + 1 / kwfirsts.length : 1 / kwfirsts.length
    })
    let keys = Object.keys(percs)
    keys.sort((a, b) => percs[b] - percs[a])
    const out = []
    keys.forEach(kw => {
      out.push([kw, parseFloat((percs[kw] * 100).toPrecision(1))])
    })
    setPercents(out)
  }

  async function getDocs() {
    try {
      const res = await fetch(_LIST_URL)
      const docs = await res.json()
      setDocuments(docs.documents)
      setModified(getDate(docs.modified * 1000))
      setUnrecognized_overall(docs.unrecognized_overall)
      setUnrecognized_overall_percent(docs.unrecognized_overall_percent * 100)
      setIsLoading(false)
      getKWPercents(docs.documents)
    } catch (err) {
      console.error("Error fetching reading list")
    }
  }

  useEffect(() => {
    getDocs()
  }, [])


  return (
    <Layout>
      <div className="ui container">

          <PubGraph documents={documents} />

          <h1 style={{textAlign: 'left'}}>
            100 Recently Read Publications
            <div style={styles.lastupdate}><span className="mobilehide">Last updated:</span> <span>{modified}</span></div>
            <div style={styles.unrecognized}>
              Unrecognized overall: <span>{unrecognized_overall}
              {' '}
              {
                unrecognized_overall_percent && `(${parseFloat(unrecognized_overall_percent).toPrecision(2)}%)`
              }
              </span>
            </div>
          </h1>

          {
            isLoading &&
              <div className="ui">
                <div className="ui active transition visible inverted dimmer" style={{display: 'flex !important'}}>
                  <div className="ui inverted text loader">Loading</div>
                </div>
              </div>
          }

          <div className="ui segment">
            {
              percents.map((kw, idx) => {
                return (
                  <div key={`kw${idx}`} style={{display:'inline-block', marginRight: '1rem'}}>
                    <span className="ui basic blue label">{kw[0]}</span>
                    {' '}
                    {kw[1]}%
                  </div>
                )
              })
            }
          </div>

          {
            documents.length &&
              <table className="ui compact small stackable striped table" style={{fontSize:'.9rem'}}>
                <thead className="ui mobile hidden">
                  <tr>
                    <th className="left aligned">Title</th>
                    <th className="left aligned" style={{maxWidth:'350px'}}>Author(s)</th>
                    <th className="mobilehide collapsing center aligned">Year</th>
                    <th className="collapsing">Keywords</th>
                    <th className="mobilehide center aligned" title="Relevance to my past or current research OR importance to the respective field">Relevance/<br />Importance</th>
                    <th className="mobilehide">Read</th>
                    <th className="mobilehide">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      documents.map((doc, idx) => {
                        let [ kwfirst, kwlast ] = getKeywords(doc)
                        return (
                          <tr key={`doc${idx}`}>
                            <td className="left aligned" style={{wordBreak:'break-all'}} title={doc.filename}>{doc.title}</td>
                            <td className="single line left aligned" style={{wordBreak:'break-all',maxWidth:'250px'}}>{makeEtAl(doc.authors)}</td>
                            <td className="left aligned mobilehide">{doc.year}</td>
                            <td className="left aligned">
                              {
                                kwfirst === kwlast ?
                                  <span className="ui mini basic blue label">{kwfirst}</span> :
                                  <><span className="ui mini basic blue label">{kwfirst}</span>&gt;<span className="ui mini basic label">{kwlast}</span></>
                              }
                            </td>
                            <td className="center aligned mobilehide">
                              <span className={`ui ${priocolors[doc.priority]} circular label docprio`}>{doc.priority}</span>
                            </td>
                            <td className="left aligned mobilehide">{getDate(doc.modified * 1000)}</td>
                            <td className="left aligned mobilehide">
                              <div
                                title="copy filename"
                                style={{margin:'5px 5px 0 0',cursor:'pointer'}}
                                onClick={(e) => copyToClipboard(e, doc.filename)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') { copyToClipboard(e, doc.filename) }
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={copiedIndex === doc.filename ? '#2E8B57' : 'currentColor'} className="bi bi-copy" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
                                </svg>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </table>
          }

      </div>
    </Layout>
  )
}
