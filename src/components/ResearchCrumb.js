import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

const sections = [
  // { key: 'Home', content: 'Home', link: false },
  { key: 'Research', content: 'Research', link: false },
]

const ResearchBreadcrumb = ({ last }) => {
  sections.push(
      { key: last, content: last, link: false, active: true }
  )
  return (
    <Breadcrumb sections={sections} />
  )
}

export default ResearchBreadcrumb
