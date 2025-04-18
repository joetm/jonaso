"use client"

import '../../../react-masonry.css'

import React, { useState, useEffect } from "react"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'
import { useQuery } from '@tanstack/react-query'
// import Loader from "../../../components/loading"

// import images from "../../../../public/artworks/json/webp-midjourney.json"
const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-midjourney.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-midjourney.json?${cachebuster}`


export default function ArtPage() {
  const [ images, setImages ] = useState([])
  const { isLoading, data } = useQuery({
    queryKey: ['webp-midjourney'],
    queryFn: () => fetch(_URL).then((res) => res.json()),
  })
  useEffect(() => {
    if (data) { setImages(data) }
  }, [data]) // Dependency array ensures this runs only when `data` changes

  return (
    <>
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='Midjourney' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
      {/*
        isLoading ?
          <Loader />
          :
      */}
    </>
  )
}
