
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const Artwork = ({image}) => {
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

export default Artwork
