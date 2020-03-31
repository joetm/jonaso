/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Container, Label} from 'semantic-ui-react'

import { spacer } from "../common"
import "./influencer.css"


const styles = {
  clear: {
    clear: 'both',
    marginBottom: '5em',
  },
  label: {
    marginBottom: '0.5em',
    cursor: 'pointer',
    float:'left',
    marginRight: '1em',
  },
  detailswrapper: {
    clear: 'both',
    border: '1px solid black',
  },
}

const Wrapper = ({title, items}) => (
  <div>
    <div key={`${title}-2`}>{title}</div>
    <div key={`${title}-2`}>{items}</div>
  </div>
)

const DetailContainer = ({authorid, details}) => {
  const { docs=[], keywords=[] } = details
  const kwlist = keywords.map(kw => <div className="ui label" key={`t${authorid}-kw-${kw}`}>{kw}</div>)
  const publist = docs.map(doc => (
          <div key={`t${authorid}${doc.priority}${doc.title}`}>{doc.title}</div>
        ))

  return (
    <div style={styles.detailswrapper} key={`a-a${authorid}`}>
      <Wrapper key={`w-a${authorid}-1`} title="Keywords" items={kwlist} />
      <Wrapper key={`w-a${authorid}-2`} title="Publications" items={publist} />
    </div>
  )
}


class AuthorList extends React.Component {
  state = {
    details: {},
    activeid: null,
  }
  getAuthorDetails = (author) => {
    const id = author.id
    // remove
    if (id == this.state.activeid) {
      const details = this.state.details
      delete details[id];
      this.setState({
        activeid: null,
        details,
      })
      return
    }
    // add
    const url = `https://raw.githubusercontent.com/joetm/jonaso/master/reading_list/influencers/${id}.json`
    fetch(url)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    })
    .then(res => {
      console.info(res)
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
                  color={activeid === author.id ? 'red' : null}
                  title={author.num > 1 ? author.num + ' publications' : author.num + ' publication'}
                  onClick={() => this.getAuthorDetails(author)}
                >
                  {author.name}
                  <Label.Detail>{author.num}</Label.Detail>
                </Label>
                {details[author.id] &&
                  <DetailContainer authorid={author.id} details={details[author.id]} />
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
