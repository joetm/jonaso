import React from "react"
import { Container } from 'semantic-ui-react'
import { spacer } from "../../common"
import Influencer from "../../components/influencer"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"


const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'


export function Head() {
  return (
    <Seo
      title="Research Influences // jonaso.de"
    >
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/influencers" />
    </Seo>
  )
}

class Influencers extends React.Component {
  state = {
    influencer: [],
  }
  componentDidMount = () => {
    // --------------
    // get influencer
    // --------------
    fetch(_INFLUENCER)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(data => {
      this.setState({ influencer: data })
    })
  }
  render() {
    const { influencer } = this.state
    return (
      <Layout>
        <Container>
          <h2 style={{float:'left', display:'inline-block'}}>
            Research Influences
          </h2>
          <Influencer influencer={influencer} />
          <div style={spacer}></div>
        </Container>
      </Layout>
    )
  }
}

export default Influencers
