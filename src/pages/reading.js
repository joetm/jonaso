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
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(function(documents) {
      this.setState({documents})
    })
  }
  render() {
    const { documents } = this.state
    return (
      <div>
        <Container>

            <Header size="large">Reading List</Header>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Authors</Table.HeaderCell>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Keywords</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  documents.map(doc => {
                    return (
                      <Table.Row key={id}>
                        <Table.Cell textAlign="left">{doc.authors.join(', ')}</Table.Cell>
                        <Table.Cell textAlign="left" width="two">{doc.year}</Table.Cell>
                        <Table.Cell textAlign="left" width="one"><Label>{doc.title}</Label></Table.Cell>
                        <Table.Cell textAlign="left" width="two">{doc.keywords}</Table.Cell>
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
