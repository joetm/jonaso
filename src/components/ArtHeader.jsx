"use client"
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { navigate } from 'gatsby'
import React, { createContext } from "react"
import { useContext } from 'react'
const LinkContext = createContext(null)


function Link({name, folder, shortname=null}) {
  const ctx = useContext(LinkContext)
  console.log('checkval', name, shortname, ctx.generator)
  return (
      <a 
        folder={folder}
        className={"item" + (ctx.generator === name ? ' active' : '')}
        onClick={ctx.handleMenuClick}
        onKeyDown={ctx.handleMenuClick}
      >
        {shortname ? shortname : name}
      </a>
  )
}


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
          <LinkContext.Provider
            value={{
              handleMenuClick,
              generator,
            }}
          >
            <Link name="Midjourney" folder="midjourney" />
            <Link name="DALL-E" folder="dalle" />
            <Link name="Stable Diffusion" folder="stablediffusion" />
            <Link name="Redteam" folder="redteam" />
            <Link name="Latent Diffusion" folder="latent-diffusion" />
            <Link name="VQGAN-CLIP" folder="vqganclip" />
            <Link name="Misc. Text-To-Image Systems" folder="misc" shortname="Misc." />
          </LinkContext.Provider>
        </div>
      </section>
    </div>
  )
}
