import React from "react"
import { graphql } from "gatsby"

export default class ItemList extends React.Component {
  render() {
    const items = this.props.data.allFile.edges
    return (
      <React.Fragment>
        {
          items.map(({ img }) => {
            const key = img?.node?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
            return <div key={key}>{key}</div>
          })
        }
      </React.Fragment>
    )
  }
}

export const blogListQuery = graphql`
  query pageTestQuery($skip: Int!, $limit: Int!) {
    allFile(
      sort: {fields: birthTime, order: DESC}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              width: 400
              placeholder: DOMINANT_COLOR
            )
          }
        }
      }
    }
  }`

