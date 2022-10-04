// remove google font loading
// import 'semantic-ui-css/components/site.min.css'
import '../css/site.modded.min.css'
//
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/header.min.css'
import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/item.min.css'
import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/divider.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/image.min.css'
// import 'semantic-ui-css/components/breacrumb.min.css'
import 'semantic-ui-css/components/icon.min.css'
import 'semantic-ui-css/components/menu.min.css'
import 'semantic-ui-css/components/loader.min.css'
import 'semantic-ui-css/components/reset.min.css'
import 'semantic-ui-css/components/checkbox.min.css'

import '../print.css'
import '../overrides.css'

import React from "react"
import Nav from "./Nav.js"

function Layout({ children }) {
  return (
    <div style={{margin: `0 auto`, maxWidth: 1024}}>
      <Nav />
      {children}
    </div>
  )
}

export default Layout
