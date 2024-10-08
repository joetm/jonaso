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

// ----------------

export default function InfluencerLoading() {
  const numPlaceholders = 200
  const placeholders = [ ...Array(numPlaceholders).keys() ]
  return (
    <div className="ui container">
      <div className="clear">
        {
          placeholders.map((num, index) => (
            <div className="ui label" key={`${index}`} style={styles.label}>
              { ".".repeat(randomInt()) }
              <div className="detail">x | x</div>
            </div>
          ))
        }
      </div>
      <div className="clear"></div>
    </div>
  )
}
