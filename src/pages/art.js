// import 'semantic-ui-css/components/card.min.css'
// import '../masonry.css'

import '../react-masonry.css'

import React from "react"
// Card, Image, Label
import { Container, Header } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { spacer } from "../common"
import { StaticImage } from "gatsby-plugin-image"
import Masonry from 'react-masonry-css'

import { graphql } from 'gatsby'


const styles = {
	breadcrumb: {
		cursor: 'pointer',
	}
}


const ArtPage = ({data}) => {
// class ArtPage extends React.Component {
//   state = {
//     artworks: [],
//     activebreadcrumb: null,
//     breadcrumbs: []
//   }
  // render() {
  	// console.log(data.allFile.edges)
  	let images = data.allFile.edges || []
    return (
	   	<Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>AI-generated Art {'//'} jonaso.de</title>
          <link rel="canonical" href="https://www.jonaso.de/art" />
        </Helmet>
	      <Container>
					<Header as='h1' textAlign='center' content="AI-generated Artworks" />
		        <section style={{textAlign:'center'}}>
		        {/*
		        	<p>I experiment with text-based image generation.</p>
		        */}
		        </section>

		        <section style={{textAlign:'center'}}>

							<Masonry
							  breakpointCols={3}
							  className="my-masonry-grid"
							  columnClassName="my-masonry-grid_column">
							  	{
							  		images.map(img => {
							  			const imgUrl = `../../artworks/${img.node.relativePath}`
							  			console.log(img.node.relativePath)
							  			return (
								  		<StaticImage
									  			key={img.node.relativePath}
										      src={imgUrl}
										      alt=""
										      placeholder="blurred"
										      layout="constrained"
										      loading="lazy"
									    />
							  			)
							  		}
							  		)
							  	}
							</Masonry>

		        </section>

	          <div className="spacer" style={spacer}></div>

	      </Container>
        </Layout>
    )
  // }
}


export const query = graphql`
query ArtworksQuery {
	allFile {
	    edges {
	      node {
	        id
	        relativePath
	        base
	        name
	        changeTime
	      }
	    }
	  }
}`

export default ArtPage
