import '../../../react-masonry.css'

import React, { useState, useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
// import images from "../../../../public/artworks/json/webp-latent-diffusion.json"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'
import Loader from "../../../components/loading"


const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-latent-diffusion.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-latent-diffusion.json?${cachebuster}`


export default function ArtPage() {
  const [ images, setImages ] = useState([])
  const { isLoading, data } = useQuery({
    queryKey: ['webp-latent-diffusion'],
    queryFn: () => fetch(_URL).then((res) => res.json()),
  })
  useEffect(() => {
    if (data) { setImages(data) }
  }, [data])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='Latent Diffusion' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
    </>
  )
}
