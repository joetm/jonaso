/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import Link from "gatsby-link"
import { Table, Responsive, Header, List, Label, Item, Icon, Grid, Container } from 'semantic-ui-react'
require('es6-promise').polyfill();
import "isomorphic-fetch"
import { spacer } from "../common"

const _URL = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/readlist.json'


class ReadingList extends React.Component {
  state = {
    documents: [],
  }
  componentWillMount = () => {
    fetch(_URL)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(documents => {
      // console.log(documents);
      this.setState({documents})
    })
  }
  getDate(timestamp) {
    const d = new Date(timestamp * 1000)
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    const hour = d.getHours()
    const min = d.getMinutes()
    return `${year}-${month}-${day} ${hour}:${min}`
  }
  render() {
    const { documents } = this.state
    return (
      <div>
        <Container>

            <Header size="large">Recently Read Papers</Header>

            <Table padded collapsing={false}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Author(s)</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Year</Table.HeaderCell>
                  <Table.HeaderCell>Keywords</Table.HeaderCell>
                  <Table.HeaderCell>Relevance</Table.HeaderCell>
                  <Table.HeaderCell>Read</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  documents.map((doc, idx) => {
                    return (
                      <Table.Row key={`id_${idx}`}>
                        <Table.Cell textAlign="left">{doc.title}</Table.Cell>
                        <Table.Cell width={2} textAlign="left">{doc.authors.join(', ')}</Table.Cell>
                        <Table.Cell textAlign="left">{doc.year}</Table.Cell>
                        <Table.Cell textAlign="left">{doc.keywords}</Table.Cell>
                        <Table.Cell textAlign="center">{doc.priority}</Table.Cell>
                        <Table.Cell textAlign="left">{this.getDate(doc.modified)}</Table.Cell>
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
