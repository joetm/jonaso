
import React from "react"
import { Container, Header } from 'semantic-ui-react'
import Layout from "./layout"
import { Helmet } from "react-helmet"
import PageSwitcher from './PageSwitcher'

const ArtHeader = ({generator, byline, totalCount}) => {
	return (
	   	<Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
          	{generator === 'AI-generated Artworks' ? generator : `${generator} Art` } {'//'} jonaso.de
          </title>
          <link rel="canonical" href="https://www.jonaso.de/artworks" />
        </Helmet>
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

				<PageSwitcher generator={generator} />

	      </Container>
        </Layout>
	)
}

export default ArtHeader
