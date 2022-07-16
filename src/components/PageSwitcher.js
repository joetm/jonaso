
import React from "react"
import { Divider, Menu } from 'semantic-ui-react'
import { navigate } from 'gatsby'

const PageSwitcher = ({generator}) => {
	const handleMenuClick = (e, { name, folder }) => {
		navigate(`/artworks/${folder}`)
	}
	return (
	   	<React.Fragment>

	      <section style={{textAlign:'center', marginBottom:'2em'}}>

			<Menu pointing secondary fluid widths={5}>
		        <Menu.Item
    		      name='Midjourney'
    		      folder='midjourney'
        		  active={generator === 'Midjourney'}
							onClick={handleMenuClick}
		        />
    		    <Menu.Item
        		  name='DALL-E 2'
    		      folder='dalle'
		          active={generator === 'DALL-E'}
							onClick={handleMenuClick}
    		    />
		        <Menu.Item
    		      name='Latent Diffusion'
    		      folder='latent-diffusion'
        		  active={generator === 'Latent Diffusion'}
							onClick={handleMenuClick}
		        />
		        <Menu.Item
    		      name='VQGAN-CLIP'
    		      folder='vqganclip'
        		  active={generator === 'VQGAN-CLIP'}
							onClick={handleMenuClick}
		        />
		        <Menu.Item
    		      name='Misc.'
    		      folder='misc'
        		  active={generator === 'Others'}
							onClick={handleMenuClick}
		        />
      		</Menu>

		</section>

		{/*
        <Divider horizontal>Selected Images</Divider>
		*/}

      </React.Fragment>
	)
}

export default PageSwitcher
