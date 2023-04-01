"use client"

import '../../../react-masonry.css'

import React, { useState, useEffect } from "react"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'


// import images from "../../../../public/artworks/json/webp-dalle-2.json"
const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-dalle-2.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-dalle-2.json?${cachebuster}`


export default function ArtPage() {
  const [images, setImages] = useState([])
  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(_URL)
      ).json()
      setImages(data)
    }
    dataFetch()
  }, [])
  return (
    <>
      <Layout>
        <ArtHeader generator='DALL-E Art' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
      <div className="spacer"></div>
    </>
  )
}
