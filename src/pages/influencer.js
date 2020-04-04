/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Container, Label, Segment } from 'semantic-ui-react'

import { spacer } from "../common"
import "./influencer.css"


const styles = {
  clear: {
    clear: 'both',
    marginBottom: '5em',
  },
  label: {
    marginBottom: '0.5em',
    marginRight: '1em',
    float:'left',
  },
  detailswrapper: {
    clear: 'both',
  },
}


const KeywordWrapper = ({title, items}) => (
  <div style={{clear:'both'}}>
    <h4 key={`${title}-t`}>{title}</h4>
    <div style={{clear:'both'}} key={`${title}-i`}>{items}</div>
  </div>
) //`

const PubWrapper = ({title, items}) => (
  <div style={{paddingTop: '1rem', marginTop: '1rem', clear:'both'}}>
    <h4 key={`${title}-t`}>{title}</h4>
    <ol key={`${title}-i`}>{items}</ol>
  </div>
) //`

const DetailContainer = ({authorid, details, priority}) => {
  const { docs=[], keywords=[] } = details
  // console.info("keywords", keywords)
  // console.info("docs", docs)

  // const kwlist = keywords.join(", ")
  const kwlist = keywords.map((kw, i) => <Label style={styles.label} as="a" color='teal' key={`kw${i}${authorid}${kw}`}>{kw}</Label>) //`;

  const publist = docs.filter(doc => doc.priority === priority).map((doc, i) => (
            <li key={`p${i}${authorid}${doc.priority}${doc.title}`}>{doc.title}</li>
        )) //`

  return (
    <div style={styles.detailswrapper} key={`a-a${authorid}`}>
      <KeywordWrapper title="Keywords" items={kwlist} />
      <PubWrapper title="Publications" items={publist} />
    </div>
  )
} //`


class AuthorList extends React.Component {
  state = {
    details: {}, // cache of details
    activeid: null,
  }
  detailsVisible = () => {
    return this.state.activeid !== null
  }
  getAuthorDetails = (author) => {
    const id = author.id
    // ------
    // remove, when the same author is clicked a second time
    // ------
    if (id == this.state.activeid) {
      const details = this.state.details
      delete details[id];
      this.setState({
        activeid: null,
        details,
      })
      return
    }
    // TODO
    // remove all open detail boxes



    // ------
    // add
    // ------
    // cache check
    const details = this.state.details
    if (details[id]) {
      this.setState({activeid: id})
      return
    }    
    // load from remote
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencers/${id}.json`
    fetch(url)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(res => {
      // console.info("Ajax response", res)
      // update cache with details
      const details = this.state.details
      details[id] = res
      this.setState({
        activeid: id,
        details,
      })
    })
  }
  render () {
    const { list, priority } = this.props
    const { details, activeid } = this.state
    // console.log('list', list)
    if (!list) {
      return null
    }
    return (
      <div>
        {
          list.map((author, index) => {
            if (author.num <= 1) { return null }
            return (
              <div key={`${index}_${author.id}`} id={author.id}>
                <Label
                  style={styles.label}
                  as="a"
                  color={activeid === author.id ? 'red' : null}
                  title={author.num > 1 ? author.num + ' publications' : author.num + ' publication'}
                  onClick={() => this.getAuthorDetails(author)}
                >
                  {author.name}
                  <Label.Detail>{author.num}</Label.Detail>
                </Label>
                {details[author.id] && activeid === author.id &&
                  <DetailContainer authorid={author.id} priority={priority} details={details[author.id]} />
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}


class Influencer extends React.Component {
  state = {
    pointer: 10,
  }
  render() {
    const { influencer = [] } = this.props
    const { pointer } = this.state
    // console.log('influencer', influencer)

    return (
        <Container>
          <h2>Influencers</h2>
          <div style={styles.clear}>
            <h3>Highly influential</h3>
            <AuthorList priority={3} list={influencer[3]} />
          </div>
          <div style={styles.clear}>
            <h3>Influential</h3>
            <AuthorList priority={2} list={influencer[2]} />
          </div>
          <div style={styles.clear}>
            <h3>Relevant</h3>
            <AuthorList priority={1} list={influencer[1]} />
          </div>
          <div style={styles.clear}></div>
        </Container>
    )
  }
}

export default Influencer
