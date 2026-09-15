import 'semantic-ui-css/components/item.min.css'

import React from "react"


const styles = {
  datum: {
    paddingRight: '2em',
    minWidth: '120px',
  },
  nonbold: {
    fontWeight: 'normal',
    fontSize: '1em',
  },
}


export default function Teaching() {
  return (
        <div className="ui container">

          <h1 id="education" style={{textAlign:'center'}}>Teaching Assistant</h1>

            <div className="ui items">

              <div className="item">
                <div style={styles.datum}>Autumn term 2018</div>
                <div className="content">
                  <div className="header">
                      Social Computing
                  </div>
                </div>
              </div>

              <div className="item">
                <div style={styles.datum}>Autumn term 2018</div>
                <div className="content">
                  <div className="header">
                      Human Computer Interaction
                  </div>
                </div>
              </div>

            </div>
        </div>
  )
}
