/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/
import 'semantic-ui-css/components/loader.min.css'

import React from "react"
import { Table, Container, Loader, Segment, Dimmer } from 'semantic-ui-react'
import Layout from "../../components/layout"
import PubGraph from "../../components/PubGraph.js"
import { spacer } from "../../common"
import { Seo } from "../../components/Seo"

// import "semantic-ui-css/components/table.css"


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
        unrecognized_overall_percent: documents.unrecognized_overall_percent,
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
        <Container>

            <PubGraph documents={documents} />

            <h1>
              100 Recently Read Publications
              <div style={styles.lastupdate}><span className="mobilehide">Last updated:</span> <span>{modified}</span></div>
              <div style={styles.unrecognized}>Unrecognized overall: <span>{unrecognized_overall} ({unrecognized_overall_percent * 100}%)</span></div>
            </h1>

{
  isLoading ?
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
  :
            <Table padded collapsing={false} stackable striped size='small'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell style={{maxWidth:'450px'}}>Author(s)</Table.HeaderCell>
                  <Table.HeaderCell className="mobilehide" collapsing>Year</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Keywords</Table.HeaderCell>
                  <Table.HeaderCell className="mobilehide" title="Relevance to my past or current research OR importance to the respective field">Relevance/<br />Importance</Table.HeaderCell>
                  <Table.HeaderCell className="mobilehide">Read</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                    documents.map((doc, idx) => {
                      return (
                        <Table.Row key={`id_${idx}`}>
                          <Table.Cell style={{wordBreak:'break-all'}} textAlign="left">{doc.title}</Table.Cell>
                          <Table.Cell singleLine style={{wordBreak:'break-all',maxWidth:'450px'}} textAlign="left">{doc.authors.join(', ')}</Table.Cell>
                          <Table.Cell className="mobilehide" textAlign="left">{doc.year}</Table.Cell>
                          <Table.Cell textAlign="left">{doc.keywords}</Table.Cell>
                          <Table.Cell className="mobilehide" textAlign="center">{doc.priority}</Table.Cell>
                          <Table.Cell className="mobilehide" textAlign="left">{this.getDate(doc.modified * 1000)}</Table.Cell>
                        </Table.Row>
                      )
                    })
                }
              </Table.Body>
            </Table>
}

            <div style={spacer}></div>

        </Container>
      </Layout>
    )
  }
}

export default ReadingList
