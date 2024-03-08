// import 'semantic-ui-css/components/card.min.css'
// import '../masonry.css'

import '../../../react-masonry.css'

import React, { useState, useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
// import images from "../../../../public/artworks/json/webp-misc.json"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'

const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-misc.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-misc.json?${cachebuster}`


export default function ArtPage() {
  const [ images, setImages ] = useState([])
  const { isLoading, data } = useQuery({
    queryKey: ['webp-misc'],
    queryFn: () => fetch(_URL).then((res) => res.json()),
  })
  useEffect(() => {
    if (data) { setImages(data) }
  }, [data])
  return (
    <>
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='Misc. Text-To-Image Systems' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
    </>
  )
}
