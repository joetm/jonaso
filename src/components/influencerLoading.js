import React from "react"

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

const AuthorList = () => {
  const numPlaceholders = 200
  const placeholders = [ ...Array(numPlaceholders).keys() ];
  let labelColor = null
  return (
    <>
      {
        placeholders.map((num, index) => (
          <div className="ui label" key={`${index}`} style={styles.label}>
            { ".".repeat(randomInt()) }
            <div className="detail">x | x</div>
          </div>
        ))
      }
    </>
  )
}

// ----------------

const InfluencerLoading = () => (
  <div className="ui container">
    <div className="clear">
      <AuthorList />
    </div>
    <div className="clear"></div>
  </div>
) //

export default InfluencerLoading
