"use client"

// remove google font loading
// import 'semantic-ui-css/components/site.min.css'
import '../css/site.modded.min.css'
//
import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/divider.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/image.min.css'
import 'semantic-ui-css/components/menu.min.css'

import '../print.css'
import '../overrides.css'

import React from "react"
import Nav from "./Nav.js"

export default function Layout({ children }) {
  return (
    <div style={{margin: `0 auto`, maxWidth: 1024}}>
      <Nav />
      {children}
    </div>
  )
}
