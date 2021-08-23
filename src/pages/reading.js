/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Table, Header, Container } from 'semantic-ui-react'
import Layout from "../components/layout"
import PubGraph from "../components/PubGraph.js"
import { spacer } from "../common"

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


class ReadingList extends React.Component {
  state = {
    documents: [],
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
      // console.log(documents);
      this.setState({
        modified: this.getDate(documents.modified * 1000),
        documents: documents.documents,
        unrecognized_overall: documents.unrecognized_overall,
        unrecognized_overall_percent: documents.unrecognized_overall_percent,
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
    const { documents, modified, unrecognized_overall, unrecognized_overall_percent } = this.state
    return (
      <Layout>
        <Container>

            <PubGraph documents={documents} />

            <Header size="large">
              100 Recently Read Publications
              <div style={styles.lastupdate}>Last updated: <span>{modified}</span></div>
              <div style={styles.unrecognized}>Unrecognized overall: <span>{unrecognized_overall} ({unrecognized_overall_percent * 100}%)</span></div>
            </Header>

            <Table padded collapsing={false}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell style={{maxWidth:'100px'}}>Author(s)</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Year</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Keywords</Table.HeaderCell>
                  <Table.HeaderCell title="Relevance to my past or current research OR importance to the respective field">Relevance/<br />Importance</Table.HeaderCell>
                  <Table.HeaderCell>Read</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  documents.map((doc, idx) => {
                    return (
                      <Table.Row key={`id_${idx}`}>
                        <Table.Cell style={{'word-break':'break-all'}} textAlign="left">{doc.title}</Table.Cell>
                        <Table.Cell style={{'word-break':'break-all'}} textAlign="left">{doc.authors.join(', ')}</Table.Cell>
                        <Table.Cell textAlign="left">{doc.year}</Table.Cell>
                        <Table.Cell textAlign="left">{doc.keywords}</Table.Cell>
                        <Table.Cell textAlign="center">{doc.priority}</Table.Cell>
                        <Table.Cell textAlign="left">{this.getDate(doc.modified * 1000)}</Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>

            <div style={spacer}></div>

        </Container>
      </Layout>
    )
  }
}

export default ReadingList
