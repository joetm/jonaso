
import React from "react"
import { Container, Header } from 'semantic-ui-react'
import Layout from "./layout"
import { Helmet } from "react-helmet"
import PageSwitcher from './PageSwitcher'

const ArtHeader = ({generator, byline}) => {
	return (
	   	<Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{generator} Art {'//'} jonaso.de</title>
          <link rel="canonical" href="https://www.jonaso.de/artworks" />
        </Helmet>
	      <Container>
						<Header as='h1' textAlign='center' content='AI-generated Artworks' />
		        <section style={{textAlign:'center', marginBottom:'2em'}}>
		        	<p>{byline}</p>
		        </section>

			      {/*
						<div style={{textAlign:'center'}}>
							Loading: {count}/{totalCount}
							<div style={{height:'10px',width:'100%',position:'relative',margin:'1rem',border:'1px solid #AAAAAA',overflow:'hidden'}}>
								<div style={{height:'10px',margin:0,padding:0,position:'relative',width:`${count/totalCount || 0}`,backgroundColor:'#FFFF00'}}>
								</div>
							</div>
						</div>
						*/}

				<PageSwitcher generator={generator} />

	      </Container>
        </Layout>
	)
}

export default ArtHeader
