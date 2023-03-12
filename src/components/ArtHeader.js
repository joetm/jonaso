import React from "react"
import Layout from "./layout"
import { Title, Link, Meta } from "react-head"
import { navigate } from 'gatsby'


const ArtHeader = ({generator, byline, totalCount}) => {
  const handleMenuClick = (e) => {
    e.preventDefault()
    const folder = e.target.getAttribute('folder')
    navigate(`/artworks/${folder}/`)
  }
  return (
      <Layout>
          <Meta charSet="utf-8" />
          <Title>{generator} Art {'//'} jonaso.de</Title>
          <Link rel="canonical" href="https://www.jonaso.de/artworks/" />
          <div className="ui container">
            <h1>{generator}</h1>

            <section style={{textAlign:'center', marginBottom:'2em'}}>
              <p>
              {
                byline
              }
              {
                  totalCount === 0 ? (<span>&nbsp;</span>) :
                    totalCount >= 100 ? `Latest ${totalCount} images` : `${totalCount} images`
              }
              </p>
            </section>

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

          </div>
        </Layout>
  )
}

export default ArtHeader
