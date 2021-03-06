import React from "react"
import { Container } from 'semantic-ui-react'
import { spacer } from "../common"
import Influencer from "../components/influencer"
import Keywords from "../components/keywords"
import Layout from "../components/layout"
/* import KeywordCloud from '../components/cloud' */


const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'
const _KEYWORDS = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/keywords.json'


class Interests extends React.Component {
  state = {
    influencer: [],
    keywords: [],
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
      // let influencer = {}
      // for (let i=1; i < 4; i++) {
      //   // already exists?
      //     data[i].forEach(el => {
      //       if (influencer.hasOwnProperty(el.id)) {
      //         // increase the num
      //         influencer[el.id]['num'] = influencer[el.id]['num'] + el.num
      //       } else {
      //         influencer[el.id] = {
      //           name: el.name,
      //           num: el.num,
      //           id: el.id,
      //         }
      //       }
      //     })
      // }
      // console.log('influencer', influencer)
      this.setState({ influencer: data })
    })
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
    const { influencer, keywords } = this.state
    const filtered_keywords = keywords.filter(kw => kw.num > 14)
    return (
      <Layout>
        <Container>
          {/* <KeywordCloud /> */}
          <Keywords keywords={filtered_keywords} />
          <Influencer influencer={influencer} />
          <div style={spacer}></div>
        </Container>
      </Layout>
    )
  }
}

export default Interests
