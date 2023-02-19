import React from "react"
import { navigate } from 'gatsby'

const ArtPageSwitcher = ({generator}) => {
	const handleMenuClick = (e) => {
		e.preventDefault()
		const folder = e.target.getAttribute('folder')
		navigate(`/artworks/${folder}`)
	}
	return (
	      <section style={{textAlign:'center', marginBottom:'2em'}}>

			<div className="ui fluid pointing secondary six item menu">
				<a
					folder="midjourney"
					className={"item" + (generator === 'Midjourney' ? ' active' : '')}
					onClick={handleMenuClick}
				>
					Midjourney
				</a>
				<a
					folder="stablediffusion"
					className={"item" + (generator === 'Stable Diffusion' ? ' active' : '')}
					onClick={handleMenuClick}
				>
					Stable Diffusion
				</a>
				<a
					folder="dalle"
					className={"item" + (generator === 'DALL-E' ? ' active' : '')}
					onClick={handleMenuClick}
				>
					DALL-E 2
				</a>
				<a
					folder="latent-diffusion"
					className={"item" + (generator === 'Latent Diffusion' ? ' active' : '')}
					onClick={handleMenuClick}
				>
					Latent Diffusion
				</a>
				<a
					folder="vqganclip"
					className={"item" + (generator === 'VQGAN-CLIP' ? ' active' : '')}
					onClick={handleMenuClick}
				>
					VQGAN-CLIP
				</a>
				<a
					folder="misc"
					className={"item" + (generator === 'Misc. Text-To-Image Systems' ? ' active' : '')}
					onClick={handleMenuClick}
				>
					Misc.
				</a>
      		</div>

		</section>
	)
}

export default ArtPageSwitcher
