/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Container } from 'semantic-ui-react'
require('es6-promise').polyfill();
import "isomorphic-fetch"
import { spacer } from "../common"
import Influencer from "./influencer"

const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'

class ReadingList extends React.Component {
  state = {
    influencer: [],
  }
  componentWillMount = () => {
    // get influencer
    fetch(_INFLUENCER)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(people => {
      // console.log(people);
      this.setState({
        influencer: people
      })
    })
  }
  render() {
    const { influencer } = this.state
    return (
      <div>
        <Container>

            <Influencer influencer={influencer} />

            <div style={spacer}></div>

        </Container>
      </div>
    )
  }
}

export default ReadingList
