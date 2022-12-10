import React from "react"
import Container from 'semantic-ui-react/dist/es/elements/Container/Container.js'
import Layout from "./layout"
import { Title, Link, Meta } from "react-head"
import ArtPageSwitcher from './ArtPageSwitcher'


const ArtHeader = ({generator, byline, totalCount}) => {
  return (
      <Layout>
          <Meta charSet="utf-8" />
          <Title>{generator} Art {'//'} jonaso.de</Title>
          <Link rel="canonical" href="https://www.jonaso.de/artworks" />
          <Container>
            <h1>{generator}</h1>
            <section style={{textAlign:'center', marginBottom:'2em'}}>
              <p>
              {
                byline ?
                  byline
                    :
                  `${totalCount} images`
              }
              </p>
            </section>

            <ArtPageSwitcher generator={generator} />

          </Container>
        </Layout>
  )
}

export default ArtHeader
