"use client"

import '../../../react-masonry.css'

import React, { useState, useEffect } from "react"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'


// import images from "../../../../public/artworks/json/webp-dalle-2.json"
const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-redteaming.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-redteaming.json?${cachebuster}`


function ConsentForm({setConsent}) {
  return (
    <div style={{margin: `0 auto`, clear: 'both', maxWidth: 1024, paddingBottom: '5em'}}>
      <div className="disclaimer container" style={{textAlign:'center'}}>
        <h4>Disclaimer: Viewer Discretion Advised</h4>
        <p>
          This page displays the results of my exploration of the boundaries of moderation policies in text-to-image generation systems. The images and content presented here are a part of a scientific inquiry and are not reflective of my personal views or beliefs.
        <br />
          Please be aware that some of the content on this page may be considered offensive, inappropriate, or disturbing. The intention of displaying these images is solely for the purpose of academic research and to contribute to discussions around the capabilities and ethical considerations in AI-generated content.
          If you are likely to be offended or are uncomfortable with such material, please exercise discretion in viewing this page. The content is presented here for educational and research purposes only.
        </p>
        <button className="ui button" onClick={() => setConsent(true)}>I Consent</button>
      </div>
    </div>
  )
}


export default function ArtPage() {
  const [images, setImages] = useState([])
  const [consented, setConsent] = useState(false)
  useEffect(() => {
    const dataFetch = async () => {
      const data = await ( await fetch(_URL) ).json()
      setImages(data)
    }
    dataFetch()
  }, [])
  return (
    <>
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='Redteaming' totalCount={images.length} />
      </Layout>
      {
        consented ?
          <MasonryGallery images={images} />
        :
          <ConsentForm setConsent={setConsent} />
      }
    </>
  )
}
