import React from "react"
import { Helmet } from "react-helmet"
import { Container, Button } from 'semantic-ui-react'
import { spacer } from "../../common"
import Keywords from "../../components/keywords"
import Layout from "../../components/layout"
import GraphSwitcher from "../../components/GraphSwitcher"


const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'


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
    const { keywords } = this.state
    const filtered_keywords = keywords.filter(kw => kw.num > 19)
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Research Interests {'//'} jonaso.de</title>
          <link rel="canonical" href="https://www.jonaso.de/research/interests" />
        </Helmet>
        <Container>
          <h2 style={{float:'left', display:'inline-block'}}>
            Research Interests
            {' '}
            <GraphSwitcher active="interests" />
          </h2>
          <Keywords keywords={filtered_keywords} />
          <div style={spacer}></div>
        </Container>
      </Layout>
    )
  }
}

export default Interests
