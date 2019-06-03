/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import Link from "gatsby-link"
import { Table, Responsive, Header, List, Label, Item, Icon, Grid, Container } from 'semantic-ui-react'
// require('es6-promise').polyfill();
import "isomorphic-fetch"

import PubGraph from "../PubGraph.js"
import { spacer } from "../common"

// import "semantic-ui-css/components/table.css"


const _LIST_URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/readlist-latest.json'

const styles = {
  lastupdate: {
    fontWeight: 'normal',
    fontSize: '0.6em',
    textAlign: 'right',
    float: 'right',
  }
}

const zeroPadding = v => (v < 10 ? '0' : '') + v


class ReadingList extends React.Component {
  state = {
    documents: [],
    modified: 'loading',
  }
  componentWillMount = () => {
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
        documents: documents.documents
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
    const { documents, modified } = this.state
    return (
      <div>
        <Container>

            <PubGraph documents={documents} />

            <Header size="large">
              100 Recently Read Publications
              <div style={styles.lastupdate}>Last updated: <span>{modified}</span></div>
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
                        <Table.Cell textAlign="left">{doc.title}</Table.Cell>
                        <Table.Cell textAlign="left">{doc.authors.join(', ')}</Table.Cell>
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
      </div>
    )
  }
}

export default ReadingList
