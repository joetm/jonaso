import '../../../react-masonry.css'

import React from "react"
import images from "../../../../public/artworks/json/webp-VQGANCLIP.json"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'
import Loader from "../../../components/loading"


export default function ArtPage() {
  return (
    <>
      <Layout style={{paddingBottom: 0}}>
        <ArtHeader generator='VQGAN-CLIP' totalCount={images.length} />
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
