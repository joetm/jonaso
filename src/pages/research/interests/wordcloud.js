"use client"

import React from "react"
// import { navigate } from 'gatsby'
import Layout from "../../../components/layout"
import KeywordCloud from '../../../components/cloud'
import GraphSwitcher from "../../../components/GraphSwitcher"
import { Seo } from "../../../components/Seo"
import { spacer } from "../../../common"


const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'


export function Head() {
  return (
    <Seo title="Research Interests (Cloud) // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests/wordcloud/" />
    </Seo>
  ) //
} 

class Interests extends React.Component {
  state = {
    keywords: [],
  }
  componentDidMount = () => {
    fetch(_KEYWORDS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(keywords => this.setState({ keywords }))
  }
  render() {
    return (
      <Layout>
        <div className="ui container">
          <div className="ui segment" style={{clear:'both', border:0, boxShadow: '0px 0px 0px #FFFFFF'}}>
            <h2 style={{float:'left', display:'inline-block', marginRight: '1rem'}}>Research Interests</h2>
              {' '}
              <GraphSwitcher active="wordcloud" />
          </div>
          <KeywordCloud />
          <div style={spacer}></div>
        </div>
      </Layout>
    ) //
  }
}

export default Interests
