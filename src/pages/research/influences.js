"use client"

import "../../components/influencer.css"

import React from "react"
import { sortByKey, spacer } from "../../common"
import AuthorList from "../../components/influencer"
import Loading from "../../components/influencerLoading"
import Layout from "../../components/layout"
import { Seo } from "../../components/Seo"

export const isProd = process.env.NODE_ENV !== "development"


// const _INFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencer.json'
const _FLATINFLUENCER = 'https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/allauthors.json'


export function Head() {
  return (
    <Seo title="Research Influences // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/influencers/" />
    </Seo>
  ) //
}


export default class Influencers extends React.Component {
  state = {
    influencer: [],
    isLoading: true,
    activeid: null,
    activeAuthors: [],
  }
  updateActive = (obj) => {
    this.setState({ ...obj })
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
      influencer = sortByKey(influencer, 'priority') // priority score consisting of: 1 * num(1) + 2 * num(2) + 3 * num(3)
      this.setState({ influencer, isLoading: false })
    })
  }
  render() {
    const { influencer, isLoading, activeid, activeAuthors } = this.state
    return (
      <Layout>
        <div className="ui container">
          <h2 style={{float:'left', display:'inline-block'}}>
            Research Influences
            { isLoading && <span style={{marginLeft:'1em', fontWeight:100, fontSize:'1em'}}>...loading...</span>}
          </h2>

          { isProd && isLoading && <Loading /> }

          <div className="clear">
            <AuthorList
              list={influencer}
              activeid={activeid}
              activeAuthors={activeAuthors}
              updateActive={this.updateActive}
            />
          </div>
          <div className="clear"></div>

          <div style={spacer}></div>
        </div>
      </Layout>
    )
  }
}
