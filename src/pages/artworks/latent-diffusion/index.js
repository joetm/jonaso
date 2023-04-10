import '../../../react-masonry.css'

import React from "react"
import images from "../../../../public/artworks/json/webp-latent-diffusion.json"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'


export default function ArtPage() {
  return (
    <>
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='Latent Diffusion' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
    </>
  )
}
