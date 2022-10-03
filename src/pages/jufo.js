// import 'semantic-ui-css/components/card.min.css'

import React from "react"
// Card, Image, Label
import { Container, Header } from 'semantic-ui-react'
import Layout from "../components/layout"
import { spacer } from "../common"
import { Seo } from "../components/Seo"


export function Head() {
  return (
    <Seo
      title="Jufo // jonaso.de"
    >
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/jufo" />
    </Seo>
  )
}

class JufoPage extends React.Component {
  state = {
    jufo: false,
  }
  componentDidMount = () => {
    fetch('https://www.jonaso.de/static/references-detail.json')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server: Could not get jufo points")
      }
      return response.json()
    })
    .then(publications => {
			console.log(publications)
			let jufo = publications.map(x => x.jufo ? x.jufo : 0).reduce(( previousValue, currentValue ) => parseInt(previousValue, 10) + parseInt(currentValue, 10), 0)
			this.setState({
				jufo,
			})
		})
  }
  render() {
  	const { jufo } = this.state
    return (
	   	<Layout>
	      <Container>
					<Header as='h1' textAlign='center' content="Jufo Points" />
	        <section style={{textAlign:'center'}}>
	        	<p style={{fontSize:'22pt'}}>{jufo ? <span>&asymp; {jufo}</span> : 'loading'}</p>
	        </section>
          <div className="spacer" style={spacer}></div>
	      </Container>
        </Layout>
    )
  }
}


export default JufoPage
