import React from "react"


export default function Loading() {
  return (
      <div className="ui">
        <div className="ui active transition visible inverted dimmer" style={{display: 'flex !important'}}>
          <div className="ui inverted text loader">Loading</div>
        </div>
      </div>
  )
}
