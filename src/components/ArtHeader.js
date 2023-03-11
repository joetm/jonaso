import React from "react"
import Layout from "./layout"
import { Title, Link, Meta } from "react-head"
import ArtPageSwitcher from './ArtPageSwitcher'


const ArtHeader = ({generator, byline, totalCount}) => {
  return (
      <Layout>
          <Meta charSet="utf-8" />
          <Title>{generator} Art {'//'} jonaso.de</Title>
          <Link rel="canonical" href="https://www.jonaso.de/artworks/" />
          <div className="ui container">
            <h1>{generator}</h1>
            <section style={{textAlign:'center', marginBottom:'2em'}}>
              <p>
              {
                byline ?
                  byline
                    :
                  totalCount === 0 ? (<span>&nbsp;</span>) : `${totalCount} images`
              }
              </p>
            </section>
            <ArtPageSwitcher generator={generator} />
          </div>
        </Layout>
  )
}

export default ArtHeader
