import React from "react"
import Masonry from 'react-masonry-css'
import breakpointColumnsObj from './breakpoints.js' 
import { Loader, Segment, Dimmer } from 'semantic-ui-react'

const MasonryGallery = ({images}) => {
	if (!images.length) {
		return (
		    <Segment>
		      <Dimmer active inverted>
		        <Loader inverted>Loading</Loader>
		      </Dimmer>
		    </Segment>
		) //
	}
	return (
        <section style={{textAlign:'center', marginLeft: '30px', marginRight: '30px', maxWidth: '2000px', margin: 'auto'}}>
			<Masonry
			  breakpointCols={breakpointColumnsObj}
			  className="my-masonry-grid"
			  columnClassName="my-masonry-grid_column">
			  	{
			  		images.map(img => (
						<div className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
							style={{backgroundColor: img[3]}}>
							<div style={{maxWidth:'400px',display:'block'}}>
								<img
									alt=""
									role="presentation"
									aria-hidden="true"
									src={"data:image/svg+xml;charset=utf-8,%3Csvg height='"+img[2]+"' width='"+img[1]+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"}
									style={{maxWidth:'100%',display:'block',position:'static'}}
								/>
							</div>
							<div
								aria-hidden="true"
								style={{opacity: 0,
									transition: 'opacity 500ms linear 0s',
									backgroundColor: img[3],
									position: 'absolute',
									inset: '0px',
									objectFit: 'cover'
								}}
							></div>
							<picture>
								<source
									type="image/webp"
									srcSet={encodeURI(img[0]) + " 400w"}
									sizes="(min-width: 400px) 400px, 100vw"
								/>
								<img
									layout="constrained"
									placeholder="dominantColor"
									style={{objectFit: 'cover', opacity: 1}}
									sizes="(min-width: 400px) 400px, 100vw"
									decoding="async"
									loading="lazy"
									src={encodeURI(img[0])}
									srcSet={encodeURI(img[0]) + " 400w"}
									alt=""
									width={img[1]}
									height={img[2]}
								/>
							</picture>
							<noscript>
								<picture>
									<source
										type="image/webp"
										srcSet={encodeURI(img[0]) + " 400w"}
										sizes="(min-width: 400px) 400px, 100vw"
									/>
									<img
										layout="constrained"
										placeholder="dominantColor"
										width={img[1]}
										height={img[2]}
										style={{objectFit:'cover', opacity:0}}
										sizes="(min-width: 400px) 400px, 100vw"
										decoding="async"
										loading="lazy"
										src={encodeURI(img[0])}
										srcSet={encodeURI(img[0]) + " 400w"}
										alt=""
									/>
								</picture>
							</noscript>
						</div>
			  			)
			  		)
			  	}
			</Masonry>
        </section>
	)
}

export default MasonryGallery
