// import 'semantic-ui-css/components/card.min.css'
// import '../masonry.css'

import '../react-masonry.css'

import React from "react"
// Card, Image, Label
import { Container, Header } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { spacer } from "../common"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
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
  	let images = data.allFile.edges || []
  	console.log(data.allFile.edges)
  	// sort images by modifiedTime
  // 	images.sort(function(a, b) {
		//   var keyA = new Date(a.modifiedTime),
		//     keyB = new Date(b.modifiedTime);
		//   // Compare the 2 dates
		//   if (keyA < keyB) return 1;
		//   if (keyA > keyB) return -1;
		//   return 0;
		// });
  	
    return (
    	<React.Fragment>
	   	<Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>AI-generated Art {'//'} jonaso.de</title>
          <link rel="canonical" href="https://www.jonaso.de/art" />
        </Helmet>
	      <Container>
					<Header as='h1' textAlign='center' content="AI-generated Artworks" />
		        <section style={{textAlign:'center',marginBottom:'2em'}}>
		        	<p>Generating digital artworks from text prompts (never edited).</p>
		        </section>

	      </Container>
        </Layout>

		        <section style={{textAlign:'center', marginLeft: '30px', marginRight: '30px'}}>
							<Masonry
							  breakpointCols={5}
							  className="my-masonry-grid"
							  columnClassName="my-masonry-grid_column">
							  	{
							  		images.map(img => {
							  			// let imgUrl = `../../artworks/${img.node.relativePath}`
							  			let image = getImage(img.node)
							  			return (
								  		<GatsbyImage
									  			key={img.node.id}
										      image={image}
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

    	</React.Fragment>
    )
  // }
}


export const query = graphql`
query ArtworksQuery {
  allFile(
  	sort: {fields: modifiedTime, order: DESC},
    filter: {
      extension: { regex: "/(jpg)|(png)|(jpeg)/" }
    }
  ) {
  	totalCount
    edges {
      node {
      	id
        modifiedTime
        childImageSharp {
          gatsbyImageData(
						placeholder: DOMINANT_COLOR
          )
        }
      }
    }
  }
}`

export default ArtPage
