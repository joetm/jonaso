import 'semantic-ui-css/components/card.min.css'
import 'semantic-ui-css/components/icon.min.css'

import React from "react"
import { Card, Image, Container } from 'semantic-ui-react'
import Icon from 'semantic-ui-react/dist/es/elements/Icon/Icon.js'
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
	      <Container>
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
					        <Icon name='user' />
					        22 Friends
					    </Card.Content>
				    </Card>
			  </Card.Group>
	      </Container>
        </Layout>
    )
  }
}


export default UX
