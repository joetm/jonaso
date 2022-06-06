// import 'semantic-ui-css/components/card.min.css'
// import '../masonry.css'

import '../react-masonry.css'

// { useState, useEffect }
import React from "react"
// Card, Image, Label
import { Container, Header } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { spacer } from "../common"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Masonry from 'react-masonry-css'

import { graphql } from 'gatsby'

const breakpointColumnsObj = {
  default: 5,
  1200: 4,
  980: 3,
  700: 2
};


// const styles = {
// 	breadcrumb: {
// 		cursor: 'pointer',
// 	}
// }


const Artwork = ({image}) => {
	// componentDidMount
	// useEffect(() => {
	// 		updateLoading()
	// }, [keyVal, updateLoading])
	if (!image) {
		return
	}
	return (
		<GatsbyImage
	      image={image}
	      alt=""
	      layout="constrained"
	      placeholder="dominantColor"
	      loading="lazy"
    />
	)
}


const ArtPage = ({data}) => {
  	let images = data.allFile.edges || []
  	// state hook
  	// const [count, setCount] = useState(0);
  	// const updateLoading = () => {
  	// }
  	// const totalCount = data?.allFile?.totalCount
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

			      {/*
						<div style={{textAlign:'center'}}>
							Loading: {count}/{totalCount}
							<div style={{height:'10px',width:'100%',position:'relative',margin:'1rem',border:'1px solid #AAAAAA',overflow:'hidden'}}>
								<div style={{height:'10px',margin:0,padding:0,position:'relative',width:`${count/totalCount || 0}`,backgroundColor:'#FFFF00'}}>
								</div>
							</div>
						</div>
						*/}

	      </Container>
        </Layout>

		        <section style={{textAlign:'center', marginLeft: '30px', marginRight: '30px'}}>
							<Masonry
							  breakpointCols={breakpointColumnsObj}
							  className="my-masonry-grid"
							  columnClassName="my-masonry-grid_column">
							  	{
							  		images.map((img, index) => (
							  				<Artwork
							  					key={`a${index}`}
							  					image={getImage(img.node)}
							  				/>
							  			)
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
        childImageSharp {
          gatsbyImageData(
            width: 400
						placeholder: DOMINANT_COLOR
          )
        }
      }
    }
  }
}`

export default ArtPage
