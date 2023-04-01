// import 'semantic-ui-css/components/card.min.css'
// import '../masonry.css'

import '../../../react-masonry.css'

import React from "react"
import images from "../../../../public/artworks/json/webp-misc.json"
import { spacer } from "../../../common"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'


export default function ArtPage() {
  return (
    <>
      <Layout>
        <ArtHeader generator='Misc. Text-To-Image Systems' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
      <div className="spacer" style={spacer}></div>
    </>
  )
}
