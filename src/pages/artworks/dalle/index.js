"use client"

import '../../../react-masonry.css'

import React from "react"
import images from "../../../../public/artworks/json/webp-dalle-2.json"
import { spacer } from "../../../common"
import ArtHeader from '../../../components/ArtHeader'
import Layout from "../../../components/layout"
import MasonryGallery from '../../../components/MasonryGallery'


export default function ArtPage() {
  return (
    <>
      <Layout>
        <ArtHeader generator='DALL-E Art' totalCount={images.length} />
      </Layout>
      <MasonryGallery images={images} />
      <div className="spacer" style={spacer}></div>
    </>
  )
}
