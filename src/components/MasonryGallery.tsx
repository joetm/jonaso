import React, { useState, useRef } from 'react'
import Masonry from 'react-masonry-css'
import breakpointColumnsObj from './breakpoints.js' 
import useIntersectionObserver from '../hooks/use-intersect'


export default function MasonryGallery({ images, next, fetchMore, isFetching }) {

	let trackerOffset = 0

	// no images? show loader
	if (!images.length) {
		return (
			<div className="ui">
				<div className="ui active transition visible inverted dimmer" style={{ display: 'flex !important' }}>
					<div className="ui inverted text loader">Loading</div>
				</div>
			</div>
		) //
	}

	const trackerRef = useRef<HTMLDivElement | null>(null)
	const colRef = useRef<HTMLDivElement | null>(null)
	const tracker = useIntersectionObserver(trackerRef, {})
	const isVisible = !!tracker?.isIntersecting

	// get shortest column height
	if (colRef?.current) {
		const columns = colRef?.current.querySelectorAll('.my-masonry-grid_column')
		const colHeight = colRef?.current.clientHeight
		let minH = 0
		columns.forEach(col => {
			let h = 0
			col.childNodes.forEach(el => {
				h += el.clientHeight
			})
			if (!minH) { minH = h }
			else if (h < minH) { minH = h }
		})
		// set the tracker offset
		trackerOffset = colHeight - minH
	}

	if(next && isVisible && !isFetching) {
		console.log('fetching MOAR!')
		fetchMore()
	}

	return (
		<section ref={colRef} style={{ textAlign: 'center', marginLeft: '30px', marginRight: '30px', maxWidth: '2000px', margin: 'auto' }}>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column">
				{images.map(img => (
					<div key={encodeURI(img[0])} className="gatsby-image-wrapper gatsby-image-wrapper-constrained"
						style={{ backgroundColor: img[3] }}>
						<div style={{ maxWidth: '400px', display: 'block' }}>
							<img
								alt=""
								role="presentation"
								aria-hidden="true"
								src={"data:image/svg+xml;charset=utf-8,%3Csvg height='" + img[2] + "' width='" + img[1] + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"}
								style={{ maxWidth: '100%', display: 'block', position: 'static' }} />
						</div>
						<div
							aria-hidden="true"
							style={{
								opacity: 0,
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
								srcSet={img[0] + " 400w"}
								sizes="(min-width: 400px) 400px, 100vw" />
							<img
								layout="constrained"
								placeholder="dominantColor"
								style={{ objectFit: 'cover', opacity: 1 }}
								sizes="(min-width: 400px) 400px, 100vw"
								decoding="async"
								loading="lazy"
								src={img[0]}
								srcSet={img[0] + " 400w"}
								alt=""
								width={img[1]}
								height={img[2]} />
						</picture>
						<noscript>
							<picture>
								<source
									type="image/webp"
									srcSet={img[0] + " 400w"}
									sizes="(min-width: 400px) 400px, 100vw" />
								<img
									layout="constrained"
									placeholder="dominantColor"
									width={img[1]}
									height={img[2]}
									style={{ objectFit: 'cover', opacity: 0 }}
									sizes="(min-width: 400px) 400px, 100vw"
									decoding="async"
									loading="lazy"
									src={img[0]}
									srcSet={img[0] + " 400w"}
									alt="" />
							</picture>
						</noscript>
					</div>
				)
				)}
			</Masonry>
			<div ref={trackerRef} style={{ position: 'relative', top: `-${trackerOffset}px`, height: '1px', width: '1px'}}></div>
		</section>
	)
}
