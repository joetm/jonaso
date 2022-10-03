import React from "react"
import { Container } from 'semantic-ui-react'
import { spacer } from "../../common"
import Influencer from "../../components/influencer"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"


const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'
const _ALLAUTHORS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/allauthors.json'


export function Head() {
  return (
    <Seo title="Research Influences // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/influencers" />
    </Seo>
  ) //
}

class Influencers extends React.Component {
  state = {
    influencer: [],
  }
  componentDidMount = () => {
    // get influencer
    fetch(_ALLAUTHORS)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(data => {
      //filter
      data = data.filter(el => el.num > 2)
      //group
      let influencer = {}
      data.forEach(el => {
        if (influencer[el.name]) {
          influencer[el.name].num += el.num
          influencer[el.name]['id'][""+el.importance] = el.id
        } else {
          //first init
          influencer[el.name] = {
            'num': el.num,
            'id': {""+el.importance: el.id},
          }
        }
      })
      this.setState({ influencer })
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
    ) //
  }
}

export default Influencers
