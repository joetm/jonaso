import 'semantic-ui-css/components/card.min.css'

import React from "react"
import { Card, Image } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Seo } from "../components/Seo"

// const styles = {}

const src = "http://localhost:8000/static/opp-1924a88836b85f62ee5d9a0754979b59.jpg"


export function Head() {
  return (
    <Seo title="UX // jonaso.de">
      <link id="canonical" rel="canonical" href="https://www.jonaso.de/ux" />
    </Seo>
  )
} //

class UX extends React.Component {
  render() {
    return (
	   	<Layout>
	      <div className="ui container">
	 			  <h1>UX Portfolio</h1>
	        <Card.Group itemsPerRow={2}>
				    <Card>
  				    <Image src={src} wrapped ui={false} />
					    <Card.Content>
					      <Card.Header>Matthew</Card.Header>
					      <Card.Meta>
					        <span className='date'>Joined in 2015</span>
					      </Card.Meta>
					      <Card.Description>
					        Matthew is a musician living in Nashville.
					      </Card.Description>
					    </Card.Content>
					    <Card.Content extra>
					        22 Friends
					    </Card.Content>
				    </Card>
			  </Card.Group>
	      </div>
        </Layout>
    )
  }
}


export default UX
