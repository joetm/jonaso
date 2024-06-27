"use client"

import '../../../react-masonry.css'

import React, { useState, useEffect } from "react"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'
import Loader from "../../../components/loading"


// import images from "../../../../public/artworks/json/webp-stablediffusion.json"
const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-stablediffusion.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-stablediffusion.json?${cachebuster}`


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
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='Stable Diffusion' totalCount={images.length} />
      </Layout>
      {
        !images.length ?
          <Loader />
          :
          <MasonryGallery images={images} />
      }
    </>
  )
}
