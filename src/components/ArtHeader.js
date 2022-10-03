
import React from "react"
import { Container, Header } from 'semantic-ui-react'
import Layout from "./layout"
import { Title, Link, Meta } from "react-head"
import ArtPageSwitcher from './ArtPageSwitcher'


const ArtHeader = ({generator, byline, totalCount}) => {
	return (
	   	<Layout>
        <Meta charSet="utf-8" />
        <Title>
        	{generator === 'AI-generated Artworks' ? generator : `${generator} Art` } {'//'} jonaso.de
        </Title>
        <Link rel="canonical" href="https://www.jonaso.de/artworks" />
	      <Container>
						<Header as='h1' textAlign='center' content='AI-generated Artworks' />
		        <section style={{textAlign:'center', marginBottom:'2em'}}>
			        <p>
		        	{
		        		byline ?
		        			byline
		        				:
			        		`${totalCount} images`
		        	}
							</p>
		        </section>

				<ArtPageSwitcher generator={generator} />

	      </Container>
        </Layout>
	)
}

export default ArtHeader
