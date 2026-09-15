import React from "react"

// Static port: the menu items are plain links now (was gatsby navigate()).

function Link({name, folder, active, shortname=null}) {
  return (
      <a
        href={`/art/${folder}/`}
        className={"item" + (active ? ' active' : '')}
      >
        {shortname ? shortname : name}
      </a>
  )
}


export default function ArtHeader({generator, byline, totalCount}) {
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
          <Link name="Midjourney" folder="midjourney" active={generator === 'Midjourney'} />
          <Link name="DALL-E" folder="dalle" active={generator === 'DALL-E'} />
          <Link name="Stable Diffusion" folder="stablediffusion" active={generator === 'Stable Diffusion'} />
          {/*
          <Link name="Redteam" folder="redteam" active={generator === 'Redteam'} />
          */}
          <Link name="Latent Diffusion" folder="latent-diffusion" active={generator === 'Latent Diffusion'} />
          <Link name="VQGAN-CLIP" folder="vqganclip" active={generator === 'VQGAN-CLIP'} />
          <Link name="Misc. Text-To-Image Systems" folder="misc" shortname="Misc." active={generator === 'Misc. Text-To-Image Systems'} />
        </div>
      </section>
    </div>
  )
}
