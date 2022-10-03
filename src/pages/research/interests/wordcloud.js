import React from "react"
// import { navigate } from 'gatsby'
import { Container } from 'semantic-ui-react'
import { spacer } from "../../../common"
import Layout from "../../../components/layout"
import KeywordCloud from '../../../components/cloud'
import GraphSwitcher from "../../../components/GraphSwitcher"
import { Seo } from "../../../components/Seo"


const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'


export function Head() {
  return (
    <Seo
      title="Research Interests (Cloud) // jonaso.de"
    >
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/interests/wordcloud" />
    </Seo>
  )
}

class Interests extends React.Component {
  state = {
    keywords: [],
  }
  componentDidMount = () => {
    // ------------
    // get keywords
    // ------------
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
    // const { keywords } = this.state
    // const filtered_keywords = keywords.filter(kw => kw.num > 9)
    return (
      <Layout>
        <Container>
          <h2>
            Research Interests
            {' '}
            <GraphSwitcher active="wordcloud" />
          </h2>
          <KeywordCloud />
          <div style={spacer}></div>
        </Container>
      </Layout>
    )
  }
}

export default Interests
