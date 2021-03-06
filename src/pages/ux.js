import 'semantic-ui-css/components/card.min.css'

import React from "react"
import { Header, Card, Image, Icon, Container } from 'semantic-ui-react'
import Layout from "../components/layout"


// const styles = {}

const src = "http://localhost:8000/static/opp-1924a88836b85f62ee5d9a0754979b59.jpg"


class UX extends React.Component {
  render() {
    return (
	   	<Layout>
	      <Container>
			<Header as='h1' textAlign='center' content="UX Portfolio" />
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
