import React from "react"
import { Container, Label } from 'semantic-ui-react'

import "./influencer.css"


const styles = {
  label: {
    marginBottom: '0.5em',
    marginRight: '1em',
    float:'left',
  },
  coauthor: {
    textDecoration: 'underline',
  },
}

// ----------------

function randomInt(min=15, max=40) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

class AuthorList extends React.Component {
  render () {
    const numPlaceholders = 200
    const placeholders = [ ...Array(numPlaceholders).keys() ];
    let labelColor = null
    return (
      <>
        {
          placeholders.map((num, index) => {
            return (
              <div key={`${index}`}>
                <Label
                  style={styles.label}
                  as="a"
                  color={labelColor}
                >
                  { ".".repeat(randomInt()) }
                  <Label.Detail>x | x</Label.Detail>
                </Label>
              </div>
            )
          })
        }
      </>
    )
  }
}

// ----------------

class InfluencerLoading extends React.Component {
  render() {
    return (
        <Container>
          <div className="clear">
            <AuthorList />
          </div>
          <div className="clear"></div>
        </Container>
    ) //
  }
}

export default InfluencerLoading
