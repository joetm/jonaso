"use client"
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { navigate } from 'gatsby'
import React from "react"


export default function ArtHeader({generator, byline, totalCount}) {
  const handleMenuClick = (e) => {
    e.preventDefault()
    const folder = e.target.getAttribute('folder')
    navigate(`/artworks/${folder}/`)
  }
  return (
    <div>
      <h1>{generator}</h1>

      <section style={{textAlign:'center', marginBottom:'2em'}}>
        <p>
          { byline }
          {
              totalCount && (
                totalCount === 0 ? (<span>&nbsp;</span>) :
                  totalCount >= 100 ? `Latest ${totalCount} images` : `${totalCount} images`
              )
          }
        </p>
      </section>

      <section style={{textAlign:'center', marginBottom:'2em'}}>
        <div className="ui fluid pointing secondary six item menu">
          <a 
            folder="midjourney"
            className={"item" + (generator === 'Midjourney' ? ' active' : '')}
            onClick={handleMenuClick}
            onKeyDown={handleMenuClick}
          >
            Midjourney
          </a>
          <a
            folder="stablediffusion"
            className={"item" + (generator === 'Stable Diffusion' ? ' active' : '')}
            onClick={handleMenuClick}
            onKeyDown={handleMenuClick}
          >
            Stable Diffusion
          </a>
          <a
            folder="dalle"
            className={"item" + (generator === 'DALL-E' ? ' active' : '')}
            onClick={handleMenuClick}
            onKeyDown={handleMenuClick}
          >
            DALL-E
          </a>
          <a
            folder="latent-diffusion"
            className={"item" + (generator === 'Latent Diffusion' ? ' active' : '')}
            onClick={handleMenuClick}
            onKeyDown={handleMenuClick}
          >
            Latent Diffusion
          </a>
          <a
            folder="vqganclip"
            className={"item" + (generator === 'VQGAN-CLIP' ? ' active' : '')}
            onClick={handleMenuClick}
            onKeyDown={handleMenuClick}
          >
            VQGAN-CLIP
          </a>
          <a
            folder="misc"
            className={"item" + (generator === 'Misc. Text-To-Image Systems' ? ' active' : '')}
            onClick={handleMenuClick}
            onKeyDown={handleMenuClick}
          >
            Misc.
          </a>
        </div>
      </section>
    </div>
  )
}
