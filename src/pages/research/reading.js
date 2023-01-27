/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/
import 'semantic-ui-css/components/loader.min.css'
// import "semantic-ui-css/components/table.css"

import React from "react"
import Layout from "../../components/layout"
import PubGraph from "../../components/PubGraph.js"
import { spacer } from "../../common"
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
  }
}

const zeroPadding = v => (v < 10 ? '0' : '') + v


export function Head() {
  return (
    <Seo
      title="Reading // jonaso.de"
    >
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/reading" />
    </Seo>
  ) //
}

class ReadingList extends React.Component {
  state = {
    documents: [],
    isLoading: true,
    modified: 'loading',
    unrecognized_overall: undefined,
    unrecognized_overall_percent: undefined,
  }
  componentDidMount = () => {
    // get reading list
    fetch(_LIST_URL)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(documents => {
      this.setState({
        modified: this.getDate(documents.modified * 1000),
        documents: documents.documents,
        unrecognized_overall: documents.unrecognized_overall,
        unrecognized_overall_percent: documents.unrecognized_overall_percent * 100,
        isLoading: false,
      })
    })
  }
  getDate(timestamp) {
    const d = new Date(timestamp)
    const year = d.getFullYear()
    const month = d.getMonth() + 1 // 0...11
    const day = d.getDate()
    const hour = d.getHours()
    const min = d.getMinutes()
    // return `${year}-${month}-${day} ${d.format("hh:mm")}`
    return `${year}-${month}-${day} ${zeroPadding(hour)}:${zeroPadding(min)}`
  }
  render() {
    const { isLoading, documents, modified, unrecognized_overall, unrecognized_overall_percent } = this.state
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
                <div className="ui segment">
                  <div className="ui active transition visible inverted dimmer" style={{display: 'flex !important'}}>
                    <div className="ui inverted text loader">Loading</div>
                  </div>
                </div>
            }

            {
              documents &&
                <table className="ui small stackable striped padded table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th style={{maxWidth:'450px'}}>Author(s)</th>
                      <th className="mobilehide collapsing">Year</th>
                      <th className="collapsing">Keywords</th>
                      <th className="mobilehide" title="Relevance to my past or current research OR importance to the respective field">Relevance/<br />Importance</th>
                      <th className="mobilehide">Read</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        documents.map((doc, idx) => {
                          return (
                            <tr key={`id_${idx}`}>
                              <td className="left aligned" style={{wordBreak:'break-all'}}>{doc.title}</td>
                              <td className="single line left aligned" style={{wordBreak:'break-all',maxWidth:'450px'}}>{doc.authors.join(', ')}</td>
                              <td className="left aligned mobilehide">{doc.year}</td>
                              <td className="left aligned">{doc.keywords}</td>
                              <td className="center aligned mobilehide">{doc.priority}</td>
                              <td className="left aligned mobilehide">{this.getDate(doc.modified * 1000)}</td>
                            </tr>
                          )
                        })
                    }
                  </tbody>
                </table>
            }

            <div style={spacer}></div>

        </div>
      </Layout>
    )
  }
}

export default ReadingList
