"use client"

import '../../../react-masonry.css'

import React from "react"
import ArtHeader from '../../../components/ArtHeader'
import MasonryGallery from '../../../components/MasonryGallery'


class ArtPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: false,
      next: false,
      images: [],
      isFetching: false,
    }
  }
  componentDidMount() {
    //initial call to API
    const cachebuster = Math.round(Date.now() / 10000)
    // const _URL = process.env.NODE_ENV === "development" ? `/artworks/json/webp-midjourney-0.json?${cachebuster}` : `https://www.jonaso.de/artworks/json/webp-midjourney-0.json?${cachebuster}`
    const _URL = `/artworks/json/webp-midjourney-0.json?${cachebuster}`
    fetch(_URL)
    .then(response => response.json())
    .then(images => {
      this.setState({
        total: images.total,
        next: images.next,
        images: images.items,
      })
    })
  }
  fetchMore = () => {
    const { next, images } = this.state
    if (!next) return
    this.setState({isFetching: true})
    const cachebuster = Math.round(Date.now() / 10000)
    const _URL = `/artworks/json/webp-midjourney-${next}.json?${cachebuster}`
    fetch(_URL)
      .then(response => response.json())
      .then(moreRes => {
        this.setState({
          next: moreRes.next,
          images: [...images, ...moreRes.items],
          isFetching: false,
        })
      })
  }
  render() {
    const { images, total, next, isFetching } = this.state
    return (
      <>
          <ArtHeader generator='Midjourney' totalCount={total} />
          <MasonryGallery images={images} next={next} fetchMore={this.fetchMore} isFetching={isFetching} />
      </>
    )
  }
}

export default ArtPage
