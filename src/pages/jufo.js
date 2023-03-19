"use client"

import React from "react"
import Layout from "../components/layout"
import { Seo } from "../components/Seo"
import { spacer } from "../common"


export function Head() {
  return (
    <Seo title="Jufo // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/jufo/" />
    </Seo>
  )
} //

class JufoPage extends React.Component {
  state = {
    jufo: false,
  }
  componentDidMount = () => {
    fetch('/static/references-detail.json')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server: Could not get jufo points")
      }
      return response.json()
    })
    .then(publications => {
			let jufo = publications.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)
			this.setState({ jufo })
		})
  }
  render() {
  	const { jufo } = this.state
    return (
	   	<Layout>
	      <div className="ui container">
					<h1>Jufo Points</h1>
	        <section style={{textAlign:'center'}}>
	        	<p style={{fontSize:'22pt'}}>{jufo ? <span>&asymp; {jufo}</span> : '...loading...'}</p>
	        </section>
          <div className="spacer" style={spacer}></div>
	      </div>
      </Layout>
    )
  }
}


export default JufoPage
