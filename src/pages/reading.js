/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import Link from "gatsby-link"
import { Responsive, Header, List, Item, Icon, Grid, Container } from 'semantic-ui-react'
import "isomorphic-fetch"
import { spacer } from "../common"

// const _READINGLIST = "http://jonaso.de/static/readinglist.json"

//dev
const documents = [
  {
    file: '++++++++++++D07-1074.pdf',
    title: 'TITLE HERE',
    author: 'AUTHOR HERE',
    year: '2000',
  },
  {
    file: '+++++++++AAAI06-223.pdf',
    title: 'TITLE HERE',
    author: 'AUTHOR HERE',
    year: '2000',
  },
  {
    file: '+++++++++ECIS_2009_taxonomy_final_3.pdf',
    title: 'TITLE HERE',
    author: 'AUTHOR HERE',
    year: '2000',
  },
  {
    file: 'FOIS98.pdf',
    title: 'TITLE HERE',
    author: 'AUTHOR HERE',
    year: '2000',
  },
]


class ReadingList extends React.Component {
  state = {
    documents: [],
  }
  componentWillMount = () => {

    // fetch(_READINGLIST)
    // .then(response => response.json())
    // .then(documents => {
      this.setState({documents})
    // })
  }
  render() {
    const { documents } = this.state
    return (
      <div>
        <Container>

              <Header size="large">Reading List</Header>

              <ul>
              {
                documents.map(doc => {
                  return (
                    <li>{doc.author} {doc.year}: {doc.title} [{doc.file}]</li>
                  )
                })
              }
              </ul>

            <div style={spacer}></div>

        </Container>
      </div>
    )
  }
}

export default ReadingList
