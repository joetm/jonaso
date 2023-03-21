"use client"

import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

export default function ResearchBreadcrumb({ last }) {
  const sections = [
    // { key: 'Home', content: 'Home', link: false },
    { key: 'Research', content: 'Research', link: false },
    { key: last, content: last, link: false, active: true },
  ]
  return (
    <Breadcrumb sections={sections} />
  )
}
