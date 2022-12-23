import React from "react"
// import { GatsbyImage } from "gatsby-plugin-image"

const Artwork = ({image}) => {
	// if (!image) {
	// 	return
	// }
	let src = `https://www.jonaso.de/{image}`
	console.log(src)
	return (
		<img
	      src={src}
	      alt=""
	      loading="lazy"
	    />
	)
}

export default Artwork
