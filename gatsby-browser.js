import React from 'react'
import RootWrapper from './src/components/root-wrapper'

// Wraps every page in a Layout
// exports.wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }

export const wrapRootElement = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>
}
