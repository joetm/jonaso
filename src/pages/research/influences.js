import React from "react"
import { Container } from 'semantic-ui-react'
import { spacer } from "../../common"
import Influencer from "../../components/influencer"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"
import { sortByKey } from "../../common"

// const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'
const _FLATINFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/allauthors.json'

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
    fetch(_FLATINFLUENCER)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(data => {
      const authors = data // .filter(author => author.num > 1)
      // aggregate the authors
      // example what one entry should look like:
      // tmp['<authorname>'] = {
      //   'name': '<authorname>',
      //   'priorities': {
      //     1: { num: 9 },
      //     2: { num: 2 },
      //     3: { num: 1 },
      //   },
      //   'num': 13, // overall number of articles
      //   'priority': 28, // score: level1 * num + level2 * num + level3 * num
      // }
      const tmp = {}
      authors.forEach(author => {
        if (tmp[author.name]) {
          // author already exists: update only the respective fields
          tmp[author.name]['num'] += author.num
          tmp[author.name]['priority'] += author.priority * author.num
          tmp[author.name]['priorities'][""+author.priority] = { 'num': author.num }
        } else {
          // first init
          tmp[author.name] = {
            'id': author.id,
            'name': author.name,
            'num': author.num,
            'priority': author.priority * author.num,
            'priorities': {
              '1': { 'num': 0, },
              '2': { 'num': 0, },
              '3': { 'num': 0, },
            },
          }
          tmp[author.name]['priorities'][""+author.priority] = { 'num': author.num }
        }
      })
      // convert object back to array for easier handling in the render
      let influencer = []
      for (const key in tmp) {
        influencer.push(tmp[key])
      }
      influencer = influencer.filter(author => author.num > 1)
      // influencer = sortByKey(influencer, 'num')
      influencer = sortByKey(influencer, 'priority') // priority score consisting of: 1 * num(1) + 2 * num(2) + 3 * num(3)
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
    )
  }
}

export default Influencers
