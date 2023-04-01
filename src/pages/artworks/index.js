"use client"

import '../../true-masonry.css' // based on https://codepen.io/iamsaief/pen/jObaoKo

import React, { useState, useEffect } from "react"
import ArtHeader from '../../components/ArtHeader'
import Layout from "../../components/layout"
import Loader from "../../components/loading"
import { setAspectRatio } from "../../common.js"


// import images from '../../../public/artworks/json/webp-latest.json'
const cachebuster = Math.round(Date.now() / 10000)
const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-latest.json?${cachebuster}` : `https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-latest.json?${cachebuster}`


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
    // fetch(_URL)
    // .then(res => {
    //   if (res.status >= 400) {
    //     console.log(_URL)
    //     throw new Error("Bad response from server: Could not get images")
    //   }
    //   return res.json()
    // })
    // .then(images => {
    //   setImages(images)
    // })
    // .catch(err => {
    //   console.error(err)
    // })
  }, [])

  return (
    <>
      <Layout>
        <ArtHeader
          generator="AI-generated Images"
          byline="Latest digital images generated from text prompts (never edited). Click links below for more."
        />
      </Layout>
      {
        !images.length && <Loader />
      }
      <div id="true-masonry">
        <div className="grid-wrapper">
          {
            images.map((image, index) => (
                <div key={image[0]} className={setAspectRatio(image, index)}>
                    <img src={image[0]} decoding="async" loading="lazy" alt="" />
                </div>
              ))
          }
        </div>
      </div>
    </>
  )
}


// import { graphql } from 'gatsby'
// const ArtPage = ({data}) => {
//   	let images = data.allFile.edges
//     return (
//     	<React.Fragment>
//     			<ArtHeader
//             generator='AI-generated Images'
//             byline='Latest digital images generated from text prompts (never edited). Click links below for more.'
//           />
//     			<MasonryGallery images={images} />
// 	        <div className="spacer"></div>
//     	</React.Fragment>
//     )
// }


// export const query = graphql`
// query ArtworksQuery {
//   allFile(
//   	sort: {fields: birthTime, order: DESC},
//   	limit: 25,
//     filter: {
//       extension: { regex: "/(jpg)|(png)/" }
//     }
//   ) {
//     edges {
//       node {
//         childImageSharp {
//           gatsbyImageData(
//             width: 400
// 						placeholder: DOMINANT_COLOR
//           )
//         }
//       }
//     }
//   }
// }`

