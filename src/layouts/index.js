import React from "react"

import Nav from "../Nav.js"

export default ({ children }) => (
  <div style={{margin: `0 auto`, maxWidth: 1024}}>
    <Nav />
    {children()}
  </div>
)
