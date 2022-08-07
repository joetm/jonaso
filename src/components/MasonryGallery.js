
import React from "react"
import Masonry from 'react-masonry-css'
import { getImage } from "gatsby-plugin-image"
import breakpointColumnsObj from './breakpoints.js' 
import Artwork from './Artwork'

const MasonryGallery = ({images}) => {
	return (
		        <section style={{textAlign:'center', marginLeft: '30px', marginRight: '30px', maxWidth: '2000px', margin: 'auto'}}>
							<Masonry
							  breakpointCols={breakpointColumnsObj}
							  className="my-masonry-grid"
							  columnClassName="my-masonry-grid_column">
							  	{
							  		images
							  			.map(img => {
							  				  let key = img?.node?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
							  				  let imgnode = getImage(img.node)
							  				  if (!imgnode) {
							  				  	return ''
							  				  }
									  			return (
									  				<Artwork
									  					key={key}
									  					image={imgnode}
									  				/>
									  			)
								  		})
							  	}
							</Masonry>
		        </section>
	)
}

export default MasonryGallery
