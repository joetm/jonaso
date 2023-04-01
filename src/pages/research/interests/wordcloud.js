"use client"

import React from "react"
import { navigate } from 'gatsby'
import KeywordCloud from '../../../components/cloud'
import Layout from "../../../components/layout"
import { Seo } from "../../../components/Seo"


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
            <div class="ui mini buttons">
              <button className="ui button"
                onClick={() => navigate('/research/interests')}
                disabled=""
                tabIndex="-1"
              >Bar</button>
              <div class="or"></div>
              <button className="ui active button"
                onClick={() => navigate('/research/interests/wordcloud')}
                disabled={true}
              >Cloud</button>
            </div>
          </div>
          <KeywordCloud />
          <div className="spacer"></div>
        </div>
      </Layout>
    ) //
  }
}

export default Interests
