/*
  DEV: this is supposed to become an up-to-date reading list synced from my PC
*/

import React from "react"
import { Container, Label} from 'semantic-ui-react'
import { spacer } from "../common"

const styles = {
  clear: {
    clear: 'both',
    marginBottom: '5em',
  },
  label: {
    marginBottom: '0.5em',
    cursor: 'default',
    float:'left',
    marginRight: '1em',
  },
}

const AuthorList = ({list}) => {
  // console.log('list',list)
  if (!list) {
    return null;
  }
  return (<div>
    {
      list.map((author, index) => {
        if (author.num <= 1) { return null }
        return (
                <div key={index}>
                  <Label style={styles.label} title={author.num > 1 ? author.num + ' publications' : author.num + ' publication'}>
                    {author.name}
                    <Label.Detail>{author.num}</Label.Detail>
                  </Label>
                </div>
        )
      })
    }
    </div>)
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
            <AuthorList list={influencer[3]} />
          </div>
          <div style={styles.clear}>
            <h3>Influential</h3>
            <AuthorList list={influencer[2]} />
          </div>
          <div style={styles.clear}>
            <h3>Relevant</h3>
            <AuthorList list={influencer[1]} />
          </div>
          <div style={styles.clear}></div>
        </Container>
    )
  }
}

export default Influencer
